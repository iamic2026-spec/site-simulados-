'use client';

import React, { useState } from 'react';
import { Header } from '@/components/header';
import { BottomNav, NavTab } from '@/components/bottom-nav';
import { HomeView } from '@/components/home-view';
import { ExamView } from '@/components/exam-view';
import { ResultsView } from '@/components/results-view';
import { SimuladosCatalogView } from '@/components/simulados-catalog-view';
import { StatsView } from '@/components/stats-view';
import { ProfileView } from '@/components/profile-view';
import { INITIAL_USER_ANSWERS } from '@/lib/simulados-data';

export default function Page() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [examAnswers, setExamAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>>(INITIAL_USER_ANSWERS);
  const [examTimeSpent, setExamTimeSpent] = useState<number>(2 * 3600 + 47 * 60 + 12);
  const [targetQuestionIndex, setTargetQuestionIndex] = useState<number>(3); // Question 14 by default

  const handleStartExam = (simuladoId?: string) => {
    // If resuming or clicking featured, ensure starting at question 14 or appropriate question
    setTargetQuestionIndex(3); // Index 3 corresponds to Question 14 in EXAM_QUESTIONS
    setCurrentTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishExam = (
    answers: Record<number, 'A' | 'B' | 'C' | 'D' | 'E'>,
    timeSpentSeconds: number
  ) => {
    setExamAnswers(answers);
    setExamTimeSpent(timeSpentSeconds);
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartExam = () => {
    setTargetQuestionIndex(0);
    setCurrentTab('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitExam = () => {
    setCurrentTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenResults = () => {
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCatalog = () => {
    setCurrentTab('simulados');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#212529] flex flex-col font-sans">
      {/* Top Header shown on non-exam tabs */}
      {currentTab !== 'exam' && (
        <Header
          activeTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenExam={() => handleStartExam()}
        />
      )}

      {/* Main Content Area switching between the 3 main integrated screens and tabs */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onStartExam={handleStartExam}
            onOpenResults={handleOpenResults}
            onOpenCatalog={handleOpenCatalog}
          />
        )}

        {currentTab === 'exam' && (
          <ExamView
            initialQuestionIndex={targetQuestionIndex}
            onFinishExam={handleFinishExam}
            onExitExam={handleExitExam}
          />
        )}

        {currentTab === 'results' && (
          <ResultsView
            answers={examAnswers}
            timeSpentSeconds={examTimeSpent}
            onRestartExam={handleRestartExam}
            onGoHome={() => setCurrentTab('home')}
          />
        )}

        {currentTab === 'simulados' && (
          <SimuladosCatalogView onStartExam={handleStartExam} />
        )}

        {currentTab === 'stats' && <StatsView />}

        {currentTab === 'profile' && <ProfileView />}
      </main>

      {/* Persistent Bottom Navigation for mobile */}
      <BottomNav
        activeTab={currentTab}
        onSelectTab={setCurrentTab}
        isExamActive={currentTab === 'exam'}
      />
    </div>
  );
}
