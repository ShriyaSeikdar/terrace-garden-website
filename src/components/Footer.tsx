"use client";

import Link from "next/link";
import { MessageCircle, MapPin } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function Footer() {
  const whatsappNumber = "8983379058";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const { t } = useSettings();

  return (
    <footer className="bg-[#0f2413] text-white/80 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="font-serif text-2xl font-bold tracking-wider text-white">
                Terrace<span className="text-award-gold">Garden</span>
              </div>
            </Link>
            <p className="font-serif italic text-lg text-white/90 mb-6">
              {t("footer_quote")}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-garden-green transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-garden-green transition-colors">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">{t("footer_quick_links")}</h4>
            <ul className="space-y-4">
              <li><Link href="#collection" className="hover:text-award-gold transition-colors">{t("footer_link_collection")}</Link></li>
              <li><Link href="#achievements" className="hover:text-award-gold transition-colors">{t("footer_link_achievements")}</Link></li>
              <li><Link href="#gallery" className="hover:text-award-gold transition-colors">{t("footer_link_gallery")}</Link></li>
              <li><Link href="#about" className="hover:text-award-gold transition-colors">{t("footer_link_about")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">{t("footer_contact")}</h4>
            <ul className="space-y-4">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-award-gold transition-colors">
                  <MessageCircle className="w-5 h-5 text-garden-green" />
                  <span>+91 89833 79058</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-garden-green shrink-0 mt-0.5" />
                <span>{t("footer_visit")}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} {t("footer_rights")}</p>
          <p>{t("footer_designed")}</p>
        </div>
      </div>
    </footer>
  );
}
