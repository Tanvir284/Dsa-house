export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  display_order: number;
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Topic {
  id: string;
  slug: string;
  category_id: string;
  title: string;
  definition: string;
  importance: string;
  prerequisites: string[];
  difficulty: Difficulty;
  time_complexity_best?: string;
  time_complexity_average?: string;
  time_complexity_worst?: string;
  space_complexity?: string;
  display_order: number;
  created_at?: string;
}

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';
export type ProblemSource = 'LeetCode' | 'Codeforces';

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: ProblemDifficulty;
  source: ProblemSource;
  category: string;
  topic: string;
  description: string;
  constraints: string[];
  solutions: {
    python: string;
    cpp: string;
    java: string;
    explanation: string;
  };
  diagram: string;
}


export interface LessonSection {
  id: string;
  topic_id: string;
  title: string;
  content: string; // Markdown supported content
  display_order: number;
}

// A self-contained curated content bundle for a single topic, matched to an
// expanded-JSON topic by slug and registered in bulk via data/index.ts.
export interface CurriculumModule {
  topic: Topic;
  sections: LessonSection[];
  snippets: CodeSnippet[];
  quizId: string;
  quizTitle: string;
  quizDescription: string;
  questions: QuizQuestion[];
}

export type CodeLanguage = 'python' | 'c' | 'cpp' | 'java' | 'csharp' | 'javascript';

export interface CodeSnippet {
  id: string;
  topic_id: string;
  language: CodeLanguage;
  code: string;
  explanation?: string;
  is_optimized: boolean;
}

export interface Quiz {
  id: string;
  topic_id: string;
  title: string;
  description?: string;
}

export type QuestionType = 'MCQ' | 'TRUE_FALSE' | 'OUTPUT_PREDICTION' | 'COMPLEXITY';

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  options: string[];
  correct_option_index: number;
  explanation?: string;
}

export interface LessonProgress {
  topic_slug: string;
  is_completed: boolean;
  completed_at?: string;
  last_viewed_at: string;
}

export interface Bookmark {
  topic_slug: string;
  created_at: string;
}

export interface QuizAttempt {
  quiz_id: string;
  topic_slug: string;
  score: number;
  total_questions: number;
  attempted_at: string;
}

// Visualizer Engine types
export type VisualizerStatus = 'compare' | 'swap' | 'found' | 'traversing' | 'insert' | 'delete' | 'done' | 'idle';

export interface VisualizerStep {
  elements: { val: number; state: string }[];              // Core elements e.g. [ { val: 12, state: 'default' } ]
  highlights: number[];          // Indices currently highlighted
  markers: Record<string, number>; // Labels like { low: 0, high: 9, mid: 4 }
  explanation: string;           // Step description
  codeLine?: number;             // Line index to highlight in pseudocode
  status: VisualizerStatus;      // Visualizer action status
}

export interface VisualizerConfig {
  title: string;
  pseudocode: string[];
  defaultInput: string;
  inputPlaceholder: string;
}
