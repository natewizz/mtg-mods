export const metadata = {
  title: 'Contact MTG Mods | Magic: The Gathering Community',
  description: 'Contact the MTG Mods team for support, feedback, or partnership inquiries. Join our Discord or send us a message directly.',
  keywords: [
    'Magic the Gathering', 'MTG', 'contact', 'support', 'feedback', 'community', 'Discord', 'email', 'help', 'partnership'
  ],
  alternates: {
    canonical: 'https://www.mtgmods.xyz/contact',
  },
  openGraph: {
    title: 'Contact MTG Mods | Magic: The Gathering Community',
    description: 'Contact the MTG Mods team for support, feedback, or partnership inquiries. Join our Discord or send us a message directly.',
    url: "https://www.mtgmods.xyz/contact",
    siteName: 'MTG Mods',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=Contact%20MTG%20Mods&description=Contact%20the%20MTG%20Mods%20team%20for%20support%2C%20feedback%2C%20or%20partnership%20inquiries&type=default`,
        width: 1200,
        height: 630,
        alt: 'Contact MTG Mods - Magic: The Gathering Community'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact MTG Mods | Magic: The Gathering Community',
    description: 'Contact the MTG Mods team for support, feedback, or partnership inquiries. Join our Discord or send us a message directly.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL || 'https://www.mtgmods.xyz'}/api/og?title=Contact%20MTG%20Mods&description=Contact%20the%20MTG%20Mods%20team%20for%20support%2C%20feedback%2C%20or%20partnership%20inquiries&type=default`]
  }
}; 