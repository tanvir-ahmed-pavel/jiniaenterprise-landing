"use client";

import { useState, useCallback, useEffect, useMemo, memo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  vehicleName: string;
  priority?: boolean;
}

export const ImageCarousel = memo(function ImageCarousel({
  images,
  vehicleName,
  priority = false,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoize valid images array to prevent unnecessary re-computations and effect triggers
  const validImages = useMemo(() => {
    return (images || []).filter((img) => typeof img === "string" && img.trim() !== "");
  }, [images]);

  const hasMultipleImages = validImages.length > 1;

  const handlePrevious = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
    },
    [validImages.length]
  );

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
    },
    [validImages.length]
  );

  // Preload the next image only after the user has interacted with the carousel
  useEffect(() => {
    if (isInteracted && hasMultipleImages) {
      const nextIndex = (currentIndex + 1) % validImages.length;
      const preloadImg = new window.Image();
      preloadImg.src = validImages[nextIndex];
    }
  }, [currentIndex, isInteracted, hasMultipleImages, validImages]);

  if (validImages.length === 0) {
    return (
      <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-emerald-950/5">
        <Car className="h-10 w-10 text-emerald-900/20 mb-2" />
        <span className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-widest">
          No Image Available
        </span>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full group/carousel overflow-hidden bg-muted"
      onMouseEnter={() => !isInteracted && setIsInteracted(true)}
      onTouchStart={() => !isInteracted && setIsInteracted(true)}
    >
      {/* Lightweight Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 bg-emerald-950/5 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Image Display */}
      <div className="w-full h-full relative overflow-hidden">
        <Image
          key={validImages[currentIndex]}
          src={validImages[currentIndex]}
          alt={`${vehicleName} - View ${currentIndex + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority && currentIndex === 0}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "object-cover transition-transform duration-700 ease-out will-change-transform group-hover/card:scale-105",
            !isLoaded ? "opacity-0 scale-100" : "opacity-100"
          )}
        />
      </div>

      {hasMultipleImages && (
        <>
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handlePrevious}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-white hover:text-emerald-950 text-white backdrop-blur-xs border border-white/20 opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 flex items-center justify-center shadow-md cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-white hover:text-emerald-950 text-white backdrop-blur-xs border border-white/20 opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 flex items-center justify-center shadow-md cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-2.5 left-0 right-0 z-20 flex justify-center gap-1.5 pointer-events-none">
            {validImages.map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer",
                  index === currentIndex
                    ? "w-5 bg-white shadow-sm"
                    : "w-1.5 bg-white/50 hover:bg-white/80"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(index);
                  setIsInteracted(true);
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
});

