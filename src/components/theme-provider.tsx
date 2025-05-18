import { createContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export default function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  // Listen for system theme changes if theme is "system"
  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = media.matches ? "dark" : "light";
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(systemTheme);

    const onChange = () => {
      const newSystemTheme = media.matches ? "dark" : "light";
      root.classList.remove("light", "dark");
      root.classList.add(newSystemTheme);
    };

    media.addEventListener("change", onChange);

    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  // Apply theme class on mount and when theme changes
  useEffect(() => {
    if (theme === "system") return; // handled above

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // Persist theme to localStorage
  const handleSetTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setTheme(newTheme);
  };

  const value = {
    theme,
    setTheme: handleSetTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
