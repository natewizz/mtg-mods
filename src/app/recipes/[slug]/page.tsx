import { Suspense } from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { Metadata } from 'next';
import DeleteRecipeButton from '@/components/recipes/DeleteRecipeButton';
import RecipeInteractionsClient from '@/components/recipes/RecipeInteractionsClient';
import TagPill from '@/components/ui/TagPill';
import { CopyLinkButton } from '@/components/CopyLinkButton';

interface RecipeWithRelations {
  id: string;
  title: string;
  slug: string;
  instructions: string;
  attachmentName?: string | null;
  attachmentUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
  };
  tags: Array<{ id: string; name: string }>;
  _count: {
    votes: number;
    tried: number;
  };
}

interface UserInteractions {
  voteValue: number | null;
  isBookmarked: boolean;
  hasTried: boolean;
}

interface Navigation {
  next: string | null;
  prev: string | null;
}

type RecipeData = {
  recipe: RecipeWithRelations;
  userInteractions: UserInteractions | null;
  navigation: Navigation;
} | {
  redirect: string;
} | null;

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { slug },
      include: {
        author: true,
        tags: true,
      },
    });

    if (!recipe) {
      return {
        title: 'Recipe Not Found - MTG Mods',
        description: 'The requested recipe could not be found.',
      };
    }

    // Utility to strip HTML tags from instructions
    function stripHtml(html: string): string {
      if (!html) return '';
      return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    }

    // Generate description from instructions (first 160 chars)
    const description = stripHtml(recipe.instructions).slice(0, 160);
    const authorName = recipe.author.username || recipe.author.name || 'Anonymous';

    return {
      title: `${recipe.title} | MTG Mods`,
      description: description,
      keywords: [
        'Magic the Gathering', 'MTG', 'recipe', recipe.title, 'game mod', 'rule variant', authorName, ...recipe.tags.map(tag => tag.name)
      ],
      alternates: {
        canonical: `https://www.mtgmods.xyz/recipes/${slug}`,
      },
      openGraph: {
        title: recipe.title,
        description: description,
        type: 'article',
        url: `https://www.mtgmods.xyz/recipes/${slug}`,
        siteName: 'MTG Mods',
        images: [
          {
            url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=${encodeURIComponent(recipe.title)}&description=${encodeURIComponent(description)}&type=recipe`,
            width: 1200,
            height: 630,
            alt: recipe.title
          }
        ],
        locale: 'en_US',
      },
      twitter: {
        card: 'summary_large_image',
        title: recipe.title,
        description: description,
        images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=${encodeURIComponent(recipe.title)}&description=${encodeURIComponent(description)}&type=recipe`]
      }
    };
  } catch (error) {
    console.error('Error generating metadata for recipe:', error);
    return {
      title: 'Recipe - MTG Mods',
      description: 'View MTG recipe details and instructions.',
    };
  }
}

async function getRecipeWithInteractions(slug: string, userId?: string): Promise<RecipeData> {
  try {
    // Use a single transaction for all queries to reduce round trips
    const result = await prisma.$transaction(async (tx) => {
      // Main recipe query
      const recipe = await tx.recipe.findUnique({
        where: { slug },
        include: {
          author: true,
          tags: true,
          _count: {
            select: {
              votes: true,
              tried: true,
            },
          },
        },
      });
      
      if (!recipe) {
        // Try to find a recipe with a similar title that might have been renamed
        const possibleRecipes = await tx.recipe.findMany({
          where: {
            OR: [
              { title: { contains: slug.replace(/-/g, ' '), mode: 'insensitive' } },
              { title: { contains: slug.replace(/-/g, ''), mode: 'insensitive' } },
            ]
          },
          include: {
            author: true,
            tags: true,
            _count: {
              select: {
                votes: true,
                tried: true,
              },
            },
          },
          take: 1,
        });
        
        if (possibleRecipes.length > 0) {
          const foundRecipe = possibleRecipes[0];
          console.log(`Redirecting from old slug "${slug}" to "${foundRecipe.slug}" for recipe "${foundRecipe.title}"`);
          return { redirect: `/recipes/${foundRecipe.slug}` };
        }
        
        return null;
      }

      // Run all secondary queries in parallel for better performance
      const [nextRecipe, prevRecipe, ...userQueries] = await Promise.all([
        // Navigation queries
        tx.recipe.findFirst({
          where: { createdAt: { gt: recipe.createdAt } },
          orderBy: { createdAt: 'asc' },
          select: { slug: true, title: true }
        }),
        tx.recipe.findFirst({
          where: { createdAt: { lt: recipe.createdAt } },
          orderBy: { createdAt: 'desc' },
          select: { slug: true, title: true }
        }),
                 // User interaction queries (only if user is logged in)
         ...(userId ? [
           tx.vote.findUnique({
             where: { userId_recipeId: { userId, recipeId: recipe.id } },
             select: { value: true }
           }),
           tx.bookmark.findUnique({
             where: { userId_recipeId: { userId, recipeId: recipe.id } },
           }),
           tx.tried.findUnique({
             where: { userId_recipeId: { userId, recipeId: recipe.id } },
           })
         ] : [])
      ]);

             // Process user interaction results
       let userInteractions = null;
       if (userId && userQueries.length === 3) {
         const [vote, bookmark, tried] = userQueries;
         userInteractions = {
           voteValue: (vote as { value: number } | null)?.value || null,
           isBookmarked: Boolean(bookmark),
           hasTried: Boolean(tried),
         };
       }

      return {
        recipe,
        userInteractions,
        navigation: {
          next: nextRecipe?.slug || null,
          prev: prevRecipe?.slug || null
        }
      };
    });

    return result;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth();
  const recipeData = await getRecipeWithInteractions(
    slug,
    session?.user?.id
  );

  if (!recipeData) {
    notFound();
  }

  // Handle redirect case
  if ('redirect' in recipeData) {
    redirect(recipeData.redirect);
  }

  const { recipe, userInteractions, navigation } = recipeData;
  const isAuthor = session?.user?.id === recipe.authorId;

  // Calculate total vote value
  const totalVotes = recipe._count.votes;
  const totalTried = recipe._count.tried;



  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/recipes" className="text-gray-500 hover:underline mr-2">
            ← Back to Recipes
          </Link>
        </div>

        <div className="relative">
          {/* Previous Recipe Arrow */}
          {navigation.prev ? (
            <Link href={`/recipes/${navigation.prev}`} className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-12 lg:-ml-16 hidden md:block">
              <div className="w-10 h-10 rounded-full bg-white/70 hover:bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#5A31F4] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </div>
            </Link>
          ) : null}

          <article className="bg-white rounded-lg shadow-md p-6 mb-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-[var(--dark)] mb-4 flex items-center">
                {recipe.title}
                <CopyLinkButton />
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <span className="font-medium">By</span>
                  <span className="ml-1">{recipe.author.username || recipe.author.name || 'Anonymous'}</span>
                </div>
                
                <div>
                  <time dateTime={recipe.createdAt.toISOString()}>
                    {new Date(recipe.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                </div>

                {/* Tags */}
                {recipe.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag: { id: string; name: string }) => (
                      <TagPill
                        key={tag.id}
                        tag={tag.name}
                      />
                    ))}
                  </div>
                )}

                {/* Attachment indicator */}
                {recipe.attachmentName && recipe.attachmentUrl && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <a
                      href={recipe.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#5A31F4] hover:underline transition-colors"
                    >
                      {recipe.attachmentName}
                    </a>
                  </div>
                )}
              </div>
            </header>

            {/* Interactions (Voting, Bookmark, Tried) */}
            <Suspense fallback={<div>Loading interactions...</div>}>
              <RecipeInteractionsClient
                recipeId={recipe.id}
                recipeTitle={recipe.title}
                recipeSlug={recipe.slug}
                voteCount={totalVotes}
                triedCount={totalTried}
                initialVoteValue={userInteractions?.voteValue || null}
                initialBookmarked={userInteractions?.isBookmarked || false}
                initialTried={userInteractions?.hasTried || false}
              />
            </Suspense>

            {/* Recipe instructions */}
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />

            {/* Author actions */}
            {isAuthor && (
              <div className="flex items-center space-x-4 mt-8 pt-4 border-t">
                <Link 
                  href={`/recipes/${slug}/edit`}
                  className="text-[var(--primary)] hover:underline"
                >
                  Edit Recipe
                </Link>
                <Link 
                  href="/recipes/new" 
                  className="text-[#F4A261] hover:underline"
                >
                  Create Another
                </Link>
                <DeleteRecipeButton recipeId={recipe.id} />
              </div>
            )}
          </article>

          {/* Next Recipe Arrow */}
          {navigation.next ? (
            <Link href={`/recipes/${navigation.next}`} className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-12 lg:-mr-16 hidden md:block">
              <div className="w-10 h-10 rounded-full bg-white/70 hover:bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-[#5A31F4] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
} 