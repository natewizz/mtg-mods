"use client";
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProfileButton() {
  const { data: session, status } = useSession();
  const isLoggedIn = Boolean(session?.user?.username);
  const profileUrl = isLoggedIn ? `/profile/${session?.user?.username}` : null;

  if (status === 'loading') {
    return (
      <button className="px-6 py-3 rounded-lg bg-gray-200 text-gray-400 font-semibold cursor-wait" disabled>
        Loading...
      </button>
    );
  }

  return isLoggedIn ? (
    <Link href={profileUrl!} className="px-6 py-3 rounded-lg bg-[#F4A261] text-white font-semibold shadow hover:bg-[#e07a2d] transition-colors">
      Go to Profile
    </Link>
  ) : (
    <button className="px-6 py-3 rounded-lg bg-gray-300 text-gray-500 font-semibold cursor-not-allowed" disabled>
      Go to Profile
    </button>
  );
} 