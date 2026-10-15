'use client';

import React from 'react';
import Image from 'next/image';
import { User, Award, Flame, Target, BookOpen, ShieldCheck, Settings, CheckCircle2 } from 'lucide-react';
import { EscSimuladosLogo } from './logo';

export function ProfileView() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-24 md:pb-16 space-y-6">
      {/* Student Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        <div className="relative w-20 h-20 rounded-full overflow-hidden ring-4 ring-[#15803D]/20 p-1 bg-white shrink-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdptW6iYR4QfMiE-NM15RfD6B560Qg7VcFqWjwIyCA926NJmbmiiZ6u4uOZuV3NMtHaDlMkgNBSBCArRShjv4Q4rbBocYRjDRB-iOvZLZIiciqqTxH2urZ3d46SKvu47PIGH54BkT_gBr0WrxNq6ttLMNyU-Xz6Iv184awW7Rt8FCIqCXWQbylOkW_2GQ6kwP4wl-JAzVdSu-LDleb_5z0MF2u9edpkvfm2ZKYFMpO-rX5_HKbXXf7nA"
            alt="Lucas Silva"
            width={80}
            height={80}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#15803D] border-2 border-white rounded-full"></span>
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-[#111c2d]">
              Lucas Silva
            </h1>
            <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-[#E8F5E9] text-[#15803D] border border-[#15803D]/20">
              Nível 4 · Foco ENEM & Medicina
            </span>
          </div>
          <p className="text-xs text-[#64748b]">
            ia.mic.2026@gmail.com · Membro ativo desde Fevereiro 2026
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-4 pt-3 text-xs text-[#475569]">
            <div className="flex items-center gap-1 font-semibold">
              <Flame className="w-4 h-4 text-[#D97706] fill-[#D97706]" />
              <span>5 dias seguidos</span>
            </div>
            <div className="flex items-center gap-1 font-semibold">
              <Target className="w-4 h-4 text-[#15803D]" />
              <span>Meta: 800+ no ENEM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges / Conquistas */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs space-y-3">
        <h2 className="font-display text-base font-bold text-[#111c2d]">
          Conquistas Desbloqueadas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20">
            <Award className="w-6 h-6 text-[#15803D] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#111c2d] block">Mestre da Física</span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">+50 questões feitas</span>
          </div>
          <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
            <Flame className="w-6 h-6 text-[#D97706] mx-auto mb-1 fill-[#D97706]" />
            <span className="text-xs font-bold text-[#111c2d] block">Chama Olímpica</span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">5 dias ininterruptos</span>
          </div>
          <div className="p-3 rounded-xl bg-[#F0FDFA] border border-[#0D9488]/20">
            <ShieldCheck className="w-6 h-6 text-[#0D9488] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#111c2d] block">Simulador Real</span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">Tempo oficial concluído</span>
          </div>
          <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1]">
            <BookOpen className="w-6 h-6 text-[#64748b] mx-auto mb-1" />
            <span className="text-xs font-bold text-[#111c2d] block">Leitor Crítico</span>
            <span className="text-[10px] text-[#64748b] block mt-0.5">10 gabaritos lidos</span>
          </div>
        </div>
      </div>

      {/* Target & Settings */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs space-y-4">
        <h2 className="font-display text-base font-bold text-[#111c2d]">
          Preferências de Preparação
        </h2>
        <div className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FA]">
            <div>
              <span className="font-bold text-[#111c2d] block">Objetivo Principal</span>
              <span className="text-xs text-[#64748b]">ENEM 2024 / Vestibulares Paulistas</span>
            </div>
            <span className="text-xs font-semibold text-[#15803D] bg-white px-3 py-1 rounded-lg border border-[#CBD5E1]">
              Alterar
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FA]">
            <div>
              <span className="font-bold text-[#111c2d] block">Meta Diária de Questões</span>
              <span className="text-xs text-[#64748b]">25 questões por dia</span>
            </div>
            <span className="text-xs font-semibold text-[#15803D] bg-white px-3 py-1 rounded-lg border border-[#CBD5E1]">
              Ajustar
            </span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FA]">
            <div>
              <span className="font-bold text-[#111c2d] block">Avisos Sonoros do Cronômetro</span>
              <span className="text-xs text-[#64748b]">Alerta nos últimos 30 e 15 minutos</span>
            </div>
            <span className="text-xs font-bold text-[#15803D]">Ativo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
