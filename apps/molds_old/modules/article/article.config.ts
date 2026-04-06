export function getArticleImage({src, width, height}: { src: string, width?: number; height?: number; }): string {
  if (/^https?:\/\//i.test(src) || src.startsWith('/')) {
    return src;
  }

  let url = `https://moldstud.com/uploads/images/${src}`;

  if (width && height) {
    url = `${url}?w=${width}&h=${height}`;
  }

  return url;
}


export const RECOMMENDED_ARTICLE_LINKS = [
  'software-development-services-for-startups',
  // 'enterprise-product-engineering-services-for-product-development',
  'team-extension-services-the-key-to-building-scalable-development-teams',
  'how-to-hire-remote-laravel-developers',
];
