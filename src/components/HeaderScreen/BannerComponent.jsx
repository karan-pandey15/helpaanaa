"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerData = [
  { 
    id: 1, 
    image: "/image/firwtgrocery.png", 
    route: "/pages/Groceries",
    title: "Fresh Groceries" 
  },
  { 
    id: 2, 
    image: "/image/ttt.png", 
    route: "/pages/Attendant",
    title: "Professional Attendants" 
  },
  { 
    id: 3, 
    image: "/image/pandiit.png", 
    route: "/pages/Pandit",
    title: "Expert Pandit Ji" 
  },
];

export default function BannerComponent() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 sm:rounded-[40px] shadow-lg group aspect-[16/9] sm:aspect-[21/9]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 cursor-pointer"
          onClick={() => router.push(bannerData[currentIndex].route)}
        >
          {/* Main Banner Image */}
          <img
            src={bannerData[currentIndex].image}
            alt={bannerData[currentIndex].title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200";
            }}
          />
          
          {/* Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent hidden sm:block" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Visible on Hover) */}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <button
          onClick={(e) => { e.stopPropagation(); slidePrev(); }}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white/40 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); slideNext(); }}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white pointer-events-auto hover:bg-white/40 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {bannerData.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              idx === currentIndex ? "w-8 bg-white shadow-md" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* 16-min Quick Delivery Badge (Helpaana Theme) */}
      <div className="absolute top-4 right-4 bg-yellow-400 px-3 py-1 rounded-full shadow-lg z-20 hidden sm:flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-[#1d4e6e] rounded-full animate-pulse" />
        <span className="text-[10px] font-black text-[#1d4e6e] uppercase tracking-wider">Fast Delivery</span>
      </div>
    </div>
  );
}
