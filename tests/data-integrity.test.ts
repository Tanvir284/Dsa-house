import { describe, expect, it } from 'vitest';
import { categories, topics, lessonSections, codeSnippets, quizzes, quizQuestions } from '@/data';
import { problems } from '@/data/problems';
import { PROBLEM_COUNT, TOPIC_COUNT, CATEGORY_COUNT } from '@/data/counts';
import { visualizerCatalog } from '@/data/visualizers';
import { algorithms } from '@/lib/trace';

/**
 * These tests exist because the app now ships cheap constants and light index
 * modules in place of importing the full dataset. That optimisation is only
 * safe if something fails loudly when the cheap copy drifts from the real one.
 */

describe('catalogue counts stay in sync with the data', () => {
  it('PROBLEM_COUNT matches the problem set', () => {
    expect(
      problems.length,
      'PROBLEM_COUNT in src/data/counts.ts is stale — update it to match',
    ).toBe(PROBLEM_COUNT);
  });

  it('TOPIC_COUNT matches the topic catalogue', () => {
    expect(topics.length, 'TOPIC_COUNT in src/data/counts.ts is stale').toBe(TOPIC_COUNT);
  });

  it('CATEGORY_COUNT matches the category catalogue', () => {
    expect(categories.length, 'CATEGORY_COUNT in src/data/counts.ts is stale').toBe(CATEGORY_COUNT);
  });
});

describe('referential integrity', () => {
  it('every topic belongs to a real category', () => {
    const categoryIds = new Set(categories.map((c) => c.id));
    const orphans = topics.filter((t) => !categoryIds.has(t.category_id));
    expect(orphans.map((t) => t.slug)).toEqual([]);
  });

  it('topic slugs are unique', () => {
    const seen = new Set<string>();
    const duplicates = topics.filter((t) => !seen.has(t.slug) && (seen.add(t.slug), false));
    expect(duplicates).toEqual([]);
    expect(new Set(topics.map((t) => t.slug)).size).toBe(topics.length);
  });

  it('problem ids are unique', () => {
    expect(new Set(problems.map((p) => p.id)).size).toBe(problems.length);
  });

  it('every topic has lesson sections and at least one snippet', () => {
    const missingSections = topics.filter((t) => !(lessonSections[t.id]?.length > 0));
    const missingSnippets = topics.filter((t) => !(codeSnippets[t.id]?.length > 0));
    expect(missingSections.map((t) => t.slug)).toEqual([]);
    expect(missingSnippets.map((t) => t.slug)).toEqual([]);
  });

  it('every quiz resolves to a non-empty question list', () => {
    const broken = Object.values(quizzes).filter((q) => !(quizQuestions[q.id]?.length > 0));
    expect(broken.map((q) => q.id)).toEqual([]);
  });

  it('every quiz question has a correct option within range', () => {
    const invalid = Object.values(quizQuestions)
      .flat()
      .filter((q) => q.correct_option_index < 0 || q.correct_option_index >= q.options.length);
    expect(invalid.map((q) => q.id)).toEqual([]);
  });
});

describe('visualizer catalogue', () => {
  it('lists no slug twice', () => {
    const slugs = visualizerCatalog.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every traceable algorithm is advertised in the catalogue', () => {
    // Otherwise an algorithm exists but no route links to it.
    const catalogued = new Set(visualizerCatalog.map((e) => e.slug));
    const unlisted = Object.keys(algorithms).filter((slug) => !catalogued.has(slug));
    expect(unlisted).toEqual([]);
  });

  it('every algorithm marks its own pseudocode lines validly', () => {
    for (const algorithm of Object.values(algorithms)) {
      expect(algorithm.pseudocode.length, `${algorithm.slug} has no pseudocode`).toBeGreaterThan(0);
      expect(algorithm.defaultInput.length, `${algorithm.slug} has no default input`)
        .toBeGreaterThan(0);
    }
  });
});
