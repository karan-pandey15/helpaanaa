"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerData = [
  { 
    id: 1, 
    image: "/image/gauurdianforkids.png", 
    route: "/pages/GuardianKids",
    title: "Book Gaurdian For Kids" 
  },
  { 
    id: 2, 
    image: "/image/attendant.png", 
    route: "/pages/Attendant",
    title: "Professional Attendants" 
  },
  { 
    id: 3, 
    image: "/image/Helpaana.png", 
    route: "https://play.google.com/store/apps/details?id=com.marasappnew&hl=en_IN",
    title: "Download Helpaana App" 
  },
  { 
    id: 4, 
    image: "/image/pandiit.png", 
    route: "/pages/Pandit",
    title: "Expert Pandit Ji" 
  }, 
  { 
    id: 6, 
    image: "/image/pandiit.png", 
    route: "/pages/Pandit",
    title: "Expert Pandit Ji" 
  }, 
];

export default function BannerComponent() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleBannerClick = (route) => {
    if (route.startsWith("http")) {
      window.open(route, "_blank");
    } else {
      router.push(route);
    }
  };

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % bannerData.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(slideNext, 5000);
    return () => clearInterval(timer);
  }, [slideNext]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1] overflow-hidden bg-white group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 cursor-pointer flex items-center justify-center"
          onClick={() => handleBannerClick(bannerData[currentIndex].route)}
        >
          <img
            src={bannerData[currentIndex].image}
            alt={bannerData[currentIndex].title}
            className="max-w-full max-h-full w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200";
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          onClick={(e) => { e.stopPropagation(); slidePrev(); }}
          className="p-1.5 sm:p-3 bg-black/30 backdrop-blur-sm rounded-full text-white pointer-events-auto hover:bg-black/50 transition-all transform hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); slideNext(); }}
          className="p-1.5 sm:p-3 bg-black/30 backdrop-blur-sm rounded-full text-white pointer-events-auto hover:bg-black/50 transition-all transform hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2.5 z-10">
        {bannerData.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 ${
              idx === currentIndex ? "w-6 sm:w-10 bg-white shadow-lg" : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Delivery Badge */}
      <div className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-yellow-400 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-xl z-20 flex items-center gap-1.5 sm:gap-2">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1d4e6e] rounded-full animate-pulse" />
        <span className="text-[9px] sm:text-xs font-black text-[#1d4e6e] uppercase tracking-widest">Fast Delivery</span>
      </div>
    </div>
  );
}
