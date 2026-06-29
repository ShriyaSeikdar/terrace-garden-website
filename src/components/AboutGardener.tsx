"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useSettings } from "@/context/SettingsContext";

export default function AboutGardener() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useSettings();

  return (
    <section id="about" className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Column */}
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-garden-green/10 bg-cover bg-center"
                style={{
                  backgroundImage: `url('/babafc.jpeg')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-soft-cream dark:bg-dark-card rounded-full -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-floral-pink/10 rounded-full -z-10" />
          </motion.div>

          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              {t("about_title_1")} <br/>
              <span className="text-garden-green dark:text-green-400 text-3xl md:text-4xl">{t("about_title_2")}</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-light">
              <p>{t("about_p1")}</p>
              
              <p>
                {t("about_p2_start")}<strong className="font-medium text-gray-900 dark:text-white">{t("about_p2_adeniums")}</strong>{t("about_p2_end")}
              </p>
              
              <p className="pl-6 border-l-4 border-award-gold italic text-gray-800 dark:text-gray-300 font-serif">
                {t("about_quote")}
              </p>
              
              <p>
                {t("about_p3_start")}<span className="text-award-gold font-medium">{t("about_p3_champion")}</span>{t("about_p3_end")}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
