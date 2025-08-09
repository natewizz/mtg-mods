import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - MTG Mods',
  description: 'Frequently asked questions about MTG Mods. Find answers about recipe creation, user accounts, community guidelines, and more.',
  keywords: [
    'Magic the Gathering', 'MTG', 'FAQ', 'frequently asked questions', 'help', 'support', 'recipe creation', 'user accounts', 'community guidelines'
  ],
  alternates: {
    canonical: 'https://www.mtgmods.xyz/faq',
  },
  openGraph: {
    title: 'FAQ - MTG Mods',
    description: 'Frequently asked questions about MTG Mods. Find answers about recipe creation, user accounts, community guidelines, and more.',
    url: 'https://www.mtgmods.xyz/faq',
    siteName: 'MTG Mods',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=FAQ%20-%20MTG%20Mods&description=Frequently%20asked%20questions%20about%20MTG%20Mods&type=default`,
        width: 1200,
        height: 630,
        alt: 'FAQ - MTG Mods'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - MTG Mods',
    description: 'Frequently asked questions about MTG Mods. Find answers about recipe creation, user accounts, community guidelines, and more.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=FAQ%20-%20MTG%20Mods&description=Frequently%20asked%20questions%20about%20MTG%20Mods&type=default`]
  }
};

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  category: string;
}

const faqData: FAQItem[] = [
  // General Questions
  {
    question: "What is MTG Mods?",
    answer: "MTG Mods is a platform for sharing and discovering rule modifications for Magic: The Gathering. Our goal is to help players enhance their gameplay experience with creative twists on the standard rules. Whether you&apos;re looking for new ways to play or want to share your own custom rules, MTG Mods is the place for you.",
    category: "General"
  },
  {
    question: "Is MTG Mods affiliated with Wizards of the Coast?",
    answer: "No, MTG Mods is not affiliated with, endorsed by, or sponsored by Wizards of the Coast. Magic: The Gathering is a trademark of Wizards of the Coast LLC. We are an independent community platform created by players, for players.",
    category: "General"
  },
  {
    question: "Is MTG Mods free to use?",
    answer: "Yes! MTG Mods is completely free to use. You can browse recipes, create an account, and share your own rule modifications without any cost. We believe in making MTG content accessible to everyone.",
    category: "General"
  },
  {
    question: "How do I get started with MTG Mods?",
    answer: "Getting started is easy! You can browse recipes without an account, but to create and share your own rule modifications, you&apos;ll need to sign up for a free account. Once registered, you can start creating recipes, voting on others&apos; content, and engaging with the community.",
    category: "General"
  },

  // Account & User Management
  {
    question: "How do I create an account?",
    answer: "You can create an account by clicking the &apos;Sign Up&apos; button in the top navigation. We support multiple sign-in methods including email/password and social login options. Once you&apos;ve created your account, you&apos;ll be able to create recipes, vote, and interact with the community.",
    category: "Account & User Management"
  },
  {
    question: "Can I change my username?",
    answer: "Yes, you can change your username from your profile page. Click on your profile picture in the top navigation, then go to &apos;My Profile&apos; and look for the username editing option. Keep in mind that changing your username will update your profile URL.",
    category: "Account & User Management"
  },
  {
    question: "How do I upload a profile picture?",
    answer: "To upload a profile picture, go to your profile page and look for the pencil icon on your current profile picture. Click it to open the upload dialog where you can select and crop your new profile picture.",
    category: "Account & User Management"
  },
  {
    question: "What if I forget my password?",
    answer: "If you forget your password, you can reset it by clicking the &apos;Forgot Password?&apos; link on the sign-in page. You&apos;ll receive an email with instructions to reset your password securely.",
    category: "Account & User Management"
  },

  // Recipe Creation & Management
  {
    question: "How do I submit a rule modification?",
    answer: "To submit a rule modification, you&apos;ll need to be logged in. Click the &apos;Create Recipe&apos; button in the navigation or on your profile page. Fill out the form with your rule modification details, including a clear title, instructions, and any relevant tags. Make sure to provide clear, balanced, and playable rules.",
    category: "Recipe Creation & Management"
  },
  {
    question: "What makes a good recipe?",
    answer: "A good recipe should be clear, balanced, and enhance the gameplay experience. Consider these factors: clarity of instructions, balance and fairness, playability, creativity, and how well it integrates with existing MTG rules. Include examples and edge cases when possible.",
    category: "Recipe Creation & Management"
  },
  {
    question: "Can I edit my recipes after posting?",
    answer: "Yes, you can edit your recipes after posting. Go to your recipe page and look for the &apos;Edit Recipe&apos; button (only visible to you as the author). You can update the title, instructions, tags, and other details as needed.",
    category: "Recipe Creation & Management"
  },
  {
    question: "Can I delete my recipes?",
    answer: "Yes, you can delete your own recipes. On your recipe page, you&apos;ll see a &apos;Delete Recipe&apos; button (only visible to you as the author). Please note that deleting a recipe will permanently remove it and all associated votes, bookmarks, and comments.",
    category: "Recipe Creation & Management"
  },
  {
    question: "How do I add attachments to my recipes?",
    answer: "When creating or editing a recipe, you can add attachments by providing a link to external files (like Google Drive PDFs). This is useful for sharing detailed rule documents, card lists, or other supporting materials. Make sure the link is publicly accessible.",
    category: "Recipe Creation & Management"
  },
  {
    question: "What are tags and how do I use them?",
    answer: "Tags help categorize and organize recipes. They make it easier for users to find content that matches their interests. When creating a recipe, you can add relevant tags like &apos;commander&apos;, &apos;multiplayer&apos;, &apos;budget-friendly&apos;, &apos;competitive&apos;, etc. Use tags that accurately describe your recipe&apos;s theme or playstyle.",
    category: "Recipe Creation & Management"
  },

  // Community & Interaction
  {
    question: "How do I vote on recipes?",
    answer: "To vote on recipes, you need to be logged in. On any recipe page, you&apos;ll see voting buttons (thumbs up/down) that allow you to express your opinion about the recipe. Your votes help the community identify quality content and help recipes gain visibility.",
    category: "Community & Interaction"
  },
  {
    question: "What does the 'Tried This' feature do?",
    answer: "The &apos;Tried This&apos; feature lets you mark recipes you&apos;ve actually played with. This helps other users see which recipes have been tested and enjoyed by the community. It&apos;s a great way to share your experience and help others discover quality content.",
    category: "Community & Interaction"
  },
  {
    question: "How do I bookmark recipes?",
    answer: "To bookmark a recipe, click the bookmark icon on any recipe page. This will save the recipe to your profile for easy access later. You can view all your bookmarked recipes in your profile&apos;s &apos;Bookmarks&apos; tab.",
    category: "Community & Interaction"
  },
  {
    question: "How do I report inappropriate content?",
    answer: "To report inappropriate content, click the &apos;Report&apos; button on any recipe page. Provide a reason for your report, and our moderation team will review it within 24 hours. We take community standards seriously and will take appropriate action on violations.",
    category: "Community & Interaction"
  },
  {
    question: "What are the community guidelines?",
    answer: "Our community guidelines promote respectful, constructive, and inclusive interactions. We expect users to be respectful of others, avoid hate speech or harassment, and contribute positively to the community. For detailed guidelines, visit our Community Guidelines page.",
    category: "Community & Interaction"
  },

  // Badges & Achievements
  {
    question: "What are badges and how do I earn them?",
    answer: "Badges are achievements you can earn for various activities on MTG Mods. You can earn badges for creating your first recipe, reaching voting milestones, being helpful to the community, and more. Badges appear on your profile and help showcase your contributions to the community.",
    category: "Badges & Achievements"
  },
  {
    question: "How do I see my badges?",
    answer: "You can view your badges on your profile page. Click on your profile picture in the navigation, then go to &apos;My Profile&apos; to see all the badges you&apos;ve earned. Badges are organized by category and show your achievements and contributions to the community.",
    category: "Badges & Achievements"
  },
  {
    question: "Do badges expire?",
    answer: "No, badges are permanent achievements that you keep forever once earned. They represent your contributions and milestones on the platform and will always be visible on your profile.",
    category: "Badges & Achievements"
  },

  // Technical & Support
  {
    question: "What browsers are supported?",
    answer: "MTG Mods works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience. Some features may not work properly on older browsers.",
    category: "Technical & Support"
  },
  {
    question: "Is MTG Mods mobile-friendly?",
    answer: "Yes! MTG Mods is fully responsive and works great on mobile devices. You can browse recipes, create content, and interact with the community from your smartphone or tablet. The interface automatically adjusts to provide the best experience on your device.",
    category: "Technical & Support"
  },
  {
    question: "How do I contact support?",
    answer: "If you need help or have questions not answered in this FAQ, you can contact us through our Contact page. We typically respond within 24 hours. For urgent issues, you can also reach out to us at mtgmodsofficial@gmail.com.",
    category: "Technical & Support"
  },
  {
    question: "What if I find a bug or technical issue?",
    answer: "If you encounter a bug or technical issue, please report it through our Contact page. Include as much detail as possible about what happened, what you were trying to do, and what browser/device you were using. This helps us fix issues quickly.",
    category: "Technical & Support"
  },

  // Privacy & Security
  {
    question: "Is my personal information secure?",
    answer: "Yes, we take your privacy and security seriously. We use industry-standard security measures to protect your personal information. We never share your personal data with third parties without your consent, and you can review our Privacy Policy for more details.",
    category: "Privacy & Security"
  },
  {
    question: "What information do you collect?",
    answer: "We collect basic information needed to provide our services, including your email address, username, and profile information. We also collect usage data to improve our platform. For detailed information about what we collect and how we use it, please see our Privacy Policy.",
    category: "Privacy & Security"
  },
  {
    question: "Can I delete my account?",
    answer: "Yes, you can delete your account by contacting us through our Contact page. Please note that deleting your account will permanently remove all your content, including recipes, votes, and bookmarks. This action cannot be undone.",
    category: "Privacy & Security"
  }
];

const categories = [...new Set(faqData.map(item => item.category))];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#5A31F4] mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about MTG Mods, recipe creation, user accounts, and more.
        </p>
      </div>

      {/* Category Navigation */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-[#5A31F4] hover:text-[#5A31F4] transition-colors"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')}>
            <h2 className="text-2xl font-bold text-[#2C2E3A] mb-6 border-b border-gray-200 pb-2">
              {category}
            </h2>
            <div className="space-y-6">
              {faqData
                .filter(item => item.category === category)
                .map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-[#5A31F4] mb-3">
                      {item.question}
                    </h3>
                    <div className="text-gray-700 leading-relaxed">
                      {typeof item.answer === 'string' ? (
                        <p>{item.answer}</p>
                      ) : (
                        item.answer
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>

      {/* Contact Section */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-[#2C2E3A] mb-4">Still Have Questions?</h2>
        <p className="text-gray-600 mb-6">
          If you couldn&apos;t find the answer you&apos;re looking for, we&apos;re here to help!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#5A31F4] text-white font-medium rounded-lg hover:bg-[#4A2BE4] transition-colors"
          >
            Contact Us
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href="mailto:mtgmodsofficial@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 border border-[#5A31F4] text-[#5A31F4] font-medium rounded-lg hover:bg-[#5A31F4] hover:text-white transition-colors"
          >
            Email Support
          </a>
        </div>
      </div>
    </div>
  );
} 