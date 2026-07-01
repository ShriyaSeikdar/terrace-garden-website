"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { adeniumsData } from "@/data/adeniums";
import { ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/SettingsContext";

export default function AdeniumsGallery() {
  const { t } = useSettings();

  return (
    <main className="min-h-screen bg-soft-cream dark:bg-dark-bg selection:bg-garden-green selection:text-white">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-garden-green/5 dark:bg-dark-card/50">
        <div className="container mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-garden-green dark:text-green-400 hover:text-[#154a19] dark:hover:text-green-300 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("adeniums_back")}
          </Link>
          <span className="text-floral-pink font-medium tracking-widest uppercase text-sm mb-4 block">
            {t("adeniums_badge")}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t("adeniums_title")} <span className="text-garden-green dark:text-green-400">{t("adeniums_title_highlight")}</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
            {t("adeniums_desc")}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 md:px-12 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {adeniumsData.map((adenium, index) => (
              <motion.div
                key={adenium.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="group bg-white dark:bg-dark-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-green-900/30 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-dark-surface">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${adenium.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Floating Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="inline-flex px-3 py-1 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md text-garden-green dark:text-green-400 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                      {adenium.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow bg-white dark:bg-dark-card">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-garden-green dark:group-hover:text-green-400 transition-colors">
                    {adenium.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-6 flex-grow">
                    {adenium.description}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100 dark:border-green-900/30 mt-auto">
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-gray-500 dark:text-gray-500 font-medium uppercase tracking-wider text-xs">{t("adeniums_bloom_season")}</span>
                      <span className="text-garden-green dark:text-green-400 font-semibold">{adenium.bloomSeason}</span>
                    </div>
                    <a
                      href={`https://wa.me/8983379058?text=${encodeURIComponent(`Hello! I would like to inquire about the ${adenium.name} adenium (No. ${adenium.number}).`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-garden-green text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-[#154a19] transition-all hover:shadow-md transform hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {t("adeniums_enquire")}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
