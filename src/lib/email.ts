import { Resend } from 'resend';

let resendInstance: Resend | null = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_placeholder') {
    console.warn('WARNING: RESEND_API_KEY is not configured. Real email delivery will be skipped.');
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

export async function sendVerificationEmail(email: string, token: string): Promise<boolean> {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const verificationUrl = `${appUrl}/verify-email?token=${token}`;

  const resend = getResend();
  const subject = 'Verify your TerraceGarden Account';
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Verify your TerraceGarden Account</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #fcfbf7;
      color: #1f2937;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 40px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }
    .logo {
      font-family: Cormorant Garamond, Georgia, serif;
      font-size: 28px;
      font-weight: 700;
      color: #1b4d22;
      text-align: center;
      margin-bottom: 30px;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
      text-align: center;
    }
    .text {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
      color: #4b5563;
    }
    .btn-container {
      text-align: center;
      margin-bottom: 30px;
    }
    .btn {
      display: inline-block;
      background-color: #1b4d22;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 30px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 16px;
      transition: background-color 0.2s;
    }
    .btn:hover {
      background-color: #143e1b;
    }
    .footer {
      font-size: 13px;
      color: #9ca3af;
      text-align: center;
      border-top: 1px solid #f3f4f6;
      padding-top: 20px;
      margin-top: 20px;
    }
    .link-fallback {
      word-break: break-all;
      font-size: 14px;
      color: #1b4d22;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">Terrace<span style="color: #cda250;">Garden</span></div>
    <div class="title">Verify Your Email Address</div>
    <div class="text">
      Thank you for registering an account with TerraceGarden. To access your profile, wishlists, and orders, please verify your email address by clicking the button below. This link is valid for 24 hours.
    </div>
    <div class="btn-container">
      <a href="${verificationUrl}" class="btn" target="_blank">Verify Email</a>
    </div>
    <div class="text" style="font-size: 14px; color: #6b7280; margin-top: 40px;">
      If you did not create an account, please ignore this email.
      <br><br>
      If the button doesn't work, copy and paste this URL into your browser:
      <br>
      <span class="link-fallback">${verificationUrl}</span>
    </div>
    <div class="footer">
      &copy; 2026 TerraceGarden. All rights reserved.
    </div>
  </div>
</body>
</html>
  `;

  if (!resend) {
    console.log('--- LOCAL EMULATED EMAIL ---');
    console.log(`To: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Verification Link: ${verificationUrl}`);
    console.log('----------------------------');
    return true;
  }

  try {
    const data = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: subject,
      html: htmlBody,
    });

    if (data.error) {
      console.error('Resend delivery error:', data.error);
      return false;
    }

    console.log(`Successfully sent verification email to ${email}. Message ID: ${data.data?.id}`);
    return true;
  } catch (error) {
    console.error('Resend delivery exception:', error);
    return false;
  }
}
