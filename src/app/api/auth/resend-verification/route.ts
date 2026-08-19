import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Find user
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    // Generic success response if user does not exist or is already verified (prevents account enumeration)
    if (!user || user.isVerified) {
      return NextResponse.json({
        message: 'If the email is registered and unverified, a verification email has been sent.'
      });
    }

    // 2. Cooldown check (60 seconds)
    const existingTokens = await prisma.verificationToken.findMany({
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
          error: `Please wait ${remainingSeconds} seconds before requesting another verification email.`
        }, { status: 429 });
      }
    }

    // 3. Delete previous verification tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { email: normalizedEmail }
    });

    // 4. Generate new token
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 5. Save new token
    const newRecord = await prisma.verificationToken.create({
      data: {
        email: normalizedEmail,
        token: hashedToken,
        expires
      }
    });

    // 6. Send verification email
    const emailSent = await sendVerificationEmail(normalizedEmail, token);
    if (!emailSent) {
      // Rollback the token record on delivery failure
      await prisma.verificationToken.delete({
        where: { id: newRecord.id }
      }).catch(() => {});

      return NextResponse.json({
        error: 'Failed to send verification email. Please try again later.'
      }, { status: 500 });
    }

    return NextResponse.json({
      message: 'If the email is registered and unverified, a verification email has been sent.'
    });

  } catch (error) {
    console.error('Resend verification API error:', error);
    return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
  }
}
