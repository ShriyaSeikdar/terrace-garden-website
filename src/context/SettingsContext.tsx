"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, Language, TranslationKey } from "@/data/translations";

interface SettingsContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    setMounted(true);
    const savedDark = localStorage.getItem("tg-dark-mode");
    const savedLang = localStorage.getItem("tg-language") as Language | null;
    if (savedDark === "true") setDarkMode(true);
    if (savedLang === "mr" || savedLang === "en") setLanguage(savedLang);
  }, []);

  // Apply dark class to <html>
  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("tg-dark-mode", String(darkMode));
  }, [darkMode, mounted]);

  // Persist language
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("tg-language", language);
  }, [language, mounted]);

  const toggleDarkMode = useCallback(() => setDarkMode((prev) => !prev), []);
  const toggleLanguage = useCallback(
    () => setLanguage((prev) => (prev === "en" ? "mr" : "en")),
    []
  );

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] || translations.en[key] || key;
    },
    [language]
  );

  return (
    <SettingsContext.Provider value={{ darkMode, toggleDarkMode, language, toggleLanguage, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
