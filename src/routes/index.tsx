import { createFileRoute } from '@tanstack/react-router';
import React, { useState } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { TopHeader } from '../components/TopHeader';
import { BottomNav } from '../components/BottomNav';
import { HomeScreen } from '../screens/HomeScreen';
import { ProgramScreen } from '../screens/ProgramScreen';
import { CoachScreen } from '../screens/CoachScreen';
import { LeaderboardScreen } from '../screens/LeaderboardScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { OnboardingModal } from '../components/OnboardingModal';
import { QuestionnaireModal } from '../components/QuestionnaireModal';
import { ActiveWorkoutScreen } from '../components/ActiveWorkoutScreen';
import { WorkoutFinishedModal } from '../components/WorkoutFinishedModal';
import { LevelUpModal } from '../components/LevelUpModal';
import { SubscriptionModal } from '../components/SubscriptionModal';
import { NotificationCenterModal } from '../components/NotificationCenterModal';
import { Zap, Sparkles } from 'lucide-react';

export const Route = createFileRoute('/')({
  component: LevelUpApp,
});

function MainViewport() {
  const { activeTab, floatingXp, isWorkoutActive } = useApp();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none cyber-grid opacity-25" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-cyan-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[300px] bg-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Floating XP Reward Notification Pill */}
      {floatingXp && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-float-reward pointer-events-none">
          <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-black text-sm font-mono shadow-[0_0_25px_#00F0FF] flex items-center gap-1.5 border-2 border-white">
            <Zap className="w-4 h-4 fill-black" />
            <span>{floatingXp.text}</span>
          </div>
        </div>
      )}

      {/* App Shell Header */}
      <TopHeader />

      {/* Main Content Area framed for mobile screen / responsive */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-4 relative z-10">
        {activeTab === 'accueil' && <HomeScreen />}
        {activeTab === 'programme' && <ProgramScreen />}
        {activeTab === 'coach' && <CoachScreen />}
        {activeTab === 'classement' && <LeaderboardScreen />}
        {activeTab === 'profil' && <ProfileScreen />}
      </main>

      {/* App Shell Bottom Nav (Hidden if in active workout mode) */}
      {!isWorkoutActive && <BottomNav />}

      {/* Modals and Full-Screen Flows */}
      <OnboardingModal />
      <QuestionnaireModal />
      <ActiveWorkoutScreen />
      <WorkoutFinishedModal />
      <LevelUpModal />
      <SubscriptionModal />
      <NotificationCenterModal />
    </div>
  );
}

function LevelUpApp() {
  return (
    <AppProvider>
      <MainViewport />
    </AppProvider>
  );
}
