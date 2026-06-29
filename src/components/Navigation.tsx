"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSettings } from "@/context/SettingsContext";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useSettings();

  const navLinks = [
    { name: t("nav_home"), href: "/#home" },
    { name: t("nav_adeniums"), href: "/adeniums" },
    { name: t("nav_achievements"), href: "/#achievements" },
    { name: t("nav_testimonials"), href: "/#testimonials" },
    { name: t("nav_gallery"), href: "/#gallery" },
    { name: t("nav_about"), href: "/#about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappNumber = "8983379058";
  const whatsappMessage = "Hello! I would like to know more about your terrace garden.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-dark-bg/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="font-serif text-2xl font-bold tracking-wider text-garden-green group-hover:text-opacity-80 transition-opacity">
            {isScrolled ? (
              <span className="text-garden-green dark:text-green-400">Terrace<span className="text-award-gold">Garden</span></span>
            ) : (
              <span className="text-white drop-shadow-md">Terrace<span className="text-award-gold">Garden</span></span>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors ${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-garden-green dark:hover:text-green-400"
                  : "text-white/90 hover:text-white drop-shadow-md"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* WhatsApp Button */}
        <div className="hidden md:flex">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-garden-green text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-[#154a19] transition-all hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            {t("nav_whatsapp")}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? "text-gray-800 dark:text-gray-200" : "text-white"}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? "text-gray-800 dark:text-gray-200" : "text-white"}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white dark:bg-dark-bg shadow-xl py-6 px-6 flex flex-col gap-4 md:hidden border-t border-gray-100 dark:border-gray-800"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-800 dark:text-gray-200 font-medium py-2 border-b border-gray-50 dark:border-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-garden-green text-white px-5 py-3 rounded-full font-medium text-sm mt-4"
          >
            <MessageCircle className="w-5 h-5" />
            {t("nav_whatsapp")}
          </a>
        </motion.div>
      )}
    </header>
  );
}
