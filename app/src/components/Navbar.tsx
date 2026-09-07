"use client";

import React from "react";
import confetti from "canvas-confetti";
import { Cake } from "lucide-react";

export default function Navbar() {
  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#E1A26B", "#F2C89D", "#C98246", "#FAF5F0"],
    });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0A0604]/80 backdrop-blur-xl border-b border-[#C98246]/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#E1A26B] animate-ping" />
          <span className="font-semibold text-sm tracking-wide text-[#FAF5F0]">
            Richard Empleo
          </span>
          <span className="text-neutral-500">/</span>
          <span className="text-neutral-400 hidden sm:inline">
            September 7 Birthday Edition
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
          <a href="#dynamicHero" className="hover:text-[#F2C89D] transition">
            Scroll Story
          </a>
          <a href="#fullGallery" className="hover:text-[#F2C89D] transition">
            Full Gallery
          </a>
          <a href="#wishes" className="hover:text-[#F2C89D] transition">
            Leave a Wish
          </a>
        </nav>

        <button
          onClick={handleCelebrate}
          className="px-4 py-1.5 rounded-full bg-[#C98246] hover:bg-[#E1A26B] text-[#0A0604] font-bold text-xs transition active:scale-90 flex items-center gap-1.5 shadow-lg shadow-[#C98246]/25 cursor-pointer"
        >
          <Cake className="w-3.5 h-3.5" />
          <span>Celebrate</span>
        </button>
      </div>
    </header>
  );
}
