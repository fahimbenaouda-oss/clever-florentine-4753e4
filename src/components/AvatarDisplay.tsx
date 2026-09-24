import React from 'react';
import { Shield, Sparkles, Zap, Award } from 'lucide-react';

interface AvatarDisplayProps {
  level: number;
  armor: string;
  aura: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
}

export function AvatarDisplay({
  level,
  armor,
  aura,
  color = '#00F0FF',
  size = 'md',
  showBadge = true,
}: AvatarDisplayProps) {
  const sizeMap = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-20 h-20 text-sm',
    lg: 'w-32 h-32 text-base',
    xl: 'w-44 h-44 text-lg',
  };

  const auraMap: Record<string, string> = {
    'electric-blue': 'shadow-[0_0_25px_rgba(0,240,255,0.6)] border-cyan-400',
    'cyan-pulse': 'shadow-[0_0_30px_rgba(6,182,212,0.7)] border-cyan-500',
    'solar-flare': 'shadow-[0_0_35px_rgba(245,158,11,0.7)] border-amber-500',
    'void-violet': 'shadow-[0_0_35px_rgba(168,85,247,0.7)] border-purple-500',
  };

  const currentAuraClass = auraMap[aura] || auraMap['electric-blue'];

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer ambient glow ring */}
      <div
        className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-500/30 via-emerald-500/20 to-purple-500/40 blur-md ${
          level >= 5 ? 'animate-pulse-glow' : ''
        }`}
      />

      {/* Main Avatar Container */}
      <div
        className={`relative ${sizeMap[size]} rounded-2xl bg-gradient-to-b from-[#151c2e] to-[#0a0d18] border-2 ${currentAuraClass} flex items-center justify-center overflow-hidden transition-all duration-300`}
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-15 cyber-grid" />

        {/* Dynamic Stylized Avatar Hero SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Energy background aura */}
          <circle cx="50" cy="50" r="42" fill="url(#avatarGlow)" fillOpacity="0.15" />

          {/* Shoulders / Armor */}
          <path
            d="M20 85 C22 68 35 62 50 62 C65 62 78 68 80 85 Z"
            fill={armor === 'titan-suit' ? '#3B82F6' : armor === 'neon-striker' ? '#10B981' : '#1e293b'}
            stroke="#00F0FF"
            strokeWidth="1.5"
          />

          {/* Armor Chest Core */}
          <path
            d="M44 68 L56 68 L50 78 Z"
            fill="#00F0FF"
            className="animate-pulse"
          />

          {/* Neck */}
          <rect x="44" y="52" width="12" height="12" rx="3" fill="#334155" />

          {/* Head & Cyber Visor */}
          <ellipse cx="50" cy="42" rx="18" ry="20" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
          
          {/* Cyber Visor / Helmet HUD */}
          <path
            d="M36 39 C40 37 60 37 64 39 C62 46 38 46 36 39 Z"
            fill="#00F0FF"
            filter="drop-shadow(0px 0px 4px #00F0FF)"
          />

          {/* Hair / Headgear */}
          <path
            d="M32 38 C32 26 68 26 68 38 C60 31 40 31 32 38 Z"
            fill="#0f172a"
          />

          {/* Side antenna / tech nodule */}
          <rect x="30" y="38" width="2" height="8" rx="1" fill="#10B981" />
          <rect x="68" y="38" width="2" height="8" rx="1" fill="#10B981" />

          <defs>
            <radialGradient id="avatarGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 50) scale(40)">
              <stop stopColor="#00F0FF" />
              <stop offset="1" stopColor="#00F0FF" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Level Tag Overlay */}
        {showBadge && (
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-300 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
            <Zap className="w-2.5 h-2.5 text-yellow-300 fill-yellow-300" />
            <span>N.{level}</span>
          </div>
        )}
      </div>
    </div>
  );
}
