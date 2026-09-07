"use client";

import React from "react";
import confetti from "canvas-confetti";
import { Cake, Sparkles, Heart } from "lucide-react";

export default function CelebrationClimax() {
  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#E1A26B", "#F2C89D", "#C98246", "#FAF5F0", "#FFFFFF"],
    });
  };

  return (
    <section
      id="wishes"
      className="py-16 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center relative z-20 border-t border-[#C98246]/10"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#1E120C] border border-[#C98246]/30 flex items-center justify-center text-[#E1A26B] mx-auto mb-5 sm:mb-6 shadow-2xl">
        <Cake className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>

      <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#FAF5F0] mb-3 sm:mb-4">
        Happy Birthday, Richard!
      </h2>

      <p className="text-sm sm:text-lg md:text-xl text-neutral-300 font-light max-w-xl mx-auto leading-relaxed mb-8">
        Wishing you good health, clear skies for every flight, and a lifetime of
        shared happiness in this extraordinary year of life and marriage.
      </p>

      {/* Interactive Celebration Action */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-14 px-2">
        <button
          onClick={triggerCelebration}
          className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#C98246] via-[#E1A26B] to-[#F2C89D] text-[#0A0604] font-bold text-sm sm:text-base hover:opacity-95 shadow-2xl shadow-[#C98246]/30 transition active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>Launch Birthday Fireworks</span>
        </button>
      </div>

      {/* Warm Tribute Note Card */}
      <div className="glass-box p-5 sm:p-8 rounded-2xl sm:rounded-3xl text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs text-[#E1A26B] font-medium mb-3">
          <Heart className="w-4 h-4 fill-[#E1A26B]" />
          <span>To Richard Empleo • Born September 7</span>
        </div>
        <p className="text-sm sm:text-base text-[#FAF5F0] leading-relaxed font-light italic">
          &ldquo;Here&rsquo;s to the genuine smiles, the unforgettable travels,
          and the lifelong bond sealed on August 1, 2026. Keep soaring high and
          making every moment count.&rdquo;
        </p>
        <div className="mt-4 pt-3 border-t border-[#C98246]/15 text-xs text-[#F2C89D] font-medium">
          — From Friends, Family & The Crew ✨
        </div>
      </div>
    </section>
  );
}
