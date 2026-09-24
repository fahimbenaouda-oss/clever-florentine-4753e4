import React from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Crown, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { AvatarDisplay } from './AvatarDisplay';

export function LevelUpModal() {
  const { showLevelUpModal, closeLevelUpModal, levelUpInfo, stats, cosmetics } = useApp();

  if (!showLevelUpModal || !levelUpInfo) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-black/92 backdrop-blur-lg">
      <div className="w-full max-w-md bg-[#0a0f1d] border-2 border-cyan-400 rounded-3xl p-6 sm:p-8 text-white text-center relative shadow-[0_0_80px_rgba(0,240,255,0.5)] animate-fadeIn overflow-hidden">
        {/* Holographic light cone */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Level Up Crest */}
        <div className="relative mb-5 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 p-1 glow-cyan-lg">
            <div className="w-full h-full rounded-full bg-[#080d1a] flex items-center justify-center">
              <Crown className="w-12 h-12 text-yellow-300 drop-shadow-[0_0_15px_#FACC15]" />
            </div>
          </div>
          <div className="absolute -bottom-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black text-xs px-3 py-0.5 rounded-full uppercase tracking-wider font-mono shadow-lg">
            RANK UP
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1 mb-5">
          <h2 className="text-4xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-400 tracking-wider">
            LEVEL UP !
          </h2>
          <p className="text-xs font-mono text-cyan-300">
            Niveau {levelUpInfo.oldLevel} ➔ <span className="text-white font-bold text-sm">Niveau {levelUpInfo.newLevel}</span>
          </p>
          <div className="text-lg font-bold font-heading text-emerald-400 pt-1">
            Nouveau Titre : « {levelUpInfo.title} »
          </div>
        </div>

        {/* Unlocked Reward Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141b2f] to-[#0c1222] border border-cyan-500/40 text-left mb-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold uppercase">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Récompenses d'Évolution Débloquées</span>
          </div>

          <div className="flex items-center gap-3">
            <AvatarDisplay
              level={levelUpInfo.newLevel}
              armor={cosmetics.armor}
              aura="solar-flare"
              size="sm"
              showBadge={false}
            />
            <div>
              <div className="font-bold text-sm text-white">Nouveau Cosmétique Débloqué !</div>
              <div className="text-xs text-slate-300">
                Armure Néon Striker & Effet de particule Solaire
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeLevelUpModal}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:brightness-110 text-black font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-black" />
          <span>Équiper & Continuer</span>
        </button>
      </div>
    </div>
  );
}
