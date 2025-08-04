const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function checkUserTableColumns() {
  console.log('🔍 Checking User table columns...');
  
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Check all columns in the User table
    const columns = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'User' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;
    
    console.log('📋 User table columns:');
    columns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable}, default: ${col.column_default})`);
    });
    
    // Specifically check for isDisabled
    const isDisabledColumn = columns.find(col => col.column_name === 'isDisabled');
    if (isDisabledColumn) {
      console.log('✅ isDisabled column exists');
    } else {
      console.log('❌ isDisabled column does not exist');
    }
    
  } catch (error) {
    console.error('❌ Error checking columns:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUserTableColumns(); 