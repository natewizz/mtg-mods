import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }
    
    // Check if username already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });
    
    return NextResponse.json({ available: !existingUser });
  } catch (error) {
    console.error("Error checking username availability:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
} 