import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

// Initialize a new PrismaClient instance
const prisma = new PrismaClient();

// This would typically be in a separate email service module
async function sendPasswordResetEmail(email: string, token: string) {
  console.log(`[DEV ONLY] Password reset link for ${email}: 
    ${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}
  `);
  
  // In production, you would use a proper email service like:
  // await sendEmail({
  //   to: email,
  //   subject: 'Reset your password',
  //   text: `Click the link to reset your password: ${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`,
  //   html: `<p>Click <a href="${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}">here</a> to reset your password.</p>`,
  // });
  
  // For now, we'll just log the token and pretend we sent an email
  return true;
}

// POST /api/auth/reset-password
// Request password reset
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    // Look up the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    // Generate a reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // Token expires in 1 hour
    
    try {
      // Store the token in the database, even if user doesn't exist
      // This prevents user enumeration attacks
      await prisma.$queryRaw`
        INSERT INTO PasswordReset (id, email, token, expires, createdAt)
        VALUES (${crypto.randomUUID()}, ${email}, ${token}, ${expires}, ${new Date()})
      `;
      
      // Only send the email if the user exists
      if (user) {
        await sendPasswordResetEmail(email, token);
      }
      
      // Always return success for security reasons
      // This prevents attackers from determining which emails are registered
      return NextResponse.json({
        message: 'If an account with that email exists, a password reset link has been sent.'
      });
    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database error occurred' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error requesting password reset:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

// GET /api/auth/reset-password
// Verify reset token
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }
    
    const resetRecords = await prisma.$queryRaw<Array<{ id: string, email: string, expires: Date }>>`
      SELECT id, email, expires FROM PasswordReset WHERE token = ${token}
    `;
    
    if (!resetRecords || resetRecords.length === 0) {
      return NextResponse.json({ valid: false, error: 'Invalid token' });
    }
    
    const resetRecord = resetRecords[0];
    
    if (resetRecord.expires < new Date()) {
      return NextResponse.json({ valid: false, error: 'Token has expired' });
    }
    
    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error('Error verifying reset token:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
} 