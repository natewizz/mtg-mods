import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Cantripped | Magic: The Gathering Community',
  description: 'Contact the Cantripped team for support, feedback, or partnership inquiries. Join our Discord or send us a message directly.',
  keywords: ['contact', 'support', 'feedback', 'Cantripped', 'Magic the Gathering', 'community'],
  alternates: {
    canonical: 'https://www.cantripped.com/contact',
  },
  openGraph: {
    title: 'Contact Cantripped | Magic: The Gathering Community',
    description: 'Contact the Cantripped team for support, feedback, or partnership inquiries. Join our Discord or send us a message directly.',
    url: "https://www.cantripped.com/contact",
    siteName: 'Cantripped',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Contact%20Cantripped&description=Contact%20the%20Cantripped%20team%20for%20support%2C%20feedback%2C%20or%20partnership%20inquiries&type=default`,
        width: 1200,
        height: 630,
        alt: 'Contact Cantripped - Magic: The Gathering Community'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Cantripped | Magic: The Gathering Community',
    description: 'Contact the Cantripped team for support, feedback, or partnership inquiries. Join our Discord or send us a message directly.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.cantripped.com'}/api/og?title=Contact%20Cantripped&description=Contact%20the%20Cantripped%20team%20for%20support%2C%20feedback%2C%20or%20partnership%20inquiries&type=default`]
  }
}; 