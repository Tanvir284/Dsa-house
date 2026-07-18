'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Plus, Trash2, AlertTriangle, Save, RefreshCw, Lock, User } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { topics, categories } from '@/data';
import { Topic, Difficulty } from '@/types';
import { canAccessAdmin, getAdminUsernamesHint } from '@/lib/admin';

export default function AdminPanelPage() {
  const { profile, loginMockUser } = useAppStore();
  const [adminUsername, setAdminUsername] = useState('admin');
  const [topicList, setTopicList] = useState<Topic[]>(topics);
  const [lastAction, setLastAction] = useState<string>('CMS Ready.');

  // Topic form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [categorySlug, setCategorySlug] = useState('linear');
  const [definition, setDefinition] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Beginner');
  const [bestTime, setBestTime] = useState('O(1)');
  const [avgTime, setAvgTime] = useState('O(N)');
  const [worstTime, setWorstTime] = useState('O(N)');
  const [space, setSpace] = useState('O(N)');

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !definition) {
      setLastAction('Error: Please fill in all required fields.');
      return;
    }

    const catId = categories.find(c => c.slug === categorySlug)?.id || categories[0].id;
    const newTopic: Topic = {
      id: crypto.randomUUID(),
      slug: slug.toLowerCase().trim(),
      category_id: catId,
      title: title.trim(),
      definition: definition.trim(),
      importance: 'Added via Content Management System.',
      prerequisites: [],
      difficulty,
      time_complexity_best: bestTime,
      time_complexity_average: avgTime,
      time_complexity_worst: worstTime,
      space_complexity: space,
      display_order: topicList.length + 1,
    };

    setTopicList([...topicList, newTopic]);
    setLastAction(`Successfully created and published topic "${title}"!`);

    setTitle('');
    setSlug('');
    setDefinition('');
  };

  const handleDeleteTopic = (id: string, name: string) => {
    const nextList = topicList.filter(t => t.id !== id);
    setTopicList(nextList);
    setLastAction(`Successfully deleted and unpublished topic "${name}".`);
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 max-w-md mx-auto text-center animate-fade-in">
        <div className="p-4 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/25">
          <Lock className="h-10 w-10" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground">Admin Sign-In Required</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The content management system is restricted to authorized administrators.
            Sign in with an approved username to continue.
          </p>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Allowed: {getAdminUsernamesHint()}
          </p>
        </div>
        <div className="w-full flex flex-col gap-3">
          <label className="text-left text-xs font-semibold text-muted-foreground">Admin username</label>
          <input
            type="text"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            placeholder="admin"
            className="px-3.5 py-2 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full font-mono"
          />
          <button
            onClick={() => loginMockUser(adminUsername.trim() || 'admin')}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg btn-primary font-semibold text-sm cursor-pointer"
          >
            <User className="h-4 w-4" /> Sign In as Admin
          </button>
        </div>
        <Link href="/" className="text-xs text-primary font-bold hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  if (!canAccessAdmin(profile)) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 max-w-md mx-auto text-center animate-fade-in">
        <div className="p-4 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/25">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Signed in as <span className="font-bold text-foreground">{profile.username}</span>, which does not have CMS privileges.
          </p>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Allowed usernames: {getAdminUsernamesHint()}
          </p>
        </div>
        <button
          onClick={() => loginMockUser('admin')}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg btn-primary font-semibold text-sm cursor-pointer"
        >
          <Shield className="h-4 w-4" /> Switch to Admin Account
        </button>
        <Link href="/dashboard" className="text-xs text-primary font-bold hover:underline">
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 py-6 w-full text-left animate-slide-up">
      <div className="flex flex-col gap-2 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-bold uppercase tracking-wider w-fit animate-pulse-slow">
          <Shield className="h-3.5 w-3.5" /> Security Panel
        </div>
        <h1 className="text-3xl font-black text-foreground">Content Management System</h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Authenticated as <span className="font-bold text-foreground">{profile.username}</span>.
          Changes here are session-only and do not modify the bundled curriculum files.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="flex flex-col gap-5 border border-border rounded-xl bg-card p-5 h-fit">
          <h2 className="text-base font-bold flex items-center gap-2">
            <Plus className="h-4.5 w-4.5 text-primary" /> Publish New Topic
          </h2>

          <form onSubmit={handleAddTopic} className="flex flex-col gap-4 text-xs font-semibold">
            <div className="flex flex-col gap-1.5">
              <label className="text-muted-foreground">Topic Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Doubly Linked List"
                className="px-3.5 py-2 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted-foreground">Topic URL Slug *</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. doubly-linked-list"
                className="px-3.5 py-2 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted-foreground">Curriculum Category</label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                className="px-3.5 py-2 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.title}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted-foreground">One-Sentence Definition *</label>
              <textarea
                value={definition}
                onChange={(e) => setDefinition(e.target.value)}
                placeholder="Brief summary..."
                rows={2}
                className="px-3.5 py-2 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-muted-foreground">Difficulty Rating</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                className="px-3.5 py-2 border border-border rounded-lg bg-background text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex flex-col gap-1">
                <label className="text-muted-foreground">Time Best</label>
                <input type="text" value={bestTime} onChange={(e) => setBestTime(e.target.value)} className="px-2.5 py-1.5 border border-border rounded bg-background text-xs" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-muted-foreground">Time Average</label>
                <input type="text" value={avgTime} onChange={(e) => setAvgTime(e.target.value)} className="px-2.5 py-1.5 border border-border rounded bg-background text-xs" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-muted-foreground">Time Worst</label>
                <input type="text" value={worstTime} onChange={(e) => setWorstTime(e.target.value)} className="px-2.5 py-1.5 border border-border rounded bg-background text-xs" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-muted-foreground">Space Complexity</label>
                <input type="text" value={space} onChange={(e) => setSpace(e.target.value)} className="px-2.5 py-1.5 border border-border rounded bg-background text-xs" />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-sm shadow-sm"
            >
              <Save className="h-4 w-4" /> Save & Publish Lesson
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-5 border border-border rounded-xl bg-card p-5">
          <h2 className="text-base font-bold flex items-center gap-2">
            <RefreshCw className="h-4.5 w-4.5 text-primary" /> Active Curriculum Directory ({topicList.length})
          </h2>

          <div className="flex flex-col divide-y divide-border/60 overflow-y-auto max-h-[580px] pr-1">
            {topicList.map(topic => {
              const cat = categories.find(c => c.id === topic.category_id);
              return (
                <div key={topic.id} className="py-3 flex justify-between items-center gap-4 hover:bg-background/25 px-2 rounded-lg transition-colors">
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-sm font-bold text-foreground">{topic.title}</span>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase font-mono tracking-wider">
                      {cat?.title || 'Structure'} • {topic.difficulty}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteTopic(topic.id, topic.title)}
                      className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-all cursor-pointer"
                      title="Delete topic"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div className="p-4 rounded-xl border border-border bg-card/40 w-full text-xs font-mono leading-relaxed text-foreground">
        <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">CMS Status Logs</span>
        {lastAction}
      </div>

    </div>
  );
}
