import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Cooldown check (60 seconds) - must be checked BEFORE deleting any records
    const existingTokens = await prisma.passwordResetToken.findMany({
      where: { email: normalizedEmail },
      orderBy: { createdAt: 'desc' },
      take: 1
    });

    if (existingTokens.length > 0) {
      const latestToken = existingTokens[0];
      const elapsedMs = Date.now() - latestToken.createdAt.getTime();
      const cooldownMs = 60 * 1000;

      if (elapsedMs < cooldownMs) {
        const remainingSeconds = Math.ceil((cooldownMs - elapsedMs) / 1000);
        return NextResponse.json({
          error: `Please wait ${remainingSeconds} seconds before requesting another password reset email.`
        }, { status: 429 });
      }
    }

    // 2. Cooldown passed, delete previous reset tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: normalizedEmail }
    });

    // 3. Generate secure token & hash it
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // 4. Store hashed token in DB for BOTH existing and non-existing users
    const newRecord = await prisma.passwordResetToken.create({
      data: {
        email: normalizedEmail,
        token: hashedToken,
        expires
      }
    });

    // 5. Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    // Prevent account enumeration: return same success message if user doesn't exist
    if (!user) {
      return NextResponse.json({
        message: "If an account exists for this email, we've sent a password reset link."
      });
    }

    // 6. Send the reset email
    const emailSent = await sendPasswordResetEmail(normalizedEmail, token);
    if (!emailSent) {
      // Rollback database token on failure
      await prisma.passwordResetToken.delete({
        where: { id: newRecord.id }
      }).catch(() => {});

      return NextResponse.json({
        error: 'Failed to send password reset email. Please try again later.'
      }, { status: 500 });
    }

    return NextResponse.json({
      message: "If an account exists for this email, we've sent a password reset link."
    });

  } catch (error) {
    console.error('Forgot password API error:', error);
    return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
  }
}
