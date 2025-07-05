// Script to sync Prisma schema with database
import { execSync } from 'child_process';

// Function to run command and log output
function runCommand(command) {
  console.log(`Running: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log(output);
    return output;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error.message);
    process.exit(1);
  }
}

// 1. Introspect the database to create an up-to-date schema
console.log('Introspecting database to update schema...');
runCommand('npx prisma db pull');

// 2. Generate the Prisma client
console.log('Generating Prisma client...');
runCommand('npx prisma generate');

console.log('Database sync complete. Prisma client has been updated to match the current database schema.'); 