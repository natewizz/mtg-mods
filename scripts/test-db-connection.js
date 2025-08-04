const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  console.log('🔍 Testing database connection and tables...');
  
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test if Badge table exists
    try {
      const badgeCount = await prisma.badge.count();
      console.log(`✅ Badge table exists with ${badgeCount} records`);
    } catch (error) {
      console.log('❌ Badge table does not exist or is not accessible');
      console.log('Error:', error.message);
    }
    
    // Test if UserBadge table exists
    try {
      const userBadgeCount = await prisma.userBadge.count();
      console.log(`✅ UserBadge table exists with ${userBadgeCount} records`);
    } catch (error) {
      console.log('❌ UserBadge table does not exist or is not accessible');
      console.log('Error:', error.message);
    }
    
    // Test User table
    try {
      const userCount = await prisma.user.count();
      console.log(`✅ User table exists with ${userCount} records`);
    } catch (error) {
      console.log('❌ User table does not exist or is not accessible');
      console.log('Error:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 