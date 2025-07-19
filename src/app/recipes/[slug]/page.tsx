import { Suspense } from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { slugify } from '@/lib/utils';
import DeleteRecipeButton from '@/components/recipes/DeleteRecipeButton';
import RecipeInteractionsClient from '@/components/recipes/RecipeInteractionsClient';
import TagPill from '@/components/ui/TagPill';
import { CopyLinkButton } from '@/components/CopyLinkButton';
import Head from 'next/head';

type RecipeData = {
  recipe: any;
  userInteractions: any;
  navigation: any;
} | {
  redirect: string;
} | null;

async function getRecipeWithInteractions(slug: string, userId?: string): Promise<RecipeData> {
  try {
    const recipe = await prisma.recipe.findUnique({
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
      // This handles cases where the slug changed but the title is similar
      const possibleRecipes = await prisma.recipe.findMany({
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
        // Redirect to the found recipe
        const foundRecipe = possibleRecipes[0];
        console.log(`Redirecting from old slug "${slug}" to "${foundRecipe.slug}" for recipe "${foundRecipe.title}"`);
        return { redirect: `/recipes/${foundRecipe.slug}` };
      }
      
      return null;
    }

    // Get interaction data for the current user
    let userInteractions = null;
    if (userId) {
      const [vote, bookmark, tried] = await Promise.all([
        prisma.vote.findUnique({
          where: {
            userId_recipeId: {
              userId,
              recipeId: recipe.id,
            },
          },
        }),
        prisma.bookmark.findUnique({
          where: {
            userId_recipeId: {
              userId,
              recipeId: recipe.id,
            },
          },
        }),
        prisma.tried.findUnique({
          where: {
            userId_recipeId: {
              userId,
              recipeId: recipe.id,
            },
          },
        }),
      ]);

      userInteractions = {
        voteValue: vote?.value || null,
        isBookmarked: Boolean(bookmark),
        hasTried: Boolean(tried),
      };
    }

    // Get next and previous recipes by creation date
    const [nextRecipe, prevRecipe] = await Promise.all([
      // Next recipe (newer than current)
      prisma.recipe.findFirst({
        where: {
          createdAt: {
            gt: recipe.createdAt
          }
        },
        orderBy: {
          createdAt: 'asc'
        },
        select: {
          title: true
        }
      }),
      // Previous recipe (older than current)
      prisma.recipe.findFirst({
        where: {
          createdAt: {
            lt: recipe.createdAt
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          title: true
        }
      })
    ]);

    // Generate slugs for navigation
    const nextSlug = nextRecipe ? slugify(nextRecipe.title) : null;
    const prevSlug = prevRecipe ? slugify(prevRecipe.title) : null;

    return {
      recipe,
      userInteractions,
      navigation: {
        next: nextSlug,
        prev: prevSlug
      }
    };
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

  // Utility to strip HTML tags from instructions
  function stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  }

  // Generate description from instructions (first 160 chars)
  const description = stripHtml(recipe.instructions).slice(0, 160);

  // Canonical URL for this recipe
  const canonicalUrl = `https://mtgmods.xyz/recipes/${slug}`;

  // Default image (update if you add per-recipe images)
  const imageUrl = 'https://mtgmods.xyz/logo.png';

  // Build JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.title,
    author: {
      '@type': 'Person',
      name: recipe.author.name || recipe.author.username || 'Anonymous',
    },
    datePublished: recipe.createdAt.toISOString(),
    recipeInstructions: stripHtml(recipe.instructions),
    keywords: recipe.tags.map((tag: { id: string; name: string }) => tag.name).join(', '),
  };

  return (
    <>
      <Head>
        {/* Open Graph & Twitter Card meta tags */}
        <title>{recipe.title} | MTG Mods</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:title" content={recipe.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={recipe.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@mtgmods" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
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
                  <span className="ml-1">{recipe.author.name || recipe.author.username || 'Anonymous'}</span>
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
              </div>
            </header>

            {/* Interactions (Voting, Bookmark, Tried) */}
            <Suspense fallback={<div>Loading interactions...</div>}>
              <RecipeInteractionsClient
                recipeId={recipe.id}
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