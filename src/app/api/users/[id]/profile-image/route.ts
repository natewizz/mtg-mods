import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// POST /api/users/[id]/profile-image - Upload profile image
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Await the params promise
    const { id: userId } = await params;
    
    // User can only update their own profile image
    if (session.user.id !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const formData = await req.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }
    
    // Validate file type
    const fileType = file.type;
    if (!['image/jpeg', 'image/png'].includes(fileType)) {
      return NextResponse.json({ error: 'Only JPG and PNG images are allowed' }, { status: 400 });
    }
    
    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Image size must be less than 2MB' }, { status: 400 });
    }
    
    // Generate a unique filename
    const fileExtension = fileType === 'image/jpeg' ? '.jpg' : '.png';
    const fileName = `${uuidv4()}${fileExtension}`;
    
    // Create directory if it doesn't exist
    const publicDir = join(process.cwd(), 'public');
    const uploadsDir = join(publicDir, 'uploads');
    const profileImagesDir = join(uploadsDir, 'profile-images');
    
    try {
      await writeFile(join(profileImagesDir, fileName), Buffer.from(await file.arrayBuffer()));
    } catch (error) {
      console.error('Error writing file:', error);
      return NextResponse.json({ error: 'Failed to save image' }, { status: 500 });
    }
    
    // Update the user's profile with the new image URL
    const imageUrl = `/uploads/profile-images/${fileName}`;
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        favoriteDeck: true,
        bio: true,
      },
    });
    
    return NextResponse.json({ 
      message: 'Profile image updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error uploading profile image:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
} 