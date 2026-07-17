export type ThemeMode = 'light' | 'dark';

/** Dark = default (:root). Light = `html.light` — matches globals.css. */
export function applyTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  if (theme === 'light') {
    root.classList.add('light');
  } else {
    root.classList.add('dark');
  }
  root.style.colorScheme = theme;
}

export function getStoredTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const stored = localStorage.getItem('dsa_theme');
    return stored === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}
