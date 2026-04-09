"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  vehicleName: string;
  priority?: boolean;
}

export function ImageCarousel({ images, vehicleName, priority = false }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter out any empty strings
  const validImages = images.filter((img) => img && img.trim() !== "");

  const handlePrevious = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  }, [validImages.length]);

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  }, [validImages.length]);

  // Preload the next image if we've interacted
  useEffect(() => {
    if (isInteracted && validImages.length > 1) {
      const nextIndex = (currentIndex + 1) % validImages.length;
      const img = new (window as any).Image();
      img.src = validImages[nextIndex];
    }
  }, [currentIndex, isInteracted, validImages]);

  if (validImages.length === 0) {
    return (
      <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center bg-green-50/30">
        <Car className="h-12 w-12 text-green-200 mb-2" />
        <span className="text-[10px] font-bold text-green-300 uppercase tracking-widest">No Image</span>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-full group/carousel overflow-hidden bg-muted"
      onMouseEnter={() => setIsInteracted(true)}
      onTouchStart={() => setIsInteracted(true)}
    >
      {/* Skeleton Shimmer */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-muted animate-shimmer" />
      )}

      {/* Images container */}
      <div className="w-full h-full relative overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={validImages[currentIndex]}
              alt={`${vehicleName} - Image ${currentIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority && currentIndex === 0}
              onLoad={() => setIsLoading(false)}
              className="object-cover group-hover/card:scale-105 transition-transform duration-1000 ease-out"
            />
          </motion.div>
        </AnimatePresence>

        {/* Deferred Images (only rendered when interacted to save DOM/Memory) */}
        {isInteracted && validImages.length > 1 && (
          <div className="hidden">
            {validImages.map((src, index) => (
              index !== currentIndex && (
                <Image 
                  key={src} 
                  src={src} 
                  alt="" 
                  width={10} 
                  height={10} 
                  aria-hidden="true" 
                />
              )
            ))}
          </div>
        )}
      </div>

      {validImages.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={handlePrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/90 text-white hover:text-green-950 backdrop-blur-md border border-white/20 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/90 text-white hover:text-green-950 backdrop-blur-md border border-white/20 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 flex items-center justify-center shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5 pointer-events-none">
            {validImages.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-1 rounded-full transition-all duration-500 pointer-events-auto",
                  index === currentIndex
                    ? "w-6 bg-white shadow-sm"
                    : "w-1.5 bg-white/40 hover:bg-white/60"
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
}
