"use client";

import { useEffect, useState } from "react";

function applyTheme(nextTheme) {
  document.documentElement.dataset.theme = nextTheme;
  document.documentElement.style.colorScheme = nextTheme;
  window.localStorage.setItem("theme", nextTheme);
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";

    setTheme(currentTheme);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`fixed right-4 top-4 z-[120] inline-flex items-center gap-2 rounded-full border border-[var(--toggle-border)] bg-[var(--toggle-background)] px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--foreground)] shadow-[0_12px_28px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 hover:bg-[var(--toggle-hover)] min-[520px]:right-4 min-[520px]:top-4 min-[520px]:gap-3 min-[520px]:px-3.5 min-[520px]:py-2 min-[520px]:text-[0.68rem] sm:right-6 sm:top-6 sm:text-[0.72rem] ${
        mounted ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <span className="relative h-4 w-8 rounded-full border border-[var(--toggle-border)] min-[520px]:h-5 min-[520px]:w-9">
        <span
          className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[var(--foreground)] transition-all duration-300 min-[520px]:h-3 min-[520px]:w-3 ${
            theme === "dark"
              ? "left-[0.95rem] min-[520px]:left-[1.1rem]"
              : "left-1"
          }`}
        />
      </span>
      <span className="hidden min-w-[5.35rem] text-left min-[520px]:block">
        {theme === "dark" ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
}
