"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function TrustStatistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useSettings();

  const stats = [
    { value: "150+", label: t("stat_plants") },
    { value: "Champion", label: t("stat_champion") },
    { value: "Multiple", label: t("stat_awards") },
    { value: "100s", label: t("stat_handovers") },
    { value: "20+", label: t("stat_experience") },
  ];

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-soft-cream dark:bg-dark-bg relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-garden-green/5 dark:border-green-900/30 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-garden-green dark:text-green-400 mb-3">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
