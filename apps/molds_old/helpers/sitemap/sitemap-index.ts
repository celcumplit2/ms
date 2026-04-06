export class SitemapIndex {
  #sitemaps: URL[] = [];

  addSitemap = (url: URL) => {
    this.#sitemaps.push(url);
  };

  toString() {
    // language=XML
    const sitemaps = this.#sitemaps.map((url) => `
      <sitemap>
        <loc>${url}</loc>
      </sitemap>`);

    // language=XML
    return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemaps.join('')}
    </sitemapindex>`;
  }
}
