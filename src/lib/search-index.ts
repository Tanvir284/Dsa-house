import { topics, categories } from '@/data';
import { visualizerCatalog } from '@/data/visualizers';

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  type: 'topic' | 'visualizer' | 'page';
  keywords: string;
}

const STATIC_PAGES: SearchItem[] = [
  { id: 'p-home', title: 'Home', subtitle: 'Landing page', href: '/', type: 'page', keywords: 'home start' },
  { id: 'p-roadmap', title: 'Learning Roadmap', subtitle: 'Skill tree', href: '/roadmap', type: 'page', keywords: 'roadmap path' },
  { id: 'p-topics', title: 'Topics Directory', subtitle: 'All lessons', href: '/topics', type: 'page', keywords: 'topics catalog' },
  { id: 'p-viz', title: 'Visualizers', subtitle: 'Interactive labs', href: '/visualizer', type: 'page', keywords: 'visualizer sandbox' },
  { id: 'p-practice', title: 'Practice Quizzes', subtitle: 'Test knowledge', href: '/practice', type: 'page', keywords: 'practice quiz' },
  { id: 'p-daily', title: 'Daily Challenge', subtitle: 'Problem of the day', href: '/daily', type: 'page', keywords: 'daily challenge' },
  { id: 'p-labs', title: 'Complexity Lab', subtitle: 'Compare algorithms', href: '/labs', type: 'page', keywords: 'labs complexity big-o' },
  { id: 'p-patterns', title: 'Pattern Library', subtitle: 'Interview patterns', href: '/patterns', type: 'page', keywords: 'patterns interview' },
  { id: 'p-interview', title: 'Interview Prep', subtitle: 'Cheat sheets', href: '/interview-prep', type: 'page', keywords: 'interview prep' },
  { id: 'p-dashboard', title: 'Dashboard', subtitle: 'Your profile', href: '/dashboard', type: 'page', keywords: 'dashboard profile xp' },
  { id: 'p-bookmarks', title: 'Bookmarks', subtitle: 'Saved topics', href: '/bookmarks', type: 'page', keywords: 'bookmarks saved' },
];

export function buildSearchIndex(): SearchItem[] {
  const topicItems: SearchItem[] = topics.map((t) => {
    const cat = categories.find((c) => c.id === t.category_id);
    return {
      id: `t-${t.slug}`,
      title: t.title,
      subtitle: `${cat?.title ?? 'Topic'} · ${t.difficulty}`,
      href: `/topics/${t.slug}`,
      type: 'topic',
      keywords: `${t.slug} ${t.definition} ${t.difficulty} ${cat?.title ?? ''}`.toLowerCase(),
    };
  });

  const vizItems: SearchItem[] = visualizerCatalog.map((v) => ({
    id: `v-${v.slug}`,
    title: v.title,
    subtitle: `Visualizer · ${v.category}`,
    href: `/visualizer/${v.slug}`,
    type: 'visualizer',
    keywords: `${v.slug} ${v.description} visualizer`.toLowerCase(),
  }));

  return [...STATIC_PAGES, ...topicItems, ...vizItems];
}

export function filterSearch(query: string, items: SearchItem[], limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items.slice(0, limit);
  return items
    .filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.keywords.includes(q)
    )
    .slice(0, limit);
}
