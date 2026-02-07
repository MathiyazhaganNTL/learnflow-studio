import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, BookOpen, LayoutDashboard, Menu, X, User, LogOut, Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function LearnerNavbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { href: string; label: string; icon: React.ElementType }[] = [];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Mirror/Glassmorphism Base Layer */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40" />

      {/* Glossy Reflective Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none opacity-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-mirror-shine w-1/2" />
      </div>

      {/* Classy Bottom Border Beam */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent" />

      {/* Ultra-subtle inner glow */}
      <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />

      <div className="container relative z-10 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          to={isAuthenticated ? "/my-courses" : "/"}
          className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/5 shadow-2xl transition-all group-hover:bg-white/10 group-hover:shadow-primary/20">
            <img
              src="/logo.png"
              alt="LearnSphere Logo"
              className="h-full w-full object-cover mix-blend-normal transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(113,75,110,0.6)]"
            />
            {/* Subtle glow orb behind logo */}
            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
            LearnSphere
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              to={href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(href) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              {(user?.role === 'admin' || user?.role === 'instructor') && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/backoffice">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Backoffice
                  </Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="gradient-primary text-primary-foreground">
                        {user?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/courses"
                      className={cn(
                        "w-full cursor-pointer",
                        isActive('/courses') ? "bg-primary/10 text-primary" : "text-muted-foreground"
                      )}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/my-courses"
                      className={cn(
                        "w-full cursor-pointer",
                        isActive('/my-courses') ? "bg-primary/10 text-primary" : "text-muted-foreground"
                      )}
                    >
                      <GraduationCap className="mr-2 h-4 w-4" />
                      My Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/settings"
                      className={cn(
                        "w-full cursor-pointer",
                        isActive('/settings') ? "bg-primary/10 text-primary" : "text-muted-foreground"
                      )}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="container flex flex-col gap-2 py-4">
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive('/courses') ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              )}
            >
              <BookOpen className="h-4 w-4" />
              Courses
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-courses"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive('/my-courses') ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                )}
              >
                <GraduationCap className="h-4 w-4" />
                My Courses
              </Link>
            )}
            <div className="my-2 h-px bg-border" />
            {isAuthenticated ? (
              <>
                {(user?.role === 'admin' || user?.role === 'instructor') && (
                  <Link
                    to="/backoffice"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Backoffice
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
