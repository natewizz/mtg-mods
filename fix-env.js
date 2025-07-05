// Fix the DATABASE_URL in .env file
import fs from 'fs';
import path from 'path';

const envFile = path.join(__dirname, '.env');

async function main() {
  console.log('Fixing DATABASE_URL in .env file...');
  
  try {
    // Read the current content
    const content = fs.readFileSync(envFile, 'utf8');
    
    // Replace the database URL with the correct one
    const fixedContent = content.replace(
      /DATABASE_URL="([^"]+)%"/,
      'DATABASE_URL="$1"'
    );
    
    // Write the fixed content back
    fs.writeFileSync(envFile, fixedContent);
    
    console.log('Fixed the DATABASE_URL in .env file.');
    console.log('Original:', content.trim());
    console.log('New:', fixedContent.trim());
  } catch (error) {
    console.error('Failed to fix the .env file:', error);
  }
}

main(); 