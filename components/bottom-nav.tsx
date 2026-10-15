'use client';

import React from 'react';
import { Home, FileText, BarChart3, User } from 'lucide-react';

export type NavTab = 'home' | 'simulados' | 'exam' | 'results' | 'stats' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isExamActive?: boolean;
}

export function BottomNav({ activeTab, onSelectTab, isExamActive = false }: BottomNavProps) {
  // If exam is currently open, we hide the default bottom nav or keep it focused on exam actions
  if (isExamActive) {
    return null;
  }

  const navItems = [
    { id: 'home' as NavTab, label: 'Início', icon: Home },
    { id: 'simulados' as NavTab, label: 'Simulados', icon: FileText },
    { id: 'stats' as NavTab, label: 'Estatísticas', icon: BarChart3 },
    { id: 'profile' as NavTab, label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 bg-white border-t border-[#becabc]/30 shadow-lg md:hidden">
      <div className="flex justify-around items-center px-4 py-2 max-w-xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#15803D] font-semibold bg-[#F0FDF4] rounded-full px-4 py-1.5'
                  : 'text-[#6f7a6e] px-3 py-1.5 hover:text-[#111c2d]'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
