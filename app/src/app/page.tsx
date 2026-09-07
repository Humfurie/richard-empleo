"use client";

import React, { useState } from "react";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ParticleCanvas from "@/components/ParticleCanvas";
import Navbar from "@/components/Navbar";
import DynamicHero from "@/components/DynamicHero";
import PhotoGallery from "@/components/PhotoGallery";
import CelebrationClimax from "@/components/CelebrationClimax";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <SmoothScrollProvider>
      {/* Background Ambient Particles */}
      <ParticleCanvas />

      {/* Top Ambient Glow */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-[#C98246]/10 filter blur-3xl pointer-events-none z-0" />

      {/* Top Progress Bar */}
      <div className="fixed top-0 inset-x-0 h-[3px] bg-[#C98246]/15 z-[60]">
        <div
          id="progressBar"
          className="h-full bg-gradient-to-r from-[#C98246] via-[#E1A26B] to-[#F2C89D]"
        />
      </div>

      {/* Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Dynamic 3D Pinned Scroll Story */}
        <DynamicHero onOpenLightbox={(idx) => setLightboxIndex(idx)} />

        {/* Complete 15-Photo Gallery */}
        <PhotoGallery
          externalLightboxIndex={lightboxIndex}
          onCloseExternalLightbox={() => setLightboxIndex(null)}
        />

        {/* Celebratory Tribute Climax (Zero Form/Mailer) */}
        <CelebrationClimax />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
