import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { token, password } = body;

    // 1. Validation
    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    if (password.length > 72) {
      return NextResponse.json({ error: 'Password is too long (maximum 72 characters)' }, { status: 400 });
    }

    // 2. Hash raw token to match database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // 3. Find reset token record
    const record = await prisma.passwordResetToken.findUnique({
      where: { token: hashedToken }
    });

    if (!record) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // 4. Check expiration
    if (record.expires < new Date()) {
      // Clean up expired token
      await prisma.passwordResetToken.delete({
        where: { token: hashedToken }
      }).catch(() => {});
      
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }

    // 5. Find corresponding user
    const user = await prisma.user.findUnique({
      where: { email: record.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 6. Hash new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 7. Atomic transaction updates password, increments session version, and deletes token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash,
          passwordVersion: { increment: 1 }
        }
      }),
      prisma.passwordResetToken.delete({
        where: { token: hashedToken }
      })
    ]);

    return NextResponse.json({
      message: 'Password reset successful! You can now log in.'
    });

  } catch (error) {
    console.error('Reset password API error:', error);
    return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
  }
}
