import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  // Create test user if it doesn't exist
  let testUser = await prisma.user.findUnique({
    where: { email: 'test@example.com' },
  });

  if (!testUser) {
    console.log('Creating test user...');
    testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        username: 'mtgbrewer',
        email: 'test@example.com',
        emailVerified: new Date(),
      },
    });

    await prisma.userCredential.create({
      data: {
        userId: testUser.id,
        hashedPassword: await hash('password123', 12),
      },
    });
  }

  // Create superuser (ADMIN) if it doesn't exist
  let adminUser = await prisma.user.findUnique({
    where: { email: 'admin@example.com' },
  });

  if (!adminUser) {
    console.log('Creating superuser (ADMIN)...');
    adminUser = await prisma.user.create({
      data: {
        name: 'Super Admin',
        username: 'admin',
        email: 'admin@example.com',
        emailVerified: new Date(),
        role: 'ADMIN',
      },
    });

    await prisma.userCredential.create({
      data: {
        userId: adminUser.id,
        hashedPassword: await hash('admin123', 12),
      },
    });
  }

  // Create test users for votes and interactions
  const testUserEmails = [
    'test1@example.com', 
    'test2@example.com', 
    'test3@example.com',
    'test4@example.com',
    'test5@example.com'
  ];
  
  // Create test users if they don't exist
  const testUsers = [];
  for (const email of testUserEmails) {
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      const username = `user_${email.split('@')[0]}`;
      user = await prisma.user.create({
        data: {
          name: `Test ${username}`,
          username,
          email,
          emailVerified: new Date(),
        },
      });

      await prisma.userCredential.create({
        data: {
          userId: user.id,
          hashedPassword: await hash('password123', 12),
        },
      });
    }
    
    testUsers.push(user);
  }

  // Define sample recipes with tags
  const recipes = [
    {
      title: 'Mountain Mana Potion',
      description: 'A simple recipe for generating red mana in a pinch',
      instructions: '<p>This recipe provides a quick way to generate red mana when you need it most:</p><ul><li>Mix 2 parts mountain dust</li><li>Add a pinch of dragon\'s breath</li><li>Stir while chanting "Mountains guide me"</li></ul><p>Perfect for aggro strategies!</p>',
      tags: ['red', 'mana', 'aggro', 'tokens', 'damage'],
      votes: 12,
      tried: 5,
    },
    {
      title: 'Blue Control Elixir',
      description: 'Enhance your control strategy with this powerful counterspell brew',
      instructions: '<p>A master blue mage always has this elixir ready:</p><ol><li>Combine island essence with sphinx feather</li><li>Add a drop of mind magic</li><li>Chill until it glows blue</li></ol><p>Sip slowly when your opponent casts a threatening spell!</p>',
      tags: ['blue', 'control', 'draw', 'enters-battlefield', 'sorcery'],
      votes: 8,
      tried: 3,
    },
    {
      title: 'Green Growth Serum',
      description: 'Accelerate your mana and creature development',
      instructions: '<p>This forest-infused concoction empowers your early game:</p><ol><li>Grind forest leaves into fine powder</li><li>Add three drops of ancient amber</li><li>Mix with fertile soil extract</li></ol><p>Apply to lands for accelerated growth!</p>',
      tags: ['green', 'ramp', 'creature', 'tokens', 'commander'],
      votes: 15,
      tried: 8,
    },
    {
      title: 'White Protection Shield',
      description: 'Create a powerful defense against any threat',
      instructions: '<p>The ultimate defense technique:</p><ul><li>Combine plains essence with angel feather</li><li>Add holy water and unicorn horn dust</li><li>Mix under full moonlight</li></ul><p>Apply to your creatures before combat for maximum defense!</p>',
      tags: ['white', 'protection', 'life-gain', 'combat', 'enchantment'],
      votes: 6,
      tried: 4,
    },
    {
      title: 'Black Resurrection Tonic',
      description: 'Bring your key creatures back from the graveyard',
      instructions: '<p>Death is merely a setback with this dark potion:</p><ol><li>Mix swamp water with grave soil</li><li>Add a vial of vampire blood</li><li>Stir counterclockwise under new moon</li></ol><p>Pour over your graveyard to resurrect your favorite creatures!</p>',
      tags: ['black', 'graveyard', 'dies', 'combo', 'tutor'],
      votes: 10,
      tried: 6,
    },
    {
      title: 'Simic Hybrid Mutation',
      description: 'Combine creature types for unexpected advantages',
      instructions: '<p>The Simic process for creating hybrid creatures:</p><ul><li>Combine blue and green mana in equal parts</li><li>Add genetic material from two different creatures</li><li>Apply adaptation catalyst</li></ul><p>Observe as your creatures evolve into powerful hybrids!</p>',
      tags: ['blue', 'green', 'creature', 'counters', 'instant'],
      votes: 14,
      tried: 7,
    },
    {
      title: 'Boros Battlefield Blitz',
      description: 'Coordinate perfect attacks with red and white magic',
      instructions: '<p>The ultimate combat technique for Boros commanders:</p><ol><li>Synchronize red aggression with white discipline</li><li>Channel through your commander</li><li>Time your attack to maximize damage</li></ol><p>Your opponents won\'t know what hit them!</p>',
      tags: ['red', 'white', 'combat', 'damage', 'commander'],
      votes: 18,
      tried: 11,
    },
    {
      title: 'Izzet Experiment Formula',
      description: 'Unpredictable but powerful spell combinations',
      instructions: '<p>The classic Izzet experimental process:</p><ul><li>Mix volatile red mana with stable blue mana</li><li>Add unexpected components (anything you have around)</li><li>Stand back and watch the magic happen!</li></ul><p>Results may vary, but that\'s the point!</p>',
      tags: ['red', 'blue', 'combo', 'instant', 'sorcery'],
      votes: 9,
      tried: 5,
    },
    {
      title: 'Golgari Compost Accelerator',
      description: 'Turn your dead creatures into resources',
      instructions: '<p>The circle of life and death, accelerated:</p><ol><li>Prepare a bed of enriched soil</li><li>Add sacrificed creature essence</li><li>Sprinkle with fungal spores</li></ol><p>Watch as death feeds new life in your deck!</p>',
      tags: ['black', 'green', 'graveyard', 'dies', 'draw'],
      votes: 7,
      tried: 3,
    },
    {
      title: 'Azorius Detention Protocol',
      description: 'Legal methods to stop your opponents in their tracks',
      instructions: '<p>The lawful way to control your opponents:</p><ul><li>Draft the detention order with precise wording</li><li>Seal with official Azorius magic</li><li>Present to the permanent you wish to detain</li></ul><p>Even the most powerful beings must respect Azorius law!</p>',
      tags: ['white', 'blue', 'control', 'enchantment', 'multiplayer'],
      votes: 5,
      tried: 2,
    },
    {
      title: 'Rakdos Performance Enhancer',
      description: 'Sacrifice everything for maximum damage',
      instructions: '<p>The ultimate Rakdos party trick:</p><ol><li>Mix blood with fire in equal measure</li><li>Add chaos essence and demon breath</li><li>Consume at your own risk!</li></ol><p>Your power will increase, but at what cost?</p>',
      tags: ['black', 'red', 'damage', 'sacrifice', 'chaos'],
      votes: 13,
      tried: 9,
    },
    {
      title: 'Selesnya Community Garden',
      description: 'Generate tokens and build a cooperative board presence',
      instructions: '<p>Building the perfect community:</p><ul><li>Prepare fertile soil with green and white mana</li><li>Plant token seeds in formation</li><li>Nurture with community spirit</li></ul><p>Watch your army grow stronger together!</p>',
      tags: ['white', 'green', 'tokens', 'commander', 'multiplayer'],
      votes: 16,
      tried: 10,
    },
    {
      title: 'Dimir Infiltration Tactics',
      description: 'Secret techniques for gathering information and gaining advantages',
      instructions: '<p>The House Dimir\'s most guarded secrets:</p><ol><li>Create a shadow persona using blue illusion</li><li>Infuse with black essence of deception</li><li>Slip between the cracks of your opponent\'s defenses</li></ol><p>Knowledge is power, and Dimir knows everything!</p>',
      tags: ['blue', 'black', 'draw', 'discard', 'control'],
      votes: 11,
      tried: 6,
    },
    {
      title: 'Gruul Stompy Strategy',
      description: 'Maximize creature power and simply overwhelm opponents',
      instructions: '<p>The Gruul way is the simple way:</p><ul><li>Channel primal rage through your largest creatures</li><li>Enhance with the essence of the wild</li><li>SMASH!</li></ul><p>Sometimes the direct approach is best!</p>',
      tags: ['red', 'green', 'creature', 'damage', 'aggro'],
      votes: 20,
      tried: 15,
    },
    {
      title: 'Orzhov Extraction Method',
      description: 'Slowly drain your opponents while building your resources',
      instructions: '<p>The business of debt collection:</p><ol><li>Establish binding contracts with white magic</li><li>Enforce with black consequences</li><li>Collect what is owed, with interest</li></ol><p>The debt is always paid, one way or another!</p>',
      tags: ['white', 'black', 'life-gain', 'damage', 'multiplayer'],
      votes: 9,
      tried: 7,
    },
  ];

  console.log(`Creating ${recipes.length} seed recipes...`);

  // Create each recipe with its tags, votes, and tried counts
  for (const recipeData of recipes) {
    const { title, description, instructions, tags, votes: voteCount, tried: triedCount } = recipeData;
    
    // Create or find the recipe
    let recipe = await prisma.recipe.findFirst({
      where: { title },
      select: { id: true },
    });

    if (!recipe) {
      recipe = await prisma.recipe.create({
        data: {
          title,
          description,
          instructions,
          authorId: testUser.id,
        },
      });

      // Create tags
      for (const tagName of tags) {
        // Find or create the tag
        let tag = await prisma.tag.findUnique({
          where: { name: tagName },
          select: { id: true },
        });

        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: tagName },
          });
        }

        // Create recipe tag relationship
        await prisma.recipeTag.create({
          data: {
            name: tagName,
            recipeId: recipe.id,
            tagId: tag.id,
          },
        });
      }

      // Create votes (distribute among test users)
      for (let i = 0; i < voteCount; i++) {
        // Use different users for each vote to avoid unique constraint violation
        const userIndex = i % testUsers.length;
        try {
          await prisma.vote.create({
            data: {
              userId: testUsers[userIndex].id,
              recipeId: recipe.id,
              value: 1,
            },
          });
        } catch (error) {
          console.log(`Vote already exists for user ${userIndex} and recipe ${title}`);
        }
      }

      // Create tried records (distribute among test users)
      for (let i = 0; i < triedCount; i++) {
        // Use different users for each tried record
        const userIndex = i % testUsers.length;
        try {
          await prisma.tried.create({
            data: {
              userId: testUsers[userIndex].id,
              recipeId: recipe.id,
            },
          });
        } catch (error) {
          console.log(`Tried record already exists for user ${userIndex} and recipe ${title}`);
        }
      }
    }
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 