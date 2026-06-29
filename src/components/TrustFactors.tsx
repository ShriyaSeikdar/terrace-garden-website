"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Award, Leaf } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function TrustFactors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { t } = useSettings();

  const factors = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-garden-green dark:text-green-400" />,
      title: t("trust_1_title"),
      description: t("trust_1_desc"),
    },
    {
      icon: <Award className="w-10 h-10 text-garden-green dark:text-green-400" />,
      title: t("trust_2_title"),
      description: t("trust_2_desc"),
    },
    {
      icon: <Leaf className="w-10 h-10 text-garden-green dark:text-green-400" />,
      title: t("trust_3_title"),
      description: t("trust_3_desc"),
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("trust_title")} <span className="text-garden-green dark:text-green-400">{t("trust_title_highlight")}</span>
          </h2>
        </div>

        <div 
          ref={ref}
          className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto"
        >
          {factors.map((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-soft-cream dark:bg-dark-card mb-6">
                {factor.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-4">{factor.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {factor.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
