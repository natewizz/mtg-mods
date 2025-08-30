import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog - cantripped',
  description: 'See the latest updates and new features added to cantripped. Track the evolution of our platform with detailed release notes and improvements.',
  keywords: ['changelog', 'updates', 'features', 'releases', 'cantripped', 'MTG', 'Magic the Gathering'],
  alternates: {
    canonical: 'https://www.cantripped.com/changelog',
  },
  openGraph: {
            title: 'Changelog - cantripped',
        description: 'See the latest updates and new features added to cantripped. Track the evolution of our platform with detailed release notes and improvements.',
        url: 'https://www.cantripped.com/changelog',
        siteName: 'cantripped',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Changelog%20-%20Cantripped&description=See%20the%20latest%20updates%20and%20new%20features%20added%20to%20Cantripped&type=default`,
        width: 1200,
        height: 630,
                      alt: 'Changelog - cantripped'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
            title: 'Changelog - cantripped',
        description: 'See the latest updates and new features added to cantripped. Track the evolution of our platform with detailed release notes and improvements.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Changelog%20-%20Cantripped&description=See%20the%20latest%20updates%20and%20new%20features%20added%20to%20Cantripped&type=default`]
  }
};

interface ChangelogEntry {
  date: string;
  version: string;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'fix' | 'security' | 'major';
}

const changelogData: ChangelogEntry[] = [
  {
    date: '2025-08-30',
    version: 'v1.11.0',
    title: '📱 Mobile UI Improvements & Recipe Card Enhancements',
    description: 'Significantly enhanced mobile experience with inline interaction buttons, improved recipe page layout, and enhanced filter system. Added text snippets back to homepage recipe cards, improved visual appeal with gradient backgrounds and better tag styling. Fixed download link overlap issues and optimized spacing for mobile devices.',
    type: 'improvement'
  },
  {
    date: '2025-08-16',
    version: 'v2.0.0',
    title: '🎉 MAJOR REBRAND: MTG Mods → cantripped',
    description: 'Complete platform rebrand to cantripped! New domain, enhanced branding, and exciting new identity while preserving all functionality and community features.',
    type: 'major'
  },
  {
    date: '2025-08-09',
    version: 'v1.10.0',
    title: 'Homepage Layout Improvements & Trending Recipes',
    description: 'Added new "Trending Recipes" section to homepage with intelligent algorithm considering likes (3x weight), tries (2x weight), and bookmarks (1x weight). Reorganized layout flow: Latest → Trending → Random for better user experience. Moved random recipe button to its own section and improved spacing throughout for cohesive design.',
    type: 'feature'
  },
  {
    date: '2025-08-09',
    version: 'v1.9.0',
    title: 'Comprehensive FAQ Page',
    description: 'Added a robust FAQ page with 25+ frequently asked questions organized into logical categories. Implemented category-based navigation with smooth scrolling, responsive design, and comprehensive coverage of platform features, user accounts, recipe creation, community guidelines, and technical support.',
    type: 'feature'
  },
  {
    date: '2025-08-09',
    version: 'v1.8.0',
    title: 'Recipe Attachment Indicators & Copy Link Functionality',
    description: 'Added prominent attachment indicators to individual recipe pages for immediate visibility, positioned alongside copy link buttons. Implemented soft, non-intrusive attachment indicators on recipe cards with paper clip icons and "Download" text. Enhanced user experience with easy recipe sharing through copy link functionality.',
    type: 'feature'
  },
  {
    date: '2025-08-07',
    version: 'v1.7.0',
    title: 'Progressive Badges, Special Badge Attribution, and UX Polish',
            description: 'Implemented progressive badge replacement (show only highest milestone), added bronze→diamond visual tiers, and clear "Permanent Achievement" labeling for first-time badges. Ensured special badges always show Awarded by cantripped and added a maintenance script to retroactively clean up lower milestone badges.',
    type: 'improvement'
  },
  {
    date: '2025-08-07',
    version: 'v1.6.0',
    title: 'UX Improvements & Newsletter Integration',
    description: 'Enhanced user experience with clickable author names for better community discovery, optimized homepage banner layout, and added newsletter subscription functionality. Improved content reporting guidance and terminology consistency.',
    type: 'improvement'
  },
  {
    date: '2025-08-04',
    version: 'v1.5.0',
    title: 'User Badge System & Achievement Tracking',
    description: 'Introduced a comprehensive badge system with automatic achievement tracking for recipe creation, likes, tries, and bookmarks. Users can now earn badges for milestones and special contributions. Enhanced gamification and user engagement.',
    type: 'feature'
  },
  {
    date: '2025-08-04',
    version: 'v1.4.2',
    title: 'Beta Testers Sticky Link & Enhanced Learn Page',
    description: 'Added prominent sticky link for beta tester feedback in top-right corner. Enhanced learn page with attachment-based recipe examples and better complexity guidance. Improved user onboarding and feedback collection.',
    type: 'feature'
  },
  {
    date: '2025-08-04',
    version: 'v1.4.1',
    title: 'Improved Attachment Design & Database Fixes',
    description: 'Made recipe attachment sections much less intrusive and more elegant. Fixed database issues with UserStrike table and tag queries. Enhanced overall design consistency and user experience.',
    type: 'improvement'
  },
  {
    date: '2025-08-04',
    version: 'v1.4.0',
    title: 'Recipe Attachments & Profile Stats Fix',
    description: 'Added recipe attachments feature allowing users to link Google Drive PDFs to their recipes. Fixed profile page recipe stats to show real-time vote and tried counts. Improved consistency across all recipe card displays.',
    type: 'feature'
  },
  {
    date: '2025-08-04',
    version: 'v1.3.1',
    title: 'Profile Image Upload & Display Fixes',
    description: 'Fixed profile pictures not displaying correctly and added profile image upload functionality. Users can now easily upload and edit their profile pictures with a simple pencil icon.',
    type: 'fix'
  },
  {
    date: '2025-08-04',
    version: 'v1.3.0',
    title: 'Dynamic Open Graph Images & SEO Optimization',
    description: 'Implemented dynamic Open Graph image generation for beautiful social media previews. Added comprehensive SEO optimization with canonical URLs, structured data, and enhanced metadata across all pages.',
    type: 'feature'
  },
  {
    date: '2025-07-29',
    version: 'v1.2.2',
    title: 'Improved Changelog Experience',
    description: 'Enhanced the changelog page with better mobile layout, improved timeline design, and better user experience across all devices.',
    type: 'improvement'
  },
  {
    date: '2025-07-29',
    version: 'v1.2.1',
    title: 'Security Improvements',
    description: 'Enhanced platform security and data protection measures to ensure user privacy and account safety.',
    type: 'security'
  },
  {
    date: '2025-07-29',
    version: 'v1.2.0',
    title: 'Content Moderation System',
    description: 'Added comprehensive content reporting, user strikes, and automated content filtering to maintain a positive community environment. Includes admin dashboard for managing reports and user bans.',
    type: 'feature'
  },
  {
    date: '2025-07-29',
    version: 'v1.1.5',
    title: 'Enhanced User Experience',
    description: 'Improved recipe creation workflow, added real-time content validation, enhanced user profile management, and fixed critical infinite loop issues with user strikes system.',
    type: 'improvement'
  },
  {
    date: '2025-06-12',
    version: 'v1.1.0',
    title: 'Trending Recipes Feed',
    description: 'Added trending recipes feed that aggregates most upvoted, bookmarked, and tried recipes from the last 7 days. Enhanced recipe discovery with popular content highlighting.',
    type: 'feature'
  },
  {
    date: '2025-06-11',
    version: 'v1.0.9',
    title: 'User Timestamps & Profile Metadata',
    description: 'Added user timestamps and profile metadata display. Users can now see when they joined and their last activity, improving profile transparency and user engagement tracking.',
    type: 'improvement'
  },
  {
    date: '2025-06-07',
    version: 'v1.0.8',
    title: 'Admin Dashboard & Profile Privacy',
    description: 'Launched comprehensive admin dashboard with advanced metrics and analytics. Enhanced profile privacy by hiding full names and improved UI/UX with markdown support and copy link features.',
    type: 'feature'
  },
  {
    date: '2025-05-25',
    version: 'v1.0.7',
    title: 'Profile Card Enhancements',
    description: 'Major profile card redesign with gradient backgrounds, improved styling, website link validation, and enhanced visual hierarchy. Removed unused fields and improved overall user experience.',
    type: 'improvement'
  },
  {
    date: '2025-05-13',
    version: 'v1.0.6',
    title: 'Recipe Filtering & Sorting System',
    description: 'Implemented comprehensive recipe filtering and sorting system with tag-based filtering, multi-select functionality, and multiple sorting options. Added URL parameter support for shareable filtered views.',
    type: 'feature'
  },
  {
    date: '2025-05-12',
    version: 'v1.0.5',
    title: 'MTG Color-Themed Tag System',
    description: 'Created MTG color-themed tag styling system with reusable TagPill components. Implemented tag categorization based on MTG color wheel design and enhanced tag selection interface.',
    type: 'improvement'
  },
  {
    date: '2025-05-11',
    version: 'v1.0.4',
    title: 'URL Structure & Username System',
    description: 'Completely redesigned URL structure using slugified titles for recipes and username-based profiles. Added username selection feature with MTG-themed options and improved navigation throughout the platform.',
    type: 'feature'
  },
  {
    date: '2025-05-01',
    version: 'v1.0.0',
    title: 'Platform Launch',
    description: 'First public deployment of MTG Mods with recipe creation, user authentication, community features, and comprehensive MTG rule modification sharing capabilities.',
    type: 'feature'
  },
  {
    date: '2025-03-21',
    version: 'v0.1.0',
    title: 'Development Begins',
    description: 'Started local development of MTG Mods platform. Initial setup with Next.js, TypeScript, Prisma, and comprehensive MTG rule modification sharing capabilities.',
    type: 'feature'
  }
];

function getTypeColor(type: ChangelogEntry['type']) {
  switch (type) {
    case 'feature':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'improvement':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'fix':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'security':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'major':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getTypeIcon(type: ChangelogEntry['type']) {
  switch (type) {
    case 'feature':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case 'improvement':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
        </svg>
      );
    case 'fix':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      );
    case 'security':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      );
    case 'major':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      );
  }
}

export default function ChangelogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#5A31F4] mb-4">Changelog</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track the evolution of cantripped with our latest updates, new features, and improvements.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5A31F4] via-[#5A31F4] to-gray-200"></div>

        <div className="space-y-8">
          {changelogData.map((entry, index) => (
            <div key={index} className="relative flex items-center">
              {/* Timeline dot */}
              <div className="absolute left-6 w-4 h-4 bg-[#5A31F4] rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10"></div>
              
              {/* Content card */}
              <div className="ml-16 bg-white rounded-lg shadow-md border border-gray-200 p-6 flex-1 hover:shadow-lg transition-shadow duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getTypeColor(entry.type)}`}>
                      {getTypeIcon(entry.type)}
                      <span className="ml-1 capitalize">{entry.type}</span>
                    </span>
                    <span className="text-sm font-medium text-gray-500">{entry.version}</span>
                  </div>
                  <time className="text-sm text-gray-500 font-medium whitespace-nowrap">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit'
                    })}
                  </time>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{entry.title}</h3>
                <p className="text-gray-600 leading-relaxed">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* End of timeline indicator */}
        <div className="relative mt-8 flex items-center">
          <div className="absolute left-6 w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"></div>
          <div className="ml-16 text-center py-4">
            <p className="text-gray-500 text-sm">More updates coming soon...</p>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Have feedback?</h3>
          <p className="text-gray-600 mb-4">
            We&apos;d love to hear your thoughts on our updates and suggestions for future features.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#5A31F4] text-white font-medium rounded-lg hover:bg-[#4A2BE4] transition-colors duration-200"
          >
            Contact Us
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
} 