'use client';

import React, { useState } from 'react';
import { Search, Filter, BookOpen, Calendar, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { SIMULADOS_CATALOG, SimuladoMeta } from '@/lib/simulados-data';

interface CatalogViewProps {
  onStartExam: (id: string) => void;
}

export function SimuladosCatalogView({ onStartExam }: CatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Todos os Simulados' },
    { id: 'enem', label: 'ENEM' },
    { id: 'vestibulares', label: 'Vestibulares' },
    { id: 'concursos', label: 'Concursos Públicos' },
    { id: 'fundamental', label: 'Ensino Fundamental' },
  ];

  const filtered = SIMULADOS_CATALOG.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-24 md:pb-16 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#111c2d]">
          Banco de Simulados
        </h1>
        <p className="text-xs sm:text-sm text-[#64748b]">
          Provas formuladas no rigor exato das principais bancas examinadoras do país.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar por banca, ano ou matéria..."
            className="w-full bg-white text-sm rounded-xl pl-11 pr-4 py-2.5 border border-[#CBD5E1] focus:border-[#15803D] focus:ring-2 focus:ring-[#15803D]/20 outline-hidden"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#15803D] text-white shadow-xs'
                  : 'bg-white border border-[#CBD5E1] text-[#475569] hover:bg-[#F8F9FA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((simulado) => (
          <div
            key={simulado.id}
            className="bg-white rounded-2xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between hover:shadow-sm hover:border-[#15803D]/50 transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#15803D]/20">
                  {simulado.badge || 'Simulado Oficial'}
                </span>
                <span className="text-xs text-[#64748b]">{simulado.officialTag}</span>
              </div>

              <div>
                <h3 className="font-display font-bold text-base text-[#111c2d]">
                  {simulado.title}
                </h3>
                <p className="text-xs text-[#64748b] mt-1 leading-relaxed">
                  {simulado.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#64748b] pt-2 border-t border-[#F1F5F9]">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#15803D]" />
                  <span><strong>{simulado.questionsCount}</strong> Questões</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>{simulado.duration}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                type="button"
                onClick={() => onStartExam(simulado.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Iniciar Simulado</span>
                <Play className="w-3 h-3 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
