// Database verification script

const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Starting database verification...');
  
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  try {
    console.log('Connecting to database...');
    
    // Test connection by querying the User model
    console.log('Testing User model...');
    const userCount = await prisma.user.count();
    console.log(`Database has ${userCount} users`);
    
    // Test UserCredential model
    console.log('Testing UserCredential model...');
    const credentialCount = await prisma.userCredential.count();
    console.log(`Database has ${credentialCount} user credentials`);
    
    // Check database schema
    console.log('Getting database metadata...');
    
    // Get the Prisma models (tables)
    console.log('\nAvailable models:');
    const models = Object.keys(prisma);
    console.log(models.filter(key => 
      !key.startsWith('_') && 
      typeof prisma[key] === 'object' && 
      prisma[key] !== null
    ));
    
    console.log('\nDatabase verification completed successfully!');
  } catch (error) {
    console.error('Database verification failed:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 