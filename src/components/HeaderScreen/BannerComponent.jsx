"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mobileBannerFiles = [
  "10.png",
  "11.png",
  "12.png",
  "13.png",
  "cosmeticbanner.png",
  "ecommercebanner.png",
  "fashionbanner.png",
  "gaurdiankidsbanner.png",
  "gymbanner.png",
  "healthcarebanner.png",
  "healthcarebannerwebsite.png",
  "healthyfoodbanner.png",
  "healthyfoodbannerwebsitee.png",
  "helpaanacopasserngerbannerimage.png",
  "helpaanacopessangerbanner.png",
  "helpaanafoodservicebanner.png",
  "helpaanagroceriesbanner.png",
  "helpaanaphybanner.png",
  "helpaanapregancybanner.png",
  "luxurybanner.png",
  "mehndibanner.png",
  "panditjibanner.png",
  "petwalkerbanner.png",
  "resortbanner.png",
  "shoolbanner.png",
];

const desktopBannerFiles = [
  "copassengerbannerwebsite.png",
  "copessangerbannerwebsite.png",
  "cosmeticbannerwebsite.png",
  "ecommercebannerwebsite.png",
  "farmhousebannerwebsite.png",
  "fashionbannerwebsite.png",
  "foodservicebannerwebsite.png",
  "gaurdiankidsbannerwebsite.png",
  "groceriesbannerwebsite.png",
  "healthcarebannerwebsite.png",
  "healthyfoodbannerwebsitee.png",
  "luxurybannerwebsite.png",
  "mehndiartisbannerwebsite.png",
  "panditjibannerwebsite.png",
  "petwalkerbannerwebsite.png",
  "physiotherapistbannerwebsite.png",
  "pregancybannerwebsite.png",
  "premiumgymbannerwebsite.png",
  "salonmakeupbannerwebsite.png",
  "schooluniformbannerwebsite.png",
];

const normalizeBannerKey = (file) =>
  file
    .toLowerCase()
    .replace(".png", "")
    .replace(/websitee?/g, "")
    .replace("bannerimage", "banner")
    .replace("helpaana", "")
    .replace("copassenger", "copessanger")
    .replace("foodservice", "food")
    .replace("groceries", "grocery")
    .replace("physiotherapist", "phy")
    .replace("pregancy", "pregnancy")
    .replace("mehndiartis", "mehndi")
    .replace("premiumgym", "gym")
    .replace("schooluniform", "shool")
    .replace("farmhouse", "resort")
    .replace("salonmakeup", "cosmetic");

const desktopFileByKey = new Map(
  desktopBannerFiles.map((file) => [normalizeBannerKey(file), file]),
);

const usedDesktopFiles = new Set();
const pairedBanners = mobileBannerFiles.map((mobileFile) => {
  const desktopFile = desktopFileByKey.get(normalizeBannerKey(mobileFile)) || null;
  if (desktopFile) usedDesktopFiles.add(desktopFile);
  return { mobileFile, desktopFile };
});

const desktopOnlyBanners = desktopBannerFiles
  .filter((desktopFile) => !usedDesktopFiles.has(desktopFile))
  .map((desktopFile) => ({ mobileFile: null, desktopFile }));

const bannerData = [...pairedBanners, ...desktopOnlyBanners].map(
  ({ mobileFile, desktopFile }, idx) => ({
    id: idx + 1,
    mobileImage: mobileFile ? `/image/bannerphone/${mobileFile}` : null,
    desktopImage: desktopFile ? `/image/banners/${desktopFile}` : null,
    route: "",
    title: "",
  }),
);

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
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function BannerComponent({ bannerIds = null }) {
  const router = useRouter();
  const isMobile = useIsMobile(768);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedSrc, setDisplayedSrc] = useState("");
  const [incomingSrc, setIncomingSrc] = useState(null);
  const [incomingVisible, setIncomingVisible] = useState(false);
  const autoplayRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const filteredBanners = Array.isArray(bannerIds) && bannerIds.length > 0
    ? bannerData.filter((banner) => bannerIds.includes(banner.id))
    : bannerData;
  const safeBanners = filteredBanners.length > 0 ? filteredBanners : bannerData;

  // ── navigation helpers ────────────────────────────────────────
  const slideNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % safeBanners.length);
  }, [safeBanners.length]);

  const slidePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + safeBanners.length) % safeBanners.length);
  }, [safeBanners.length]);

  const goTo = useCallback((idx) => {
    setCurrentIndex(idx);
  }, []);

  // ── autoplay ──────────────────────────────────────────────────
  const resetAutoplay = useCallback(() => {
    clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(slideNext, 5000);
  }, [slideNext]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [safeBanners.length]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      clearInterval(autoplayRef.current);
      clearTimeout(transitionTimeoutRef.current);
    };
  }, [resetAutoplay]);

  // ── click handler ─────────────────────────────────────────────
  const handleClick = (route) => {
    if (!route || route === "#") return;
    if (route.startsWith("http")) window.open(route, "_blank");
    else router.push(route);
  };

  // ── current slide ─────────────────────────────────────────────
  const slide = safeBanners[currentIndex];
  const imageSrc = isMobile
    ? slide.mobileImage || slide.desktopImage
    : slide.desktopImage || slide.mobileImage;

  useEffect(() => {
    if (!imageSrc) return;
    if (!displayedSrc) {
      setDisplayedSrc(imageSrc);
      return;
    }
    if (imageSrc === displayedSrc) return;

    const preloaded = new window.Image();
    preloaded.src = imageSrc;
    preloaded.onload = () => {
      setIncomingSrc(imageSrc);
      requestAnimationFrame(() => setIncomingVisible(true));
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = setTimeout(() => {
        setDisplayedSrc(imageSrc);
        setIncomingSrc(null);
        setIncomingVisible(false);
      }, 420);
    };
  }, [imageSrc, displayedSrc]);

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
      <div
        onClick={() => handleClick(slide.route)}
        style={{
          cursor: isClickable ? "pointer" : "default",
          position: "relative",
          width: "100%",
        }}
      >
        {displayedSrc && (
          <img
            src={displayedSrc}
            alt={slide.title || "Banner"}
            draggable={false}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxWidth: "100%",
              userSelect: "none",
              WebkitUserDrag: "none",
            }}
          />
        )}

        {incomingSrc && (
          <img
            src={incomingSrc}
            alt={slide.title || "Banner"}
            draggable={false}
            style={{
              position: "absolute",
              inset: 0,
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              maxWidth: "100%",
              userSelect: "none",
              WebkitUserDrag: "none",
              opacity: incomingVisible ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />
        )}

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
      </div>

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

      {/* Dot indicators and slide counter intentionally removed */}
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