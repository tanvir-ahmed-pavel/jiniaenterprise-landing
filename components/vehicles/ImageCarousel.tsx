"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Car } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  vehicleName: string;
}

export function ImageCarousel({ images, vehicleName }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out any empty strings just in case
  const validImages = images.filter((img) => img.trim() !== "");

  if (validImages.length === 0) {
    return (
      <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gray-100">
        <Car className="h-24 w-24 text-gray-300" />
      </div>
    );
  }

  if (validImages.length === 1) {
    return (
      <img
        src={validImages[0]}
        alt={vehicleName}
        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
      />
    );
  }

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full group">
      {/* Images container */}
      <div className="w-full h-full relative overflow-hidden">
        {validImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`${vehicleName} - Image ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/50 hover:bg-white/90 text-gray-800 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/50 hover:bg-white/90 text-gray-800 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2 pointer-events-none">
        {validImages.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 pointer-events-auto shadow-sm shadow-black/20 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/60 hover:bg-white/90"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
