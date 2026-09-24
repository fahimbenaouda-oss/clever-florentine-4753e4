import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  ShieldAlert,
  Clock,
  Dumbbell,
  Heart,
  Flame,
} from 'lucide-react';

export function CoachScreen() {
  const { chatMessages, sendCoachMessage, profile } = useApp();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (text?: string) => {
    const toSend = text || inputText;
    if (!toSend.trim()) return;
    sendCoachMessage(toSend);
    if (!text) setInputText('');
  };

  const quickPrompts = [
    { label: 'Je n’ai que 20 minutes aujourd’hui ⏱️', prompt: 'Je n’ai que 20 minutes aujourd’hui.' },
    { label: 'Je n’ai pas mes haltères 🏋️', prompt: 'Je n’ai pas mes haltères avec moi.' },
    { label: 'J’ai une gêne au genou 🩹', prompt: 'J’ai une légère gêne au genou aujourd’hui.' },
    { label: 'Besoin d’un boost de motivation ! 🔥', prompt: 'Besoin d’un boost de motivation pour me lancer !' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-md mx-auto animate-fadeIn">
      {/* Coach Header banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#111728] to-[#0c1220] border border-cyan-500/30 flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-black glow-cyan">
              <Bot className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0c1220]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white font-heading">COACH A.I.D.E.N</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                CYBER IA
              </span>
            </div>
            <div className="text-[11px] text-slate-400">Toujours prêt • Conseils & Sécurité</div>
          </div>
        </div>

        <div className="text-right text-[10px] font-mono text-cyan-400">
          Statut : <span className="text-emerald-400 font-bold">En ligne</span>
        </div>
      </div>

      {/* Medical Safety Disclaimer Pill */}
      <div className="mb-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-200/90 flex items-center gap-1.5 shrink-0">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Conseils d'entraînement gamifiés. Ne remplace pas un avis médical professionnel.</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 py-2">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'coach' && (
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-sm'
                  : 'bg-[#101627] border border-cyan-500/20 text-slate-200 rounded-tl-sm'
              }`}
            >
              <p>{msg.text}</p>
              <div
                className={`text-[9px] font-mono ${
                  msg.sender === 'user' ? 'text-cyan-200 text-right' : 'text-slate-400 text-left'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="py-2 flex gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
        {quickPrompts.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q.prompt)}
            className="shrink-0 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 hover:border-cyan-400 text-[11px] text-slate-300 hover:text-cyan-300 font-medium transition-all cursor-pointer"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="pt-2 pb-14 sm:pb-4 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Écris à ton coach (ex: temps, matériel, énergie...)"
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:outline-none text-white text-xs placeholder:text-slate-500 font-medium transition-all"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 text-black font-bold transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
