"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function Hero() {
  const { t } = useSettings();

  return (
    <section 
      id="home" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/baba-bg.png')`, 
          backgroundPosition: 'center 40%',
          filter: 'grayscale(100%) contrast(0.85) brightness(1.15)'
        }}
      >
        {/* Soft white overlay to keep the background faded and bright */}
        <div className="absolute inset-0 bg-white/-10 z-10" />
        {/* Soft gradient blend to next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-15" />
      </div>
 
      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 text-center flex flex-col items-center mt-40 md:mt-44">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl"
        >
          {/* Main Title "TERRACE GARDEN" */}
          <h1 className="font-serif text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[7rem] font-bold tracking-[0.2em] leading-tight mb-2 drop-shadow-sm uppercase">
            <span className="text-terrace-green select-none">{t("hero_title_1")}</span>{" "}
            <span className="text-maroon select-none">{t("hero_title_2")}</span>
          </h1>

          {/* Subtitle "Award-Winning Gardener" */}
          <h2 className="text-terrace-gold font-bold tracking-[0.15em] text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 uppercase font-serif">
            {t("hero_badge")}
          </h2>
          
          {/* Description "150+ Carefully Nurtured Plants..." */}
          <p className="text-gray-800 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-12 max-w-4xl mx-auto leading-relaxed font-serif italic">
            {t("hero_subtitle")}
          </p>
 
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="/adeniums" 
              className="px-10 py-4 bg-terrace-green text-white rounded-full font-serif font-bold tracking-[0.15em] text-sm hover:bg-[#12300e] transition-all hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto uppercase"
            >
              {t("hero_cta_explore")}
            </a>
            <a 
              href="#achievements" 
              className="px-10 py-4 bg-white border border-gray-300 text-terrace-green rounded-full font-serif font-bold tracking-[0.1em] text-sm hover:bg-gray-50 transition-all hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
            >
              {t("hero_cta_achievements")}
            </a>
          </div>
        </motion.div>
      </div>
 
      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-gray-600 flex flex-col items-center select-none cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-sm font-serif italic tracking-widest lowercase select-none">{t("hero_scroll")}</span>
      </motion.div>
    </section>
  );
}
