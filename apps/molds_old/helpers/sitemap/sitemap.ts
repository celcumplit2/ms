import {type MetadataRoute} from 'next';

interface News {
  publicationName: string;
  publicationLanguage: string;
  publicationDate: Date;
  title: string;
}

export type Url = MetadataRoute.Sitemap[number] & { news?: News };

export class Sitemap {
  #urls: Url[] = [];

  addUrl = (url: Url) => {
    this.#urls.push(url);
  };

  toString() {
    // language=XML
    const urls = this.#urls.map((url: Url) => `
      <url>
        <loc>${url.url}</loc>
        <changefreq>${url.changeFrequency}</changefreq>
        ${this.#getLastModified(url)}
        ${this.#getAlternates(url)}
        ${this.#getImages(url)}
        ${this.#getVideos(url)}
        ${this.#getNews(url)}
      </url>`);

    // language=XML
    return `
      <urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      >
        ${urls.join('')}
      </urlset>`;
  }

  #getLastModified(url: Url): string {
    if (!url.lastModified) {
      return '';
    }

    const lastModified = url.lastModified instanceof Date ? url.lastModified.toISOString() : url.lastModified;

    // language=XML
    return `
      <lastmod>${lastModified}</lastmod>`;
  }

  #getAlternates(url: Url): string {
    const languages: Record<string, string | undefined> = url.alternates?.languages ?? {};
    // language=XML
    const links = Object.keys(languages).map((language) => `
      <xhtml:link rel="alternate" hreflang="${language}" href="${languages[language]}"/>
    `);

    return links.join('');
  }

  #getImages(url: Url): string {
    const images = url.images ?? [];
    // language=XML
    const links = images.map((image) => `
      <image:image>
        <image:loc>${image}</image:loc>
      </image:image>`);

    return links.join('');
  }

  #getVideos(url: Url): string {
    const videos = url.videos ?? [];
    // language=XML
    const links = videos.map((video) => `
      <video:video>
        <video:title>${video.title}</video:title>
        <video:thumbnail_loc>${video.thumbnail_loc}</video:thumbnail_loc>
        <video:description>${video.description}</video:description>
      </video:video>`);

    return links.join('');
  }

  #getNews(url: Url): string {
    return url.news
      // language=XML
      ? `
        <news:news>
          <news:publication>
            <news:name>${url.news.publicationName}</news:name>
            <news:language>${url.news.publicationLanguage}</news:language>
          </news:publication>
          <news:publication_date>${url.news.publicationDate.toISOString()}</news:publication_date>
          <news:title>${url.news.title}</news:title>
        </news:news>
      `
      : '';
  }
}
