import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { z } from "zod";

// Define validation schema
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    
    // Validate input
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten();
      console.log("Validation failed:", errors);
      return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
    }
    
    const { name, email, password } = validationResult.data;
    console.log(`Processing signup for email: ${email}`);
    
    // Check if user with email already exists
    try {
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
      });
      
      if (existingUserByEmail) {
        return NextResponse.json({ error: "Email already registered" }, { status: 400 });
      }
    } catch (e) {
      console.error("Error checking existing user:", e);
      return NextResponse.json({ error: "Database error while checking email" }, { status: 500 });
    }
    
    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      console.error("Error hashing password:", e);
      return NextResponse.json({ error: "Failed to process password" }, { status: 500 });
    }
    
    // Create user with credentials in a transaction
    try {
      // Generate a random username based on the email
      const username = `user_${Math.random().toString(36).substring(2, 10)}`;
      
      const user = await prisma.$transaction(async (tx) => {
        console.log("Creating user with username:", username);
        
        // Create the user
        const newUser = await tx.user.create({
          data: {
            name,
            email,
            username, // Still need username in the database
          },
        });
        
        console.log("User created with ID:", newUser.id);
        
        // Create the credentials record
        await tx.userCredential.create({
          data: {
            userId: newUser.id,
            hashedPassword,
          },
        });
        
        console.log("User credentials created");
        
        return newUser;
      });
      
      return NextResponse.json({ 
        success: true, 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }, { status: 201 });
    } catch (error) {
      console.error("Transaction error details:", error);
      return NextResponse.json({ 
        error: error instanceof Error ? error.message : "Database error during user creation" 
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error("Unexpected signup error:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : "An error occurred during registration" 
    }, { status: 500 });
  }
} 