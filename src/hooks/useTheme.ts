import { useState, useEffect } from 'react';
import { ThemeMode } from '../types';

const THEME_CHANGE_EVENT = 'gitinsight_theme_change';

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem('gitinsight_theme') as ThemeMode;
  if (saved && (saved === 'dark' || saved === 'light')) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyThemeToDOM = (theme: ThemeMode) => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
};

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    applyThemeToDOM(theme);

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<ThemeMode>;
      if (customEvent.detail) {
        setThemeState(customEvent.detail);
        applyThemeToDOM(customEvent.detail);
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    };
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    localStorage.setItem('gitinsight_theme', newTheme);
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: newTheme }));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  return { theme, setTheme, toggleTheme };
}
