import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth, badges } from '@/contexts/AuthContext';
import { Trophy, Star, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GamificationPanel() {
  const { user, currentBadge, nextBadge, progressToNextBadge } = useAuth();

  if (!user) return null;

  const getBadgeIcon = (level: number) => {
    const icons = [Trophy, Star, Target, Zap, Trophy, Star];
    const Icon = icons[level - 1] || Trophy;
    return Icon;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card">
      {/* Points */}
      <div className="mb-6 text-center">
        <div className="mb-2 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
          <span className="text-3xl font-bold text-primary">{user.totalPoints}</span>
        </div>
        <p className="text-sm text-muted-foreground">Total Points</p>
      </div>

      {/* Current Badge */}
      {currentBadge && (
        <div className="mb-6">
          <div className="flex items-center justify-center gap-3">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full text-2xl",
              `bg-${currentBadge.color}/20`
            )}>
              {currentBadge.icon}
            </div>
            <div>
              <p className="font-semibold">{currentBadge.name}</p>
              <p className="text-sm text-muted-foreground">Level {currentBadge.level}</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress to Next Badge */}
      {nextBadge && (
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next: {nextBadge.name}</span>
            <span className="font-medium">{nextBadge.requiredPoints - user.totalPoints} pts to go</span>
          </div>
          <Progress value={progressToNextBadge} className="h-2" />
        </div>
      )}

      {/* All Badges */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-muted-foreground">Badge Levels</h4>
        <div className="grid grid-cols-3 gap-2">
          {badges.map((badge) => {
            const isUnlocked = user.totalPoints >= badge.requiredPoints;
            const isCurrent = currentBadge?.id === badge.id;
            
            return (
              <div
                key={badge.id}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-lg p-2 transition-all",
                  isCurrent && "bg-primary/10 ring-2 ring-primary",
                  isUnlocked && !isCurrent && "bg-muted/50",
                  !isUnlocked && "opacity-40 grayscale"
                )}
              >
                <span className="text-xl">{badge.icon}</span>
                <span className="text-xs font-medium">{badge.name}</span>
                <span className="text-[10px] text-muted-foreground">{badge.requiredPoints}pts</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
