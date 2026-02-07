import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { User, UserRole, Badge } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  currentBadge: Badge | null;
  nextBadge: Badge | null;
  progressToNextBadge: number;
  addPoints: (amount: number) => void;
}

export const badges: Badge[] = [
  { id: '1', name: 'Novice', level: 1, requiredPoints: 0, icon: '🌱', color: 'badge-novice' },
  { id: '2', name: 'Apprentice', level: 2, requiredPoints: 50, icon: '🔨', color: 'badge-apprentice' },
  { id: '3', name: 'Journeyman', level: 3, requiredPoints: 150, icon: '⚒️', color: 'badge-journeyman' },
  { id: '4', name: 'Expert', level: 4, requiredPoints: 300, icon: '⭐', color: 'badge-expert' },
  { id: '5', name: 'Master', level: 5, requiredPoints: 500, icon: '👑', color: 'badge-master' },
];

const getCurrentBadge = (points: number): Badge => {
  return [...badges].reverse().find(b => points >= b.requiredPoints) || badges[0];
};

const getNextBadge = (points: number): Badge | null => {
  return badges.find(b => b.requiredPoints > points) || null;
};

const getProgressToNextBadge = (points: number): number => {
  const current = getCurrentBadge(points);
  const next = getNextBadge(points);

  if (!next) return 100;

  const range = next.requiredPoints - current.requiredPoints;
  const progress = points - current.requiredPoints;

  if (range <= 0) return 100;

  return Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string, role: UserRole = 'learner') => {
    // Mock login
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role,
      totalPoints: 45,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addPoints = useCallback((amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, totalPoints: prev.totalPoints + amount };
    });
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  }, [user]);

  const currentBadge = user ? getCurrentBadge(user.totalPoints) : null;
  const nextBadge = user ? getNextBadge(user.totalPoints) : null;
  const progressToNextBadge = user ? getProgressToNextBadge(user.totalPoints) : 0;

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
    switchRole,
    currentBadge,
    nextBadge,
    progressToNextBadge,
    addPoints
  }), [user, login, logout, switchRole, currentBadge, nextBadge, progressToNextBadge, addPoints]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
