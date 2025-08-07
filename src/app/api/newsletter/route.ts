import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSignup = await prisma.waitlistSignup.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (existingSignup) {
      return NextResponse.json(
        { message: 'You are already subscribed to our newsletter!' },
        { status: 200 }
      );
    }

    // Store the email in the database
    await prisma.waitlistSignup.create({
      data: {
        email: email.toLowerCase(),
        source: 'newsletter',
        notes: 'Newsletter subscription from footer'
      }
    });

    return NextResponse.json(
      { message: 'Successfully subscribed to our newsletter!' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
} 