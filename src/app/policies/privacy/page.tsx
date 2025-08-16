import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Cantripped',
  description: 'Read the privacy policy for Cantripped. Learn how we collect, use, and protect your personal information.',
  keywords: ['privacy policy', 'data protection', 'personal information', 'Cantripped', 'MTG', 'Magic the Gathering'],
  alternates: {
    canonical: 'https://www.cantripped.com/policies/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - Cantripped',
    description: 'Read the privacy policy for Cantripped. Learn how we collect, use, and protect your personal information.',
    url: 'https://www.cantripped.com/policies/privacy',
    siteName: 'Cantripped',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Privacy%20Policy%20-%20Cantripped&description=Read%20the%20privacy%20policy%20for%20Cantripped&type=default`,
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - Cantripped'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Cantripped',
    description: 'Read the privacy policy for Cantripped. Learn how we collect, use, and protect your personal information.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Privacy%20Policy%20-%20Cantripped&description=Read%20the%20privacy%20policy%20for%20Cantripped&type=default`]
  }
};

export default function PrivacyPolicy() {
  return (
    <div className="prose prose-lg mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#5A31F4]">Privacy Policy</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            At Cantripped, we respect your privacy and are committed to protecting it through our
            compliance with this policy.
          </p>
          <p>
            By accessing or using our Service, you agree to this Privacy Policy. If you do not agree 
            with our policies and practices, your choice is not to use our website.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <h3 className="text-xl font-medium mb-2">Personal Information</h3>
          <p className="mb-4">
            When you create an account, we collect:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your name</li>
            <li>Email address</li>
            <li>Username</li>
            <li>Profile information you choose to provide</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2">Authentication Information</h3>
          <p className="mb-4">
            When you sign in with third-party providers like Google or Discord, we receive basic profile 
            information they provide, which may include:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Profile picture</li>
          </ul>
          
          <h3 className="text-xl font-medium mb-2">Usage Information</h3>
          <p>
            We collect information about how you use our website, including:
          </p>
          <ul className="list-disc pl-6">
            <li>Pages you visit</li>
            <li>Actions you take</li>
            <li>Features you use</li>
            <li>Your device and browser information</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="mb-2">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6">
            <li>Provide and maintain our Service</li>
            <li>Improve and personalize your experience</li>
            <li>Communicate with you about your account or our Service</li>
            <li>Monitor and analyze usage patterns</li>
            <li>Protect against unauthorized access and activities</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and 
            store certain information. Cookies are files with a small amount of data which may 
            include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being 
            sent. However, if you do not accept cookies, you may not be able to use some portions of 
            our Service.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
          <p className="mb-2">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6">
            <li>With service providers who perform services on our behalf</li>
            <li>To comply with legal obligations</li>
            <li>To protect and defend our rights and property</li>
            <li>With your consent or at your direction</li>
          </ul>
          <p className="mt-4">
            We do not sell your personal information to third parties.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p>
            We implement reasonable security measures designed to protect your personal information 
            from unauthorized access and use. However, please be aware that no method of transmission 
            over the Internet or method of electronic storage is 100% secure.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, 
            such as the right to access, correct, or delete your data. To exercise these rights, please 
            contact us using the information provided below.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to 
            this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="mt-6 text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at cantrippedofficial@gmail.com.
          </p>
        </section>
      </div>
      
      <div className="text-center mt-8 text-gray-500">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
  );
} 