import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy,
  Medal,
  Swords,
  UserPlus,
  Flame,
  Zap,
  Check,
  Shield,
  Search,
} from 'lucide-react';
import { AvatarDisplay } from '../components/AvatarDisplay';

export function LeaderboardScreen() {
  const { friends, stats, sendFriendlyChallenge, profile } = useApp();
  const [filter, setFilter] = useState<'semaine' | 'mois' | 'amis'>('semaine');
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [addFriendSuccess, setAddFriendSuccess] = useState(false);

  // Synchronize Lucas's current dynamic XP and level into the leaderboard
  const sortedLeaderboard = friends
    .map((f) => {
      if (f.id === 'lucas') {
        return {
          ...f,
          name: `${profile.firstName} (Toi)`,
          level: stats.level,
          xp: stats.totalXp,
          streak: stats.streakDays,
        };
      }
      return f;
    })
    .sort((a, b) => b.xp - a.xp);

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName.trim()) return;
    setAddFriendSuccess(true);
    setTimeout(() => {
      setAddFriendSuccess(false);
      setShowAddFriendModal(false);
      setNewFriendName('');
    }, 1200);
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
            ARÈNE SOCIALE
          </span>
          <h1 className="text-2xl font-black font-heading text-white">Classement Général</h1>
        </div>

        <button
          onClick={() => setShowAddFriendModal(true)}
          className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-bold text-xs hover:bg-cyan-500/25 transition-all cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Ajouter un ami</span>
        </button>
      </div>

      {/* Tabs Filter */}
      <div className="p-1 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
        {[
          { id: 'semaine', label: 'Cette semaine' },
          { id: 'mois', label: 'Ce mois' },
          { id: 'amis', label: 'Cercle d’amis' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Top 3 Podium Highlights */}
      <div className="grid grid-cols-3 gap-2 pt-2 items-end">
        {/* 2nd Place */}
        {sortedLeaderboard[1] && (
          <div className="p-3 rounded-2xl bg-[#0f1527] border border-slate-700 text-center space-y-1.5 order-1">
            <div className="text-[11px] font-mono font-bold text-slate-400">#2 Argent</div>
            <AvatarDisplay
              level={sortedLeaderboard[1].level}
              armor={sortedLeaderboard[1].armor}
              aura="electric-blue"
              size="sm"
            />
            <div className="font-bold text-xs text-white truncate">{sortedLeaderboard[1].name}</div>
            <div className="text-[10px] font-mono text-cyan-400 font-bold">
              {sortedLeaderboard[1].xp.toLocaleString()} XP
            </div>
          </div>
        )}

        {/* 1st Place */}
        {sortedLeaderboard[0] && (
          <div className="p-3.5 rounded-3xl bg-gradient-to-b from-[#1c243f] to-[#10162a] border-2 border-yellow-500/60 text-center space-y-2 order-2 shadow-[0_0_25px_rgba(234,179,8,0.25)] relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-black text-[9px] px-2 py-0.5 rounded-full uppercase font-mono">
              Champion
            </div>
            <div className="text-xs font-mono font-bold text-yellow-300">#1 Or</div>
            <AvatarDisplay
              level={sortedLeaderboard[0].level}
              armor={sortedLeaderboard[0].armor}
              aura="solar-flare"
              size="md"
            />
            <div className="font-bold text-sm text-white truncate">{sortedLeaderboard[0].name}</div>
            <div className="text-xs font-mono text-yellow-300 font-extrabold">
              {sortedLeaderboard[0].xp.toLocaleString()} XP
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {sortedLeaderboard[2] && (
          <div className="p-3 rounded-2xl bg-[#0f1527] border border-amber-800/40 text-center space-y-1.5 order-3">
            <div className="text-[11px] font-mono font-bold text-amber-500">#3 Bronze</div>
            <AvatarDisplay
              level={sortedLeaderboard[2].level}
              armor={sortedLeaderboard[2].armor}
              aura="cyan-pulse"
              size="sm"
            />
            <div className="font-bold text-xs text-white truncate">{sortedLeaderboard[2].name}</div>
            <div className="text-[10px] font-mono text-cyan-400 font-bold">
              {sortedLeaderboard[2].xp.toLocaleString()} XP
            </div>
          </div>
        )}
      </div>

      {/* Full Leaderboard List */}
      <div className="space-y-2.5 pt-2">
        {sortedLeaderboard.map((user, idx) => {
          const isMe = user.id === 'lucas';
          return (
            <div
              key={user.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isMe
                  ? 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                  : 'bg-[#0c101e] border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 text-center font-mono font-extrabold text-sm ${
                    idx === 0
                      ? 'text-yellow-400'
                      : idx === 1
                      ? 'text-slate-300'
                      : idx === 2
                      ? 'text-amber-500'
                      : 'text-slate-500'
                  }`}
                >
                  {idx + 1}
                </span>

                <AvatarDisplay
                  level={user.level}
                  armor={user.armor}
                  aura="electric-blue"
                  size="sm"
                  showBadge={false}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{user.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                      Niv.{user.level}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="flex items-center gap-0.5 text-amber-400 font-mono">
                      <Flame className="w-3 h-3 fill-amber-400" />
                      {user.streak}j
                    </span>
                    <span>•</span>
                    <span className="truncate max-w-[130px]">{user.statusText}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-right font-mono">
                  <div className="font-extrabold text-sm text-white">
                    {user.xp.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase">XP Total</div>
                </div>

                {!isMe && (
                  <button
                    onClick={() => sendFriendlyChallenge(user.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 border border-slate-700 transition-all cursor-pointer"
                    title="Lancer un duel de 30 min"
                  >
                    <Swords className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Friend Modal */}
      {showAddFriendModal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0e1322] border border-cyan-500/40 rounded-3xl p-6 text-white space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-cyan-400" />
              Ajouter un Partenaire de Quête
            </h3>

            {addFriendSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-400 text-center text-xs text-emerald-300 font-semibold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                Demande d'ami envoyée avec succès !
              </div>
            ) : (
              <form onSubmit={handleAddFriend} className="space-y-3">
                <input
                  type="text"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  placeholder="Pseudo ou Gamertag (ex: AlexCyber)"
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:outline-none text-xs text-white"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddFriendModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 text-xs text-slate-400 cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-cyan-400 text-black font-extrabold text-xs shadow-md cursor-pointer"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
