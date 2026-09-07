"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Sparkles, Mouse, ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface DynamicHeroProps {
  onOpenLightbox: (index: number) => void;
}

export default function DynamicHero({ onOpenLightbox }: DynamicHeroProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop & Tablet (width >= 768px)
    mm.add("(min-width: 768px)", () => {
      const dynamicTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#dynamicHero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // Initial setups for fly-in cards
      gsap.set("#flyCardWedding", {
        x: -600,
        y: -250,
        z: -300,
        rotateY: 35,
        rotateZ: -12,
        opacity: 0,
      });
      gsap.set("#flyCardSolo", {
        x: 600,
        y: -250,
        z: -300,
        rotateY: -35,
        rotateZ: 12,
        opacity: 0,
      });
      gsap.set("#flyCardDrone", {
        x: -500,
        y: 300,
        z: -200,
        rotateY: 25,
        rotateZ: 8,
        opacity: 0,
      });
      gsap.set("#flyCardCrew", {
        x: 500,
        y: 300,
        z: -200,
        rotateY: -25,
        rotateZ: -8,
        opacity: 0,
      });

      // Step 1: Fade out hero text as user scrolls
      dynamicTl.to(
        "#scrubHeroText",
        {
          opacity: 0,
          y: -80,
          scale: 0.9,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      // Step 2: Main Candid Card elevates and centers
      dynamicTl.to(
        "#mainCandidCard",
        {
          scale: 1.08,
          z: 120,
          boxShadow:
            "0 40px 90px rgba(0,0,0,0.95), 0 0 50px rgba(201, 130, 70, 0.3)",
          duration: 1.5,
          ease: "power2.out",
        },
        0.5
      );

      // Step 3: Fly-in cards swoop into locked formation around Candid Centerpiece
      dynamicTl.to(
        "#flyCardWedding",
        {
          x: -280,
          y: -120,
          z: 20,
          rotateY: 15,
          rotateZ: -4,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        },
        1
      );

      dynamicTl.to(
        "#flyCardSolo",
        {
          x: 280,
          y: -120,
          z: 20,
          rotateY: -15,
          rotateZ: 4,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        },
        1.2
      );

      dynamicTl.to(
        "#flyCardDrone",
        {
          x: -250,
          y: 140,
          z: 40,
          rotateY: 10,
          rotateZ: 3,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        },
        1.4
      );

      dynamicTl.to(
        "#flyCardCrew",
        {
          x: 250,
          y: 140,
          z: 40,
          rotateY: -10,
          rotateZ: -3,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        },
        1.6
      );

      // Step 4: Show Formation Complete text
      dynamicTl.to(
        "#formationText",
        {
          opacity: 1,
          y: -10,
          duration: 0.8,
        },
        2.5
      );
    });

    // Mobile (width < 768px): Tailored compact 3D orbit staying 100% inside screen bounds
    mm.add("(max-width: 767px)", () => {
      const dynamicTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#dynamicHero",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });

      // Offscreen positions scaled to mobile bounds
      gsap.set("#flyCardWedding", {
        x: -120,
        y: -140,
        z: -60,
        rotateZ: -10,
        opacity: 0,
        scale: 0.7,
      });
      gsap.set("#flyCardSolo", {
        x: 120,
        y: -140,
        z: -60,
        rotateZ: 10,
        opacity: 0,
        scale: 0.7,
      });
      gsap.set("#flyCardDrone", {
        x: -120,
        y: 140,
        z: -60,
        rotateZ: 6,
        opacity: 0,
        scale: 0.7,
      });
      gsap.set("#flyCardCrew", {
        x: 120,
        y: 140,
        z: -60,
        rotateZ: -6,
        opacity: 0,
        scale: 0.7,
      });

      // Fade out text
      dynamicTl.to(
        "#scrubHeroText",
        {
          opacity: 0,
          y: -40,
          scale: 0.92,
          duration: 1,
          ease: "power2.inOut",
        },
        0
      );

      // Main Candid Card elevates
      dynamicTl.to(
        "#mainCandidCard",
        {
          scale: 1.02,
          z: 30,
          duration: 1.2,
          ease: "power2.out",
        },
        0.3
      );

      // 4 cards swoop into tight framing corners that fit on 360px - 414px phones
      dynamicTl.to(
        "#flyCardWedding",
        {
          x: -64,
          y: -105,
          z: 15,
          rotateZ: -5,
          opacity: 1,
          scale: 0.8,
          duration: 1.4,
          ease: "power3.out",
        },
        0.6
      );

      dynamicTl.to(
        "#flyCardSolo",
        {
          x: 64,
          y: -105,
          z: 15,
          rotateZ: 5,
          opacity: 1,
          scale: 0.8,
          duration: 1.4,
          ease: "power3.out",
        },
        0.8
      );

      dynamicTl.to(
        "#flyCardDrone",
        {
          x: -60,
          y: 110,
          z: 20,
          rotateZ: 4,
          opacity: 1,
          scale: 0.8,
          duration: 1.4,
          ease: "power3.out",
        },
        1.0
      );

      dynamicTl.to(
        "#flyCardCrew",
        {
          x: 60,
          y: 110,
          z: 20,
          rotateZ: -4,
          opacity: 1,
          scale: 0.8,
          duration: 1.4,
          ease: "power3.out",
        },
        1.2
      );

      // Formation text
      dynamicTl.to(
        "#formationText",
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        1.8
      );
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section id="dynamicHero" className="relative h-[220vh] md:h-[400vh] z-20 overflow-clip">
      <div className="sticky top-0 h-dvh w-full max-w-full flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 stage-3d">
        {/* Hero Text Layer */}
        <div
          id="scrubHeroText"
          className="absolute z-30 text-center max-w-3xl pointer-events-none transition-opacity px-4"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-[#140C08]/90 border border-[#C98246]/25 text-[#F2C89D] text-[11px] sm:text-xs font-medium mb-4 sm:mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E1A26B]" />
            <span>September 7, 2026 • Birthday Edition</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-semibold tracking-tight text-[#FAF5F0] leading-[1.1] sm:leading-none mb-4 sm:mb-6">
            Happy Birthday, <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#E1A26B]">
              Richard.
            </span>
          </h1>

          <p className="text-sm sm:text-lg md:text-xl text-neutral-300 font-light max-w-xl mx-auto leading-relaxed mb-6 sm:mb-8">
            Scroll or swipe down to watch his memories unfold in dynamic motion.
          </p>

          <div className="flex items-center justify-center gap-2 text-xs text-[#F2C89D] font-medium animate-bounce">
            <Mouse className="w-4 h-4 text-[#E1A26B] hidden sm:inline" />
            <ArrowDown className="w-4 h-4 text-[#E1A26B] sm:hidden" />
            <span>Scroll or swipe to explore memories</span>
          </div>
        </div>

        {/* 3D DYNAMIC STAGE: Candid Vibes Centerpiece + Orbiting Memories */}
        <div
          id="stage3dContainer"
          className="relative w-full max-w-5xl h-105 sm:h-140 flex items-center justify-center z-20"
        >
          {/* PRIORITY #1: CANDID VIBES CENTERPIECE */}
          <div
            id="mainCandidCard"
            className="absolute z-20 w-[68vw] max-w-65 sm:w-88 md:w-96 aspect-[4/5] rounded-3xl overflow-hidden glass-box p-2.5 sm:p-3 cursor-pointer will-change-transform"
            onClick={() => onOpenLightbox(0)}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden bg-[#140C08] relative">
              <Image
                src="/photos/484134895_2556877727836074_89690266043101043_n.jpg"
                alt="Richard Empleo Candid Vibes"
                fill
                sizes="(max-width: 640px) 68vw, (max-width: 768px) 352px, 384px"
                className="object-cover ken-burns-active"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604]/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] sm:text-xs text-[#F2C89D] font-semibold">
                    Priority Centerpiece
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-[#FAF5F0]">
                    Candid Vibes • Richard
                  </p>
                </div>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#0A0604]/80 border border-[#C98246]/30 text-[#F2C89D] text-[9px] sm:text-[10px] font-mono">
                  Good Times
                </span>
              </div>
            </div>
          </div>

          {/* SECONDARY #2: Wedding with the Crew */}
          <div
            id="flyCardWedding"
            className="absolute z-10 w-[44vw] max-w-41.25 sm:w-76 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden glass-box p-1.5 sm:p-2.5 cursor-pointer will-change-transform"
            onClick={() => onOpenLightbox(1)}
          >
            <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#140C08] relative">
              <Image
                src="/photos/774814247_3058941844296324_2789370655237055161_n.jpg"
                alt="Wedding with the Crew"
                fill
                sizes="(max-width: 640px) 44vw, 304px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604]/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                <span className="text-[9px] sm:text-[10px] text-[#F2C89D] uppercase font-bold tracking-wider">
                  August 1, 2026
                </span>
                <p className="text-[10px] sm:text-xs font-semibold text-[#FAF5F0] truncate">
                  Wedding with Crew
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Solo Portrait */}
          <div
            id="flyCardSolo"
            className="absolute z-10 w-[44vw] max-w-41.25 sm:w-76 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden glass-box p-1.5 sm:p-2.5 cursor-pointer will-change-transform"
            onClick={() => onOpenLightbox(2)}
          >
            <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#140C08] relative">
              <Image
                src="/photos/dji_mimo_20250131_151348_0_1738308912274_photo.jpg"
                alt="Solo Portrait"
                fill
                sizes="(max-width: 640px) 44vw, 304px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604]/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3">
                <span className="text-[9px] sm:text-[10px] text-[#F2C89D] uppercase font-bold tracking-wider">
                  Solo Portrait
                </span>
                <p className="text-[10px] sm:text-xs font-semibold text-[#FAF5F0] truncate">
                  Natural Warmth
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: DJI Drone Aerial Sunset */}
          <div
            id="flyCardDrone"
            className="absolute z-10 w-[40vw] max-w-37.5 sm:w-68 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden glass-box p-1.5 sm:p-2 cursor-pointer will-change-transform"
            onClick={() => onOpenLightbox(3)}
          >
            <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#140C08] relative">
              <Image
                src="/photos/DJI_20241228173509_0117_D.JPG"
                alt="DJI Drone Aerial"
                fill
                sizes="(max-width: 640px) 40vw, 272px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604]/80 via-transparent to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-2 sm:left-3 sm:right-3">
                <p className="text-[9px] sm:text-[11px] font-semibold text-[#FAF5F0] truncate">
                  Sunset Coastline
                </p>
              </div>
            </div>
          </div>

          {/* Card 5: Wedding Gathering in White */}
          <div
            id="flyCardCrew"
            className="absolute z-10 w-[40vw] max-w-37.5 sm:w-68 aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden glass-box p-1.5 sm:p-2 cursor-pointer will-change-transform"
            onClick={() => onOpenLightbox(4)}
          >
            <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#140C08] relative">
              <Image
                src="/photos/IMG_1068.JPG"
                alt="Wedding Gathering in White"
                fill
                sizes="(max-width: 640px) 40vw, 272px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0604]/80 via-transparent to-transparent" />
              <div className="absolute bottom-1.5 left-2 right-2 sm:bottom-2 sm:left-3 sm:right-3">
                <p className="text-[9px] sm:text-[11px] font-semibold text-[#FAF5F0] truncate">
                  Celebration in White
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Stage Subtitle */}
        <div
          id="formationText"
          className="absolute bottom-6 sm:bottom-10 text-center z-30 opacity-0 pointer-events-none px-4"
        >
          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#E1A26B] font-semibold">
            3D Memory Matrix Formed
          </p>
          <p className="text-xs sm:text-sm text-neutral-300 font-light mt-0.5 sm:mt-1">
            Scroll down to browse all 15 photos
          </p>
        </div>
      </div>
    </section>
  );
}
