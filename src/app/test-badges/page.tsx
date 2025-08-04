import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '../../auth';
import UserBadgeCollection from '@/components/ui/UserBadgeCollection';

export default async function TestBadgesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/auth/signin');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Badge Test Page</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Your Badges</h2>
        <UserBadgeCollection userId={session.user.id} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Badge Collection (Compact)</h2>
        <UserBadgeCollection 
          userId={session.user.id} 
          showCategoryHeaders={false}
          maxDisplay={10}
          size="sm"
        />
      </div>
    </div>
  );
} 