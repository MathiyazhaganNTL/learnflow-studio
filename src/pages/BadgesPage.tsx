import { GamificationPanel } from '@/components/gamification/GamificationPanel';

export default function BadgesPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">My Badges</h1>

      {/* Badges list & unlock logic */}
      <GamificationPanel />
    </div>
  );
}