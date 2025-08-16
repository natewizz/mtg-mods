const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function updateAdminAccount() {
  console.log('🔄 Updating admin account from MTGMODS to CANTRIPPED...');
  
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Find the current admin account
    const currentAdmin = await prisma.user.findFirst({
      where: {
        OR: [
          { username: 'MTGMODS' },
          { email: 'mtgmodsofficial@gmail.com' }
        ]
      }
    });
    
    if (!currentAdmin) {
      console.log('❌ Admin account not found with username MTGMODS or email mtgmodsofficial@gmail.com');
      console.log('Available users:');
      const allUsers = await prisma.user.findMany({
        select: { id: true, username: true, email: true, role: true }
      });
      allUsers.forEach(user => {
        console.log(`- ID: ${user.id}, Username: ${user.username}, Email: ${user.email}, Role: ${user.role}`);
      });
      return;
    }
    
    console.log('📋 Current admin account found:');
    console.log(`- ID: ${currentAdmin.id}`);
    console.log(`- Username: ${currentAdmin.username}`);
    console.log(`- Email: ${currentAdmin.email}`);
    console.log(`- Role: ${currentAdmin.role}`);
    
    // Update the admin account
    const updatedAdmin = await prisma.user.update({
      where: { id: currentAdmin.id },
      data: {
        username: 'CANTRIPPED',
        email: 'cantrippedofficial@gmail.com'
      }
    });
    
    console.log('✅ Admin account updated successfully!');
    console.log('📋 New admin account details:');
    console.log(`- ID: ${updatedAdmin.id}`);
    console.log(`- Username: ${updatedAdmin.username}`);
    console.log(`- Email: ${updatedAdmin.email}`);
    console.log(`- Role: ${updatedAdmin.role}`);
    
    // Verify the update
    const verifyAdmin = await prisma.user.findUnique({
      where: { id: currentAdmin.id }
    });
    
    if (verifyAdmin.username === 'CANTRIPPED' && verifyAdmin.email === 'cantrippedofficial@gmail.com') {
      console.log('✅ Verification successful - admin account has been updated');
    } else {
      console.log('❌ Verification failed - admin account was not updated correctly');
    }
    
  } catch (error) {
    console.error('❌ Error updating admin account:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminAccount();
