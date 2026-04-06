import {stackServerApp} from '@/modules/stack/server';
import {jwtVerify, SignJWT} from 'jose';
import {NextRequest, NextResponse} from 'next/server';

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard/api')) {
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token || token.length === 0) {
      const t = await new SignJWT()
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setIssuer('urn:moldstud:issuer')
        .setAudience('urn:moldstud:audience')
        .sign(new TextEncoder().encode(process.env.JWT_SECRET || 'SECRET_KEY'));

      return NextResponse.json({
        status: 401,
        type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401',
        title: 'Unauthorized',
        t,
      });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'SECRET_KEY');

    try {
      await jwtVerify(token, secret, {
        issuer: 'urn:moldstud:issuer',
        audience: 'urn:moldstud:audience',
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.json({
        status: 401,
        type: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401',
        title: 'Unauthorized',
      });
    }

    return NextResponse.next({request});
  }

  const user = await stackServerApp.getUser();

  if (!user) {
    return NextResponse.redirect(new URL(stackServerApp.urls.signIn, request.url));
  }

  return NextResponse.next({request});
}

export const config = {
  matcher: [
    '/dashboard/:path*',
  ],
};
