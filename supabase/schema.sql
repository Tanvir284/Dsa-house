-- Create profiles table linked to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    avatar_url TEXT,
    streak_count INTEGER DEFAULT 0 NOT NULL,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Content Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL
);

-- Individual Topics
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    definition TEXT NOT NULL,
    importance TEXT,
    prerequisites TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')) NOT NULL,
    time_complexity_best TEXT,
    time_complexity_average TEXT,
    time_complexity_worst TEXT,
    space_complexity TEXT,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Lesson sections
CREATE TABLE IF NOT EXISTS public.lesson_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL
);

-- Code Snippets
CREATE TABLE IF NOT EXISTS public.code_snippets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
    language TEXT CHECK (language IN ('python', 'c', 'cpp', 'java', 'csharp', 'javascript')) NOT NULL,
    code TEXT NOT NULL,
    explanation TEXT,
    is_optimized BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_topic_lang_opt UNIQUE(topic_id, language, is_optimized)
);

-- Quizzes
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE UNIQUE,
    title TEXT NOT NULL,
    description TEXT
);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type TEXT CHECK (question_type IN ('MCQ', 'TRUE_FALSE', 'OUTPUT_PREDICTION', 'COMPLEXITY')) NOT NULL,
    options TEXT[] NOT NULL,
    correct_option_index INTEGER NOT NULL,
    explanation TEXT
);

-- Bookmarks
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_bookmark UNIQUE(user_id, topic_id)
);

-- Lesson Progress
CREATE TABLE IF NOT EXISTS public.lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES public.topics(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT FALSE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_viewed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_user_progress UNIQUE(user_id, topic_id)
);

-- Quiz Attempts
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) - standard production Supabase setup
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.code_snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Setup Public Read Policies for content
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read topics" ON public.topics FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read lesson_sections" ON public.lesson_sections FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read code_snippets" ON public.code_snippets FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read quizzes" ON public.quizzes FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read quiz_questions" ON public.quiz_questions FOR SELECT TO public USING (true);

-- Setup User Policies for profile, progress, bookmarks, attempts (Strict RLS)
CREATE POLICY "Allow individual read profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow individual update profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow user bookmarks select" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow user bookmarks insert" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow user bookmarks delete" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Allow user progress select" ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow user progress insert" ON public.lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow user progress update" ON public.lesson_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow user quiz attempts select" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow user quiz attempts insert" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
