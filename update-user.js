const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateUser() {
  try {
    const updated = await prisma.user.update({
      where: { id: 'clulhm4vp0000qwehjlpqqwz9' },
      data: { image: 'https://placehold.co/150x150/5A31F4/FFFFFF?text=TU' }
    });
    console.log('User updated:', updated);
  } catch (error) {
    console.error('Error updating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateUser(); 