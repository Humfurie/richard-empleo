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
  const [prevPhotoId, setPrevPhotoId] = useState(photo.id);
  const [isPlayingLive, setIsPlayingLive] = useState<boolean>(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  if (photo.id !== prevPhotoId) {
    setPrevPhotoId(photo.id);
    setIsPlayingLive(true);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;
    if (deltaX > 40) {
      onNext();
    } else if (deltaX < -40) {
      onPrev();
    }
    setTouchStartX(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-3 sm:p-8 touch-none">
      {/* Close button with touch-friendly hit area */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-[#1E120C]/90 border border-[#C98246]/30 text-[#E1A26B] flex items-center justify-center hover:bg-[#2C1B12] active:scale-95 transition cursor-pointer z-50 shadow-lg"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev button */}
      <button
        onClick={onPrev}
        className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1E120C]/80 border border-[#C98246]/30 text-[#E1A26B] flex items-center justify-center hover:bg-[#2C1B12] active:scale-90 transition cursor-pointer z-40"
        aria-label="Previous Photo"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Next button */}
      <button
        onClick={onNext}
        className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1E120C]/80 border border-[#C98246]/30 text-[#E1A26B] flex items-center justify-center hover:bg-[#2C1B12] active:scale-90 transition cursor-pointer z-40"
        aria-label="Next Photo"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div
        className="max-w-4xl w-full flex flex-col items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-[54vh] sm:h-[72vh] max-h-[75vh] rounded-2xl overflow-hidden mb-3 sm:mb-4 border border-[#C98246]/20 bg-[#0A0604] flex items-center justify-center select-none">
          {photo.type === "video" && photo.videoSrc ? (
            <video
              src={photo.videoSrc}
              muted
              autoPlay
              loop
              playsInline
              className="max-h-full max-w-full w-auto h-auto object-contain"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="100vw"
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
              className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-[#0A0604]/80 backdrop-blur-md border border-[#E1A26B]/30 flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#F2C89D] shadow-lg cursor-pointer hover:bg-[#1E120C]"
            >
              <Disc
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E1A26B] ${
                  isPlayingLive ? "animate-spin" : ""
                }`}
                style={{ animationDuration: "5s" }}
              />
              <span>LIVE</span>
              {isPlayingLive ? (
                <Pause className="w-3 h-3 text-neutral-400 ml-0.5" />
              ) : (
                <Play className="w-3 h-3 text-neutral-400 ml-0.5" />
              )}
            </button>
          )}
        </div>

        <div className="text-center px-4">
          <h3 className="text-base sm:text-lg font-semibold text-[#FAF5F0] truncate max-w-[80vw]">
            {photo.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#F2C89D] mt-0.5 font-mono truncate max-w-[80vw]">
            {photo.caption}
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-[10px] sm:text-[11px] text-neutral-400">
              {currentIndex + 1} of {totalCount}
            </span>
            <span className="text-[10px] text-neutral-500 sm:hidden">• Swipe to browse</span>
          </div>
        </div>
      </div>
    </div>
  );
}
