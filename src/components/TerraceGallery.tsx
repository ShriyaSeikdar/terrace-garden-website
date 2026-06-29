"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

const galleryImages = [
  "https://images.unsplash.com/photo-1585320806297-9794b3e4ce11?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1463131776510-2495bb68cbb7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1592483669145-f09bce053422?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616641285324-5d51cb541312?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1561489422-45de3d015e3e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509223197845-458d87318791?q=80&w=800&auto=format&fit=crop",
];

export default function TerraceGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useSettings();

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-dark-bg relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("gallery_title")} <span className="text-garden-green dark:text-green-400">{t("gallery_title_highlight")}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg font-light">
            {t("gallery_subtitle")}
          </p>
        </div>

        <div 
          ref={ref}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {galleryImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-12 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
