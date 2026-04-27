"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
//  pandit ji , food service, mehndi artish 
const bannerData = [
  {
    id: 1,
    mobileImage: "/image/bannerphone/1.png",
    desktopImage: "/image/banners/1.png",
    route: "/pages/GuardianKids",
    title: "Book Guardian For Kids",
  },
  {
    id: 2,
    mobileImage: "/image/bannerphone/2.png",
    desktopImage: "/image/banners/2.png",
    route: "/pages/tiffinservice",
    title: "Professional Tiffin Service",
  },
  {
    id: 3,
    mobileImage: "/image/bannerphone/3.png",
    desktopImage: "/image/banners/3.png",
    route: "/pages/Pandit",
    title: "Expert Pandit Ji",
  },
  {
    id: 4,
    mobileImage: "/image/bannerphone/4.png",
    desktopImage: "/image/banners/4.png",
    route: "/pages/Mehndi",
    title: "Mehndi Artist  ",
  },  
  
  {
    id: 5,
    mobileImage: "/image/bannerphone/5.png",
    desktopImage: "/image/banners/5.png",
    route: "",
    title: "",
  },  

  
  {
    id: 6,
    mobileImage: "/image/bannerphone/6.png",
    desktopImage: "/image/banners/6.png",
    route: "/",
    title: " ",
  },  
    {
    id: 6,
    mobileImage: "/image/bannerphone/6.png",
    desktopImage: "/image/banners/6.png",
    route: "/",
    title: " ",
  },  
];

// ─────────────────────────────────────────────────────────────────
// HOOK – detect mobile vs desktop (SSR-safe)
// ─────────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

// ─────────────────────────────────────────────────────────────────
// SLIDE ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 28 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (dir) => ({
    x: dir < 0 ? "100%" : "-100%",
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 280, damping: 28 },
      opacity: { duration: 0.25 },
    },
  }),
};

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function BannerComponent() {
  const router = useRouter();
  const isMobile = useIsMobile(768);
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const autoplayRef = useRef(null);

  // ── navigation helpers ────────────────────────────────────────
  const slideNext = useCallback(() => {
    setSlide(([prev]) => [(prev + 1) % bannerData.length, 1]);
  }, []);

  const slidePrev = useCallback(() => {
    setSlide(([prev]) => [(prev - 1 + bannerData.length) % bannerData.length, -1]);
  }, []);

  const goTo = useCallback((idx) => {
    setSlide(([prev]) => [idx, idx > prev ? 1 : -1]);
  }, []);

  // ── autoplay ──────────────────────────────────────────────────
  const resetAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(slideNext, 5000);
  }, [slideNext]);

  useEffect(() => {
    resetAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [resetAutoplay]);

  // ── click handler ─────────────────────────────────────────────
  const handleClick = (route) => {
    if (!route || route === "#") return;
    if (route.startsWith("http")) window.open(route, "_blank");
    else router.push(route);
  };

  // ── current slide ─────────────────────────────────────────────
  const slide = bannerData[currentIndex];
  const imageSrc = isMobile
    ? slide.mobileImage || slide.desktopImage
    : slide.desktopImage || slide.mobileImage;

  const isClickable = slide.route && slide.route !== "#";

  // ─────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────
  return (
    <section
      aria-label="Promotional banner"
      className="relative w-full group"
      style={{
        /*
         * NO fixed aspect-ratio on the container.
         * The <img> inside uses width:100% + height:auto so it
         * drives the container height naturally — the full image
         * is ALWAYS shown with zero cropping or zoom.
         */
        backgroundColor: "#f3f4f6",
        overflow: "hidden",
      }}
    >
      {/* ── Animated slide wrapper ───────────────────────────────── */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          onClick={() => handleClick(slide.route)}
          style={{
            cursor: isClickable ? "pointer" : "default",
            /*
             * IMPORTANT: position relative (NOT absolute) so the
             * wrapper grows with the image height.
             * Using absolute here was the root cause of the zoom —
             * it forced a fixed-height box that clipped the image.
             */
            position: "relative",
            width: "100%",
          }}
        >
          {/*
           * THE FIX:
           *   width: 100%   → fills banner width on every screen
           *   height: auto  → height follows the image's real ratio
           *   display: block → removes inline baseline whitespace gap
           *
           * This means the image NEVER gets cropped, zoomed, or
           * letterboxed. It just displays at its natural proportion.
           */}
          <img
            src={imageSrc}
            alt={slide.title || "Banner"}
            draggable={false}
            // onError={(e) => {
            //   e.currentTarget.src =
            //     "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600";
            // }}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              userSelect: "none",
              WebkitUserDrag: "none",
            }}
          />

          {/* Gradient at bottom keeps dots readable over any image */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "linear-gradient(to top, rgba(0,0,0,0.38), transparent)",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Prev / Next arrows ──────────────────────────────────── */}
      <div
        aria-hidden
        className="
          absolute inset-0
          flex items-center justify-between
          px-3 sm:px-5
          pointer-events-none
          opacity-100 md:opacity-0 md:group-hover:opacity-100
          transition-opacity duration-300
        "
      >
        <NavButton onClick={() => { slidePrev(); resetAutoplay(); }} dir="prev" />
        <NavButton onClick={() => { slideNext(); resetAutoplay(); }} dir="next" />
      </div>

      {/* ── Dot indicators ──────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          zIndex: 10,
        }}
      >
        {bannerData.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              goTo(idx);
              resetAutoplay();
            }}
            style={{
              borderRadius: "999px",
              height: "8px",
              width: idx === currentIndex ? "32px" : "8px",
              background:
                idx === currentIndex
                  ? "rgba(255,255,255,1)"
                  : "rgba(255,255,255,0.45)",
              boxShadow:
                idx === currentIndex
                  ? "0 0 8px rgba(255,255,255,0.7)"
                  : "none",
              transition: "all 0.3s ease",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      {/* ── Slide counter (desktop only) ────────────────────────── */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "12px",
          right: "16px",
          color: "rgba(255,255,255,0.85)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textShadow: "0 1px 4px rgba(0,0,0,0.5)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {String(currentIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;
        {String(bannerData.length).padStart(2, "0")}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// NAV ARROW BUTTON
// ─────────────────────────────────────────────────────────────────
function NavButton({ onClick, dir }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      style={{
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "rgba(0,0,0,0.28)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.25)",
        color: "#fff",
        cursor: "pointer",
        transition: "background 0.2s, transform 0.15s",
        boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(0,0,0,0.52)";
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(0,0,0,0.28)";
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
    >
      {dir === "prev" ? (
        <ChevronLeft style={{ width: 22, height: 22 }} />
      ) : (
        <ChevronRight style={{ width: 22, height: 22 }} />
      )}
    </button>
  );
}