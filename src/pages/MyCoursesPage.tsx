import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { CourseCard } from '@/components/courses/CourseCard';
import { GamificationPanel } from '@/components/gamification/GamificationPanel';
import { mockCourses, mockEnrollments } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, CheckCircle, Clock, PlayCircle } from 'lucide-react';

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  // Get user's enrolled courses with enrollment data
  const enrolledCourses = mockEnrollments
    .filter((e) => e.userId === user?.id)
    .map((enrollment) => ({
      course: mockCourses.find((c) => c.id === enrollment.courseId)!,
      enrollment,
    }))
    .filter((item) => item.course);

  const filterByStatus = (status?: string) => {
    if (!status || status === 'all') return enrolledCourses;
    return enrolledCourses.filter((item) => item.enrollment.status === status);
  };

  const stats = {
    all: enrolledCourses.length,
    yet_to_start: enrolledCourses.filter((e) => e.enrollment.status === 'yet_to_start').length,
    in_progress: enrolledCourses.filter((e) => e.enrollment.status === 'in_progress').length,
    completed: enrolledCourses.filter((e) => e.enrollment.status === 'completed').length,
  };

  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">My Courses</h1>
          <p className="text-muted-foreground">
            Track your progress and continue learning
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 grid w-full grid-cols-4">
                <TabsTrigger value="all" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">All</span>
                  <span className="text-xs text-muted-foreground">({stats.all})</span>
                </TabsTrigger>
                <TabsTrigger value="yet_to_start" className="gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">To Start</span>
                  <span className="text-xs text-muted-foreground">({stats.yet_to_start})</span>
                </TabsTrigger>
                <TabsTrigger value="in_progress" className="gap-2">
                  <PlayCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">In Progress</span>
                  <span className="text-xs text-muted-foreground">({stats.in_progress})</span>
                </TabsTrigger>
                <TabsTrigger value="completed" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="hidden sm:inline">Completed</span>
                  <span className="text-xs text-muted-foreground">({stats.completed})</span>
                </TabsTrigger>
              </TabsList>

              {['all', 'yet_to_start', 'in_progress', 'completed'].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  {filterByStatus(tab).length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {filterByStatus(tab).map(({ course, enrollment }) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          enrollment={enrollment}
                          showProgress
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="mb-4 rounded-full bg-muted p-4">
                        <BookOpen className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">No courses here</h3>
                      <p className="text-muted-foreground">
                        {tab === 'all'
                          ? "You haven't enrolled in any courses yet"
                          : `You don't have any ${tab.replace('_', ' ')} courses`}
                      </p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="order-first lg:order-last">
            <GamificationPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
