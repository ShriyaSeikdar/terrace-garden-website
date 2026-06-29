"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustStatistics from "@/components/TrustStatistics";
import AboutGardener from "@/components/AboutGardener";
import AchievementsPreview from "@/components/AchievementsPreview";
import CurrentlyBlooming from "@/components/CurrentlyBlooming";
import PlantCollection from "@/components/PlantCollection";
import TrustFactors from "@/components/TrustFactors";
import Testimonials from "@/components/Testimonials";
import TerraceGallery from "@/components/TerraceGallery";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-soft-cream dark:bg-dark-bg selection:bg-garden-green selection:text-white">
      <Navigation />
      <Hero />
      <TrustStatistics />
      <AboutGardener />
      <AchievementsPreview />
      <CurrentlyBlooming />
      <PlantCollection />
      <TrustFactors />
      <Testimonials />
      <TerraceGallery />
      <FinalCTA />
      <Footer />
    </main>
  );
}