import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Guidelines - Cantripped',
  description: 'Read the community guidelines for Cantripped. Learn about our community standards, moderation policies, and how to contribute positively.',
  keywords: ['community guidelines', 'rules', 'moderation', 'Cantripped', 'MTG', 'Magic the Gathering'],
  alternates: {
    canonical: 'https://www.cantripped.com/policies/community',
  },
  openGraph: {
    title: 'Community Guidelines - Cantripped',
    description: 'Read the community guidelines for Cantripped. Learn about our community standards, moderation policies, and how to contribute positively.',
    url: 'https://www.cantripped.com/policies/community',
    siteName: 'Cantripped',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Community%20Guidelines%20-%20Cantripped&description=Read%20the%20community%20guidelines%20for%20Cantripped&type=default`,
        width: 1200,
        height: 630,
        alt: 'Community Guidelines - Cantripped'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community Guidelines - Cantripped',
    description: 'Read the community guidelines for Cantripped. Learn about our community standards, moderation policies, and how to contribute positively.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Community%20Guidelines%20-%20Cantripped&description=Read%20the%20community%20guidelines%20for%20Cantripped&type=default`]
  }
};

export default function CommunityGuidelines() {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#5A31F4] mb-4">Community Guidelines</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Cantripped is a community-driven platform for sharing and discovering Magic: The Gathering
          rule modifications. These guidelines help us maintain a positive, inclusive environment
          where everyone can contribute and learn.
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Community Values</h2>
          <p>
            Cantripped is a community-driven platform for sharing and discovering Magic: The Gathering 
            rule modifications. We aim to foster a creative, respectful, and inclusive environment where 
            players of all backgrounds can share ideas to enhance their MTG experience.
          </p>
          <p>
            These guidelines help ensure our community remains a positive space for everyone. All users 
            are expected to adhere to these guidelines when using our platform.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Be Respectful</h2>
          <p>
            Treat others with the same respect you&apos;d like to receive. Disagreements are natural, but 
            keep discussions civil and constructive.
          </p>
          <ul className="list-disc pl-6">
            <li>No personal attacks, harassment, or bullying</li>
            <li>Avoid inflammatory language or deliberate provocation</li>
            <li>Respect others&apos; ideas and contributions, even if you disagree</li>
            <li>Provide constructive feedback rather than simply criticizing</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Create Quality Content</h2>
          <p>
            Our community thrives on thoughtful, well-crafted content. When sharing rule modifications 
            and recipes:
          </p>
          <ul className="list-disc pl-6">
            <li>Be clear and thorough in your explanations</li>
            <li>Proofread your content before posting</li>
            <li>Credit others if you&apos;re building on or modifying their ideas</li>
            <li>Consider playability, balance, and fun factor in your rule modifications</li>
            <li>Test your modifications before sharing when possible</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#5A31F4]">Prohibited Content</h3>
          <p className="text-gray-700 mb-4">
            The following types of content are not allowed on Cantripped:
          </p>
          <ul className="list-disc pl-6">
            <li>Hate speech, discrimination, or content that targets individuals based on their identity</li>
            <li>Explicit, graphic, or adult content</li>
            <li>Content that promotes illegal activities</li>
            <li>Spam, scams, or misleading information</li>
            <li>Content that violates copyright or intellectual property rights</li>
            <li>Unrelated advertisements or solicitations</li>
            <li><strong>Offensive language, profanity, or inappropriate content</strong> - Our automated content filter will prevent submission of recipes containing offensive terms</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Content Filtering System</h2>
          <p>
            To maintain a family-friendly environment, we have implemented an automated content filtering system:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Automated Detection:</strong> Our system automatically detects and prevents submission of content containing offensive language</li>
            <li><strong>Comprehensive Filtering:</strong> The filter includes profanity, hate speech, sexual content, violence, and drug-related terms</li>
            <li><strong>Evasion Detection:</strong> The system can detect attempts to bypass filters using spaces, dots, dashes, or underscores between letters (e.g., &quot;f u c k&quot;, &quot;s.h.i.t&quot;)</li>
            <li><strong>Real-time Prevention:</strong> Offensive content is blocked before it reaches the homepage, ensuring a clean community experience</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Inclusivity</h2>
          <p>
            Cantripped is for everyone who loves Magic: The Gathering, regardless of experience level, 
            background, or identity. We strive to be welcoming to all community members.
          </p>
          <ul className="list-disc pl-6">
            <li>Be patient with new players or those less familiar with certain concepts</li>
            <li>Avoid gatekeeping or elitist attitudes</li>
            <li>Consider accessibility in your communications</li>
            <li>Use inclusive language whenever possible</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Reporting System</h2>
          <p>
            We have implemented a comprehensive reporting system to help maintain community standards:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Report Button:</strong> Each recipe page features a &quot;Report&quot; button for easy reporting of inappropriate content</li>
            <li><strong>Admin Review:</strong> All reports are reviewed by our moderation team</li>
            <li><strong>Quick Response:</strong> We aim to review and take action on reports within 24 hours</li>
            <li><strong>Multiple Actions:</strong> Moderators can dismiss reports or remove content based on severity</li>
          </ul>
          <p>
            To report content that violates our guidelines:
          </p>
          <ul className="list-disc pl-6">
            <li>Click the &quot;Report&quot; button on any recipe page</li>
            <li>Provide a reason for your report</li>
            <li>Our moderation team will review and take appropriate action</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. User Strikes and Banning System</h2>
          <p>
            To ensure fair and consistent enforcement, we have implemented a progressive strike system:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>First Violation:</strong> Users receive a strike and a warning banner appears on their profile</li>
            <li><strong>Second Violation:</strong> Users receive a second strike and their account is automatically banned</li>
            <li><strong>Banned Status:</strong> Banned users cannot create new content, vote, or interact with recipes</li>
            <li><strong>Strike History:</strong> All strikes are recorded with reasons and associated content</li>
          </ul>
          <p>
            <strong>What constitutes a violation:</strong>
          </p>
          <ul className="list-disc pl-6">
            <li>Creating content that violates our prohibited content guidelines</li>
            <li>Attempting to bypass content filters</li>
            <li>Repeated violations of community guidelines</li>
            <li>Harassment or abusive behavior toward other users</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Consequences</h2>
          <p>
            Violations of these guidelines may result in:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Content Removal:</strong> Inappropriate content will be removed from the platform</li>
            <li><strong>User Strikes:</strong> Violations result in strikes against your account</li>
            <li><strong>Account Suspension:</strong> Multiple violations lead to temporary or permanent account suspension</li>
            <li><strong>Permanent Banning:</strong> Severe or repeated violations result in permanent account banning</li>
          </ul>
          <p>
            We strive to be fair and consistent in enforcement, but reserve the right to take 
            appropriate action at our discretion to maintain a positive community environment.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Feedback and Updates</h2>
          <p>
            These guidelines may evolve over time. We welcome feedback on how to improve them to better 
            serve our community.
          </p>
          <p>
            For suggestions or questions about our Community Guidelines, please contact us at 
            cantrippedofficial@gmail.com.
          </p>
        </section>
      </div>
      
      <div className="text-center mt-8 text-gray-500">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
  );
} 