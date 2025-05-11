import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Initialize a new PrismaClient instance
const prisma = new PrismaClient();

// POST /api/auth/reset-password/reset
// Reset password with token
export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    
    if (!token || !password) {
      return NextResponse.json({ error: 'Token and password are required' }, { status: 400 });
    }
    
    // Validate password
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }
    
    // Find the reset record
    const resetRecords = await prisma.$queryRaw<Array<{ id: string, email: string, expires: Date }>>`
      SELECT id, email, expires FROM PasswordReset WHERE token = ${token}
    `;
    
    if (!resetRecords || resetRecords.length === 0) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }
    
    const resetRecord = resetRecords[0];
    
    if (resetRecord.expires < new Date()) {
      return NextResponse.json({ error: 'Token has expired' }, { status: 400 });
    }
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: resetRecord.email },
      include: { credentials: true },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Update the user's password
    if (user.credentials) {
      // Update existing credentials
      await prisma.userCredential.update({
        where: { userId: user.id },
        data: { hashedPassword },
      });
    } else {
      // Create new credentials
      await prisma.userCredential.create({
        data: {
          userId: user.id,
          hashedPassword,
        },
      });
    }
    
    // Delete the reset record
    await prisma.$executeRaw`DELETE FROM PasswordReset WHERE id = ${resetRecord.id}`;
    
    return NextResponse.json({
      message: 'Password reset successful',
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
} 