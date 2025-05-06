import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      id: 'clulhm4vp0000qwehjlpqqwz9', // Hardcoded ID for testing
      name: 'Test User',
      email: 'test@example.com',
      username: 'testuser',
      image: 'https://placehold.co/150x150/5A31F4/FFFFFF?text=TU',
      favoriteDeck: 'Blue/Black Control',
      bio: 'This is a test user created for development purposes.',
    },
  });

  console.log({ testUser });

  // Create a test recipe
  const testRecipe = await prisma.recipe.upsert({
    where: { id: 'clulhp61j0001qwehc7upqo1l' },
    update: {},
    create: {
      id: 'clulhp61j0001qwehc7upqo1l',
      title: 'Sample MTG Mod Recipe',
      description: 'This is a sample MTG modification recipe for testing purposes.',
      instructions: 'Step 1: Take card.\nStep 2: Apply mod.\nStep 3: Enjoy!',
      authorId: testUser.id,
      tags: {
        create: [
          {
            id: 'clulhpvum0002qwehscf5g5dt',
            name: 'Budget',
            tagId: null,
          },
          {
            id: 'clulhq3dh0003qweh5jn2bbpn',
            name: 'Beginner',
            tagId: null,
          }
        ]
      }
    },
  });

  console.log({ testRecipe });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }); 