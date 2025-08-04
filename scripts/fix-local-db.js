const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function fixLocalDatabase() {
  console.log('🔧 Fixing local database...');
  
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Add the missing isDisabled column
    console.log('📝 Adding isDisabled column to User table...');
    await prisma.$executeRaw`
      ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isDisabled" BOOLEAN DEFAULT false;
    `;
    console.log('✅ isDisabled column added successfully');
    
    // Check if the column exists
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'User' 
      AND table_schema = 'public'
      AND column_name = 'isDisabled';
    `;
    
    if (columns.length > 0) {
      console.log('✅ isDisabled column confirmed in database');
    } else {
      console.log('❌ isDisabled column not found');
    }
    
    console.log('🎉 Local database fix completed!');
    
  } catch (error) {
    console.error('❌ Error fixing local database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixLocalDatabase(); 