import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { v4 as uuidv4 } from 'uuid';

// Define the context type for route handlers
interface RouteContext {
  params: { id: string };
}

export async function PUT(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Await the params promise
    const { id: userIdOrUsername } = context.params;
    
    // Find the user by ID or username
    let userToUpdate = await prisma.user.findUnique({
      where: { id: userIdOrUsername },
    });

    // If not found by ID, try username
    if (!userToUpdate) {
      userToUpdate = await prisma.user.findUnique({
        where: { username: userIdOrUsername },
      });
    }

    if (!userToUpdate) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify the user is only updating their own username
    if (session.user.id !== userToUpdate.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return NextResponse.json(
        { error: "Username can only contain letters, numbers, underscores, and hyphens" },
        { status: 400 }
      );
    }

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existingUser && existingUser.id !== userToUpdate.id) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 });
    }

    try {
      // Update the username
      const previousUsername = userToUpdate.username;
      
      // Update the username
      await prisma.user.update({
        where: { id: userToUpdate.id },
        data: { username },
      });
      
      // Update or insert UsernameChange record
      await prisma.$executeRaw`
        INSERT INTO UsernameChange (id, userId, previousValue, newValue, changedAt) 
        VALUES (${uuidv4()}, ${userToUpdate.id}, ${previousUsername}, ${username}, NOW())
        ON DUPLICATE KEY UPDATE 
          previousValue = ${previousUsername},
          newValue = ${username},
          changedAt = NOW()
      `;
      
      // Get the updated user data
      const updatedUser = await prisma.user.findUnique({
        where: { id: userToUpdate.id },
        select: {
          id: true,
          username: true,
          name: true,
          email: true,
        },
      });
      
      return NextResponse.json({
        message: "Username updated successfully",
        user: updatedUser,
      });
    } catch (transactionError) {
      console.error("Transaction error:", transactionError);
      return NextResponse.json({ error: "Failed to update username" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error updating username:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
} 