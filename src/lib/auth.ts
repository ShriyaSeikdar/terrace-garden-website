import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback-secret-for-dev-only-change-in-prod'
);

export async function signJWT(payload: { userId: string; passwordVersion: number }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifyJWT(token: string): Promise<{ userId: string; passwordVersion: number } | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as { userId: string; passwordVersion: number };
  } catch (error) {
    return null;
  }
}

export async function getSessionUser(request?: Request): Promise<{ userId: string; passwordVersion: number } | null> {
  let token: string | undefined;

  // 1. Try to get token from request cookies (useful in middleware or standard request contexts)
  if (request) {
    // Next.js Request can have request.cookies
    if ('cookies' in request && typeof (request as any).cookies.get === 'function') {
      token = (request as any).cookies.get('tg-session')?.value;
    }
    
    // Fallback to parsing headers
    if (!token) {
      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        const match = cookieHeader.match(/(?:^|;)\s*tg-session=([^;]+)/);
        if (match) {
          token = match[1];
        }
      }
    }
  }

  // 2. Try to get token from next/headers cookies if not found in request
  if (!token) {
    try {
      const cookieStore = await cookies();
      token = cookieStore.get('tg-session')?.value;
    } catch (e) {
      // next/headers cookies() might fail if not called within a request context
    }
  }

  if (!token) {
    return null;
  }

  return verifyJWT(token);
}
