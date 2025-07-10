import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'profile-images';

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
    const { id: userIdOrUsername } = await params;
    let userToUpdate = await prisma.user.findUnique({ where: { id: userIdOrUsername } });
    if (!userToUpdate) {
      userToUpdate = await prisma.user.findUnique({ where: { username: userIdOrUsername } });
    }
    if (!userToUpdate) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (session.user.id !== userToUpdate.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const formData = await req.formData();
    const file = formData.get('image') as File;
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }
    const fileType = file.type;
    if (!['image/jpeg', 'image/png'].includes(fileType)) {
      return NextResponse.json({ error: 'Only JPG and PNG images are allowed' }, { status: 400 });
    }
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Image size must be less than 2MB' }, { status: 400 });
    }
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: 'Supabase not configured' }, { status: 500 });
    }
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const fileExtension = fileType === 'image/jpeg' ? '.jpg' : '.png';
    const fileName = `${userToUpdate.id}-${Date.now()}${fileExtension}`;
    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .upload(fileName, await file.arrayBuffer(), {
        contentType: fileType,
        upsert: true,
      });
    if (error) {
      console.error('Supabase upload error:', error);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .getPublicUrl(fileName);
    const imageUrl = publicUrlData?.publicUrl;
    if (!imageUrl) {
      return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 });
    }
    // Update the user's profile with the new image URL
    const updatedUser = await prisma.user.update({
      where: { id: userToUpdate.id },
      data: { image: imageUrl },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
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