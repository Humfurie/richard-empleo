"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FolderCheck, Disc, Video } from "lucide-react";
import { PHOTO_COLLECTION, PhotoItem } from "@/data/photos";
import LightboxModal from "./LightboxModal";

interface PhotoGalleryProps {
  externalLightboxIndex?: number | null;
  onCloseExternalLightbox?: () => void;
}

export default function PhotoGallery({
  externalLightboxIndex = null,
  onCloseExternalLightbox,
}: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<PhotoItem[]>(PHOTO_COLLECTION);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isLiveSynced, setIsLiveSynced] = useState<boolean>(false);

  // Auto-sync with Google Drive folder on refresh / mount
  React.useEffect(() => {
    let isMounted = true;
    async function syncDrivePhotos() {
      try {
        const res = await fetch("/api/photos", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.success && Array.isArray(data.photos) && data.photos.length > 0) {
          if (!isMounted) return;
          // Merge newly detected drive photos with local collection
          const existingIds = new Set(PHOTO_COLLECTION.map((p) => p.id));
          const newPhotos: PhotoItem[] = data.photos.filter(
            (p: PhotoItem) => !existingIds.has(p.id)
          );
          if (newPhotos.length > 0) {
            setPhotos([...PHOTO_COLLECTION, ...newPhotos]);
            setIsLiveSynced(true);
          }
        }
      } catch (err) {
        console.warn("Drive live sync fallback to local collection:", err);
      }
    }
    syncDrivePhotos();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPhotos: PhotoItem[] =
    selectedCategory === "all"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  const currentLightboxIndex =
    externalLightboxIndex !== null ? externalLightboxIndex : activePhotoIndex;

  const handleCloseLightbox = () => {
    setActivePhotoIndex(null);
    if (onCloseExternalLightbox) {
      onCloseExternalLightbox();
    }
  };

  const handleNext = () => {
    if (currentLightboxIndex === null) return;
    const nextIdx = (currentLightboxIndex + 1) % filteredPhotos.length;
    setActivePhotoIndex(nextIdx);
  };

  const handlePrev = () => {
    if (currentLightboxIndex === null) return;
    const prevIdx =
      (currentLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setActivePhotoIndex(prevIdx);
  };

  return (
    <section id="fullGallery" className="py-16 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto relative z-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[#E1A26B] font-semibold uppercase tracking-wider mb-2">
            <FolderCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Google Drive Collection ({photos.length} Photos & Live Media)</span>
            {isLiveSynced && (
              <span className="ml-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] sm:text-[10px]">
                ● Live Synced
              </span>
            )}
          </div>
          <h2 className="text-2.5xl sm:text-4xl md:text-5xl font-semibold text-[#FAF5F0]">
            Complete Photo Gallery
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 sm:mt-2">
            Tap any media to view high-res • Live Photos animate with motion.
          </p>
        </div>

        {/* Filter Tabs - Smooth horizontal scroll on mobile with touch */}
        <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#140C08] border border-[#C98246]/20 text-xs overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-xl font-bold transition active:scale-95 cursor-pointer text-xs ${
              selectedCategory === "all"
                ? "bg-[#C98246] text-[#0A0604]"
                : "text-neutral-400 hover:text-[#FAF5F0]"
            }`}
          >
            All ({photos.length})
          </button>
          <button
            onClick={() => setSelectedCategory("candid")}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-xl font-bold transition active:scale-95 cursor-pointer text-xs ${
              selectedCategory === "candid"
                ? "bg-[#C98246] text-[#0A0604]"
                : "text-neutral-400 hover:text-[#FAF5F0]"
            }`}
          >
            Portraits & Moments
          </button>
          <button
            onClick={() => setSelectedCategory("milestone")}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-xl font-bold transition active:scale-95 cursor-pointer text-xs ${
              selectedCategory === "milestone"
                ? "bg-[#C98246] text-[#0A0604]"
                : "text-neutral-400 hover:text-[#FAF5F0]"
            }`}
          >
            Wedding & Milestones
          </button>
          <button
            onClick={() => setSelectedCategory("travel")}
            className={`whitespace-nowrap px-3 sm:px-3.5 py-1.5 rounded-xl font-bold transition active:scale-95 cursor-pointer text-xs ${
              selectedCategory === "travel"
                ? "bg-[#C98246] text-[#0A0604]"
                : "text-neutral-400 hover:text-[#FAF5F0]"
            }`}
          >
            Travel & Drone
          </button>
        </div>
      </div>

      {/* Grid with Live Photo & Video Support */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setActivePhotoIndex(index)}
            className="glass-box rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between cursor-pointer group"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#140C08] mb-3 relative">
              {photo.type === "video" && photo.videoSrc ? (
                <video
                  src={photo.videoSrc}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-cover transition duration-700 ${
                    photo.type === "live"
                      ? "group-hover:scale-110 group-hover:rotate-0.5"
                      : "group-hover:scale-105"
                  }`}
                  loading="lazy"
                />
              )}

              {/* iOS Live Photo Indicator Badge */}
              {photo.type === "live" && (
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#0A0604]/80 backdrop-blur-md border border-[#E1A26B]/30 flex items-center gap-1 text-[10px] font-semibold text-[#F2C89D] shadow-md">
                  <Disc className="w-3 h-3 text-[#E1A26B] animate-spin" style={{ animationDuration: "6s" }} />
                  <span>LIVE</span>
                </div>
              )}

              {/* Video Badge */}
              {photo.type === "video" && (
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#0A0604]/80 backdrop-blur-md border border-[#E1A26B]/30 flex items-center gap-1 text-[10px] font-semibold text-[#F2C89D] shadow-md">
                  <Video className="w-3 h-3 text-[#E1A26B]" />
                  <span>VIDEO</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#FAF5F0] truncate">
                {photo.title}
              </h3>
              <p className="text-[11px] text-[#F2C89D]/90 truncate">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {currentLightboxIndex !== null && filteredPhotos[currentLightboxIndex] && (
        <LightboxModal
          photo={filteredPhotos[currentLightboxIndex]}
          currentIndex={currentLightboxIndex}
          totalCount={filteredPhotos.length}
          onClose={handleCloseLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </section>
  );
}
