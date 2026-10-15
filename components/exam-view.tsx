'use client';

import React, { useState, useEffect } from 'react';
import {
  PauseCircle,
  PlayCircle,
  Timer,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  X,
  Send,
  Eye,
} from 'lucide-react';
import { EXAM_QUESTIONS, INITIAL_USER_ANSWERS, INITIAL_FLAGGED_QUESTIONS, Question } from '@/lib/simulados-data';
import { CircuitDiagram } from './circuit-diagram';

interface ExamViewProps {
  onFinishExam: (answers: Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>, timeSpentSeconds: number) => void;
  onExitExam: () => void;
  initialQuestionIndex?: number;
}

export function ExamView({ onFinishExam, onExitExam, initialQuestionIndex = 3 }: ExamViewProps) {
  // Questions list (starts at Question 14 by default or index 3, which is Question 14 in EXAM_QUESTIONS)
  const questions = EXAM_QUESTIONS;
  const [currentIdx, setCurrentIdx] = useState<number>(() => {
    return initialQuestionIndex >= 0 && initialQuestionIndex < questions.length ? initialQuestionIndex : 3;
  });

  // User responses map
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>(INITIAL_USER_ANSWERS);

  // Flagged questions for review
  const [flagged, setFlagged] = useState<number[]>(INITIAL_FLAGGED_QUESTIONS);

  // Countdown timer (starts at 3h 42min 15sec = 13335 seconds)
  const initialTime = 3 * 3600 + 42 * 60 + 15;
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Modals
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false);
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);

  // Timer interval
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const formatTimer = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const currentQuestion: Question = questions[currentIdx] || questions[0];

  const handleSelectAlternative = (letter: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.number]: letter,
    }));
  };

  const toggleFlagCurrent = () => {
    const qNum = currentQuestion.number;
    setFlagged((prev) =>
      prev.includes(qNum) ? prev.filter((id) => id !== qNum) : [...prev, qNum]
    );
  };

  const isCurrentFlagged = flagged.includes(currentQuestion.number);
  const currentAnswer = answers[currentQuestion.number];

  // Navigation handlers
  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowFinishModal(true);
    }
  };

  const totalAnsweredCount = Object.keys(answers).length;
  const totalQuestionsSimulado = 90; // Canonical ENEM count
  const progressPercent = Math.round((totalAnsweredCount / totalQuestionsSimulado) * 100);

  const confirmFinish = () => {
    const timeSpent = initialTime - timeLeft;
    onFinishExam(answers, timeSpent);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111c2d] flex flex-col font-sans select-none pb-24 md:pb-20">
      {/* 1. TOP APP BAR / CABEÇALHO DO EXAME ATIVO (Matches Image 1) */}
      <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Pause / Resume button & Exam Title */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setIsPaused(true);
                setShowPauseModal(true);
              }}
              aria-label="Pausar simulado"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#64748b] hover:bg-[#F1F5F9] hover:text-[#111c2d] transition-colors active:scale-95"
              title="Pausar simulado"
            >
              <PauseCircle className="w-6 h-6 text-[#475569]" />
            </button>
            <div>
              <span className="text-[10px] font-bold text-[#64748b] tracking-wider uppercase block leading-none mb-0.5">
                SIMULADO ATIVO
              </span>
              <h1 className="font-display text-sm sm:text-base font-bold text-[#111c2d] tracking-tight leading-tight">
                ENEM 2024 - Simulado Oficial
              </h1>
            </div>
          </div>

          {/* Cronômetro & Ação Finalizar */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F1F5F9] rounded-full border border-[#CBD5E1]">
              <Timer className="w-4 h-4 text-[#15803D]" />
              <span className="font-display text-xs sm:text-sm font-bold text-[#15803D] tracking-wider tabular-nums">
                {formatTimer(timeLeft)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowFinishModal(true)}
              className="px-3 py-1.5 rounded-lg border border-[#DC2626]/40 text-[#DC2626] hover:bg-[#FEE2E2]/50 text-xs font-bold transition-all active:scale-95"
            >
              Finalizar
            </button>
          </div>
        </div>

        {/* Barra de Progresso Fina Global */}
        <div className="w-full h-1.5 bg-[#E2E8F0] overflow-hidden">
          <div
            className="h-full bg-[#15803D] transition-all duration-300"
            style={{ width: `${Math.max(12, progressPercent)}%` }}
          />
        </div>
      </header>

      {/* 2. SUBHEADER: NAVEGADOR DE QUESTÕES E METADADOS (Matches Image 1) */}
      <section className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 py-3">
          {/* Meta da Questão & Tags */}
          <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-[#111c2d]">
                Questão {currentQuestion.number}
              </span>
              <span className="text-xs text-[#64748b]">de 90</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#F0FDFA] text-[#0D9488] border border-[#0D9488]/20 text-[11px] font-semibold">
                {currentQuestion.subject}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569] text-[11px] font-semibold flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentQuestion.difficulty === 'FÁCIL'
                      ? 'bg-[#15803D]'
                      : currentQuestion.difficulty === 'MÉDIO'
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                  }`}
                />
                {currentQuestion.difficulty}
              </span>
            </div>
          </div>

          {/* Quick Navigator (Strip Horizontal de Questões) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {/* Visual strip spanning questions 11 through 21 */}
            {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((num) => {
              const isAnswered = Boolean(answers[num]);
              const isCurrent = currentQuestion.number === num;
              const isFlagged = flagged.includes(num);

              // Find index if question exists in our array
              const questionIdx = questions.findIndex((q) => q.number === num);

              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (questionIdx !== -1) {
                      setCurrentIdx(questionIdx);
                    }
                  }}
                  className={`relative w-8 h-8 shrink-0 rounded-full font-display text-xs font-semibold flex items-center justify-center transition-transform active:scale-95 ${
                    isCurrent
                      ? 'w-9 h-9 bg-white border-2 border-[#15803D] text-[#15803D] shadow-xs'
                      : isAnswered
                      ? 'bg-[#15803D] text-white shadow-2xs'
                      : isFlagged
                      ? 'bg-[#FEF3C7] border border-[#F59E0B] text-[#B45309]'
                      : 'bg-[#F1F5F9] text-[#64748b] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {num}
                  {isFlagged && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#D97706] ring-1 ring-white" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ÁREA PRINCIPAL DA QUESTÃO (ENUNCIADO + ALTERNATIVAS) */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 pt-4 pb-24">
        {/* Card de Enunciado */}
        <article className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#E2E8F0] mb-4">
          {/* Texto do Contexto Base */}
          <div className="space-y-3 text-sm sm:text-[15px] text-[#212529] leading-relaxed">
            {currentQuestion.context.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* Diagrama Técnico (Se a questão for a 14 ou possuir esquema) */}
          {currentQuestion.hasCircuitDiagram ? (
            <CircuitDiagram />
          ) : null}

          {/* Comando da Questão */}
          <div className="pt-3.5 mt-3.5 border-t border-[#F1F5F9]">
            <p className="text-sm sm:text-[15px] font-semibold text-[#111c2d] leading-relaxed">
              {currentQuestion.prompt}
            </p>
          </div>
        </article>

        {/* 4. ALTERNATIVAS (A até E) - EXACT STYLING & HOVER MATCHING IMAGE 1 */}
        <section aria-label="Alternativas de resposta" className="space-y-2.5">
          {currentQuestion.alternatives.map((alt) => {
            const isSelected = currentAnswer === alt.letter;

            return (
              <label
                key={alt.letter}
                onClick={() => handleSelectAlternative(alt.letter)}
                className={`group relative flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.99] ${
                  isSelected
                    ? 'bg-[#F0FDF4] border-2 border-[#15803D] shadow-xs'
                    : 'bg-white border border-[#CBD5E1]/60 hover:bg-[#F8F9FA] hover:border-[#15803D]/40'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.number}`}
                  value={alt.letter}
                  checked={isSelected}
                  onChange={() => handleSelectAlternative(alt.letter)}
                  className="sr-only"
                />

                {/* Circular Letter Badge */}
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs transition-colors ${
                    isSelected
                      ? 'bg-[#15803D] text-white shadow-xs'
                      : 'border border-[#CBD5E1] text-[#64748b] group-hover:border-[#15803D] group-hover:text-[#15803D]'
                  }`}
                >
                  {alt.letter}
                </span>

                {/* Alternative Text */}
                <div
                  className={`flex-1 pt-1 text-sm sm:text-[15px] leading-snug ${
                    isSelected ? 'text-[#111c2d] font-semibold' : 'text-[#334155]'
                  }`}
                >
                  {alt.text}
                </div>

                {/* Green checkmark icon for selected item (Matching Image 1) */}
                {isSelected && (
                  <CheckCircle className="w-5 h-5 text-[#15803D] shrink-0 pt-0.5 stroke-[2.5]" />
                )}
              </label>
            );
          })}
        </section>
      </main>

      {/* 5. BARRA DE RODAPÉ PERSISTENTE DE NAVEGAÇÃO / AÇÃO (Matches Image 1 Footer) */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-white border-t border-[#E2E8F0] shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Botão Marcar para Revisão */}
          <button
            type="button"
            onClick={toggleFlagCurrent}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
              isCurrentFlagged
                ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E]'
                : 'border-[#CBD5E1] text-[#475569] hover:bg-[#F8F9FA]'
            }`}
          >
            <Flag
              className={`w-4 h-4 ${isCurrentFlagged ? 'text-[#D97706] fill-[#D97706]' : 'text-[#94a3b8]'}`}
            />
            <span className="hidden sm:inline">
              {isCurrentFlagged ? 'Marcada p/ Revisão' : 'Revisar Depois'}
            </span>
            <span className="sm:hidden">Revisar</span>
          </button>

          {/* Anterior & Próxima */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={handlePrev}
              className="flex items-center justify-center gap-1 px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] text-[#111c2d] hover:bg-[#F8F9FA] disabled:opacity-40 disabled:pointer-events-none text-xs font-bold active:scale-95 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#15803D] text-white text-xs font-bold shadow-xs hover:bg-[#166534] active:scale-95 transition-all"
            >
              <span>{currentIdx === questions.length - 1 ? 'Finalizar' : 'Próxima'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL: PAUSA DO SIMULADO */}
      {showPauseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl border border-[#E2E8F0]">
            <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#15803D] mx-auto flex items-center justify-center">
              <PauseCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-[#111c2d]">
                Simulado Pausado
              </h3>
              <p className="text-xs text-[#64748b] mt-1">
                O cronômetro está congelado em <span className="font-bold text-[#15803D]">{formatTimer(timeLeft)}</span>. Descanse os olhos e retome quando estiver pronto.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsPaused(false);
                  setShowPauseModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <PlayCircle className="w-4 h-4" />
                Continuar Simulado
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPauseModal(false);
                  onExitExam();
                }}
                className="w-full py-2 rounded-xl text-xs text-[#64748b] hover:text-[#111c2d] hover:bg-[#F1F5F9] font-medium transition-all"
              >
                Sair para o Início (Salva Progresso)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRMAR FINALIZAÇÃO */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-[#E2E8F0]">
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2 text-[#15803D]">
                <Send className="w-5 h-5" />
                <h3 className="font-display text-base font-bold text-[#111c2d]">
                  Concluir e Entregar Simulado
                </h3>
              </div>
              <button
                onClick={() => setShowFinishModal(false)}
                className="text-[#94a3b8] hover:text-[#111c2d]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#64748b]">
              Confira seu resumo de preenchimento antes de gerar o relatório oficial de desempenho:
            </p>

            {/* Metrics Checklist */}
            <div className="grid grid-cols-3 gap-2.5 py-1 text-center">
              <div className="p-3 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20">
                <span className="block font-display text-xl font-bold text-[#15803D]">
                  {totalAnsweredCount}
                </span>
                <span className="text-[10px] text-[#166534] font-semibold">Respondidas</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
                <span className="block font-display text-xl font-bold text-[#D97706]">
                  {flagged.length}
                </span>
                <span className="text-[10px] text-[#92400E] font-semibold">Para Revisão</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0]">
                <span className="block font-display text-xl font-bold text-[#64748b]">
                  {Math.max(0, totalQuestionsSimulado - totalAnsweredCount)}
                </span>
                <span className="text-[10px] text-[#64748b] font-semibold">Em Branco</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#15803D] shrink-0 mt-0.5" />
              <span>
                Ao finalizar, suas respostas serão computadas pelo modelo TRI do ENEM e você terá acesso imediato ao <strong>Gabarito Comentado</strong> passo a passo.
              </span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#CBD5E1] text-[#475569] text-xs font-semibold hover:bg-[#F8F9FA] active:scale-95 transition-all"
              >
                Voltar à Prova
              </button>
              <button
                type="button"
                onClick={confirmFinish}
                className="flex-1 py-2.5 rounded-xl bg-[#15803D] text-white text-xs font-bold hover:bg-[#166534] shadow-xs active:scale-95 transition-all"
              >
                Confirmar e Ver Resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
