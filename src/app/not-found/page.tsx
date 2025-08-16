import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="text-center">
        <Image src="/images/logo.png" alt="Cantripped Logo" width={120} height={120} className="mb-6" />
        
        <h1 className="text-6xl font-bold text-[#5A31F4] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md text-center">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
          <Link href="/recipes" className="btn-contrast">
            Browse Recipes
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-400">Cantripped &copy; {new Date().getFullYear()}</div>
      </div>
    </div>
  );
}
