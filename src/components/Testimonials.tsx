"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useSettings();

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      story: t("testimonial_1_story"),
      userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      plantImage: "https://images.unsplash.com/photo-1620023640033-91b5c4644eb9?q=80&w=400&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Rahul Desai",
      story: t("testimonial_2_story"),
      userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      plantImage: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=400&auto=format&fit=crop",
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-soft-cream dark:bg-dark-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-garden-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("testimonials_title")} <span className="text-garden-green dark:text-green-400">{t("testimonials_title_highlight")}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg font-light">
            {t("testimonials_subtitle")}
          </p>
        </div>

        <div 
          ref={ref}
          className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-dark-card rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-green-900/30 relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-soft-cream dark:text-dark-surface" />
              
              <div className="flex gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-soft-cream dark:border-dark-surface">
                  <img src={testimonial.userImage} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">{testimonial.name}</h4>
                  <span className="text-sm text-garden-green dark:text-green-400 font-medium">{t("testimonial_role")}</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 font-serif italic text-lg leading-relaxed mb-8">
                "{testimonial.story}"
              </p>
              
              <div className="h-32 rounded-xl overflow-hidden relative">
                <img src={testimonial.plantImage} alt="Plant" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-medium tracking-wide uppercase">
                  {t("testimonial_plant_label")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
