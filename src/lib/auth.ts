import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const secretKey = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'fallback-secret-for-dev-only-change-in-prod'
);

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  isVerified: boolean;
}

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
  } catch {
    return null;
  }
}

export async function getSessionUser(request?: Request): Promise<{ userId: string; passwordVersion: number } | null> {
  let token: string | undefined;

  // 1. Try to get token from request cookies (useful in middleware or standard request contexts)
  if (request) {
    const reqWithCookies = request as Request & { cookies?: { get?: (name: string) => { value?: string } | undefined } };
    if (reqWithCookies.cookies && typeof reqWithCookies.cookies.get === 'function') {
      token = reqWithCookies.cookies.get('tg-session')?.value;
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
    } catch {
      // next/headers cookies() might fail if not called within a request context
    }
  }

  if (!token) {
    return null;
  }

  return verifyJWT(token);
}

export async function getAuthenticatedUser(request?: Request): Promise<AuthenticatedUser | null> {
  const session = await getSessionUser(request);
  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  if (!user || user.passwordVersion !== session.passwordVersion) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified
  };
}

export async function requireAdmin(
  request?: Request
): Promise<{ user: AuthenticatedUser; response: null } | { user: null; response: NextResponse }> {
  const session = await getSessionUser(request);
  if (!session) {
    return {
      user: null,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId }
  });

  if (!user || user.passwordVersion !== session.passwordVersion) {
    return {
      user: null,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    };
  }

  if (user.role !== 'ADMIN') {
    return {
      user: null,
      response: NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    };
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    },
    response: null
  };
}
