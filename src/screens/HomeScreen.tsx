import React from 'react';
import { useApp } from '../context/AppContext';
import { AvatarDisplay } from '../components/AvatarDisplay';
import {
  Zap,
  Play,
  Flame,
  Calendar,
  Clock,
  Shield,
  Award,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Bot,
  CheckCircle2,
} from 'lucide-react';

export function HomeScreen() {
  const {
    profile,
    stats,
    cosmetics,
    currentProgram,
    startWorkout,
    setActiveTab,
    challenges,
    claimChallenge,
    setShowQuestionnaire,
    setShowSubscriptionModal,
  } = useApp();

  const xpProgressPercent = Math.min(
    100,
    Math.round((stats.currentXp / stats.nextLevelXp) * 100)
  );

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Hero Player Card */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#111728] via-[#0d1222] to-[#090d18] border border-cyan-500/30 p-5 shadow-[0_0_30px_rgba(0,240,255,0.15)] overflow-hidden">
        {/* Glow corner */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AvatarDisplay
              level={stats.level}
              armor={cosmetics.armor}
              aura={cosmetics.aura}
              size="md"
            />
            <div>
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <span>JOUEUR ACTIF</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <h1 className="text-2xl font-black font-heading text-white">
                Bonjour {profile.firstName}
              </h1>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-cyan-300 font-semibold mt-0.5">
                <Award className="w-3 h-3 text-cyan-400" />
                <span>Niveau {stats.level} • {stats.levelTitle}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('profil')}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Modifier l'avatar"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </button>
        </div>

        {/* XP Bar */}
        <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-2xl border border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Jauge d'XP Niveau {stats.level}</span>
            <span className="text-cyan-300 font-bold">
              {stats.currentXp.toLocaleString()} / {stats.nextLevelXp.toLocaleString()} XP
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_10px_#00F0FF]"
              style={{ width: `${xpProgressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
            <span>+{stats.nextLevelXp - stats.currentXp} XP jusqu'au prochain palier</span>
            <span className="text-emerald-400 font-semibold">{xpProgressPercent}%</span>
          </div>
        </div>

        {/* Quick Streaks & Sessions Counters */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-1">
          <div className="p-2.5 rounded-xl bg-[#090d18] border border-amber-500/20 flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Série actuelle</div>
              <div className="text-sm font-bold text-white font-mono">{stats.streakDays} jours consécutifs</div>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#090d18] border border-cyan-500/20 flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono">Cette semaine</div>
              <div className="text-sm font-bold text-white font-mono">{stats.workoutsThisWeek} séances validées</div>
            </div>
          </div>
        </div>
      </div>

      {/* SÉANCE DU JOUR (Section 4 du prompt) */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#12192c] via-[#0f1424] to-[#0a0e19] border-2 border-cyan-400/50 p-5 sm:p-6 shadow-[0_0_40px_rgba(0,240,255,0.25)] space-y-4">
        {/* Header of Daily Workout */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              QUÊTE PRINCIPALE // SÉANCE DU JOUR
            </span>
          </div>
          <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold">
            +{currentProgram.xpReward} XP
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black font-heading text-white">
            {currentProgram.title}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Programme sur-mesure calibré pour Lucas (Débutant, Maison, Sans matériel).
          </p>
        </div>

        {/* Workout badges info */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentProgram.durationMinutes} minutes</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentProgram.fitnessLevel}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentProgram.equipment}</span>
          </div>
        </div>

        {/* Exercises Preview Carousel */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
            <span>{currentProgram.exercises.length} EXERCICES AU PROGRAMME</span>
            <button
              onClick={() => setActiveTab('programme')}
              className="text-cyan-400 hover:underline flex items-center gap-0.5"
            >
              Voir le détail <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {currentProgram.exercises.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-left min-w-[130px]"
              >
                <div className="text-[10px] text-cyan-400 font-mono font-bold truncate">
                  {item.phase === 'echauffement' ? 'Échauffement' : item.phase === 'calme' ? 'Calme' : 'Entraînement'}
                </div>
                <div className="font-bold text-white text-xs truncate">{item.exercise.name}</div>
                <div className="text-[10px] text-slate-400">{item.sets} × {item.reps}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN CTA BUTTON: COMMENCER LA SÉANCE */}
        <button
          onClick={startWorkout}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:brightness-110 text-black font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_0_35px_rgba(0,240,255,0.55)] transition-all cursor-pointer group"
        >
          <Play className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
          <span>COMMENCER LA SÉANCE</span>
          <span className="text-xs bg-black/20 px-2 py-0.5 rounded font-mono font-bold">
            +{currentProgram.xpReward} XP
          </span>
        </button>
      </div>

      {/* AI Coach Suggestion Banner */}
      <div className="p-4 rounded-2xl bg-[#0f1526] border border-cyan-500/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
              COACH A.I.D.E.N // CONSEIL
            </div>
            <div className="text-xs text-slate-200">
              « Pas le temps pour 30 min aujourd'hui ? Demande-moi une version express 15 min ! »
            </div>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('coach')}
          className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-cyan-300 font-semibold shrink-0 cursor-pointer"
        >
          Parler
        </button>
      </div>

      {/* Daily Challenges Quests (Section 10 du prompt) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm font-heading uppercase tracking-wider text-slate-300">
            Quêtes & Défis Actifs
          </h3>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">RÉINITIALISATION DANS 23H</span>
        </div>

        <div className="space-y-2.5">
          {challenges.map((c) => {
            const isReadyToClaim = c.progress >= c.target && !c.isClaimed;
            return (
              <div
                key={c.id}
                className="p-3.5 rounded-2xl bg-[#0b0f1c] border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{c.title}</span>
                    <span className="text-[11px] font-mono text-cyan-300 font-bold">+{c.xpReward} XP</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{c.description}</div>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                        style={{ width: `${Math.min(100, (c.progress / c.target) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {c.progress} / {c.target} {c.unit}
                    </span>
                  </div>
                </div>

                {c.isClaimed ? (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-lg">
                    Réclamé ✓
                  </span>
                ) : isReadyToClaim ? (
                  <button
                    onClick={() => claimChallenge(c.id)}
                    className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-black font-extrabold text-xs shadow-[0_0_12px_#10B981] animate-bounce cursor-pointer"
                  >
                    Réclamer
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">En cours</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
