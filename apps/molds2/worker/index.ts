export interface Env {
  ASSETS: Fetcher;
  MEDIA_BUCKET: R2Bucket;
  COMMENTS_DB: D1Database;
  APP_ENV: string;
  ROOT_DOMAIN: string;
  SITE_HOST: string;
  IMAGE_HOST: string;
  API_HOST: string;
}

function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...init.headers,
    },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      return json(
        {
          ok: true,
          env: env.APP_ENV,
          siteHost: env.SITE_HOST,
          imageHost: env.IMAGE_HOST,
          apiHost: env.API_HOST,
        },
        {
          headers: {
            'cache-control': 'no-store',
          },
        },
      );
    }

    if (url.pathname.startsWith('/api/')) {
      return json(
        {
          ok: false,
          message: 'API routes are not implemented yet.',
        },
        {
          status: 501,
          headers: {
            'cache-control': 'no-store',
          },
        },
      );
    }

    return env.ASSETS.fetch(request);
  },
};
