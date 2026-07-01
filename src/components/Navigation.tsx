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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-transparent/95 dark:bg-dark-bg/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent"
      }`}
    >
      {/* Flower Strip - Only visible when not scrolled */}
      {!isScrolled && (
        <div 
          className="w-full relative h-42 sm:h-57 md:h-67 lg:h-47 z-20 bg-no-repeat bg-[length:auto_118%] bg-center bg-transparent"
          style={{ backgroundImage: "url('/image-removebg-preview (14).png')" }}
          role="img"
          aria-label="Flower Strip"
        />
      )}

      {/* Navigation Bar */}
      <div className={`transition-all duration-500 w-full ${
        isScrolled 
          ? "" 
          : "bg-gradient-to-b from-transparent via-transparent/95 to-transparent/30 border-b border-transparent/50"
      }`}>
        <div className={`container mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${
          isScrolled ? "py-1" : "py-4"
        }`}>
          
          {/* Mobile Header (visible only on mobile) */}
          <div className="flex md:hidden items-center justify-between w-full">
            <Link href="/" className="group flex items-center gap-2">
              <span className={`font-serif text-xl font-bold transition-colors duration-300 ${
                isScrolled ? "text-garden-green dark:text-green-400" : "text-maroon"
              }`}>
                {isScrolled ? (
                  <>Terrace<span className="text-award-gold">Garden</span></>
                ) : (
                  "TerraceGarden"
                )}
              </span>
            </Link>
            <button
              className={`transition-colors duration-300 ${
                isScrolled ? "text-gray-800 dark:text-gray-200" : "text-maroon"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Logo (visible on scroll) */}
          <Link 
            href="/" 
            className={`hidden md:flex items-center gap-2 transition-all duration-500 ${
              isScrolled 
                ? "opacity-100 translate-x-0 w-auto pointer-events-auto" 
                : "opacity-0 -translate-x-4 w-0 pointer-events-none overflow-hidden"
            }`}
          >
            <div className="font-serif text-2xl font-bold tracking-wider text-garden-green">
              <span className="text-garden-green dark:text-green-400">
                Terrace<span className="text-award-gold">Garden</span>
              </span>
            </div>
          </Link>

          {/* Desktop Links (centered when top, balanced when scrolled) */}
          <nav className={`hidden md:flex items-center transition-all duration-500 mx-auto ${
            isScrolled 
              ? "gap-8" 
              : "gap-10 lg:gap-14"
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-all duration-300 uppercase font-serif ${
                  isScrolled
                    ? "text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300 hover:text-garden-green dark:hover:text-green-400 normal-case font-sans"
                    : "text-base font-bold tracking-wider text-maroon hover:text-[#5c151e]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* WhatsApp Button (visible on scroll) */}
          <div className={`hidden md:flex transition-all duration-500 ${
            isScrolled 
              ? "opacity-100 translate-x-0 w-auto pointer-events-auto" 
              : "opacity-0 translate-x-4 w-0 pointer-events-none overflow-hidden"
          }`}>
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

        </div>
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
