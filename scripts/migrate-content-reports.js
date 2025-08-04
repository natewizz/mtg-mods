const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function migrateContentReports() {
  console.log('Starting content reports migration...');
  
  try {
    // Read existing content reports from JSON file
    const reportsFilePath = path.join(process.cwd(), 'content-reports.json');
    if (!fs.existsSync(reportsFilePath)) {
      console.log('No content-reports.json file found. Skipping content reports migration.');
      return;
    }

    const reportsData = JSON.parse(fs.readFileSync(reportsFilePath, 'utf-8'));
    console.log(`Found ${reportsData.length} content reports to migrate`);

    for (const report of reportsData) {
      try {
        // Check if report already exists in database
        const existingReport = await prisma.contentReport.findUnique({
          where: { id: report.id }
        });

        if (existingReport) {
          console.log(`Report ${report.id} already exists in database, skipping...`);
          continue;
        }

        // Create the report in database
        await prisma.contentReport.create({
          data: {
            id: report.id,
            recipeId: report.recipeId,
            recipeTitle: report.recipeTitle,
            recipeSlug: report.recipeSlug,
            reporterId: report.userId || report.reporterId,
            status: report.status.toUpperCase(),
            notes: report.adminNotes,
            createdAt: new Date(report.createdAt),
            updatedAt: report.updatedAt ? new Date(report.updatedAt) : new Date(report.createdAt)
          }
        });

        console.log(`Migrated report: ${report.id}`);
      } catch (error) {
        console.error(`Error migrating report ${report.id}:`, error.message);
      }
    }

    console.log('Content reports migration completed!');
  } catch (error) {
    console.error('Error during content reports migration:', error);
  }
}

async function migrateAdminNotifications() {
  console.log('Starting admin notifications migration...');
  
  try {
    // Read existing admin notifications from JSON file
    const notificationsFilePath = path.join(process.cwd(), 'admin-notifications.json');
    if (!fs.existsSync(notificationsFilePath)) {
      console.log('No admin-notifications.json file found. Skipping admin notifications migration.');
      return;
    }

    const notificationsData = JSON.parse(fs.readFileSync(notificationsFilePath, 'utf-8'));
    console.log(`Found ${notificationsData.length} admin notifications to migrate`);

    for (const notification of notificationsData) {
      try {
        // Check if notification already exists in database
        const existingNotification = await prisma.adminNotification.findUnique({
          where: { id: notification.id }
        });

        if (existingNotification) {
          console.log(`Notification ${notification.id} already exists in database, skipping...`);
          continue;
        }

        // Create the notification in database
        await prisma.adminNotification.create({
          data: {
            id: notification.id,
            type: notification.type,
            title: notification.title,
            message: notification.message,
            recipeId: notification.recipeId,
            recipeTitle: notification.recipeTitle,
            userId: notification.userId,
            adminId: notification.adminId,
            reason: notification.reason,
            read: notification.read,
            createdAt: new Date(notification.createdAt),
            readAt: notification.readAt ? new Date(notification.readAt) : null
          }
        });

        console.log(`Migrated notification: ${notification.id}`);
      } catch (error) {
        console.error(`Error migrating notification ${notification.id}:`, error.message);
      }
    }

    console.log('Admin notifications migration completed!');
  } catch (error) {
    console.error('Error during admin notifications migration:', error);
  }
}

async function migrateUserStrikes() {
  console.log('Starting user strikes migration...');
  
  try {
    // Read existing user strikes from JSON file
    const strikesFilePath = path.join(process.cwd(), 'user-strikes.json');
    if (!fs.existsSync(strikesFilePath)) {
      console.log('No user-strikes.json file found. Skipping user strikes migration.');
      return;
    }

    const strikesData = JSON.parse(fs.readFileSync(strikesFilePath, 'utf-8'));
    console.log(`Found ${strikesData.length} user strikes to migrate`);

    for (const strike of strikesData) {
      try {
        // Check if strike already exists in database
        const existingStrike = await prisma.userStrike.findUnique({
          where: { id: strike.id }
        });

        if (existingStrike) {
          console.log(`Strike ${strike.id} already exists in database, skipping...`);
          continue;
        }

        // Create the strike in database
        await prisma.userStrike.create({
          data: {
            id: strike.id,
            userId: strike.userId,
            reason: strike.reason,
            recipeId: strike.recipeId,
            recipeTitle: strike.recipeTitle,
            adminId: strike.adminId,
            createdAt: new Date(strike.createdAt)
          }
        });

        console.log(`Migrated strike: ${strike.id}`);
      } catch (error) {
        console.error(`Error migrating strike ${strike.id}:`, error.message);
      }
    }

    console.log('User strikes migration completed!');
  } catch (error) {
    console.error('Error during user strikes migration:', error);
  }
}

async function main() {
  console.log('Starting data migration from JSON files to database...');
  
  try {
    await migrateContentReports();
    await migrateAdminNotifications();
    await migrateUserStrikes();
    
    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 