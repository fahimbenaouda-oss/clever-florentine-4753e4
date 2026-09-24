import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, Zap, Crown, Sparkles, Shield, ArrowRight } from 'lucide-react';

export function SubscriptionModal() {
  const {
    showSubscriptionModal,
    setShowSubscriptionModal,
    subscriptionTier,
    setSubscriptionTier,
    addXp,
  } = useApp();

  const [selectedTier, setSelectedTier] = useState<'free' | 'standard' | 'premium'>(subscriptionTier);
  const [isSimulatingPayment, setIsSimulatingPayment] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!showSubscriptionModal) return null;

  const handleSimulatePayment = (tier: 'free' | 'standard' | 'premium') => {
    setIsSimulatingPayment(true);
    setTimeout(() => {
      setSubscriptionTier(tier);
      setIsSimulatingPayment(false);
      setSuccessMessage(`Abonnement ${tier.toUpperCase()} activé avec succès ! (Mode Prototype)`);
      if (tier !== 'free') {
        addXp(200, 'Bonus Pass VIP Débloqué');
      }
      setTimeout(() => {
        setSuccessMessage(null);
        setShowSubscriptionModal(false);
      }, 1600);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-[#0d1220] border border-cyan-500/40 rounded-3xl p-5 sm:p-7 text-white relative shadow-[0_0_60px_rgba(0,240,255,0.25)] my-auto">
        <button
          onClick={() => setShowSubscriptionModal(false)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 mb-6">
          <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
            PASSE DE COMBAT // ABONNEMENTS
          </span>
          <h2 className="text-2xl font-bold font-heading text-white">
            Choisis ton Niveau d'Accès
          </h2>
          <p className="text-xs text-slate-400">
            Paiement simulé pour démonstration. Aucune carte bancaire requise.
          </p>
        </div>

        {successMessage ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center glow-emerald">
              <Check className="w-8 h-8 text-emerald-400 stroke-[3]" />
            </div>
            <div className="font-bold text-lg text-white font-heading">{successMessage}</div>
          </div>
        ) : isSimulatingPayment ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center glow-cyan">
              <Sparkles className="w-7 h-7 text-cyan-400 animate-spin" />
            </div>
            <p className="font-mono text-xs text-cyan-300">Validation transaction test & mise à niveau...</p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {/* GRATUIT */}
            <div
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedTier === 'free'
                  ? 'bg-slate-800/80 border-slate-500'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
              onClick={() => setSelectedTier('free')}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-sm text-white font-heading">GRATUIT</h3>
                  <div className="text-[11px] text-slate-400">Découverte basique</div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black font-mono text-white">0 €</span>
                </div>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-slate-400" />
                  Questionnaire & profil sportif
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-slate-400" />
                  1 programme personnalisé / semaine
                </li>
                <li className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-3.5 text-center">•</span>
                  XP basiques, avec publicités
                </li>
              </ul>
              {subscriptionTier === 'free' && (
                <div className="mt-2 text-[10px] font-mono text-cyan-400 font-bold">Actuel</div>
              )}
            </div>

            {/* STANDARD */}
            <div
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                selectedTier === 'standard'
                  ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
              onClick={() => setSelectedTier('standard')}
            >
              <div className="absolute -top-2.5 right-4 bg-cyan-400 text-black font-mono font-bold text-[9px] px-2 py-0.5 rounded-full uppercase">
                Populaire
              </div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-sm text-cyan-300 font-heading">STANDARD</h3>
                  <div className="text-[11px] text-slate-400">L'expérience complète</div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black font-mono text-white">7,99 €</span>
                  <span className="text-[10px] text-slate-400 font-mono"> /mois</span>
                </div>
              </div>
              <ul className="text-[11px] text-slate-200 space-y-1">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  Séances illimitées générées par IA
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  Coach IA conversationnel (A.I.D.E.N)
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  Classement entre amis & défis en duel
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                  Quêtes & Challenges hebdomadaires, sans pub
                </li>
              </ul>
              {subscriptionTier === 'standard' && (
                <div className="mt-2 text-[10px] font-mono text-emerald-400 font-bold">Plan Actif</div>
              )}
            </div>

            {/* PREMIUM */}
            <div
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedTier === 'premium'
                  ? 'bg-purple-500/15 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
              onClick={() => setSelectedTier('premium')}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-purple-400" />
                  <h3 className="font-bold text-sm text-purple-300 font-heading">PREMIUM</h3>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black font-mono text-white">14,99 €</span>
                  <span className="text-[10px] text-slate-400 font-mono"> /mois</span>
                </div>
              </div>
              <ul className="text-[11px] text-slate-200 space-y-1">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  Toutes les fonctionnalités Standard
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  Statistiques & graphiques biomécaniques avancés
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  Cosmétiques d'avatar exclusifs & auras légendaires
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-purple-400" />
                  Compatibilité objets connectés & futures mises à jour
                </li>
              </ul>
              {subscriptionTier === 'premium' && (
                <div className="mt-2 text-[10px] font-mono text-purple-400 font-bold">Plan Actif</div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => handleSimulatePayment(selectedTier)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:brightness-110 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer"
              >
                <span>Confirmer l'offre {selectedTier.toUpperCase()} (Simuler)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
