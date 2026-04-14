import type {NextConfig} from 'next';

const molds2Origin = (process.env.MOLDS2_ORIGIN || 'http://127.0.0.1:4321').replace(/\/$/, '');

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 240,
  typedRoutes: true,
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'moldstud.com',
      },
    ],
  },
  async rewrites() {
    const molds2PageRoutes = [
      '/',
      '/about-us',
      '/contacts',
      '/privacy-policy',
      '/terms-and-conditions',
      '/cookie-policy',
      '/services',
      '/services/:path*',
      '/industries',
      '/industries/:path*',
      '/solutions',
      '/solutions/:path*',
      '/technologies',
      '/technologies/:path*',
      '/careers',
      '/careers/:path*',
      '/case-studies',
      '/case-studies/:path*',
      '/profiles/:path*',
      '/hire-us',
      '/request-profiles',
      '/talents/:path*',
    ];

    return {
      beforeFiles: [
        {source: '/@vite/client', destination: `${molds2Origin}/@vite/client`},
        {source: '/@id/:path*', destination: `${molds2Origin}/@id/:path*`},
        {source: '/@fs/:path*', destination: `${molds2Origin}/@fs/:path*`},
        {source: '/src/:path*', destination: `${molds2Origin}/src/:path*`},
        {source: '/_astro/:path*', destination: `${molds2Origin}/_astro/:path*`},
        {source: '/node_modules/:path*', destination: `${molds2Origin}/node_modules/:path*`},
        {source: '/images/optimized/:path*', destination: `${molds2Origin}/images/optimized/:path*`},
        {source: '/mirror-assets/:path*', destination: `${molds2Origin}/mirror-assets/:path*`},
        {source: '/uploads/:path*', destination: `${molds2Origin}/uploads/:path*`},
        {source: '/local-enhancements.js', destination: `${molds2Origin}/local-enhancements.js`},
        ...molds2PageRoutes.map((source) => ({
          source,
          destination: `${molds2Origin}${source}`,
        })),
      ],
      afterFiles: [
        {
          source: '/articles/:alias.xml',
          destination: '/articles/sitemap/:alias',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
