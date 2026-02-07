import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  ChevronRight,
  CheckCircle,
  Lock,
  FileText,
  Image,
  HelpCircle,
  Search,
  Download,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockCourses, mockLessons, mockReviews, mockEnrollments } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Lesson, LessonType } from '@/types';
import { cn } from '@/lib/utils';

const getLessonIcon = (type: LessonType) => {
  switch (type) {
    case 'video': return Play;
    case 'document': return FileText;
    case 'image': return Image;
    case 'quiz': return HelpCircle;
    default: return BookOpen;
  }
};

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [searchLesson, setSearchLesson] = useState('');

  const course = mockCourses.find((c) => c.id === courseId);
  const lessons = mockLessons.filter((l) => l.courseId === courseId);
  const reviews = mockReviews.filter((r) => r.courseId === courseId);
  const enrollment = mockEnrollments.find(
    (e) => e.courseId === courseId && e.userId === user?.id
  );

  if (!course) {
    return (
      <div className="container py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Course not found</h1>
        <Button asChild>
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Calculate completed lessons based on enrollment progress
  const completedLessonsCount = enrollment
    ? Math.ceil((enrollment.progress / 100) * lessons.length)
    : 0;

  const incompleteLessonsCount = lessons.length - completedLessonsCount;

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchLesson.toLowerCase())
  );

  const handleLessonClick = (lesson: Lesson) => {
    navigate(`/course/${courseId}/learn`, {
      state: { lessonId: lesson.id }
    });
  };

  return (
    <div className="py-8">
      <div className="container">
        {/* Course Header */}
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_350px]">
          {/* Left - Info */}
          <div>
            {/* Course Cover Image */}
            <div className="mb-6 rounded-xl overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="h-64 w-full object-cover"
              />
            </div>
            
            {/* Course Title */}
            <h1 className="mb-4 text-3xl font-bold lg:text-4xl">{course.title}</h1>
            
            {/* Short Description */}
            <p className="mb-6 text-lg text-muted-foreground">{course.description}</p>

            {/* Tags and Stats */}
            <div className="mb-6 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Additional Course Info */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-warning text-warning" />
                <span className="font-semibold">{course.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({course.reviewsCount} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5" />
                {course.enrolledCount.toLocaleString()} enrolled
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                {formatDuration(course.totalDuration)}
              </div>
            </div>

            {/* Instructor */}
            <div className="mt-6 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="gradient-primary text-primary-foreground">
                  {course.instructorName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Created by</p>
                <p className="font-medium">{course.instructorName}</p>
              </div>
            </div>
          </div>

          {/* Right - Progress and Stats */}
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Progress Section */}
            {enrollment && (
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold">{enrollment.progress}%</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
                <Progress value={enrollment.progress} className="h-2 mb-4" />
                <Button className="w-full" size="sm" asChild>
                  <Link to={`/course/${course.id}/learn`}>
                    <Play className="mr-2 h-4 w-4" />
                    {enrollment.status === 'yet_to_start' ? 'Start Learning' : 'Continue Learning'}
                  </Link>
                </Button>
              </div>
            )}

            {/* Statistics Cards */}
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">Total Content</p>
                <p className="mt-1 text-2xl font-bold">{lessons.length}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="mt-1 text-2xl font-bold">{completedLessonsCount}</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">Remaining</p>
                <p className="mt-1 text-2xl font-bold">{incompleteLessonsCount}</p>
              </div>
            </div>

            {!enrollment && (
              <>
                {course.accessRule === 'payment' && course.price ? (
                  <>
                    <div className="rounded-xl border border-border bg-card p-6 text-center">
                      <span className="text-3xl font-bold">${course.price}</span>
                      <Button className="w-full mt-4" size="lg">
                        Buy Now
                      </Button>
                    </div>
                  </>
                ) : course.accessRule === 'invitation' ? (
                  <Button className="w-full" size="lg" variant="outline" disabled>
                    <Lock className="mr-2 h-5 w-5" />
                    Invitation Only
                  </Button>
                ) : isAuthenticated ? (
                  <Button className="w-full" size="lg">
                    Enroll Now - Free
                  </Button>
                ) : (
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/login">Sign In to Enroll</Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="mt-12">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Course Overview</TabsTrigger>
            <TabsTrigger value="reviews">Ratings and Reviews ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Content Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{lessons.length} Contents</h3>
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search content"
                    value={searchLesson}
                    onChange={(e) => setSearchLesson(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Lessons List */}
              <div className="rounded-xl border border-border bg-card divide-y divide-border">
                {filteredLessons.length > 0 ? (
                  filteredLessons.map((lesson, index) => {
                    const Icon = getLessonIcon(lesson.type);
                    const isCompleted = index < completedLessonsCount;
                    const isInProgress = !isCompleted && index === completedLessonsCount;
                    const isLocked = !enrollment && !isCompleted;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => !isLocked && handleLessonClick(lesson)}
                        disabled={isLocked}
                        className={cn(
                          "flex w-full items-center justify-between gap-4 p-4 transition-colors text-left",
                          isLocked ? "opacity-60 cursor-not-allowed" : "hover:bg-muted/50 cursor-pointer"
                        )}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={cn(
                            "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded full",
                            isCompleted ? "bg-success/10 text-success" : isInProgress ? "border-2 border-primary text-primary" : "bg-muted text-muted-foreground"
                          )}>
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : isInProgress ? (
                              <div className="h-3 w-3 rounded-full bg-primary" />
                            ) : (
                              <div className="h-3 w-3 rounded-full border-2 border-current" />
                            )}
                          </div>
                          <p className={cn(
                            "font-medium truncate",
                            isCompleted && "text-muted-foreground"
                          )}>
                            {lesson.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-muted-foreground">{lesson.duration}m</span>
                          {isLocked ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="mb-3 h-8 w-8 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No content found</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              {/* Rating Summary */}
              <div className="flex items-center gap-6 rounded-xl border border-border bg-card p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">{course.rating.toFixed(1)}</div>
                  <div className="flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={cn(
                          "h-5 w-5",
                          star <= Math.round(course.rating)
                            ? "fill-warning text-warning"
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.reviewsCount} reviews
                  </p>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="rounded-xl border border-border bg-card p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.userAvatar} />
                            <AvatarFallback className="gradient-primary text-primary-foreground">
                              {review.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.userName}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                "h-4 w-4",
                                star <= review.rating
                                  ? "fill-warning text-warning"
                                  : "text-muted"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center rounded-xl border border-border bg-card">
                    <Star className="mb-3 h-8 w-8 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No reviews yet</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
