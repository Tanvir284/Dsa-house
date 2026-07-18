'use client';

import React, { useState, useRef, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, HelpCircle, CheckCircle2, RotateCcw, ChevronLeft, Award } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { topics, quizzes, quizQuestions } from '@/data';
import confetti from 'canvas-confetti';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ActiveQuizPage({ params }: PageProps) {
  const { slug } = use(params);
  const { submitQuizAttempt } = useAppStore();

  // Find topic & quiz
  const topic = topics.find(t => t.slug === slug);
  const quiz = topic ? quizzes[topic.id] : null;
  const questions = quiz ? quizQuestions[quiz.id] : [];

  // Active quiz playing states
  const [currQIdx, setCurrQIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [isFinished, setIsFinished] = useState(false);

  // If quiz is empty, render warning
  if (!topic || !quiz || questions.length === 0) {
    notFound();
  }

  const currentQuestion = questions[currQIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedIdx === null || isAnswered) return;

    const correct = selectedIdx === currentQuestion.correct_option_index;
    if (correct) {
      scoreRef.current += 1;
      setScore(scoreRef.current);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedIdx(null);
    setIsAnswered(false);

    if (currQIdx < questions.length - 1) {
      setCurrQIdx(currQIdx + 1);
    } else {
      const finalScore = scoreRef.current;
      setIsFinished(true);
      submitQuizAttempt(quiz.id, topic.slug, finalScore, questions.length);

      if (finalScore >= questions.length - 1) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrQIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    scoreRef.current = 0;
    setScore(0);
    setIsFinished(false);
  };

  // Completion percentage
  const progressPercent = Math.round(((currQIdx) / questions.length) * 100);

  if (isFinished) {
    const isPerfect = score === questions.length;
    const isPass = score >= questions.length / 2;

    return (
      <div className="flex flex-col items-center gap-8 py-10 max-w-xl mx-auto w-full text-center animate-fade-in">
        
        {/* Success Icon */}
        <div className="p-5 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit shrink-0">
          <Award className="h-16 w-16" />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Quiz Completed</span>
          <h1 className="text-3xl font-black text-foreground">
            {isPerfect ? 'Perfect Score!' : isPass ? 'Good Job!' : 'Keep Practicing!'}
          </h1>
          <p className="text-sm text-muted-foreground">
            You finished the conceptual quiz for <span className="font-bold text-foreground">{topic.title}</span>.
          </p>
        </div>

        {/* Score widget */}
        <div className="w-full bg-card border border-border p-6 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm font-semibold border-b border-border/60 pb-3">
            <span className="text-muted-foreground">Correct Answers:</span>
            <span className="text-foreground font-mono font-bold text-base">{score} / {questions.length}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-muted-foreground">Percentage:</span>
            <span className={`font-mono font-bold text-base ${isPass ? 'text-complete' : 'text-rose-500'}`}>
              {Math.round((score / questions.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex gap-4 w-full flex-wrap justify-center mt-2">
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-5 py-3 font-bold rounded-xl border border-border bg-card/65 hover:bg-muted text-foreground hover:scale-105 transition-all cursor-pointer w-full sm:w-auto"
          >
            <RotateCcw className="h-4.5 w-4.5" /> Retake Quiz
          </button>
          <Link
            href={`/topics/${topic.slug}`}
            className="flex items-center gap-1.5 px-5 py-3 font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 hover:scale-105 transition-all cursor-pointer w-full sm:w-auto text-center justify-center"
          >
            Return to Lesson
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-6 max-w-2xl mx-auto w-full text-left animate-slide-up">
      
      {/* Top navbar links */}
      <Link href="/practice" className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground w-fit">
        <ChevronLeft className="h-4 w-4" /> Exit Quiz Lobby
      </Link>

      {/* Progress Indicators */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
          <span>Question {currQIdx + 1} of {questions.length}</span>
          <span>{progressPercent}% Complete</span>
        </div>
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden border border-border">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-primary transition-all duration-300"
          />
        </div>
      </div>

      {/* Active Question Box */}
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-foreground leading-snug">
            {currentQuestion.question_text}
          </h2>
        </div>

        {/* Options list */}
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedIdx === idx;
            const isCorrect = idx === currentQuestion.correct_option_index;

            let optionStyle = 'border-border bg-card/45 hover:border-primary/50';
            
            if (isAnswered) {
              if (isCorrect) {
                optionStyle = 'border-complete bg-complete/10 text-complete font-bold ring-1 ring-complete/35';
              } else if (isSelected) {
                optionStyle = 'border-rose-500 bg-rose-500/10 text-rose-500 font-bold ring-1 ring-rose-500/35';
              } else {
                optionStyle = 'border-border/60 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'border-primary bg-primary/5 ring-1 ring-primary/40 font-semibold';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`p-4 rounded-xl border text-sm text-left transition-all flex items-center justify-between ${
                  !isAnswered ? 'cursor-pointer' : 'cursor-default'
                } ${optionStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isCorrect && <span className="text-[10px] font-bold text-complete uppercase tracking-wide">Correct</span>}
                {isAnswered && isSelected && !isCorrect && <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wide">Wrong</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Banner */}
      {isAnswered && (
        <div className="p-4 rounded-xl border border-border bg-card/40 text-sm leading-relaxed text-foreground animate-fade-in flex gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5 text-complete" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Explanation Details</span>
            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {currentQuestion.explanation || 'No supplementary details registered.'}
            </p>
          </div>
        </div>
      )}

      {/* Navigation action buttons */}
      <div className="flex justify-end mt-2">
        {!isAnswered ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedIdx === null}
            className="flex items-center gap-1.5 px-5 py-3 font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer shadow-md"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-3 font-bold rounded-xl bg-complete text-complete-foreground hover:opacity-95 transition-all shadow-md cursor-pointer"
          >
            {currQIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

    </div>
  );
}
