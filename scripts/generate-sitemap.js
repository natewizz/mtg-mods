#!/usr/bin/env node

/**
 * Sitemap Generation Script
 * 
 * This script generates a sitemap and optionally submits it to search engines.
 * Run this weekly to keep your sitemap updated.
 * 
 * Usage:
 *   node scripts/generate-sitemap.js [--submit]
 * 
 * Options:
 *   --submit    Submit sitemap to Google Search Console and Bing Webmaster Tools
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Configuration
const SITEMAP_URL = 'https://www.mtgmods.xyz/sitemap.xml';
const GOOGLE_SEARCH_CONSOLE_URL = 'https://www.google.com/ping?sitemap=';
const BING_WEBMASTER_URL = 'https://www.bing.com/ping?sitemap=';

// Check if --submit flag is provided
const shouldSubmit = process.argv.includes('--submit');

async function pingSearchEngine(url, engineName) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ Successfully submitted to ${engineName}`);
          resolve(data);
        } else {
          console.log(`⚠️  ${engineName} returned status ${res.statusCode}`);
          resolve(data);
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`❌ Error submitting to ${engineName}:`, error.message);
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      console.log(`⏰ Timeout submitting to ${engineName}`);
      reject(new Error('Timeout'));
    });
  });
}

async function submitToSearchEngines() {
  if (!shouldSubmit) {
    console.log('ℹ️  Skipping search engine submission (use --submit to enable)');
    return;
  }

  console.log('🚀 Submitting sitemap to search engines...');
  
  try {
    // Submit to Google Search Console
    await pingSearchEngine(GOOGLE_SEARCH_CONSOLE_URL + encodeURIComponent(SITEMAP_URL), 'Google Search Console');
    
    // Submit to Bing Webmaster Tools
    await pingSearchEngine(BING_WEBMASTER_URL + encodeURIComponent(SITEMAP_URL), 'Bing Webmaster Tools');
    
    console.log('✅ Sitemap submission completed!');
  } catch (error) {
    console.log('❌ Error during sitemap submission:', error.message);
  }
}

function generateSitemap() {
  console.log('📝 Generating sitemap...');
  
  try {
    // Build the Next.js app to generate the sitemap
    console.log('🔨 Building Next.js app...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📍 Sitemap available at: ${SITEMAP_URL}`);
    
    // Check if sitemap file exists
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      const stats = fs.statSync(sitemapPath);
      console.log(`📊 Sitemap size: ${(stats.size / 1024).toFixed(2)} KB`);
      console.log(`🕒 Last modified: ${stats.mtime.toISOString()}`);
    }
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

async function main() {
  console.log('🗺️  MTG Mods Sitemap Generator');
  console.log('================================');
  
  const startTime = Date.now();
  
  // Generate sitemap
  generateSitemap();
  
  // Submit to search engines if requested
  await submitToSearchEngines();
  
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log('================================');
  console.log(`✅ Sitemap generation completed in ${duration}s`);
  
  if (shouldSubmit) {
    console.log('\n📋 Next steps:');
    console.log('1. Check Google Search Console for indexing status');
    console.log('2. Check Bing Webmaster Tools for indexing status');
    console.log('3. Monitor your search rankings over the next few days');
  }
}

// Run the script
main().catch(console.error); 