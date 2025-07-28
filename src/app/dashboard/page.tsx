import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { authOptions } from '../../auth';
import { addMonths, format, subMonths, startOfMonth, subDays, addDays } from 'date-fns';
import { UserGrowthChart } from './components/UserGrowthChart';
import { RecipeGrowthChart } from './components/RecipeGrowthChart';
import { ActiveUsersChart } from './components/ActiveUsersChart';
import { InteractionsChart } from './components/InteractionsChart';
import { TagPieChart } from './components/TagPieChart';
import { SignupsByProviderChart } from './components/SignupsByProviderChart';
import ContentReports from '@/components/admin/ContentReports';
import UserStrikes from '@/components/admin/UserStrikes';
import AdminNotifications from '@/components/admin/AdminNotifications';
import Image from 'next/image';

// User type for dashboard tables
interface DashboardUser {
  id: string;
  name?: string | null;
  username?: string | null;
  image?: string | null;
  recipes?: { id?: string; votes?: { value: number }[]; bookmarks?: { id: string }[] }[];
  votes?: { id: string }[];
  bookmarks?: { id: string }[];
  tried?: { id: string }[];
}

// Recipe type for dashboard tables
interface DashboardRecipe {
  id: string;
  title: string;
  votes?: { id: string; value?: number }[];
  bookmarks?: { id: string }[];
  tried?: { id: string }[];
  author?: { name?: string | null; username?: string | null; image?: string | null };
  updatedAt?: string | Date;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'ADMIN') redirect('/');

  // Date helpers
  const now = new Date();
  const last30Days = subDays(now, 30);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _last7Days = subDays(now, 7);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _last1Day = subDays(now, 1);
  const months = Array.from({ length: 12 }, (_, i) => format(addMonths(startOfMonth(subMonths(now, 11 - i)), 0), 'yyyy-MM'));
  const days = Array.from({ length: 30 }, (_, i) => format(addDays(last30Days, i), 'yyyy-MM-dd'));
  const weeks = Array.from({ length: 12 }, (_, i) => format(addDays(last30Days, i * 7), 'yyyy-ww'));

  // KPIs and advanced metrics
  const [
    userCount,
    recipeCount,
    voteCount,
    bookmarkCount,
    triedCount,
    activeUserCount,
    userGrowth,
    recipeGrowth,
    tagDistribution,
    topUsersByRecipes,
    topUsersByLikes,
    topUsersByBookmarks,
    topRecipesByLikes,
    topRecipesByBookmarks,
    topRecipesByTried,
    dailyActiveUsers,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _weeklyActiveUsers,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _retention1d,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _retention7d,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _retention30d,
    mostActiveUsers,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _recipesPerDay,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _recipesPerWeek,
    recipesMostContributors,
    interactionsPerDay,
    interactionRate,
    recipesNoInteractions,
    signupsByProvider,
    churnedUsers,
    newVsReturning,
    recipesMostEdits,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _mostCommentedRecipes,
    contentReports,
    contentReportsByStatus
  ] = await Promise.all([
    prisma.user.count(),
    prisma.recipe.count(),
    prisma.vote.count(),
    prisma.bookmark.count(),
    prisma.tried.count(),
    // Active users: created or posted a recipe in last 30 days
    prisma.user.count({
      where: {
        OR: [
          { emailVerified: { gte: last30Days } },
          { recipes: { some: { createdAt: { gte: last30Days } } } },
        ],
      },
    }),
    // User growth (last 12 months)
    Promise.all(months.map(month => {
      const [year, m] = month.split('-');
      return prisma.user.count({
        where: {
          emailVerified: {
            gte: new Date(Number(year), Number(m) - 1, 1),
            lt: new Date(Number(year), Number(m), 1),
          },
        },
      });
    })),
    // Recipe growth (last 12 months)
    Promise.all(months.map(month => {
      const [year, m] = month.split('-');
      return prisma.recipe.count({
        where: {
          createdAt: {
            gte: new Date(Number(year), Number(m) - 1, 1),
            lt: new Date(Number(year), Number(m), 1),
          },
        },
      });
    })),
    // Tag distribution (pie chart)
    prisma.recipeTag.groupBy({
      by: ['name'],
      _count: { name: true },
      orderBy: { _count: { name: 'desc' } },
      take: 10,
    }),
    // Top 5 users by recipe count
    prisma.user.findMany({
      orderBy: { recipes: { _count: 'desc' } },
      take: 5,
      select: { id: true, name: true, username: true, image: true, recipes: { select: { id: true } } },
    }),
    // Top 5 users by likes (votes on their recipes)
    prisma.user.findMany({
      take: 5,
      orderBy: {
        recipes: {
          _count: 'desc',
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        recipes: {
          select: {
            votes: { select: { value: true } },
          },
        },
      },
    }),
    // Top 5 users by bookmarks (bookmarks on their recipes)
    prisma.user.findMany({
      take: 5,
      orderBy: {
        recipes: {
          _count: 'desc',
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        recipes: {
          select: {
            bookmarks: true,
          },
        },
      },
    }),
    // Top 5 recipes by likes
    prisma.recipe.findMany({
      orderBy: { votes: { _count: 'desc' } },
      take: 5,
      select: { id: true, title: true, votes: true, author: { select: { name: true, username: true, image: true } } },
    }),
    // Top 5 recipes by bookmarks
    prisma.recipe.findMany({
      orderBy: { bookmarks: { _count: 'desc' } },
      take: 5,
      select: { id: true, title: true, bookmarks: true, author: { select: { name: true, username: true, image: true } } },
    }),
    // Top 5 recipes by tried
    prisma.recipe.findMany({
      orderBy: { tried: { _count: 'desc' } },
      take: 5,
      select: { id: true, title: true, tried: true, author: { select: { name: true, username: true, image: true } } },
    }),
    // Daily active users (last 30 days)
    Promise.all(days.map(day => {
      const start = new Date(day);
      const end = addDays(start, 1);
      return prisma.user.count({
        where: {
          OR: [
            { emailVerified: { gte: start, lt: end } },
            { recipes: { some: { createdAt: { gte: start, lt: end } } } },
            { votes: { some: { createdAt: { gte: start, lt: end } } } },
            { bookmarks: { some: { createdAt: { gte: start, lt: end } } } },
            { tried: { some: { createdAt: { gte: start, lt: end } } } },
          ],
        },
      });
    })),
    // Weekly active users (last 12 weeks)
    Promise.all(weeks.map(week => {
      const [year, weekNum] = week.split('-');
      const start = startOfWeekISO(year, weekNum);
      const end = addDays(start, 7);
      return prisma.user.count({
        where: {
          OR: [
            { emailVerified: { gte: start, lt: end } },
            { recipes: { some: { createdAt: { gte: start, lt: end } } } },
            { votes: { some: { createdAt: { gte: start, lt: end } } } },
            { bookmarks: { some: { createdAt: { gte: start, lt: end } } } },
            { tried: { some: { createdAt: { gte: start, lt: end } } } },
          ],
        },
      });
    })),
    // User retention (1, 7, 30 days)
    prisma.user.count({
      where: {
        emailVerified: { gte: subDays(now, 31), lt: subDays(now, 30) },
        OR: [
          { recipes: { some: { createdAt: { gte: subDays(now, 30) } } } },
          { votes: { some: { createdAt: { gte: subDays(now, 30) } } } },
          { bookmarks: { some: { createdAt: { gte: subDays(now, 30) } } } },
          { tried: { some: { createdAt: { gte: subDays(now, 30) } } } },
        ],
      },
    }),
    prisma.user.count({
      where: {
        emailVerified: { gte: subDays(now, 8), lt: subDays(now, 7) },
        OR: [
          { recipes: { some: { createdAt: { gte: subDays(now, 7) } } } },
          { votes: { some: { createdAt: { gte: subDays(now, 7) } } } },
          { bookmarks: { some: { createdAt: { gte: subDays(now, 7) } } } },
          { tried: { some: { createdAt: { gte: subDays(now, 7) } } } },
        ],
      },
    }),
    prisma.user.count({
      where: {
        emailVerified: { gte: subDays(now, 2), lt: subDays(now, 1) },
        OR: [
          { recipes: { some: { createdAt: { gte: subDays(now, 1) } } } },
          { votes: { some: { createdAt: { gte: subDays(now, 1) } } } },
          { bookmarks: { some: { createdAt: { gte: subDays(now, 1) } } } },
          { tried: { some: { createdAt: { gte: subDays(now, 1) } } } },
        ],
      },
    }),
    // Most active users (last 30d)
    prisma.user.findMany({
      take: 5,
      orderBy: [
        { recipes: { _count: 'desc' } },
        { votes: { _count: 'desc' } },
        { bookmarks: { _count: 'desc' } },
        { tried: { _count: 'desc' } },
      ],
      where: {
        OR: [
          { recipes: { some: { createdAt: { gte: last30Days } } } },
          { votes: { some: { createdAt: { gte: last30Days } } } },
          { bookmarks: { some: { createdAt: { gte: last30Days } } } },
          { tried: { some: { createdAt: { gte: last30Days } } } },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        recipes: { select: { id: true } },
        votes: { select: { id: true } },
        bookmarks: { select: { id: true } },
        tried: { select: { id: true } },
      },
    }),
    // Recipes created per day (last 30 days)
    Promise.all(days.map(day => {
      const start = new Date(day);
      const end = addDays(start, 1);
      return prisma.recipe.count({
        where: { createdAt: { gte: start, lt: end } },
      });
    })),
    // Recipes created per week (last 12 weeks)
    Promise.all(weeks.map(week => {
      const [year, weekNum] = week.split('-');
      const start = startOfWeekISO(year, weekNum);
      const end = addDays(start, 7);
      return prisma.recipe.count({
        where: { createdAt: { gte: start, lt: end } },
      });
    })),
    // Recipes with most unique contributors (votes/bookmarks/tried)
    prisma.recipe.findMany({
      take: 5,
      orderBy: [
        { votes: { _count: 'desc' } },
        { bookmarks: { _count: 'desc' } },
        { tried: { _count: 'desc' } },
      ],
      select: {
        id: true,
        title: true,
        votes: { select: { userId: true } },
        bookmarks: { select: { userId: true } },
        tried: { select: { userId: true } },
      },
    }),
    // Total interactions per day (last 30 days)
    Promise.all(days.map(async day => {
      const start = new Date(day);
      const end = addDays(start, 1);
      const [votes, bookmarks, tried] = await Promise.all([
        prisma.vote.count({ where: { createdAt: { gte: start, lt: end } } }),
        prisma.bookmark.count({ where: { createdAt: { gte: start, lt: end } } }),
        prisma.tried.count({ where: { createdAt: { gte: start, lt: end } } }),
      ]);
      return votes + bookmarks + tried;
    })),
    // Interaction rate (avg per recipe)
    (async () => {
      const [votes, bookmarks, tried, recipes] = await Promise.all([
        prisma.vote.count(),
        prisma.bookmark.count(),
        prisma.tried.count(),
        prisma.recipe.count(),
      ]);
      return recipes > 0 ? (votes + bookmarks + tried) / recipes : 0;
    })(),
    // Recipes with no interactions
    prisma.recipe.findMany({
      where: {
        votes: { none: {} },
        bookmarks: { none: {} },
        tried: { none: {} },
      },
      select: { id: true, title: true },
    }),
    // Signups by provider
    prisma.account.groupBy({
      by: ['provider'],
      _count: { provider: true },
      orderBy: { _count: { provider: 'desc' } },
    }),
    // Churned users (signed up but no activity in last 30 days)
    prisma.user.findMany({
      where: {
        emailVerified: { lte: last30Days },
        recipes: { none: { createdAt: { gte: last30Days } } },
        votes: { none: { createdAt: { gte: last30Days } } },
        bookmarks: { none: { createdAt: { gte: last30Days } } },
        tried: { none: { createdAt: { gte: last30Days } } },
      },
      select: { id: true, name: true, username: true, email: true },
    }),
    // New vs returning users (last 30 days)
    (async () => {
      const newUsers = await prisma.user.count({ where: { emailVerified: { gte: last30Days } } });
      const returningUsers = await prisma.user.count({
        where: {
          emailVerified: { lt: last30Days },
          OR: [
            { recipes: { some: { createdAt: { gte: last30Days } } } },
            { votes: { some: { createdAt: { gte: last30Days } } } },
            { bookmarks: { some: { createdAt: { gte: last30Days } } } },
            { tried: { some: { createdAt: { gte: last30Days } } } },
          ],
        },
      });
      return { newUsers, returningUsers };
    })(),
    // Recipes with most edits/updates
    prisma.recipe.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, updatedAt: true, author: { select: { name: true, username: true } } },
    }),
    // Most commented recipes (if comments exist)
    Promise.resolve([]),
    // Content reports (placeholder for now)
    Promise.resolve([]),
    // Content reports count by status (placeholder for now)
    Promise.resolve([])
  ]);

  // Helper for ISO week start
  function startOfWeekISO(year: string, week: string) {
    const y = Number(year);
    const w = parseInt(week);
    const simple = new Date(y, 0, 1 + (w - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  // Prepare data for charts
  const userGrowthData = months.map((month, i) => ({ month, count: userGrowth[i] }));
  const recipeGrowthData = months.map((month, i) => ({ month, count: recipeGrowth[i] }));
  const tagPieData = tagDistribution.map(t => ({ name: t.name, value: t._count.name }));

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 md:px-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <KpiCard label="Total Users" value={userCount} />
        <KpiCard label="Active Users (30d)" value={activeUserCount} />
        <KpiCard label="Total Recipes" value={recipeCount} />
        <KpiCard label="Total Likes" value={voteCount} />
        <KpiCard label="Total Bookmarks" value={bookmarkCount} />
        <KpiCard label="Total Tried" value={triedCount} />
        <KpiCard label="Interaction Rate" value={interactionRate.toFixed(2)} />
      </div>

      {/* Growth & Activity Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartCard title="User Growth (12mo)">
          <UserGrowthChart data={userGrowthData} />
        </ChartCard>
        <ChartCard title="Recipe Growth (12mo)">
          <RecipeGrowthChart data={recipeGrowthData} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartCard title="Active Users (Daily, 30d)">
          <ActiveUsersChart data={days.map((d, i) => ({ day: d.slice(5), count: dailyActiveUsers[i] }))} />
        </ChartCard>
        <ChartCard title="Total Interactions (Daily, 30d)">
          <InteractionsChart data={days.map((d, i) => ({ day: d.slice(5), count: interactionsPerDay[i] }))} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartCard title="Tag Distribution (Top 10)">
          <TagPieChart data={tagPieData} />
        </ChartCard>
        <ChartCard title="Signups by Provider">
          <SignupsByProviderChart data={signupsByProvider.map(p => ({ provider: p.provider, count: p._count.provider }))} />
        </ChartCard>
      </div>

      {/* Top Users & Recipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TableCard title="Top Users by Recipes" columns={["User", "Recipes"]} rows={topUsersByRecipes.map(u => [<UserCell user={u} key={u.id} />, u.recipes.length])} />
        <TableCard title="Top Users by Likes" columns={["User", "Likes"]} rows={topUsersByLikes.map(u => [<UserCell user={u} key={u.id} />, u.recipes.reduce((sum, r) => sum + r.votes.length, 0)])} />
        <TableCard title="Top Users by Bookmarks" columns={["User", "Bookmarks"]} rows={topUsersByBookmarks.map(u => [<UserCell user={u} key={u.id} />, u.recipes.reduce((sum, r) => sum + r.bookmarks.length, 0)])} />
        <TableCard title="Most Active Users (30d)" columns={["User", "Activity"]} rows={mostActiveUsers.map(u => [<UserCell user={u} key={u.id} />, u.recipes.length + u.votes.length + u.bookmarks.length + u.tried.length])} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TableCard title="Top Recipes by Likes" columns={["Recipe", "Likes"]} rows={topRecipesByLikes.map(r => [<RecipeCell recipe={r} key={r.id} />, r.votes.length])} />
        <TableCard title="Top Recipes by Bookmarks" columns={["Recipe", "Bookmarks"]} rows={topRecipesByBookmarks.map(r => [<RecipeCell recipe={r} key={r.id} />, r.bookmarks.length])} />
        <TableCard title="Top Recipes by Tried" columns={["Recipe", "Tried"]} rows={topRecipesByTried.map(r => [<RecipeCell recipe={r} key={r.id} />, r.tried.length])} />
        <TableCard title="Recipes with Most Edits" columns={["Recipe", "Last Updated"]} rows={recipesMostEdits.map(r => [<RecipeCell recipe={r} key={r.id} />, r.updatedAt ? new Date(r.updatedAt).toLocaleDateString() : "-"])} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TableCard title="Recipes with Most Unique Contributors" columns={["Recipe", "Contributors"]} rows={recipesMostContributors.map(r => [r.title, new Set([...r.votes.map(v => v.userId), ...r.bookmarks.map(b => b.userId), ...r.tried.map(t => t.userId)]).size])} />
        <TableCard title="Recipes with No Interactions" columns={["Recipe"]} rows={recipesNoInteractions.map(r => [r.title])} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TableCard title="Churned Users (No Activity 30d)" columns={["User", "Email"]} rows={churnedUsers.map(u => [u.name || u.username, u.email])} />
        <TableCard title="New vs Returning Users (30d)" columns={["Type", "Count"]} rows={[["New", newVsReturning.newUsers], ["Returning", newVsReturning.returningUsers]]} />
      </div>

      {/* Content Reports Section */}
              <AdminNotifications />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ContentReports />
          <UserStrikes />
        </div>
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <span className="text-2xl font-bold text-[#5A31F4]">{value}</span>
      <span className="text-gray-600 mt-2 text-sm font-medium">{label}</span>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-2 text-[#2C2E3A]">{title}</h2>
      {children}
    </div>
  );
}

function TableCard({ title, columns, rows }: { title: string; columns: string[]; rows: (React.ReactNode | string | number)[][] }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2 text-[#2C2E3A]">{title}</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} className="px-2 py-1 text-left text-gray-700 font-medium">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="px-2 py-1 whitespace-nowrap">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserCell({ user }: { user: DashboardUser }) {
  return (
    <div className="flex items-center gap-2">
      {user.image && (
        <Image
          src={user.image}
          alt={user.name || user.username || 'User'}
          width={24}
          height={24}
          className="w-6 h-6 rounded-full object-cover"
        />
      )}
      <span>{user.name || user.username}</span>
    </div>
  );
}

function RecipeCell({ recipe }: { recipe: DashboardRecipe }) {
  return (
    <div>
      <span className="font-medium">{recipe.title}</span>
      {recipe.author && (
        <span className="ml-2 text-xs text-gray-500">by {recipe.author.username || recipe.author.name}</span>
      )}
    </div>
  );
} 