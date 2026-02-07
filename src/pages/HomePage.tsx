import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, Play, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
<<<<<<< HEAD
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
=======
      <section className="relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Premium Dark Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Secondary subtle gradient for depth */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)'
          }}
        />

        {/* Premium Spotlight Effect */}
        <LightRays
          raysColor="#7c3aed"
          lightSpread={0.55}
          rayLength={0.75}
          saturation={0.35}
          followMouse
          mouseInfluence={0.03}
          intensity={0.4}
          blur={80}
        />

        {/* Subtle noise texture for premium feel */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="container relative z-10 py-20">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge - Using primary color */}
            <div
              className="mb-8 inline-flex items-center rounded-full border border-primary/40 bg-primary/20 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-white shadow-lg animate-fade-in"
            >
>>>>>>> 7e93e0c (Add PaymentModal component and fix TypeScript imports)
              <Award className="mr-2 h-4 w-4" />
              Trusted by 50,000+ learners worldwide
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Master New Skills with{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                LearnSphere
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Discover courses taught by industry experts. Learn at your own pace, 
              earn badges, and transform your career with hands-on learning.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/courses">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Courses
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -right-64 -top-64 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-64 -left-64 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="border-y border-border bg-card py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
                <BookOpen className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Expert-Led Courses</h3>
              <p className="text-muted-foreground">
                Learn from industry professionals with real-world experience
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-accent">
                <Award className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Earn Badges</h3>
              <p className="text-muted-foreground">
                Complete courses and quizzes to earn points and unlock badges
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-success">
                <Users className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Learn Together</h3>
              <p className="text-muted-foreground">
                Join a community of learners and share your progress
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">
              Start your learning journey in three simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Choose a Course',
                description: 'Browse our catalog and find courses that match your interests and goals.',
                icon: BookOpen,
              },
              {
                step: '02',
                title: 'Learn at Your Pace',
                description: 'Watch videos, read materials, and complete quizzes when it suits you.',
                icon: Play,
              },
              {
                step: '03',
                title: 'Earn Recognition',
                description: 'Complete courses to earn points, badges, and shareable certificates.',
                icon: CheckCircle,
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  Step {item.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-gradient-to-r from-primary/5 to-accent/5 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to Start Learning?</h2>
            <p className="mb-8 text-muted-foreground">
              Join thousands of learners and start your journey today. 
              It's free to get started.
            </p>
            <Button size="lg" asChild>
              <Link to={isAuthenticated ? "/courses" : "/register"}>
                {isAuthenticated ? "Explore Courses" : "Create Free Account"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
