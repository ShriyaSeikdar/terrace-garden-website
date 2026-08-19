import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { token } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // 1. Hash the token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // 2. Find verification token record
    const record = await prisma.verificationToken.findUnique({
      where: { token: hashedToken }
    });

    if (!record) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // 3. Check expiration
    if (record.expires < new Date()) {
      // Clean up the expired token
      await prisma.verificationToken.delete({
        where: { token: hashedToken }
      }).catch(() => {});
      
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    // 4. Find corresponding user
    const user = await prisma.user.findUnique({
      where: { email: record.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 5. Update user state to verified
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        emailVerified: new Date()
      }
    });

    // 6. Delete used token to ensure single-use
    await prisma.verificationToken.delete({
      where: { token: hashedToken }
    });

    return NextResponse.json({
      message: 'Email verified successfully! You can now log in.'
    });

  } catch (error) {
    console.error('Verify API error:', error);
    return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
  }
}
