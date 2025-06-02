export default function TermsOfService() {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#5A31F4]">Terms of Service</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Welcome to MTG Mods. These Terms of Service govern your use of our website located at 
            mtgmods.xyz and form a binding legal agreement between you and MTG Mods.
          </p>
          <p>
            By accessing or using our Service, you agree to be bound by these Terms. If you disagree 
            with any part of the terms, you may not access the Service.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Content</h2>
          <p>
            Our Service allows you to post, link, store, share and otherwise make available certain 
            information, text, graphics, or other material (&quot;Content&quot;). You are responsible for the 
            Content that you post on or through the Service, including its legality, reliability, 
            and appropriateness.
          </p>
          <p>
            By posting Content on or through the Service, You represent and warrant that:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms.</li>
            <li>The posting of your Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.</li>
            <li>Your content does not contain material that is harmful, offensive, or otherwise objectionable.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Accounts</h2>
          <p>
            When you create an account with us, you guarantee that the information you provide us is accurate, 
            complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in 
            the immediate termination of your account on the Service.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account and password, including but 
            not limited to the restriction of access to your computer and/or account. You agree to accept responsibility 
            for any and all activities or actions that occur under your account and/or password.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding Content provided by users), features and functionality 
            are and will remain the exclusive property of MTG Mods and its licensors. The Service is protected by 
            copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and 
            trade dress may not be used in connection with any product or service without the prior written consent 
            of MTG Mods.
          </p>
          <p>
            Magic: The Gathering is a trademark of Wizards of the Coast LLC. MTG Mods is not affiliated with, 
            endorsed by, or sponsored by Wizards of the Coast.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, without prior notice 
            or liability, under our sole discretion, for any reason whatsoever and without limitation, including but 
            not limited to a breach of the Terms.
          </p>
          <p>
            If you wish to terminate your account, you may simply discontinue using the Service or contact us to 
            request account deletion.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
            is material we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes 
            a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after any revisions become effective, you agree to be bound by 
            the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@mtgmods.xyz.
          </p>
        </section>
      </div>
      
      <div className="text-center mt-8 text-gray-500">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
  );
} 