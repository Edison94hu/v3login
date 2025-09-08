"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ThemeSwitch() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const themeFromQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get("theme");
    return t === "dark" ? "dark" : t === "light" ? "light" : undefined;
  }, [location.search]);

  // Initialize/sync theme from document or URL
  useEffect(() => {
    const darkClass = document.documentElement.classList.contains("dark");
    const current = darkClass ? "dark" : "light";
    if (themeFromQuery && themeFromQuery !== current) {
      if (themeFromQuery === "dark") {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    } else if (!themeFromQuery) {
      // No theme in URL: reflect current DOM class in state
      setIsDark(darkClass);
    }
  }, [themeFromQuery]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Update URL query to reflect theme without changing page
    const params = new URLSearchParams(location.search);
    params.set("theme", newIsDark ? "dark" : "light");
    navigate({ pathname: location.pathname, search: `?${params.toString()}` }, { replace: true });
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-8 right-8 w-12 h-12 rounded-full bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-foreground hover:scale-105 z-10"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
