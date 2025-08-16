# Sitemap Generation

This document explains how the dynamic sitemap generation works for Cantripped.

## Overview

The sitemap is automatically generated and includes:
- All static pages (home, recipes, learn, contact, policies)
- All recipes from the database with canonical URLs
- Dynamic priority based on recipe engagement
- Proper lastModified dates

## How It Works

### Dynamic Generation
The sitemap is generated dynamically using Next.js 13+ App Router's built-in sitemap generation:

- **File**: `src/app/sitemap.ts`
- **URL**: `https://www.cantripped.com/sitemap.xml`
- **Generation**: Automatically generated on each build

### Recipe Inclusion
All recipes are included with:
- **Canonical URLs**: Using recipe slugs (e.g., `/recipes/my-awesome-mod`)
- **Dynamic Priority**: Based on engagement metrics:
  - High engagement (>50 interactions): 0.9 priority
  - Medium engagement (>20 interactions): 0.8 priority  
  - Low engagement (>5 interactions): 0.7 priority
  - Base priority: 0.6
- **Last Modified**: Uses recipe's `updatedAt` timestamp
- **Change Frequency**: Weekly for all recipes

## Usage

### Generate Sitemap Only
```bash
npm run sitemap
```

### Generate and Submit to Search Engines
```bash
npm run sitemap:submit
```

### Manual Script Usage
```bash
# Generate only
node scripts/generate-sitemap.js

# Generate and submit
node scripts/generate-sitemap.js --submit
```

## Weekly Maintenance

### Recommended Schedule
Run the sitemap generation weekly to keep search engines updated:

```bash
# Every Monday at 9 AM
npm run sitemap:submit
```

### What Happens
1. **Builds the app** to generate fresh sitemap
2. **Includes all recipes** from the database
3. **Submits to search engines**:
   - Google Search Console
   - Bing Webmaster Tools
4. **Provides feedback** on submission status

### Automation Options

#### Cron Job (Linux/Mac)
```bash
# Add to crontab -e
0 9 * * 1 cd /path/to/cantripped && npm run sitemap:submit
```

#### GitHub Actions (Recommended)
Create `.github/workflows/sitemap.yml`:
```yaml
name: Weekly Sitemap Generation
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
  workflow_dispatch:  # Allow manual trigger

jobs:
  sitemap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run sitemap:submit
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          NEXT_PUBLIC_APP_URL: ${{ secrets.NEXT_PUBLIC_APP_URL }}
```

## SEO Benefits

### Search Engine Discovery
- **Faster indexing** of new recipes
- **Better crawl efficiency** for search engines
- **Priority signaling** for important content

### Canonical URLs
- **No duplicate content** issues
- **Consistent URL structure** using slugs
- **Proper redirects** from old ID-based URLs

### Engagement-Based Priority
- **Popular recipes** get higher priority
- **Encourages quality content** creation
- **Better search rankings** for engaging content

## Monitoring

### Check Sitemap Status
```bash
# View sitemap
curl https://www.cantripped.com/sitemap.xml

# Check size and last modified
ls -la public/sitemap.xml
```

### Search Console Integration
1. **Google Search Console**: Monitor indexing status
2. **Bing Webmaster Tools**: Track search performance
3. **Submit manually** if needed via web interfaces

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check for database connection
npm run prisma:generate

# Verify environment variables
echo $DATABASE_URL
echo $NEXT_PUBLIC_APP_URL
```

#### Submission Errors
- **Network timeouts**: Retry the command
- **Invalid URLs**: Check `NEXT_PUBLIC_APP_URL` environment variable
- **Authentication**: Verify search console access

#### Large Sitemaps
If sitemap exceeds 50MB or 50,000 URLs:
- Consider splitting into multiple sitemaps
- Implement sitemap indexing
- Contact for custom solution

## Configuration

### Environment Variables
- `NEXT_PUBLIC_APP_URL`: Base URL for sitemap (default: https://www.cantripped.com)
- `DATABASE_URL`: Database connection string

### Customization
Modify `src/app/sitemap.ts` to:
- Add/remove static pages
- Adjust priority calculations
- Change change frequency
- Add custom logic

## Support

For issues with sitemap generation:
1. Check the build logs
2. Verify database connectivity
3. Test the sitemap URL directly
4. Review search console for errors 