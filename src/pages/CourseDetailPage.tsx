import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchLesson.toLowerCase())
  );

  const completedLessons = 2; // Mock data - would come from progress tracking

  return (
    <div className="py-8">
      <div className="container">
        {/* Course Header */}
        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left - Info */}
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mb-4 text-3xl font-bold lg:text-4xl">{course.title}</h1>
            <p className="mb-6 text-lg text-muted-foreground">{course.description}</p>

            {/* Stats */}
            <div className="mb-6 flex flex-wrap items-center gap-6 text-sm">
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
                <BookOpen className="h-5 w-5" />
                {course.totalLessons} lessons
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                {formatDuration(course.totalDuration)}
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-3">
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

          {/* Right - Card */}
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
              <div className="aspect-video">
                <img
                  src={course.image}
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                {enrollment ? (
                  <>
                    <div className="mb-4">
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Your Progress</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                    <Button className="w-full" size="lg" asChild>
                      <Link to={`/course/${course.id}/learn`}>
                        <Play className="mr-2 h-5 w-5" />
                        {enrollment.status === 'yet_to_start' ? 'Start Learning' : 'Continue Learning'}
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    {course.accessRule === 'payment' && course.price ? (
                      <>
                        <div className="mb-4 text-center">
                          <span className="text-3xl font-bold">${course.price}</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Buy Now
                        </Button>
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
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="content">
          <TabsList className="mb-6">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="content">
            <div className="rounded-xl border border-border bg-card">
              {/* Search */}
              <div className="border-b border-border p-4">
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchLesson}
                  onChange={(e) => setSearchLesson(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Lesson List */}
              <div className="divide-y divide-border">
                {filteredLessons.map((lesson, index) => {
                  const Icon = getLessonIcon(lesson.type);
                  const isCompleted = index < completedLessons;
                  const isLocked = !enrollment && !isCompleted;

                  return (
                    <div
                      key={lesson.id}
                      className={cn(
                        "flex items-center gap-4 p-4 transition-colors",
                        isLocked ? "opacity-60" : "hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                        isCompleted ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                      )}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-medium truncate",
                          isCompleted && "text-muted-foreground"
                        )}>
                          {lesson.title}
                        </p>
                        <p className="text-sm text-muted-foreground capitalize">
                          {lesson.type} • {lesson.duration} min
                        </p>
                      </div>
                      {isLocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
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
                {reviews.map((review) => (
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
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
