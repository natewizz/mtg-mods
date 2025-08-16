import Link from 'next/link';
import Image from 'next/image';
import ProfileButton from './ProfileButton404';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#5A31F4]/10 to-white px-4">
              <Image src="/images/logo.png" alt="Cantripped Logo" width={120} height={120} className="mb-6" />
      <h1 className="text-5xl font-extrabold text-[var(--primary)] mb-4 drop-shadow-lg">404: Card Not Found</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Looks like you tried to cast a spell that doesn&apos;t exist.<br />
        Return to the battlefield or try a different deck!
      </p>
      <div className="flex gap-4">
        <Link href="/" className="px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-semibold shadow hover:bg-[var(--primary-dark)] transition-colors">
          Back to Home
        </Link>
        <ProfileButton />
      </div>
              <div className="mt-12 text-sm text-gray-400">Cantripped &copy; {new Date().getFullYear()}</div>
    </div>
  );
} 