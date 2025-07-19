import { NextResponse } from 'next/server';
import { getRandomRecipe } from '@/lib/recipe-actions';

export async function GET() {
  try {
    const randomRecipe = await getRandomRecipe();
    
    if (!randomRecipe) {
      return NextResponse.json(
        { message: 'No recipes found' },
        { status: 404 }
      );
    }

    return NextResponse.json(randomRecipe);
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching a random recipe' },
      { status: 500 }
    );
  }
} 