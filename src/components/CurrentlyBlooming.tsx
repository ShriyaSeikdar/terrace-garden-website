"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useSettings } from "@/context/SettingsContext";

const bloomingPlants = [
  {
    id: 1,
    name: "Desert Rose 'Crimson Star'",
    color: "Deep Red",
    description: "A breathtaking display of crimson petals against a sculpted caudex.",
    image: "https://images.unsplash.com/photo-1620023640033-91b5c4644eb9?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-square",
  },
  {
    id: 2,
    name: "Adenium 'Pink Pearl'",
    color: "Soft Pink",
    description: "Delicate pink flowers that form beautiful clusters on twisting branches.",
    image: "https://images.unsplash.com/photo-1632731872855-6b5ce401886e?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[3/4]",
  },
  {
    id: 3,
    name: "Triple Petal 'Midnight Velvet'",
    color: "Dark Burgundy",
    description: "Rare triple-layered petals in a rich, dark burgundy, almost black color.",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-[4/3]",
  },
  {
    id: 4,
    name: "Adenium 'Snow White'",
    color: "Pure White",
    description: "Elegant pure white blooms with a subtle green tint in the center.",
    image: "https://images.unsplash.com/photo-1601334812328-97217dcafc26?q=80&w=800&auto=format&fit=crop",
    aspectRatio: "aspect-square",
  },
];

export default function CurrentlyBlooming() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useSettings();

  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-floral-pink font-medium tracking-widest uppercase text-sm mb-4 block">
            {t("blooming_badge")}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("blooming_title")} <span className="text-garden-green dark:text-green-400">{t("blooming_title_highlight")}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg font-light italic">
            {t("blooming_quote")}
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {bloomingPlants.map((plant, index) => (
            <motion.div
              key={plant.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`group relative overflow-hidden rounded-2xl ${
                index === 0 ? "md:col-span-2 lg:col-span-2 aspect-[16/9] lg:aspect-auto lg:row-span-2" : plant.aspectRatio
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${plant.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-floral-pink/20 backdrop-blur-sm border border-floral-pink/30 text-floral-pink rounded-full text-xs font-medium tracking-wider uppercase mb-3">
                  {plant.color}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 shadow-sm">
                  {plant.name}
                </h3>
                <p className="text-white/80 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {plant.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
