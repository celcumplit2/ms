import {BASE_URL} from '@/config';
import {Sitemap, Url} from '@/helpers/sitemap/sitemap';

export async function GET() {
  const sitemap = new Sitemap();
  const urls: Url[] = [
    {
      url: 'https://moldstud.com',
      lastModified: new Date(2024, 6, 26, 8),
    },
    {
      url: new URL('/services', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 26, 8),
    },
    {
      url: new URL('/services/desktop-app-development', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 29, 8),
    },
    {
      url: new URL('/industries', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 29, 8),
    },
    {
      url: new URL('/solutions', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 29, 8),
    },
    {
      url: new URL('/technologies', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 29, 8),
    },
    {
      url: new URL('/about-us', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 29, 8),
    },
    {
      url: new URL('/contacts', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 26, 8),
    },
    {
      url: new URL('/hire-us', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 26, 8),
    },
    {
      url: new URL('/privacy-policy', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 29, 8),
    },
    {
      url: new URL('/cookie-policy', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 29, 8),
    },
    {
      url: new URL('/terms-and-conditions', BASE_URL).toString(),
      lastModified: new Date(2024, 6, 29, 8),
    },
  ];

  urls.forEach((url) => {
    sitemap.addUrl({
      url: url.url,
      lastModified: url.lastModified,
      changeFrequency: url.changeFrequency ?? 'monthly',
    });
  });

  return new Response(sitemap.toString(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
