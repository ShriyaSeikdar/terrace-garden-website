"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function Hero() {
  const { t } = useSettings();

  return (
    <section 
      id="home" 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1558293842-c0fd3db86157?q=80&w=2000&auto=format&fit=crop')`, 
          backgroundPosition: 'center 60%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="text-award-gold font-medium tracking-widest uppercase text-sm md:text-base mb-6 block">
            {t("hero_badge")}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-6 drop-shadow-lg">
            {t("hero_title_1")} <br/> {t("hero_title_2")}
          </h1>
          
          <p className="text-white/90 text-lg md:text-2xl font-light mb-8 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            {t("hero_subtitle")}
          </p>

          <p className="text-white/80 text-base md:text-lg mb-12 max-w-xl mx-auto italic font-serif">
            {t("hero_quote")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/adeniums" 
              className="px-8 py-4 bg-garden-green text-white rounded-full font-medium tracking-wide hover:bg-[#154a19] transition-all hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
            >
              {t("hero_cta_explore")}
            </a>
            <a 
              href="#achievements" 
              className="px-8 py-4 bg-transparent border border-white/50 text-white rounded-full font-medium tracking-wide hover:bg-white/10 hover:border-white transition-all w-full sm:w-auto backdrop-blur-sm"
            >
              {t("hero_cta_achievements")}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/70 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase mb-2">{t("hero_scroll")}</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
}
