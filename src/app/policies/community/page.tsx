export default function CommunityGuidelines() {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#5A31F4]">Community Guidelines</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Community Values</h2>
          <p>
            MTG Mods is a community-driven platform for sharing and discovering Magic: The Gathering 
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
          <h2 className="text-2xl font-semibold mb-4">3. Prohibited Content</h2>
          <p>
            The following types of content are not allowed on MTG Mods:
          </p>
          <ul className="list-disc pl-6">
            <li>Hate speech, discrimination, or content that targets individuals based on their identity</li>
            <li>Explicit, graphic, or adult content</li>
            <li>Content that promotes illegal activities</li>
            <li>Spam, scams, or misleading information</li>
            <li>Content that violates copyright or intellectual property rights</li>
            <li>Unrelated advertisements or solicitations</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Inclusivity</h2>
          <p>
            MTG Mods is for everyone who loves Magic: The Gathering, regardless of experience level, 
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
          <h2 className="text-2xl font-semibold mb-4">5. Reporting Violations</h2>
          <p>
            If you encounter content that violates these guidelines, please report it to us. We take 
            all reports seriously and will review them promptly.
          </p>
          <p>
            To report a violation, contact us at support@mtgmods.xyz with the following information:
          </p>
          <ul className="list-disc pl-6">
            <li>The URL or description of the content in question</li>
            <li>Which guideline(s) you believe it violates</li>
            <li>Any additional context you think is important</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Consequences</h2>
          <p>
            Violations of these guidelines may result in content removal, warnings, temporary 
            restrictions, or permanent account suspension, depending on the severity and frequency 
            of the violations.
          </p>
          <p>
            We strive to be fair and consistent in enforcement, but reserve the right to take 
            appropriate action at our discretion to maintain a positive community environment.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Feedback and Updates</h2>
          <p>
            These guidelines may evolve over time. We welcome feedback on how to improve them to better 
            serve our community.
          </p>
          <p>
            For suggestions or questions about our Community Guidelines, please contact us at 
            support@mtgmods.xyz.
          </p>
        </section>
      </div>
      
      <div className="text-center mt-8 text-gray-500">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
  );
} 