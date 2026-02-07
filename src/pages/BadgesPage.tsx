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
    condition: (stats: UserStats) => stats.loginCount >= 1,
  },
  {
    id: "course-starter",
    name: "Course Starter",
    description: "Started your first course",
    condition: (stats: UserStats) => stats.coursesStarted >= 1,
  },
  {
    id: "consistent-learner",
    name: " Consistency King",
    description: "Maintained a 7-day learning streak",
    condition: (stats: UserStats) => stats.streak >= 7,
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Studied after midnight",
    condition: (stats: UserStats) => stats.studiedAtNight,
  },
  {
    id: "course-finisher",
    name: "Finisher",
    description: "Completed a full course",
    condition: (stats: UserStats) => stats.coursesCompleted >= 1,
  },
  {
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
  },
];

export function GamificationPanel() {
  const badgesWithStatus = BADGES.map((badge) => ({
    ...badge,
    unlocked: badge.condition(userStats),
  }));

  return (
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
        </div>
      ))}
    </div>
  );
}
export default function BadgesPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">My Badges</h1>
      <GamificationPanel />
    </div>
  );
}