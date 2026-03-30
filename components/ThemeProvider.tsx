// components/ThemeProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};

function resolveStoredTheme(): Theme {
  const stored = localStorage.getItem("ml-theme") as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.classList.toggle("light", theme === "light");
  localStorage.setItem("ml-theme", theme);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const didResolve = useRef(false);

  useLayoutEffect(() => {
    if (!didResolve.current) {
      didResolve.current = true;
      const next = resolveStoredTheme();
      applyThemeToDocument(next);
      // Client-only: align React state with localStorage / system preference (no SSR access)
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time theme hydration after mount
      setTheme(next);
      return;
    }
    applyThemeToDocument(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
