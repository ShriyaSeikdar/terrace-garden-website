import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getSessionUser(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    // Database lookup to verify user still exists and get latest status/role
    const user = await prisma.user.findUnique({
      where: { id: session.userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'User no longer exists' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error('Me API error:', error);
    return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
  }
}
