import React from 'react';
import Image from 'next/image';
import { EscSimuladosLogo } from './logo';
import { Bell, Flame, Sparkles } from 'lucide-react';
import { NavTab } from './bottom-nav';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenExam?: () => void;
}

export function Header({ activeTab, onSelectTab, onOpenExam }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand & Mobile Avatar */}
        <div className="flex items-center gap-3">
          {/* Avatar on mobile or compact screens */}
          <button
            type="button"
            onClick={() => onSelectTab('profile')}
            className="md:hidden relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#15803D]/25 p-0.5 bg-[#F0F3FF] shrink-0"
            title="Ver Perfil"
          >
            {/* Student Avatar photo from reference */}
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdptW6iYR4QfMiE-NM15RfD6B560Qg7VcFqWjwIyCA926NJmbmiiZ6u4uOZuV3NMtHaDlMkgNBSBCArRShjv4Q4rbBocYRjDRB-iOvZLZIiciqqTxH2urZ3d46SKvu47PIGH54BkT_gBr0WrxNq6ttLMNyU-Xz6Iv184awW7Rt8FCIqCXWQbylOkW_2GQ6kwP4wl-JAzVdSu-LDleb_5z0MF2u9edpkvfm2ZKYFMpO-rX5_HKbXXf7nA"
              alt="Lucas Perfil"
              width={36}
              height={36}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#15803D] border-2 border-white rounded-full"></span>
          </button>

          {/* Logo */}
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className="flex items-center text-left focus:outline-hidden"
          >
            <EscSimuladosLogo size="md" />
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#475569]">
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#15803D] ${
              activeTab === 'home' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D] py-5' : 'py-5'
            }`}
          >
            Início
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('simulados')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#15803D] ${
              activeTab === 'simulados' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D] py-5' : 'py-5'
            }`}
          >
            Banco de Simulados
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('results')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#15803D] ${
              activeTab === 'results' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D] py-5' : 'py-5'
            }`}
          >
            Desempenho & Resultados
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('stats')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#15803D] ${
              activeTab === 'stats' ? 'text-[#15803D] font-bold border-b-2 border-[#15803D] py-5' : 'py-5'
            }`}
          >
            Estatísticas
          </button>
        </nav>

        {/* Right: Actions, Streaks and Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Streak Pill (Desktop) */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-semibold">
            <Flame className="w-4 h-4 text-[#D97706] fill-[#D97706]" />
            <span>5 Dias Seguidos</span>
          </div>

          {/* Quick Start Exam Button (Desktop) */}
          {onOpenExam && (
            <button
              type="button"
              onClick={onOpenExam}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#15803D] text-white text-xs font-semibold hover:bg-[#166534] transition-all shadow-xs active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulado Rápido</span>
            </button>
          )}

          {/* Notification bell */}
          <button
            type="button"
            aria-label="Notificações"
            className="relative p-2 text-[#64748b] hover:text-[#111c2d] hover:bg-[#F1F5F9] rounded-full transition-colors active:scale-95"
            onClick={() => alert('Você completou a meta de estudos de ontem! Continue assim rumo à aprovação.')}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#DC2626] rounded-full ring-2 ring-white"></span>
          </button>

          {/* Desktop User Avatar profile */}
          <button
            type="button"
            onClick={() => onSelectTab('profile')}
            className="hidden md:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-[#F8F9FA] transition-colors border border-transparent hover:border-[#E2E8F0]"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#15803D]/40">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdptW6iYR4QfMiE-NM15RfD6B560Qg7VcFqWjwIyCA926NJmbmiiZ6u4uOZuV3NMtHaDlMkgNBSBCArRShjv4Q4rbBocYRjDRB-iOvZLZIiciqqTxH2urZ3d46SKvu47PIGH54BkT_gBr0WrxNq6ttLMNyU-Xz6Iv184awW7Rt8FCIqCXWQbylOkW_2GQ6kwP4wl-JAzVdSu-LDleb_5z0MF2u9edpkvfm2ZKYFMpO-rX5_HKbXXf7nA"
                alt="Lucas"
                width={32}
                height={32}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <span className="block text-xs font-bold text-[#1e293b] leading-tight">Lucas S.</span>
              <span className="block text-[10px] text-[#15803D] font-semibold leading-none">Nível 4 · Foco ENEM</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
