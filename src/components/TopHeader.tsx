import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Flame, Bell, Sparkles, RefreshCw, Smartphone } from 'lucide-react';
import { AvatarDisplay } from './AvatarDisplay';

export function TopHeader() {
  const {
    profile,
    stats,
    cosmetics,
    notifications,
    setShowNotificationCenter,
    setShowOnboarding,
    resetToLucasDemo,
    isWorkoutActive,
    startWorkout,
    setActiveTab,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-[#07090e]/90 backdrop-blur-md border-b border-cyan-500/20 px-4 py-3 safe-top">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand & Level Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('accueil')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center glow-cyan">
              <Zap className="w-5 h-5 text-black fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-wider font-heading text-white group-hover:text-cyan-300 transition-colors">
                  LEVEL UP
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  RPG
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {profile.firstName} • <span className="text-cyan-300 font-semibold">{stats.levelTitle}</span>
              </div>
            </div>
          </button>
        </div>

        {/* Stats Pill & Controls */}
        <div className="flex items-center gap-2">
          {/* Streak Flame */}
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold"
            title="Série active"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
            <span>{stats.streakDays}j</span>
          </div>

          {/* Notifications Bell */}
          <button
            onClick={() => setShowNotificationCenter(true)}
            className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-black text-[9px] font-bold flex items-center justify-center shadow-md animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Onboarding / Demo Quick Reset Menu */}
          <button
            onClick={() => setShowOnboarding(true)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-all cursor-pointer"
            title="Rejouer l'introduction (Onboarding)"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
