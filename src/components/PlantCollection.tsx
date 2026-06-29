"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function PlantCollection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useSettings();

  return (
    <section id="collection" className="py-24 bg-soft-cream dark:bg-dark-bg relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div 
          ref={ref}
          className="bg-white dark:bg-dark-card rounded-3xl p-8 md:p-16 shadow-xl border border-gray-100 dark:border-green-900/30 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <span className="text-floral-pink font-medium tracking-widest uppercase text-sm mb-4 block">
              {t("collection_badge")}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {t("collection_title_1")} <span className="text-garden-green dark:text-green-400">{t("collection_title_2")}</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light mb-8 leading-relaxed">
              {t("collection_desc")}
            </p>
            
            <Link 
              href="/adeniums" 
              className="inline-flex items-center gap-3 bg-garden-green text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-[#154a19] transition-all hover:shadow-lg transform hover:-translate-y-1 group"
            >
              {t("collection_cta")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000 hover:scale-105"
                style={{ backgroundImage: `url(https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1000&auto=format&fit=crop)` }}
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-floral-pink/10 rounded-full blur-2xl" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-garden-green/10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
