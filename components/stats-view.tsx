'use client';

import React from 'react';
import { BarChart3, TrendingUp, Calendar, Clock, Target, CheckCircle2 } from 'lucide-react';
import { INITIAL_DISCIPLINE_STATS } from '@/lib/simulados-data';

export function StatsView() {
  const weeklyData = [
    { day: 'Seg', count: 25, goal: 25 },
    { day: 'Ter', count: 30, goal: 25 },
    { day: 'Qua', count: 18, goal: 25 },
    { day: 'Qui', count: 28, goal: 25 },
    { day: 'Sex', count: 32, goal: 25 },
    { day: 'Sáb', count: 45, goal: 25 },
    { day: 'Dom', count: 17, goal: 25 },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-24 md:pb-16 space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#111c2d]">
          Estatísticas & Evolução
        </h1>
        <p className="text-xs sm:text-sm text-[#64748b]">
          Acompanhe seu histórico de estudos, taxa de retenção e consistência diária.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] text-[#64748b] block font-medium">Total de Questões</span>
          <span className="font-display text-2xl font-bold text-[#111c2d] block mt-1">1.248</span>
          <span className="text-[11px] text-[#15803D] font-semibold mt-1 block">+195 essa semana</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] text-[#64748b] block font-medium">Precisão Média</span>
          <span className="font-display text-2xl font-bold text-[#111c2d] block mt-1">79.4%</span>
          <span className="text-[11px] text-[#15803D] font-semibold mt-1 block">▲ 3.2% vs mês anterior</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] text-[#64748b] block font-medium">Tempo de Estudo</span>
          <span className="font-display text-2xl font-bold text-[#111c2d] block mt-1">42h 15m</span>
          <span className="text-[11px] text-[#64748b] mt-1 block">Média 1.8h / dia</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs">
          <span className="text-[11px] text-[#64748b] block font-medium">Simulados Completos</span>
          <span className="font-display text-2xl font-bold text-[#111c2d] block mt-1">14</span>
          <span className="text-[11px] text-[#0D9488] font-semibold mt-1 block">8 do ENEM</span>
        </div>
      </div>

      {/* Weekly Activity Bar Chart */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-base font-bold text-[#111c2d]">
              Produtividade Semanal (Questões Resolvidas)
            </h2>
            <p className="text-xs text-[#64748b]">Meta diária: 25 questões por dia</p>
          </div>
          <span className="text-xs font-bold text-[#15803D] bg-[#E8F5E9] px-3 py-1 rounded-full">
            Meta batida em 5/7 dias
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 pt-6 h-48 px-2 border-b border-[#F1F5F9]">
          {weeklyData.map((d) => {
            const heightPercent = Math.min(100, Math.round((d.count / 50) * 100));
            const hitGoal = d.count >= d.goal;

            return (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#64748b]">{d.count}</span>
                <div
                  className={`w-full max-w-[36px] rounded-t-lg transition-all ${
                    hitGoal ? 'bg-[#15803D]' : 'bg-[#D97706]/70'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-xs font-semibold text-[#475569]">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disciplines Performance */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] shadow-xs space-y-3">
        <h2 className="font-display text-base font-bold text-[#111c2d]">
          Taxa de Acertos por Disciplina
        </h2>
        <div className="space-y-3">
          {INITIAL_DISCIPLINE_STATS.map((stat) => (
            <div key={stat.discipline} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#111c2d]">{stat.discipline}</span>
                <span className="text-[#15803D]">{stat.percentage.toFixed(1)}% ({stat.correct}/{stat.total})</span>
              </div>
              <div className="w-full bg-[#F1F5F9] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#15803D] h-full rounded-full"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
