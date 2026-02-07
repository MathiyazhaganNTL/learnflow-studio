import { Award, Star, Medal, Trophy, Moon, Zap, Target, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

type UserStats = {
  loginCount: number;
  coursesStarted: number;
  coursesCompleted: number;
  streak: number;
  studiedAtNight: boolean;
};

const userStats: UserStats = {
  loginCount: 3,
  coursesStarted: 2,
  coursesCompleted: 1,
  streak: 9,
  studiedAtNight: true,
};

const BADGES = [
  {
    id: "first-login",
    name: "First Launch",
    description: "Logged in for the first time",
    icon: Zap,
    color: "from-yellow-400 to-orange-500",
    glowColor: "yellow",
    condition: (stats: UserStats) => stats.loginCount >= 1,
  },
  {
    id: "course-starter",
    name: "Course Starter",
    description: "Started your first course",
    icon: Target,
    color: "from-cyan-400 to-blue-500",
    glowColor: "cyan",
    condition: (stats: UserStats) => stats.coursesStarted >= 1,
  },
  {
    id: "consistent-learner",
    name: "Consistency King",
    description: "Maintained a 7-day learning streak",
    icon: Crown,
    color: "from-purple-400 to-indigo-500",
    glowColor: "purple",
    condition: (stats: UserStats) => stats.streak >= 7,
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Studied after midnight",
    icon: Moon,
    color: "from-slate-400 to-indigo-600",
    glowColor: "indigo",
    condition: (stats: UserStats) => stats.studiedAtNight,
  },
  {
    id: "course-finisher",
    name: "Finisher",
    description: "Completed a full course",
    icon: Trophy,
    color: "from-emerald-400 to-green-500",
    glowColor: "emerald",
    condition: (stats: UserStats) => stats.coursesCompleted >= 1,
  },
  {
<<<<<<< HEAD
    id: "five-courses",
    name: "Course Explorer",
    description: "Started 5 different courses",
    icon: Star,
    color: "from-pink-400 to-rose-500",
    glowColor: "pink",
    condition: (stats: UserStats) => stats.coursesStarted >= 5,
=======
    id: "fast-learner",
    name: "⚡ Fast Learner",
    description: "Completed a lesson quickly",
    condition: (stats: UserStats) => stats.coursesStarted >= 1,
  },
  {
    id: "daily-grinder",
    name: " Daily Grinder",
    description: "Learned something every day for 3 days",
    condition: (stats: UserStats) => stats.streak >= 3,
  },
  {
    id: "knowledge-seeker",
    name: " Knowledge Seeker",
    description: "Started 3 different courses",
    condition: (stats: UserStats) => stats.coursesStarted >= 3,
  },
  {
    id: "halfway-hero",
    name: " Halfway Hero",
    description: "Reached 50% in any course",
    condition: (stats: UserStats) => stats.coursesCompleted >= 1,
  },
  {
    id: "streak-master",
    name: " Streak Master",
    description: "Maintained a 14-day streak",
    condition: (stats: UserStats) => stats.streak >= 14,
  },
  {
    id: "early-bird",
    name: "Early Bird",
    description: "Studied before 6 AM",
    condition: (_stats: UserStats) => true,
  },
  {
    id: "marathon-learner",
    name: " Marathon Learner",
    description: "Spent long hours learning",
    condition: (stats: UserStats) => stats.loginCount >= 5,
  },
  {
    id: "curious-mind",
    name: " Curious Mind",
    description: "Explored multiple topics",
    condition: (stats: UserStats) => stats.coursesStarted >= 2,
  },
  {
    id: "focused-student",
    name: " Focused Student",
    description: "Completed lessons without skipping",
    condition: (stats: UserStats) => stats.coursesCompleted >= 1,
  },
  {
    id: "legendary-learner",
    name: " Legendary Learner",
    description: "Elite learning achievement",
    condition: (stats: UserStats) => stats.streak >= 30,
>>>>>>> ee86fcfa2f44d2702145643bc86f7c3974b232db
  },
];

export function GamificationPanel() {
  const badgesWithStatus = BADGES.map((badge) => ({
    ...badge,
    unlocked: badge.condition(userStats),
  }));

  const unlockedCount = badgesWithStatus.filter(b => b.unlocked).length;

  return (
<<<<<<< HEAD
    <div className="space-y-8">
      {/* Progress Summary */}
      <div className="flex flex-wrap items-center justify-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-background to-accent/10 border border-border/50">
        <div className="text-center">
          <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {unlockedCount}
          </div>
          <div className="text-sm text-muted-foreground">Badges Earned</div>
=======
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {badgesWithStatus.map((badge) => (
        <div
          key={badge.id}
          className={`group relative cursor-pointer rounded-xl border p-5 text-center transition-all duration-300 ease-out
            ${
              badge.unlocked
                ? "border-violet-400 bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-200 hover:from-violet-200 hover:via-purple-200 hover:to-indigo-300 hover:shadow-xl hover:shadow-violet-300/40 hover:-translate-y-1"
                : "border-gray-300 bg-gray-100 opacity-70 hover:opacity-90"
            }
          `}
        >
          <div className="mb-2 text-2xl group-hover:blur-[1px]">
            {badge.unlocked ? "🏅" : "🔒"}
          </div>

          <div className="text-lg font-semibold text-slate-800 transition-colors duration-300 group-hover:text-indigo-700 group-hover:blur-[1px]">
            {badge.name}
          </div>

          <p className="mt-1 text-sm text-slate-600 group-hover:blur-[1px]">
            {badge.unlocked ? badge.description : "Locked"}
          </p>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 text-white opacity-0 transition-all duration-300 group-hover:opacity-95">
            <div className="px-4 text-center">
              <div className="mb-1 text-base font-semibold">
                {badge.name}
              </div>
              <p className="text-sm opacity-90">
                {badge.description}
              </p>
            </div>
          </div>
>>>>>>> ee86fcfa2f44d2702145643bc86f7c3974b232db
        </div>
        <div className="w-px h-12 bg-border hidden sm:block" />
        <div className="text-center">
          <div className="text-4xl font-bold text-muted-foreground">
            {BADGES.length - unlockedCount}
          </div>
          <div className="text-sm text-muted-foreground">To Unlock</div>
        </div>
        <div className="w-px h-12 bg-border hidden sm:block" />
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">
            {userStats.streak}
          </div>
          <div className="text-sm text-muted-foreground">Day Streak 🔥</div>
        </div>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {badgesWithStatus.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-6 text-center transition-all duration-500",
                "hover:-translate-y-1 hover:shadow-lg",
                badge.unlocked
                  ? "bg-card border-primary/30 shadow-md"
                  : "bg-muted/30 border-border/50 opacity-60"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow Effect for Unlocked */}
              {badge.unlocked && (
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  `bg-gradient-to-br ${badge.color}`
                )} style={{ filter: 'blur(60px)', opacity: 0.15 }} />
              )}

              {/* Badge Icon */}
              <div className="relative mb-4 flex justify-center">
                <div className={cn(
                  "relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300",
                  badge.unlocked
                    ? `bg-gradient-to-br ${badge.color} shadow-lg group-hover:scale-110`
                    : "bg-muted"
                )}>
                  {badge.unlocked && (
                    <div className="absolute inset-0 rounded-full blur-xl opacity-50"
                      style={{ background: `linear-gradient(135deg, var(--${badge.glowColor}-400), var(--${badge.glowColor}-600))` }}
                    />
                  )}
                  <Icon className={cn(
                    "h-8 w-8 relative z-10",
                    badge.unlocked ? "text-white" : "text-muted-foreground"
                  )} />
                </div>
              </div>

              {/* Badge Content */}
              <h3 className={cn(
                "mb-2 text-lg font-bold transition-colors",
                badge.unlocked ? "text-foreground" : "text-muted-foreground"
              )}>
                {badge.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {badge.unlocked ? badge.description : "🔒 Keep learning to unlock"}
              </p>

              {/* Unlocked Badge Indicator */}
              {badge.unlocked && (
                <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Award className="h-3 w-3" />
                  Earned
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Gradient */}
      <div className="relative overflow-hidden border-b border-border/50">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute -top-20 -right-40 w-80 h-80 bg-gradient-to-bl from-accent/15 to-cyan-500/10 rounded-full blur-3xl opacity-50" />

        <div className="container relative py-12 md:py-16">
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white mb-2">
              <Medal className="h-8 w-8" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-primary to-foreground">
              My Badges
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Celebrate your learning achievements and unlock new milestones
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-10">
        <GamificationPanel />
      </div>
    </div>
  );
}