import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { load } from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const ORIGIN = 'https://moldstud.com';
const USER_AGENT =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36';

const ROOT_PAGES = [
	'/',
	'/services',
	'/careers',
	'/about-us',
	'/contacts',
	'/hire-us',
	'/industries',
	'/solutions',
	'/technologies',
	'/articles',
	'/privacy-policy',
];

const publicDir = path.join(projectRoot, 'public');
const discoveryDir = path.join(projectRoot, 'artifacts', 'discovery');
const snapshotsOriginalDir = path.join(projectRoot, 'artifacts', 'snapshots', 'html', 'original');
const dataDir = path.join(projectRoot, 'artifacts', 'data');

const mirroredPages = new Set();
const downloadedAssets = new Map();

const LOCAL_ENHANCEMENTS = `(() => {
  const searchForms = document.querySelectorAll('.tag-cloud-module-scss-module__h48nIa__form');
  searchForms.forEach((form) => {
    const input = form.querySelector('input[name="search"]');
    const list = form.parentElement?.querySelector('.tag-cloud-module-scss-module__h48nIa__list');
    if (!input || !list) return;
    const items = Array.from(list.querySelectorAll('li'));
    const sync = () => {
      const query = input.value.trim().toLowerCase();
      items.forEach((item) => {
        const haystack = (item.textContent || '').toLowerCase();
        const match = query.length === 0 || haystack.includes(query);
        item.hidden = false;
        item.style.display = match ? '' : 'none';
        item.setAttribute('aria-hidden', match ? 'false' : 'true');
      });
    };
    input.addEventListener('input', sync);
    sync();
  });
})();`;

function normalizeText(value = '') {
	return value.replace(/\s+/g, ' ').trim();
}

function pageFsPath(routePath) {
	if (routePath === '/') {
		return 'index.html';
	}
	return path.join(routePath.replace(/^\/+/, ''), 'index.html');
}

function snapshotFsPath(routePath) {
	if (routePath === '/') {
		return path.join('home', 'index.html');
	}
	return path.join(routePath.replace(/^\/+/, ''), 'index.html');
}

function ensureLeadingSlash(value) {
	if (!value) {
		return '/';
	}
	return value.startsWith('/') ? value : `/${value}`;
}

function canonicalRoute(value) {
	if (!value || value === '/') {
		return '/';
	}
	const clean = value.split('#')[0].split('?')[0].replace(/\/+$/, '');
	return clean || '/';
}

function resolveUrl(raw, base = ORIGIN) {
	if (!raw) {
		return null;
	}
	try {
		return new URL(raw, base).toString();
	} catch {
		return null;
	}
}

function extFromContentType(contentType) {
	if (contentType.includes('text/css')) return '.css';
	if (contentType.includes('image/png')) return '.png';
	if (contentType.includes('image/jpeg')) return '.jpg';
	if (contentType.includes('image/webp')) return '.webp';
	if (contentType.includes('image/svg+xml')) return '.svg';
	if (contentType.includes('font/woff2')) return '.woff2';
	if (contentType.includes('font/woff')) return '.woff';
	if (contentType.includes('application/json')) return '.json';
	if (contentType.includes('video/mp4')) return '.mp4';
	return '.bin';
}

async function ensureParent(filePath) {
	await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function writeText(filePath, content) {
	await ensureParent(filePath);
	await fs.writeFile(filePath, content, 'utf8');
}

async function writeJson(filePath, data) {
	await writeText(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

async function fetchResponse(url) {
	const response = await fetch(url, {
		headers: {
			'user-agent': USER_AGENT,
			'accept-language': 'en-US,en;q=0.9',
		},
	});
	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
	}
	return response;
}

async function fetchHtml(routePath) {
	const response = await fetchResponse(`${ORIGIN}${routePath}`);
	return response.text();
}

function uniqueByHref(items) {
	const seen = new Set();
	return items.filter((item) => {
		if (seen.has(item.href)) {
			return false;
		}
		seen.add(item.href);
		return true;
	});
}

function extractHomeHeaderLinks($) {
	return uniqueByHref(
		$('#header a')
			.toArray()
			.map((element) => {
				const anchor = $(element);
				return {
					text: normalizeText(anchor.text()) || normalizeText(anchor.attr('aria-label') || ''),
					href: canonicalRoute(anchor.attr('href') || '/'),
				};
			})
			.filter((item) => item.text || item.href === '/'),
	);
}

function extractHomeFooterLinks($) {
	return uniqueByHref(
		$('#footer a')
			.toArray()
			.map((element) => {
				const anchor = $(element);
				return {
					text: normalizeText(anchor.text()) || normalizeText(anchor.attr('aria-label') || ''),
					href: canonicalRoute(anchor.attr('href') || '/'),
				};
			})
			.filter((item) => item.text || item.href === '/'),
	);
}

function extractArticleLinks($, limit = 10) {
	return uniqueByHref(
		$('main a[href^="/articles/p-"]')
			.toArray()
			.map((element) => {
				const anchor = $(element);
				return {
					text: normalizeText(anchor.text()) || normalizeText(anchor.find('img').attr('alt') || ''),
					href: canonicalRoute(anchor.attr('href') || ''),
				};
			})
			.filter((item) => item.href.startsWith('/articles/p-')),
	).slice(0, limit);
}

function classifyTemplate(routePath) {
	if (routePath === '/') return 'homepage';
	if (routePath === '/articles') return 'articles-index';
	if (routePath === '/privacy-policy') return 'policy-page';
	if (routePath === '/contacts' || routePath === '/hire-us') return 'contact-form-page';
	if (routePath === '/careers') return 'careers-page';
	if (routePath === '/about-us') return 'about-page';
	if (
		routePath === '/services' ||
		routePath === '/industries' ||
		routePath === '/solutions' ||
		routePath === '/technologies'
	) {
		return 'marketing-listing-with-form';
	}
	if (routePath.startsWith('/articles/p-')) return 'article-detail';
	return 'content-page';
}

function summarizePage($, routePath) {
	return {
		path: routePath,
		template: classifyTemplate(routePath),
		title: normalizeText($('title').text()),
		h1: normalizeText($('h1').first().text()),
		h2: $('h2')
			.toArray()
			.slice(0, 6)
			.map((element) => normalizeText($(element).text()))
			.filter(Boolean),
		sections: $('main section').length,
		articles: $('main article').length,
		forms: $('main form').length,
		inputs: $('main input, main textarea, main select').length,
	};
}

function markdownList(items) {
	return items.map((item) => `- ${item}`).join('\n');
}

function formatPathWithOrigin(routePath) {
	return routePath === '/' ? ORIGIN : `${ORIGIN}${routePath}`;
}

function unwrapNextImage(url) {
	const parsed = new URL(url);
	if (parsed.origin === ORIGIN && parsed.pathname === '/_next/image' && parsed.searchParams.has('url')) {
		return resolveUrl(parsed.searchParams.get('url') || '', ORIGIN);
	}
	return url;
}

function computeLocalAssetPath(sourceUrl, contentType = '') {
	const parsed = new URL(sourceUrl);
	let ext = path.extname(parsed.pathname);
	if (!ext) {
		ext = extFromContentType(contentType);
	}

	if (parsed.origin === ORIGIN && !parsed.search) {
		return ensureLeadingSlash(parsed.pathname);
	}

	const hash = createHash('sha1').update(parsed.toString()).digest('hex').slice(0, 12);
	const baseName = path.basename(parsed.pathname, ext || '') || 'asset';
	return `/mirror-assets/${baseName}-${hash}${ext || '.bin'}`;
}

async function rewriteCssUrls(sourceUrl, cssText) {
	const cssUrlPattern = /url\(([^)]+)\)/g;
	const matches = Array.from(cssText.matchAll(cssUrlPattern));
	let rewritten = cssText;

	for (const match of matches) {
		const rawToken = match[1].trim().replace(/^['"]|['"]$/g, '');
		if (!rawToken || rawToken.startsWith('data:') || rawToken.startsWith('#')) {
			continue;
		}
		const localPath = await mirrorAsset(rawToken, sourceUrl);
		rewritten = rewritten.replace(match[0], `url("${localPath}")`);
	}

	return rewritten;
}

async function mirrorAsset(rawUrl, baseUrl = ORIGIN) {
	const resolved = resolveUrl(rawUrl, baseUrl);
	if (!resolved || /^(data:|mailto:|tel:|javascript:)/i.test(resolved)) {
		return rawUrl;
	}

	const unwrapped = unwrapNextImage(resolved);
	if (downloadedAssets.has(unwrapped)) {
		return downloadedAssets.get(unwrapped);
	}

	const response = await fetchResponse(unwrapped);
	const contentType = response.headers.get('content-type') || '';
	const localPath = computeLocalAssetPath(unwrapped, contentType);
	downloadedAssets.set(unwrapped, localPath);

	const targetFile = path.join(publicDir, localPath.replace(/^\/+/, '').replace(/\//g, path.sep));
	await ensureParent(targetFile);

	if (contentType.includes('text/css')) {
		const cssText = await response.text();
		const rewrittenCss = await rewriteCssUrls(unwrapped, cssText);
		await fs.writeFile(targetFile, rewrittenCss, 'utf8');
	} else {
		const buffer = Buffer.from(await response.arrayBuffer());
		await fs.writeFile(targetFile, buffer);
	}

	return localPath;
}

async function rewriteSrcset(value, pageUrl) {
	const rewritten = [];
	for (const part of value.split(',').map((entry) => entry.trim()).filter(Boolean)) {
		const [candidateUrl, ...descriptorParts] = part.split(/\s+/);
		const descriptor = descriptorParts.join(' ');
		const localPath = await mirrorAsset(candidateUrl, pageUrl);
		rewritten.push([localPath, descriptor].filter(Boolean).join(' '));
	}
	return rewritten.join(', ');
}

async function rewriteStyleAttribute(value, pageUrl) {
	const pattern = /url\(([^)]+)\)/g;
	const matches = Array.from(value.matchAll(pattern));
	let rewritten = value;

	for (const match of matches) {
		const rawToken = match[1].trim().replace(/^['"]|['"]$/g, '');
		if (!rawToken || rawToken.startsWith('data:') || rawToken.startsWith('#')) {
			continue;
		}
		const localPath = await mirrorAsset(rawToken, pageUrl);
		rewritten = rewritten.replace(match[0], `url("${localPath}")`);
	}

	return rewritten;
}

function rewriteInternalLink(rawHref) {
	if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
		return rawHref;
	}

	const resolved = resolveUrl(rawHref, ORIGIN);
	if (!resolved) {
		return rawHref;
	}

	const parsed = new URL(resolved);
	if (parsed.origin !== ORIGIN) {
		return resolved;
	}

	const routePath = canonicalRoute(parsed.pathname);
	if (mirroredPages.has(routePath)) {
		const search = parsed.search || '';
		const hash = parsed.hash || '';
		return routePath === '/' ? `/${search}${hash}` : `${routePath}${search}${hash}`;
	}

	return parsed.toString();
}

async function transformPage(routePath) {
	const html = await fetchHtml(routePath);
	await writeText(path.join(snapshotsOriginalDir, snapshotFsPath(routePath)), html);

	const $ = load(html, { decodeEntities: false });
	const pageUrl = formatPathWithOrigin(routePath);

	$('script').remove();
	$('next-route-announcer').remove();
	$('link[rel="preload"][as="script"]').remove();
	$('link[rel="preload"][as="image"]').remove();
	$('link[rel="preload"][href*="googletagmanager"]').remove();
	$('link[rel="preconnect"], link[rel="dns-prefetch"]').remove();

	$('link[href]').each((_, element) => {
		const link = $(element);
		if (link.attr('rel') === 'preload' && link.attr('as') === 'style') {
			link.attr('rel', 'stylesheet');
			link.removeAttr('as');
			link.removeAttr('fetchpriority');
		}
	});

	for (const element of $('link[href]').toArray()) {
		const link = $(element);
		const rel = (link.attr('rel') || '').toLowerCase();
		const href = link.attr('href') || '';
		const as = (link.attr('as') || '').toLowerCase();

		if (!href) {
			continue;
		}

		if (
			rel.includes('stylesheet') ||
			rel.includes('icon') ||
			rel.includes('manifest') ||
			(rel.includes('preload') && as === 'font')
		) {
			link.attr('href', await mirrorAsset(href, pageUrl));
		}
	}

	const assetSelectors = [
		['img[src]', 'src'],
		['source[src]', 'src'],
		['video[src]', 'src'],
		['audio[src]', 'src'],
		['video[poster]', 'poster'],
		['input[type="image"][src]', 'src'],
	];

	for (const [selector, attribute] of assetSelectors) {
		for (const element of $(selector).toArray()) {
			const node = $(element);
			const value = node.attr(attribute);
			if (value) {
				node.attr(attribute, await mirrorAsset(value, pageUrl));
			}
		}
	}

	for (const selector of ['img[srcset]', 'source[srcset]']) {
		for (const element of $(selector).toArray()) {
			const node = $(element);
			const value = node.attr('srcset');
			if (value) {
				node.attr('srcset', await rewriteSrcset(value, pageUrl));
			}
		}
	}

	for (const element of $('[style]').toArray()) {
		const node = $(element);
		const value = node.attr('style');
		if (value && value.includes('url(')) {
			node.attr('style', await rewriteStyleAttribute(value, pageUrl));
		}
	}

	for (const element of $('a[href]').toArray()) {
		const anchor = $(element);
		anchor.attr('href', rewriteInternalLink(anchor.attr('href') || ''));
	}

	for (const element of $('form[action]').toArray()) {
		const form = $(element);
		const action = form.attr('action') || '';
		if (action) {
			form.attr('action', rewriteInternalLink(action));
		}
	}

	$('body').append('<script src="/local-enhancements.js" defer></script>');

	return $.html();
}

async function clearMirroredPublic() {
	await fs.rm(publicDir, { recursive: true, force: true });
	await fs.mkdir(publicDir, { recursive: true });
}

function compactArticleList(items) {
	return items.map((item, index) => `${index + 1}. ${item.href} - ${item.text}`);
}

async function generateDiscovery() {
	const homeHtml = await fetchHtml('/');
	const home$ = load(homeHtml, { decodeEntities: false });
	const articlesHtml = await fetchHtml('/articles');
	const articles$ = load(articlesHtml, { decodeEntities: false });

	const headerLinks = extractHomeHeaderLinks(home$);
	const footerLinks = extractHomeFooterLinks(home$);
	const homeArticles = extractArticleLinks(home$, 4);
	const extraArticles = extractArticleLinks(articles$, 10)
		.filter((item) => !homeArticles.some((homeItem) => homeItem.href === item.href))
		.slice(0, 6);

	const selectedArticles = [...homeArticles, ...extraArticles];
	const firstContourPaths = [...new Set([...headerLinks, ...footerLinks].map((item) => item.href))];

	const pageSummaryPaths = [...new Set([...ROOT_PAGES, ...selectedArticles.map((item) => item.href)])];
	const pageSummaries = [];
	for (const routePath of pageSummaryPaths) {
		const html = await fetchHtml(routePath);
		pageSummaries.push(summarizePage(load(html, { decodeEntities: false }), routePath));
	}

	const discovery = {
		origin: ORIGIN,
		firstContourPaths,
		headerLinks,
		footerLinks,
		selectedArticles,
		pageSummaries,
	};

	await writeJson(path.join(discoveryDir, 'header-links.json'), headerLinks);
	await writeJson(path.join(discoveryDir, 'footer-links.json'), footerLinks);
	await writeJson(path.join(discoveryDir, 'selected-articles.json'), selectedArticles);
	await writeJson(path.join(discoveryDir, 'urls-first-contour.json'), firstContourPaths);
	await writeJson(path.join(discoveryDir, 'page-summaries.json'), pageSummaries);
	await writeJson(path.join(dataDir, 'moldstud-discovery.json'), discovery);

	const pageMap = `# MoldStud Page Map

## Source

- Original site: ${ORIGIN}

## Header Links

${markdownList(headerLinks.map((item) => `${item.text} -> ${item.href}`))}

## Footer Links

${markdownList(footerLinks.map((item) => `${item.text} -> ${item.href}`))}

## First Contour URLs

${markdownList(firstContourPaths)}

## Selected Blog Samples

${markdownList(compactArticleList(selectedArticles))}

## Template Map

${markdownList(
	pageSummaries.map(
		(summary) =>
			`${summary.path}: ${summary.template} | title="${summary.title}" | h1="${summary.h1}" | sections=${summary.sections} | articles=${summary.articles} | forms=${summary.forms}`,
	),
)}
`;

	await writeText(path.join(discoveryDir, 'page-map.md'), pageMap);
	return discovery;
}

async function mirrorSite(discovery) {
	const pagePaths = [...new Set([...ROOT_PAGES, ...discovery.selectedArticles.map((item) => item.href)])];
	pagePaths.forEach((routePath) => mirroredPages.add(canonicalRoute(routePath)));

	await clearMirroredPublic();
	await writeText(path.join(publicDir, 'local-enhancements.js'), `${LOCAL_ENHANCEMENTS}\n`);

	for (const routePath of pagePaths) {
		const transformedHtml = await transformPage(routePath);
		await writeText(path.join(publicDir, pageFsPath(routePath)), transformedHtml);
	}

	await writeJson(
		path.join(dataDir, 'mirrored-pages.json'),
		pagePaths.map((routePath) => ({
			path: routePath,
			file: pageFsPath(routePath).replace(/\\/g, '/'),
		})),
	);
}

async function main() {
	const discovery = await generateDiscovery();
	await mirrorSite(discovery);
	console.log(`Mirrored ${ROOT_PAGES.length + discovery.selectedArticles.length} pages from ${ORIGIN}`);
	console.log(`Assets downloaded: ${downloadedAssets.size}`);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
