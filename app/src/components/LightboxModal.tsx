"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Disc, Play, Pause } from "lucide-react";
import { PhotoItem } from "@/data/photos";

interface LightboxModalProps {
  photo: PhotoItem;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LightboxModal({
  photo,
  currentIndex,
  totalCount,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  const [isPlayingLive, setIsPlayingLive] = useState<boolean>(true);

  useEffect(() => {
    setIsPlayingLive(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onClose, photo]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-8">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1E120C] border border-[#C98246]/30 text-[#E1A26B] flex items-center justify-center hover:bg-[#2C1B12] transition cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1E120C]/80 border border-[#C98246]/30 text-[#E1A26B] flex items-center justify-center hover:bg-[#2C1B12] transition cursor-pointer"
        aria-label="Previous Photo"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1E120C]/80 border border-[#C98246]/30 text-[#E1A26B] flex items-center justify-center hover:bg-[#2C1B12] transition cursor-pointer"
        aria-label="Next Photo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="max-w-4xl w-full flex flex-col items-center">
        <div className="relative w-full max-h-[75vh] aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-[#C98246]/20 bg-[#0A0604] flex items-center justify-center">
          {photo.type === "video" && photo.videoSrc ? (
            <video
              src={photo.videoSrc}
              muted
              autoPlay
              loop
              playsInline
              className="max-h-[75vh] w-auto object-contain"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className={`object-contain transition-transform duration-1000 ${
                  photo.type === "live" && isPlayingLive
                    ? "ken-burns-active"
                    : ""
                }`}
                priority
              />
            </div>
          )}

          {/* Live Photo Badge with toggle */}
          {photo.type === "live" && (
            <button
              onClick={() => setIsPlayingLive(!isPlayingLive)}
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0A0604]/80 backdrop-blur-md border border-[#E1A26B]/30 flex items-center gap-1.5 text-xs font-semibold text-[#F2C89D] shadow-lg cursor-pointer hover:bg-[#1E120C]"
            >
              <Disc
                className={`w-3.5 h-3.5 text-[#E1A26B] ${
                  isPlayingLive ? "animate-spin" : ""
                }`}
                style={{ animationDuration: "5s" }}
              />
              <span>LIVE PHOTO</span>
              {isPlayingLive ? (
                <Pause className="w-3 h-3 text-neutral-400 ml-1" />
              ) : (
                <Play className="w-3 h-3 text-neutral-400 ml-1" />
              )}
            </button>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-[#FAF5F0]">
            {photo.title}
          </h3>
          <p className="text-xs text-[#F2C89D] mt-0.5 font-mono">
            {photo.caption}
          </p>
          <span className="text-[11px] text-neutral-400 mt-1 block">
            {currentIndex + 1} of {totalCount}
          </span>
        </div>
      </div>
    </div>
  );
}
