import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, password } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (name.length > 50) {
      return NextResponse.json({ error: 'Name is too long (maximum 50 characters)' }, { status: 400 });
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    if (normalizedEmail.length > 100) {
      return NextResponse.json({ error: 'Email is too long (maximum 100 characters)' }, { status: 400 });
    }

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }
    if (password.length > 72) {
      // bcrypt has a maximum input length of 72 bytes
      return NextResponse.json({ error: 'Password is too long (maximum 72 characters)' }, { status: 400 });
    }

    // 2. Check for duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: 'USER',
        isVerified: false
      }
    });

    // 5. Safe response
    return NextResponse.json({
      message: 'Registration successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
  }
}
