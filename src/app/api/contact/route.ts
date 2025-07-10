import { NextRequest, NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DEST_EMAIL = 'mtgmodsofficial@gmail.com';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export async function POST(request: NextRequest) {
  if (!RESEND_API_KEY) {
    return NextResponse.json({ message: 'Server misconfiguration: RESEND_API_KEY not set.' }, { status: 500 });
  }
  if (!RECAPTCHA_SECRET_KEY) {
    return NextResponse.json({ message: 'Server misconfiguration: RECAPTCHA_SECRET_KEY not set.' }, { status: 500 });
  }
  try {
    const body = await request.json();
    const { name, email, subject, message, recaptchaToken } = body;

    if (!name || !email || !subject || !message || !recaptchaToken) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Verify reCAPTCHA
    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });
    const recaptchaData = await recaptchaRes.json();
    if (!recaptchaData.success) {
      return NextResponse.json({ message: 'Failed CAPTCHA verification.' }, { status: 400 });
    }

    // Send email via Resend API
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Contact Form <onboarding@resend.dev>',
        to: [DEST_EMAIL],
        subject: `[Contact Form] ${subject}`,
        reply_to: email,
        html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>`
      })
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: String(error) }, { status: 500 });
  }
} 