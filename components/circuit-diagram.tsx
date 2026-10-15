'use client';

import React, { useState } from 'react';
import { Zap, Activity } from 'lucide-react';

export function CircuitDiagram() {
  const [activeTab, setActiveTab] = useState<'circuit' | 'curve'>('circuit');

  return (
    <div className="my-4 rounded-xl border border-[#becabc]/40 bg-white overflow-hidden shadow-xs">
      {/* Diagram Mode Switcher */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#F8F9FA] border-b border-[#becabc]/30 text-xs">
        <span className="font-semibold text-[#111c2d] flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#15803D]" />
          Diagrama Técnico Oficial • ENEM
        </span>
        <div className="flex items-center gap-1 bg-[#e7eeff]/60 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('circuit')}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all ${
              activeTab === 'circuit'
                ? 'bg-white text-[#15803D] font-semibold shadow-xs'
                : 'text-[#3f493f] hover:text-[#111c2d]'
            }`}
          >
            Circuito Elétrico
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('curve')}
            className={`px-2.5 py-1 rounded-md font-medium text-xs transition-all ${
              activeTab === 'curve'
                ? 'bg-white text-[#15803D] font-semibold shadow-xs'
                : 'text-[#3f493f] hover:text-[#111c2d]'
            }`}
          >
            Curva Potência x Corrente
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="p-4 flex flex-col items-center justify-center bg-[#FBFDFB]">
        {activeTab === 'circuit' ? (
          <div className="w-full max-w-xl">
            <svg
              viewBox="0 0 600 240"
              className="w-full h-auto drop-shadow-xs"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Circuit frame title */}
              <text x="300" y="24" textAnchor="middle" fill="#1B4D3E" fontSize="12" fontWeight="700" letterSpacing="0.05em">
                CIRCUITO ELÉTRICO BÁSICO (ENEM / FÍSICA)
              </text>

              {/* Wire paths with green glowing signal flow */}
              {/* Top wire from battery to Ammeter */}
              <line x1="120" y1="90" x2="120" y2="60" stroke="#1B4D3E" strokeWidth="2.5" />
              <line x1="120" y1="60" x2="220" y2="60" stroke="#1B4D3E" strokeWidth="2.5" />

              {/* Ammeter A */}
              <circle cx="240" cy="60" r="16" fill="#FFFFFF" stroke="#15803D" strokeWidth="2.5" />
              <text x="240" y="65" textAnchor="middle" fill="#15803D" fontSize="13" fontWeight="bold">A</text>

              {/* Wire from Ammeter to Rheostat */}
              <line x1="256" y1="60" x2="330" y2="60" stroke="#1B4D3E" strokeWidth="2.5" />

              {/* Rheostat coils (Rh) */}
              <g transform="translate(330, 48)">
                <path
                  d="M0,12 C10,0 20,0 30,12 C40,24 50,24 60,12 C70,0 80,0 90,12 C100,24 110,24 120,12"
                  fill="none"
                  stroke="#1B4D3E"
                  strokeWidth="2.5"
                />
                <text x="60" y="-8" textAnchor="middle" fill="#1B4D3E" fontSize="11" fontWeight="bold">RH</text>
                {/* Arrow slider */}
                <path d="M60,-2 L60,10 M56,6 L60,10 L64,6" stroke="#15803D" strokeWidth="2" fill="none" />
              </g>

              {/* Wire from Rheostat to Lamp */}
              <line x1="450" y1="60" x2="500" y2="60" stroke="#1B4D3E" strokeWidth="2.5" />
              <line x1="500" y1="60" x2="500" y2="105" stroke="#1B4D3E" strokeWidth="2.5" />

              {/* Light Bulb (L) */}
              <circle cx="500" cy="120" r="15" fill="#FEFCE8" stroke="#1B4D3E" strokeWidth="2.5" />
              <path d="M492,120 Q500,110 508,120" fill="none" stroke="#D97706" strokeWidth="2" />
              <text x="525" y="125" fill="#1B4D3E" fontSize="11" fontWeight="bold">L</text>

              {/* Wire from Lamp to Bottom */}
              <line x1="500" y1="135" x2="500" y2="180" stroke="#1B4D3E" strokeWidth="2.5" />
              <line x1="500" y1="180" x2="120" y2="180" stroke="#1B4D3E" strokeWidth="2.5" />
              <line x1="120" y1="180" x2="120" y2="120" stroke="#1B4D3E" strokeWidth="2.5" />

              {/* Battery B (120V) */}
              <g transform="translate(110, 90)">
                {/* Long positive plate */}
                <line x1="0" y1="8" x2="20" y2="8" stroke="#15803D" strokeWidth="3" />
                {/* Short negative plate */}
                <line x1="4" y1="22" x2="16" y2="22" stroke="#111c2d" strokeWidth="4" />
                <text x="-25" y="12" fill="#1B4D3E" fontSize="10" fontWeight="bold">+ (120V)</text>
                <text x="-15" y="26" fill="#64748b" fontSize="10" fontWeight="bold">-</text>
                <text x="26" y="19" fill="#1B4D3E" fontSize="11" fontWeight="bold">B</text>
              </g>

              {/* Flow Arrows (Green pedagogical current indicators) */}
              <path d="M280,54 L295,54 M290,50 L295,54 L290,58" stroke="#15803D" strokeWidth="2" fill="none" />
              <path d="M506,145 L506,160 M502,155 L506,160 L510,155" stroke="#15803D" strokeWidth="2" fill="none" />
              <path d="M330,186 L310,186 M316,182 L310,186 L316,190" stroke="#15803D" strokeWidth="2" fill="none" />

              {/* Outer frame border */}
              <rect x="20" y="8" width="560" height="216" rx="8" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
            </svg>
          </div>
        ) : (
          <div className="w-full max-w-xl">
            <svg
              viewBox="0 0 600 240"
              className="w-full h-auto drop-shadow-xs"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Frame border */}
              <rect x="20" y="8" width="560" height="216" rx="8" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
              <text x="300" y="25" textAnchor="middle" fill="#1B4D3E" fontSize="12" fontWeight="700">
                CURVA DE POTÊNCIA DISSIPADA P(i) = 120·i - 24·i²
              </text>

              {/* Axes */}
              <line x1="70" y1="190" x2="520" y2="190" stroke="#334155" strokeWidth="2" />
              <line x1="70" y1="190" x2="70" y2="40" stroke="#334155" strokeWidth="2" />

              {/* Axis labels */}
              <text x="535" y="194" fill="#334155" fontSize="11" fontWeight="bold">i (A)</text>
              <text x="65" y="35" textAnchor="end" fill="#334155" fontSize="11" fontWeight="bold">P (W)</text>

              {/* Grid ticks */}
              <text x="70" y="206" textAnchor="middle" fill="#64748b" fontSize="10">0</text>
              <text x="160" y="206" textAnchor="middle" fill="#64748b" fontSize="10">1.2</text>
              <text x="240" y="206" textAnchor="middle" fill="#64748b" fontSize="10">2.0</text>
              <text x="295" y="206" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="bold">2.5 A</text>
              <text x="430" y="206" textAnchor="middle" fill="#64748b" fontSize="10">4.8</text>
              <text x="500" y="206" textAnchor="middle" fill="#64748b" fontSize="10">5.0</text>

              <text x="60" y="70" textAnchor="end" fill="#15803D" fontSize="11" fontWeight="bold">300 W</text>
              <text x="60" y="125" textAnchor="end" fill="#64748b" fontSize="10">180 W</text>

              {/* Peak dashed lines */}
              <line x1="70" y1="65" x2="295" y2="65" stroke="#15803D" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="295" y1="65" x2="295" y2="190" stroke="#15803D" strokeWidth="1.5" strokeDasharray="4 4" />

              {/* Parabolic curve */}
              <path
                d="M70,190 Q295,-60 500,190"
                fill="none"
                stroke="#15803D"
                strokeWidth="3.5"
              />

              {/* Highlight Peak Point */}
              <circle cx="295" cy="65" r="6" fill="#15803D" stroke="#FFFFFF" strokeWidth="2" />
              <rect x="305" y="48" width="130" height="24" rx="4" fill="#E8F5E9" stroke="#15803D" strokeWidth="1" />
              <text x="370" y="64" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="bold">
                PICO: 2,5 A / 300 W
              </text>
            </svg>
          </div>
        )}

        <span className="mt-2 text-center text-xs text-[#6f7a6e] italic">
          Figura 1: Curva de potência dissipada (W) versus intensidade da corrente elétrica (A).
        </span>
      </div>
    </div>
  );
}
