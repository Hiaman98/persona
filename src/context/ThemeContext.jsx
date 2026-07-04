/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    // Check local storage for existing theme choice, default to light
    return localStorage.getItem("persona-theme-mode") || "light";
  });

  const setTheme = (mode) => {
    const targetMode = mode === "dark" ? "dark" : "light";
    setThemeState(targetMode);
    localStorage.setItem("persona-theme-mode", targetMode);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
