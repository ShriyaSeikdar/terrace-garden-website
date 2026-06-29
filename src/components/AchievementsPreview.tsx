"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Star, ArrowRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function AchievementsPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useSettings();

  const achievements = [
    {
      title: t("achievement_1_title"),
      description: t("achievement_1_desc"),
      image: "/gururadhika.jpg",
      icon: <Trophy className="w-6 h-6 text-award-gold" />,
    },
    {
      title: t("achievement_2_title"),
      description: t("achievement_2_desc"),
      image: "/ameesha.jpg",
      icon: <Star className="w-6 h-6 text-award-gold" />,
    },
    {
      title: t("achievement_3_title"),
      description: t("achievement_3_desc"),
      image: "/local.jpg",
      icon: <Star className="w-6 h-6 text-award-gold" />,
    },
  ];

  return (
    <section id="achievements" className="py-24 bg-[#142918] text-white relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-award-gold/30 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
          >
            {t("achievements_title")} <span className="text-award-gold">{t("achievements_title_highlight")}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto text-lg font-light"
          >
            {t("achievements_subtitle")}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto" ref={ref}>
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${achievement.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142918] to-transparent opacity-80" />
                
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20">
                  {achievement.icon}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold mb-3 text-award-gold">{achievement.title}</h3>
                <p className="text-white/80 font-light leading-relaxed mb-6">
                  {achievement.description}
                </p>
                
                <div className="h-0.5 w-12 bg-award-gold/50 transition-all duration-300 group-hover:w-24" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a 
            href="#gallery" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-award-gold text-award-gold rounded-full font-medium tracking-wide hover:bg-award-gold hover:text-[#142918] transition-all group"
          >
            {t("achievements_cta")}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
