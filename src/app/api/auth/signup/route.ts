import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { z } from "zod";

// Define validation schema
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  favoriteDeck: z.string().optional(),
  bio: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate input
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten();
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }
    
    const { name, email, username, password, favoriteDeck, bio } = validationResult.data;
    
    // Check if user with email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUserByEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    
    // Check if username is already taken
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });
    
    if (existingUserByUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user with credentials in a transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create the user
      const newUser = await tx.user.create({
        data: {
          name,
          email,
          username,
          favoriteDeck,
          bio,
        },
      });
      
      // Create the credentials record
      await tx.userCredential.create({
        data: {
          userId: newUser.id,
          hashedPassword,
        },
      });
      
      return newUser;
    });
    
    return NextResponse.json({ 
      success: true, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username,
      }
    }, { status: 201 });
    
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 });
  }
} 