"use client";

import { Moon, Sun, Languages } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsToggle() {
  const { darkMode, toggleDarkMode, toggleLanguage, t } = useSettings();

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-3 items-end">
      {/* Language Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        onClick={toggleLanguage}
        className="group flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
        aria-label="Toggle language"
      >
        <Languages className="w-5 h-5 text-garden-green" />
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide">
          {t("language_toggle")}
        </span>
      </motion.button>

      {/* Dark Mode Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        onClick={toggleDarkMode}
        className="group flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all hover:-translate-y-0.5"
        aria-label="Toggle dark mode"
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5 text-award-gold" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5 text-gray-700" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
