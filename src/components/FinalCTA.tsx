"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function FinalCTA() {
  const whatsappNumber = "8983379058";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const { t } = useSettings();

  return (
    <section className="relative py-32 bg-gray-900 overflow-hidden flex items-center justify-center">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1585320806297-9794b3e4ce11?q=80&w=2000&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-md">
            {t("cta_title")} <span className="text-award-gold italic">{t("cta_title_highlight")}</span>
          </h2>
          <p className="text-white/80 text-xl font-light mb-12 leading-relaxed drop-shadow">
            {t("cta_desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-garden-green text-white rounded-full font-medium tracking-wide hover:bg-[#154a19] transition-all hover:shadow-[0_0_20px_rgba(27,94,32,0.5)] transform hover:-translate-y-1 w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              {t("cta_whatsapp")}
            </a>
            
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white text-white rounded-full font-medium tracking-wide hover:bg-white/10 transition-all w-full sm:w-auto backdrop-blur-sm"
            >
              <MapPin className="w-5 h-5" />
              {t("cta_visit")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
