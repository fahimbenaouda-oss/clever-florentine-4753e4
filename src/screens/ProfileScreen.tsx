import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AvatarDisplay } from '../components/AvatarDisplay';
import {
  AVAILABLE_ARMORS,
  AVAILABLE_AURAS,
} from '../data/mockData';
import {
  User,
  Zap,
  Flame,
  Award,
  Clock,
  Dumbbell,
  ShieldCheck,
  CreditCard,
  Settings,
  RefreshCw,
  LogOut,
  ChevronRight,
  TrendingUp,
  Sparkles,
  ShieldAlert,
  Calendar,
  Lock,
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export function ProfileScreen() {
  const {
    profile,
    stats,
    badges,
    cosmetics,
    setCosmetics,
    subscriptionTier,
    setShowSubscriptionModal,
    setShowQuestionnaire,
    resetToLucasDemo,
    setShowOnboarding,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'avatar' | 'badges' | 'reglages'>('stats');

  // 7-day activity graph data
  const activityData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Minutes d’effort',
        data: [25, 30, 0, 32, 28, 40, 35],
        backgroundColor: [
          'rgba(0, 240, 255, 0.4)',
          'rgba(0, 240, 255, 0.4)',
          'rgba(51, 65, 85, 0.3)',
          'rgba(0, 240, 255, 0.4)',
          'rgba(0, 240, 255, 0.9)', // Today active
          'rgba(16, 185, 129, 0.5)',
          'rgba(16, 185, 129, 0.5)',
        ],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0f172a',
        borderColor: '#00F0FF',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8', font: { family: 'JetBrains Mono', size: 10 } },
      },
    },
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Profile Header & Avatar Hero */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131a2e] to-[#090d18] border border-cyan-500/30 text-center space-y-4 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative overflow-hidden">
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold uppercase">
            Pass {subscriptionTier.toUpperCase()}
          </span>
        </div>

        <div className="pt-2">
          <AvatarDisplay
            level={stats.level}
            armor={cosmetics.armor}
            aura={cosmetics.aura}
            size="lg"
          />
        </div>

        <div>
          <h1 className="text-2xl font-black font-heading text-white">
            {profile.firstName}
          </h1>
          <p className="text-xs text-cyan-400 font-mono">
            Niveau {stats.level} • {stats.levelTitle}
          </p>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {profile.age} ans • {profile.mainGoal.toUpperCase()} • {profile.trainingLocation.toUpperCase()}
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800 justify-between text-xs font-mono font-bold">
          {[
            { id: 'stats', label: 'Stats' },
            { id: 'avatar', label: 'Avatar' },
            { id: 'badges', label: 'Badges' },
            { id: 'reglages', label: 'Options' },
          ].map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubTab(sub.id as any)}
              className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeSubTab === sub.id
                  ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TAB 1: STATS & PROGRESSION */}
      {activeSubTab === 'stats' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3.5 rounded-2xl bg-[#0d1222] border border-cyan-500/20">
              <div className="flex items-center gap-2 text-cyan-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase">XP Total</span>
              </div>
              <div className="text-xl font-mono font-black text-white">
                {stats.totalXp.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400">Progression continue</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0d1222] border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Dumbbell className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase">Séances faites</span>
              </div>
              <div className="text-xl font-mono font-black text-white">
                {stats.totalWorkouts}
              </div>
              <div className="text-[10px] text-slate-400">Total victoires</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0d1222] border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span className="text-[10px] font-mono uppercase">Série active</span>
              </div>
              <div className="text-xl font-mono font-black text-white">
                {stats.streakDays} jours
              </div>
              <div className="text-[10px] text-slate-400">Record : {stats.bestStreak} jours</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0d1222] border border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-mono uppercase">Minutes d’effort</span>
              </div>
              <div className="text-xl font-mono font-black text-white">
                {stats.totalMinutes} min
              </div>
              <div className="text-[10px] text-slate-400">Temps actif cumulé</div>
            </div>
          </div>

          {/* Activity Chart (Last 7 Days) */}
          <div className="p-4 rounded-3xl bg-[#0c101d] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm font-heading text-white">
                  Activité des 7 derniers jours
                </h3>
                <p className="text-[10px] font-mono text-slate-400">Minutes d’entraînement par jour</p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400">+12% régularité</span>
            </div>
            <div className="h-44 w-full">
              <Bar data={activityData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: AVATAR CUSTOMIZATION (Cosmétiques débloqués avec l'XP) */}
      {activeSubTab === 'avatar' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-cyan-200">
            <span className="font-bold text-cyan-400 font-mono">SYSTÈME COSMÉTIQUE :</span> L'avatar n'évolue pas selon l'apparence physique, mais débloque de nouvelles armures et auras holographiques au fil des niveaux !
          </div>

          {/* Armures */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-xs font-mono text-slate-300 uppercase tracking-wider">
              Armures Cybernétiques
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {AVAILABLE_ARMORS.map((arm) => {
                const isUnlocked = stats.level >= arm.minLevel;
                const isEquipped = cosmetics.armor === arm.id;
                return (
                  <button
                    key={arm.id}
                    disabled={!isUnlocked}
                    onClick={() => setCosmetics({ ...cosmetics, armor: arm.id })}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isEquipped
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : isUnlocked
                        ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                        : 'bg-slate-950/60 border-slate-900 text-slate-600 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-800 text-cyan-400">
                        {isUnlocked ? <Sparkles className="w-4 h-4" /> : <Lock className="w-4 h-4 text-slate-600" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white flex items-center gap-2">
                          <span>{arm.name}</span>
                          <span className="text-[9px] font-mono px-1.5 rounded bg-slate-800 text-slate-400">
                            {arm.rarity}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {isUnlocked ? 'Débloqué avec succès' : `Requis : Niveau ${arm.minLevel}`}
                        </div>
                      </div>
                    </div>
                    {isEquipped ? (
                      <span className="text-[10px] font-mono text-cyan-400 font-bold">Équipé ✓</span>
                    ) : isUnlocked ? (
                      <span className="text-[10px] font-mono text-slate-400">Équiper</span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Auras */}
          <div className="space-y-2.5 pt-2">
            <h3 className="font-bold text-xs font-mono text-slate-300 uppercase tracking-wider">
              Auras Énergétiques
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_AURAS.map((aur) => {
                const isUnlocked = stats.level >= aur.minLevel;
                const isEquipped = cosmetics.aura === aur.id;
                return (
                  <button
                    key={aur.id}
                    disabled={!isUnlocked}
                    onClick={() => setCosmetics({ ...cosmetics, aura: aur.id })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isEquipped
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : isUnlocked
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-950 border-slate-900 text-slate-600 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: aur.color }}
                      />
                      {isEquipped && <span className="text-[9px] font-mono text-cyan-400">Actif</span>}
                    </div>
                    <div className="font-bold text-xs text-white truncate">{aur.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {isUnlocked ? 'Disponible' : `Niveau ${aur.minLevel}`}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: BADGES COLLECTION */}
      {activeSubTab === 'badges' && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400">Succès débloqués</span>
            <span className="text-cyan-400 font-bold">
              {badges.filter((b) => b.unlocked).length} / {badges.length}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                  b.unlocked
                    ? 'bg-[#0e1424] border-cyan-500/30'
                    : 'bg-[#090d16] border-slate-800 opacity-50'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    b.unlocked
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 glow-cyan'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs text-white">{b.title}</h4>
                    {b.unlocked && (
                      <span className="text-[9px] font-mono text-emerald-400">Acquis</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {b.description}
                  </p>
                  {b.unlockedAt && (
                    <div className="text-[9px] font-mono text-slate-500 mt-1">
                      Débloqué : {b.unlockedAt}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 4: RÉGLAGES & PARAMÈTRES (Section 16 du prompt) */}
      {activeSubTab === 'reglages' && (
        <div className="space-y-3 animate-fadeIn">
          {/* Subscription Tier Button */}
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#172038] to-[#101728] border border-cyan-500/40 hover:border-cyan-400 flex items-center justify-between text-left transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Mon Abonnement</div>
                <div className="text-xs text-cyan-300 font-mono">
                  Offre actuelle : {subscriptionTier.toUpperCase()} (Simulée)
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Questionnaire Sportif Reset */}
          <button
            onClick={() => setShowQuestionnaire(true)}
            className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-left transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Refaire le Questionnaire Sportif</div>
                <div className="text-xs text-slate-400">
                  Modifier objectif, niveau, équipement, limitations...
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Revoir Onboarding */}
          <button
            onClick={() => setShowOnboarding(true)}
            className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-left transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800 text-slate-300">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Revoir l'Introduction du Jeu</div>
                <div className="text-xs text-slate-400">
                  Les 3 écrans de présentation initiale
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Health Disclaimer Info */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Clause médicale de non-responsabilité</span>
            </div>
            <p className="text-[11px] leading-relaxed text-amber-100/90">
              LEVEL UP est un compagnon sportif ludique. Les informations de santé et limitations servent uniquement à écarter des mouvements non adaptés et ne constituent en aucun cas une consultation médicale.
            </p>
          </div>

          {/* Reset Demo Lucas */}
          <button
            onClick={resetToLucasDemo}
            className="w-full py-3 px-4 rounded-2xl bg-slate-950 border border-rose-500/30 text-rose-400 hover:bg-rose-950/20 text-xs font-bold font-mono flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Réinitialiser la Démo (Lucas - Niv. 7 - 2 450 XP)</span>
          </button>
        </div>
      )}
    </div>
  );
}
