import { useAuth, badges } from '@/contexts/AuthContext';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';

export function GamificationPanel() {
  const { user, currentBadge, nextBadge, progressToNextBadge } = useAuth();

  if (!user) return null;

  // Calculate rotation for circular progress - handled inline now

  return (
    <div className="rounded-2xl border border-border bg-gradient-to-b from-background to-muted/40 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="p-6">
        {/* User Info Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-semibold">{user.name}</h3>
          <div className="h-6 w-6 rounded-full border border-border flex items-center justify-center">
            {/* Simple clock icon placeholder for the wireframe's top right icon */}
            <div className="h-3 w-3 rounded-full border border-muted-foreground" />
          </div>
        </div>
        <div className="mb-6 h-px w-full bg-border/60" />

        {/* Circular Progress Section */}
        <div className="relative mb-8 flex flex-col items-center justify-center py-4">
          <div className="relative h-48 w-48">
            {/* Background Circle */}
            <svg className="h-full w-full -rotate-90 transform">
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                className="text-muted/60"
              />
              {/* Progress Circle */}
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={(2 * Math.PI * 88) - (progressToNextBadge / 100) * (2 * Math.PI * 88)}
                strokeLinecap="round"
                className="text-primary drop-shadow-sm transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center transition-transform duration-300 group-hover:scale-[1.02]">
              <span className="text-sm font-medium text-muted-foreground">Total {user.totalPoints}</span>
              <span className="text-sm font-medium text-muted-foreground">Points</span>
              {currentBadge && (
                <span className={cn(
                  "mt-1 text-2xl font-bold tracking-tight",
                  `text-${currentBadge.color.replace('badge-', '')}`
                )}>
                  {currentBadge.name}
                </span>
              )}
            </div>

            {/* Badge Tag equivalent */}
            {currentBadge && (
              <div className="absolute -right-2 top-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm transition-transform duration-300 hover:scale-105">
                {currentBadge.name}
              </div>
            )}
          </div>
        </div>

        {/* Badges List */}
        <div>
          <div className="mb-4 h-px w-full bg-border/60" />
          <h4 className="mb-4 font-semibold">Badges</h4>
          <div className="space-y-2">
            {badges.map((badge) => {
              const isUnlocked = user.totalPoints >= badge.requiredPoints;
              const isCurrent = currentBadge?.id === badge.id;

              return (
                <div key={badge.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-primary font-semibold" : "text-muted-foreground"
                    )}>
                      {badge.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {badge.requiredPoints} Points
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
