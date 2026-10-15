'use client';

import React, { useState } from 'react';
import {
  Flame,
  Search,
  SlidersHorizontal,
  Play,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Calendar,
  Sparkles,
  Filter,
} from 'lucide-react';
import { SIMULADOS_CATALOG, SimuladoMeta } from '@/lib/simulados-data';

interface HomeViewProps {
  onStartExam: (simuladoId?: string) => void;
  onOpenResults: () => void;
  onOpenCatalog: () => void;
}

export function HomeView({ onStartExam, onOpenResults, onOpenCatalog }: HomeViewProps) {
  const [selectedSegment, setSelectedSegment] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dailyAnswered, setDailyAnswered] = useState<number>(17);
  const dailyTarget = 25;

  const segments = [
    { id: 'todos', label: 'Todos' },
    { id: 'enem', label: 'Ensino Médio & ENEM' },
    { id: 'vestibulares', label: 'Vestibulares (FUVEST, UNICAMP)' },
    { id: 'concursos', label: 'Concursos Públicos' },
    { id: 'fundamental', label: 'Ensino Fundamental (OBMEP, Saeb)' },
  ];

  // Filter simulados by search and segment
  const filteredSimulados = SIMULADOS_CATALOG.filter((item) => {
    const matchesSegment = selectedSegment === 'todos' || item.category === selectedSegment;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSegment && matchesSearch;
  });

  const dailyProgressPercent = Math.min(100, Math.round((dailyAnswered / dailyTarget) * 100));

  return (
    <div className="space-y-6 pb-28 md:pb-16 max-w-5xl mx-auto px-4 sm:px-6 pt-4">
      {/* Hero Greeting & Motivation Header */}
      <section className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#111c2d]">
            Olá, <span className="text-[#15803D]">Lucas</span>! 👋
          </h1>
          <span className="text-xs font-semibold text-[#15803D] bg-[#E8F5E9] border border-[#15803D]/20 px-3 py-1 rounded-full shadow-2xs">
            Nível 4 · Avançado
          </span>
        </div>
        <p className="text-sm text-[#475569]">
          Pronto para treinar hoje e conquistar sua aprovação?
        </p>
      </section>

      {/* Grid: Daily Goal Card & Interactive Category Portals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Daily Goal & Streak Card (Span 2 on Desktop) */}
        <section className="md:col-span-2 bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs relative overflow-hidden transition-all hover:shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                <span className="text-xs font-semibold text-[#475569] uppercase tracking-wider">
                  Meta Diária de Questões
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-bold text-[#111c2d] tabular-nums">
                  {dailyAnswered}
                </span>
                <span className="text-sm text-[#64748b]">
                  / {dailyTarget} respondidas
                </span>
              </div>
            </div>

            {/* Streak Pill Badge */}
            <div className="flex items-center gap-2 bg-[#FFFBEB] border border-[#FDE68A] px-3.5 py-2 rounded-xl shadow-2xs">
              <Flame className="w-5 h-5 text-[#D97706] fill-[#D97706]" />
              <div className="text-left">
                <span className="block text-xs font-bold text-[#92400E] leading-tight">5 DIAS</span>
                <span className="block text-[10px] text-[#B45309] leading-none">de sequência</span>
              </div>
            </div>
          </div>

          {/* Linear Progress Gauge */}
          <div className="space-y-2">
            <div className="w-full bg-[#F1F5F9] h-3 rounded-full overflow-hidden p-0.5 border border-[#E2E8F0]">
              <div
                className="bg-[#15803D] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${dailyProgressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-xs text-[#64748b]">
              <span className="font-medium">{dailyProgressPercent}% concluído hoje</span>
              <span className="text-[#15803D] font-bold">
                Faltam {Math.max(0, dailyTarget - dailyAnswered)} questões
              </span>
            </div>
          </div>
        </section>

        {/* Quick Action / Pós-Prova Direct Access */}
        <div className="bg-linear-to-br from-[#15803D] to-[#1B4D3E] rounded-2xl p-5 text-white flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#95F8A7] font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              ÚLTIMO SIMULADO
            </div>
            <h3 className="font-display font-bold text-lg leading-tight">
              ENEM 2024 - 1ª Aplicação
            </h3>
            <p className="text-xs text-[#E8F5E9]/80 mt-1">
              Desempenho avaliado: 78% de acertos nas 90 questões.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenResults}
            className="mt-4 w-full py-2.5 px-3.5 rounded-xl bg-white text-[#15803D] text-xs font-bold hover:bg-[#F8F9FA] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
          >
            Ver Painel de Resultados
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Categories Cards (Explicit prompt requirement: ENEM/Vestibulares, Concursos Públicos, Ensino Fundamental e Médio) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#111c2d]">
            Categorias Principais
          </h2>
          <button
            onClick={onOpenCatalog}
            className="text-xs font-semibold text-[#15803D] hover:underline"
          >
            Explorar todas
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* ENEM & Vestibulares */}
          <div
            onClick={() => {
              setSelectedSegment('enem');
            }}
            className="group cursor-pointer bg-white p-4 rounded-xl border border-[#E2E8F0] hover:border-[#15803D]/60 hover:shadow-sm transition-all flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-[#E8F5E9] text-[#15803D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-[#111c2d] group-hover:text-[#15803D] transition-colors">
                ENEM & Vestibulares
              </h3>
              <p className="text-xs text-[#64748b]">FUVEST, UNICAMP, Unesp, ENEM</p>
            </div>
          </div>

          {/* Concursos Públicos */}
          <div
            onClick={() => {
              setSelectedSegment('concursos');
            }}
            className="group cursor-pointer bg-white p-4 rounded-xl border border-[#E2E8F0] hover:border-[#15803D]/60 hover:shadow-sm transition-all flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-[#111c2d] group-hover:text-[#0284C7] transition-colors">
                Concursos Públicos
              </h3>
              <p className="text-xs text-[#64748b]">Caixa, BB, Tribunais, Polícias</p>
            </div>
          </div>

          {/* Ensino Fundamental e Médio */}
          <div
            onClick={() => {
              setSelectedSegment('fundamental');
            }}
            className="group cursor-pointer bg-white p-4 rounded-xl border border-[#E2E8F0] hover:border-[#15803D]/60 hover:shadow-sm transition-all flex items-center gap-3.5"
          >
            <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-[#111c2d] group-hover:text-[#D97706] transition-colors">
                Fundamental & Médio
              </h3>
              <p className="text-xs text-[#64748b]">Saeb, Prova Brasil, OBMEP</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Field */}
      <section>
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-3.5 text-[#64748b] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar simulados, vestibulares, bancas..."
            className="w-full bg-white text-[#111c2d] text-sm rounded-xl pl-11 pr-11 py-3 border border-[#CBD5E1] focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20 transition-all outline-hidden placeholder:text-[#94a3b8] shadow-xs"
          />
          <button
            type="button"
            aria-label="Filtrar"
            onClick={() => setSelectedSegment('todos')}
            className="absolute right-2.5 p-1.5 text-[#64748b] hover:text-[#15803D] rounded-lg transition-colors"
            title="Limpar filtros"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Segment / Tracks Filter Chips (Horizontal Scrollable) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#475569] uppercase tracking-wider">
            Segmentos
          </span>
          {selectedSegment !== 'todos' && (
            <button
              onClick={() => setSelectedSegment('todos')}
              className="text-xs text-[#15803D] hover:underline"
            >
              Mostrar todos
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {segments.map((seg) => {
            const isActive = selectedSegment === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() => setSelectedSegment(seg.id)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'bg-white border border-[#CBD5E1] text-[#334155] hover:bg-[#F8F9FA]'
                }`}
              >
                {seg.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* "Continue de Onde Parou" (Compact Resume Card) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#475569] uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#15803D]"></span>
            Continue de Onde Parou
          </span>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#15803D]/50 transition-colors">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#0D9488] font-bold">Ciências da Natureza</span>
              <span className="text-[#94a3b8]">·</span>
              <span className="text-xs text-[#64748b]">Pausado em Questão 14</span>
            </div>
            <h2 className="font-display text-base font-bold text-[#111c2d] leading-snug">
              Simulado Ciências da Natureza ENEM
            </h2>
            <div className="flex items-center gap-3 pt-0.5">
              <div className="w-32 bg-[#F1F5F9] h-2 rounded-full overflow-hidden border border-[#E2E8F0]">
                <div className="bg-[#15803D] h-full rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="text-xs text-[#64748b] font-medium">18/45 respondidas</span>
            </div>
          </div>
          <button
            onClick={() => onStartExam('enem-2024-cn')}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#E8F5E9] border border-[#15803D]/30 text-[#15803D] text-xs font-bold hover:bg-[#15803D] hover:text-white transition-all active:scale-95 shadow-2xs"
          >
            <span>Retomar</span>
            <Play className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </section>

      {/* Simulados em Destaque */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-[#111c2d]">
              Simulados em Destaque
            </h2>
            <p className="text-xs text-[#64748b]">Provas completas recomendadas para o seu cronograma</p>
          </div>
          <button
            onClick={onOpenCatalog}
            className="text-xs text-[#15803D] font-bold hover:underline"
          >
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSimulados.map((simulado) => {
            const isHeroCard = simulado.highlight;

            return (
              <div
                key={simulado.id}
                className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-md flex flex-col justify-between ${
                  isHeroCard
                    ? 'border-2 border-[#15803D]/30 bg-linear-to-b from-white to-[#F0FDF4]/30'
                    : 'border-[#E2E8F0]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isHeroCard
                          ? 'bg-[#E8F5E9] text-[#15803D]'
                          : 'bg-[#F1F5F9] text-[#475569]'
                      }`}
                    >
                      {simulado.badge}
                    </span>
                    <span className="text-xs text-[#64748b] font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#94a3b8]" />
                      {simulado.officialTag || 'Oficial'}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-[#111c2d] leading-snug">
                      {simulado.title}
                    </h3>
                    <p className="text-xs text-[#64748b] mt-1 line-clamp-2">
                      {simulado.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#64748b] py-1 border-y border-[#F1F5F9]">
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#15803D]" />
                      <span className="font-semibold text-[#111c2d]">{simulado.questionsCount}</span> Questões
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#15803D]" />
                      <span>{simulado.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  {isHeroCard ? (
                    <button
                      type="button"
                      onClick={() => onStartExam(simulado.id)}
                      className="w-full py-3 px-4 rounded-xl bg-[#15803D] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-[#166534] active:scale-[0.98] transition-all"
                    >
                      <span>Começar Agora</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onStartExam(simulado.id)}
                      className="w-full py-2.5 px-4 rounded-xl border border-[#15803D] text-[#15803D] text-xs font-bold hover:bg-[#E8F5E9] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Iniciar Simulado</span>
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
