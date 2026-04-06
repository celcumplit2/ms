import type {NextConfig} from 'next';

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
    return [
      {
        source: '/articles/:alias.xml',
        destination: '/articles/sitemap/:alias',
      },
    ];
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
