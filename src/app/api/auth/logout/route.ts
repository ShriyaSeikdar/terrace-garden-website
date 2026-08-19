import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ message: 'Logout successful' });
    
    response.cookies.set('tg-session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(0)
    });

    return response;
  } catch (error) {
    console.error('Logout API error:', error);
    return NextResponse.json({ error: 'Internal server error occurred' }, { status: 500 });
  }
}
