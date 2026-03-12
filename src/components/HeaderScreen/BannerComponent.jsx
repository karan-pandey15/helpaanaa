"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const bannerData = [
  {
    id: 1,
    image: "/image/two.png",
    route: "/pages/GuardianKids",
    title: "Book Guardian For Kids",
  },
  {
    id: 2,
    image: "/image/one.png",
    route: "/pages/Attendant",
    title: "Professional Attendants",
  },
  {
    id: 4,
    image: "/image/four.png",
    route: "/pages/Pandit",
    title: "Expert Pandit Ji",
  },
  {
    id: 6,
    image: "/image/three.png",
    route: "/pages/gym",
    title: "Premium Gym Service",
  },
];

export default function BannerComponent() {
  const router = useRouter();
  const [[currentIndex, direction], setSlide] = useState([0, 0]);

  const handleBannerClick = (route) => {
    if (route.startsWith("http")) {
      window.open(route, "_blank");
    } else {
      router.push(route);
    }
  };

  const slideNext = useCallback(() => {
    setSlide(([prev]) => [(prev + 1) % bannerData.length, 1]);
  }, []);

  const slidePrev = useCallback(() => {
    setSlide(([prev]) => [
      (prev - 1 + bannerData.length) % bannerData.length,
      -1,
    ]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      slideNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [slideNext]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "absolute",
      transition: {
        x: { type: "spring", stiffness: 260, damping: 25 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      position: "absolute",
      transition: {
        x: { type: "spring", stiffness: 260, damping: 25 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <div className="relative w-full aspect-[5/3] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-white group">

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full h-full cursor-pointer flex items-center justify-center"
          onClick={() => handleBannerClick(bannerData[currentIndex].route)}
        >
          <img
            src={bannerData[currentIndex].image}
            alt={bannerData[currentIndex].title}
            className="w-full h-full object-contain"
            draggable={false}
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200";
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">

        <button
          onClick={(e) => {
            e.stopPropagation();
            slidePrev();
          }}
          className="p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-full text-white pointer-events-auto hover:bg-black/50 transition-all transform hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            slideNext();
          }}
          className="p-2 sm:p-3 bg-black/30 backdrop-blur-sm rounded-full text-white pointer-events-auto hover:bg-black/50 transition-all transform hover:scale-110"
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
              setSlide([idx, idx > currentIndex ? 1 : -1]);
            }}
            className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 ${
              idx === currentIndex
                ? "w-6 sm:w-10 bg-white shadow-lg"
                : "w-1.5 sm:w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}