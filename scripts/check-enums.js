const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function checkEnums() {
  console.log('🔍 Checking existing enum types...');
  
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Check what enum types exist
    const enums = await prisma.$queryRaw`
      SELECT typname, typarray 
      FROM pg_type 
      WHERE typtype = 'e' 
      AND typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      ORDER BY typname;
    `;
    
    console.log('📋 Existing enum types:');
    enums.forEach(enumType => {
      console.log(`  - ${enumType.typname}`);
    });
    
    // Check Badge table structure
    console.log('\n🔍 Checking Badge table structure...');
    const badgeColumns = await prisma.$queryRaw`
      SELECT column_name, data_type, udt_name
      FROM information_schema.columns 
      WHERE table_name = 'Badge' 
      AND table_schema = 'public'
      ORDER BY ordinal_position;
    `;
    
    console.log('📋 Badge table columns:');
    badgeColumns.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (${col.udt_name})`);
    });
    
  } catch (error) {
    console.error('❌ Error checking enums:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkEnums(); 