'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Award, Target } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { quizzes, quizQuestions, topics } from '@/data';

export default function PracticeIndexPage() {
  const { quizAttempts } = useAppStore();

  const stats = useMemo(() => {
    if (quizAttempts.length === 0) return { totalAttempts: 0, avgScorePercent: 0, perfectScores: 0 };
    let totalPct = 0, perfects = 0;
    quizAttempts.forEach(att => {
      const pct = (att.score / att.total_questions) * 100;
      totalPct += pct;
      if (att.score === att.total_questions) perfects++;
    });
    return { totalAttempts: quizAttempts.length, avgScorePercent: Math.round(totalPct / quizAttempts.length), perfectScores: perfects };
  }, [quizAttempts]);

  const quizList = useMemo(() => {
    return Object.values(quizzes).map(quiz => {
      const topic = topics.find(t => t.id === quiz.topic_id);
      const questionsCount = quizQuestions[quiz.id]?.length || 0;
      const attempts = quizAttempts.filter(att => att.quiz_id === quiz.id);
      const best = attempts.length > 0 ? [...attempts].sort((a, b) => b.score - a.score)[0] : null;
      return {
        ...quiz,
        topicSlug: topic?.slug || '',
        difficulty: topic?.difficulty || 'Beginner',
        questionsCount,
        highScore: best ? best.score : null,
        highPercent: best ? Math.round((best.score / best.total_questions) * 100) : null,
      };
    });
  }, [quizAttempts]);

  return (
    <div className="flex flex-col gap-8 py-4 w-full animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Practice</h1>
        <p className="text-sm text-muted-foreground mt-1">Test your understanding with quizzes for each topic.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Total Attempts</span>
            <p className="text-xl font-bold text-foreground">{stats.totalAttempts}</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Award className="h-5 w-5 text-accent" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Average Score</span>
            <p className="text-xl font-bold text-foreground">{stats.avgScorePercent}%</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-complete/10 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-complete" />
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Perfect Scores</span>
            <p className="text-xl font-bold text-foreground">{stats.perfectScores}</p>
          </div>
        </div>
      </div>

      {/* Quiz List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizList.map((quiz) => {
          const attempted = quiz.highScore !== null;
          const perfect = quiz.highScore === quiz.questionsCount;

          const diffBadge =
            quiz.difficulty === 'Beginner' ? 'badge-easy' :
            quiz.difficulty === 'Intermediate' ? 'badge-medium' : 'badge-hard';

          return (
            <div key={quiz.id} className={`card p-5 flex flex-col gap-4 ${perfect ? 'border-complete/30' : attempted ? 'border-primary/20' : ''}`}>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] text-muted-foreground">{quiz.questionsCount} questions</span>
                  <span className={`badge ${diffBadge}`}>{quiz.difficulty}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{quiz.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {quiz.description || 'Test your knowledge on this topic.'}
                </p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-border mt-auto">
                {attempted ? (
                  <div>
                    <span className="text-[10px] text-muted-foreground">Best: </span>
                    <span className={`text-xs font-semibold ${perfect ? 'text-complete' : 'text-primary'}`}>
                      {quiz.highScore}/{quiz.questionsCount} ({quiz.highPercent}%)
                    </span>
                  </div>
                ) : (
                  <span className="text-[11px] text-muted-foreground">Not attempted</span>
                )}
                <Link
                  href={`/practice/quiz/${quiz.topicSlug}`}
                  className="px-4 py-2 text-xs font-semibold rounded-lg btn-primary flex items-center gap-1 cursor-pointer"
                >
                  {attempted ? 'Retake' : 'Start'} <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
