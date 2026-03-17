"use client";

import React from "react";
import BannerComponent from "@/components/HeaderScreen/BannerComponent";
import CategoryScreen from "@/components/HeaderScreen/CategoryScreen";
import CategorySlider from "@/components/HeaderScreen/Categoryslider";
import { CheckCircle, Zap, ShieldCheck } from "lucide-react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.marasappnew&hl=en_IN";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* 1. TOP CATEGORY SLIDER */}
      <section className="w-full">
        <CategorySlider />
      </section>

      {/* 2. HERO BANNER */}
      <section className="w-full">
        <BannerComponent />
      </section>

      {/* 3. TRENDING CATEGORIES GRID */}
      <section className="py-8 md:py-16">
        <CategoryScreen />
      </section>

      {/* ══════════════════════════════════════════
          4. APP DOWNLOAD BANNER
      ══════════════════════════════════════════ */}
      <section className="py-10 px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#004090] via-[#166372] to-[#0f4a56] shadow-2xl">

          {/* ── decorative blobs ── */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-yellow-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="pointer-events-none absolute top-1/2 -left-10 w-44 h-44 rounded-full bg-[#F5A623]/10 blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 p-8 md:p-14">

            {/* ── LEFT: copy + CTA ── */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl w-full">

              {/* badge */}
              <span className="mb-5 self-center md:self-start inline-flex items-center gap-1.5 bg-yellow-400 text-[#004090] text-[11px] font-black px-4 py-1.5 rounded-full shadow">
                <span className="w-1.5 h-1.5 rounded-full bg-[#004090] animate-pulse" />
                ANDROID APP IS LIVE • IOS USERS USE WEB
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
                Get the{" "}
                <span className="text-yellow-400">Helpaana</span> Experience —{" "}
                <br className="hidden md:block" />
                On Android
              </h2>

              <p className="text-white/75 text-base md:text-lg mb-7 leading-relaxed font-medium">
                Book attendants, pandits, pet walkers, nurses &amp; 10+ premium
                services in under 30 seconds. Download our Android app or use our 
                seamless mobile website for iOS.
              </p>

              {/* feature pills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                {["Free Download", "iOS Web Support", "Instant Booking", "24/7 Support"].map((f) => (
                  <span
                    key={f}
                    className="bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* ── Google Play button ── */}
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 bg-black hover:bg-gray-900 active:scale-95 text-white px-6 py-3.5 rounded-2xl shadow-2xl transition-all duration-200 hover:scale-105 w-fit"
                >
                  <svg viewBox="0 0 512 512" className="w-8 h-8 flex-shrink-0">
                    <linearGradient id="gp1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00C6FF"/>
                      <stop offset="100%" stopColor="#0072FF"/>
                    </linearGradient>
                    <linearGradient id="gp2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD200"/>
                      <stop offset="100%" stopColor="#F7971E"/>
                    </linearGradient>
                    <linearGradient id="gp3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF416C"/>
                      <stop offset="100%" stopColor="#FF4B2B"/>
                    </linearGradient>
                    <linearGradient id="gp4" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#56AB2F"/>
                      <stop offset="100%" stopColor="#A8E063"/>
                    </linearGradient>
                    <path fill="url(#gp4)" d="M64 32C46.3 32 32 46.3 32 64v176l220-208L64 32Z"/>
                    <path fill="url(#gp1)" d="M32 240v208c0 17.7 14.3 32 32 32l188-240L32 240Z"/>
                    <path fill="url(#gp3)" d="M420 224l-68-40-120 56 120 56 68-40c19-11 19-21 0-32Z"/>
                    <path fill="url(#gp2)" d="M252 280 64 480h188l68-40 68-40-128-120Z"/>
                    <path fill="url(#gp1)" d="M252 232 64 32l188 0 128 120-128 80Z"/>
                  </svg>
                  <div className="flex flex-col leading-tight text-left">
                    <span className="text-[10px] text-gray-400 font-normal uppercase tracking-wider">Get it on</span>
                    <span className="text-[18px] font-bold tracking-wide">Google Play</span>
                  </div>
                </a>

                <div className="hidden sm:block w-px h-12 bg-white/20" />

                {/* ── iOS / Web Link ── */}
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-white/50 text-[10px] uppercase tracking-wider font-bold mb-1">For iOS Users</span>
                  <a 
                    href="https://helpaana.com" 
                    className="group flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
                  >
                    <span className="text-lg font-bold">Visit Helpaana.com</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>

              <p className="mt-6 text-white/40 text-[10px] uppercase tracking-widest font-bold">
                Android 5.0+ · iOS via Browser · Secure & Encrypted
              </p>
            </div>

            {/* ── RIGHT: phone mockup ── */}
            <div className="relative flex-shrink-0 flex items-end justify-center pb-4">

              {/* glow behind phone */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-52 h-52 md:w-64 md:h-64 rounded-full bg-yellow-400/20 blur-3xl" />
              </div>

              {/* phone frame */}
              <div className="relative w-44 h-[340px] md:w-52 md:h-[400px] rounded-[2.5rem] border-[5px] border-white/20 bg-gray-950 shadow-[0_30px_80px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col">

                {/* status bar */}
                <div className="h-7 bg-black flex items-center justify-center flex-shrink-0">
                  <div className="w-16 h-3.5 bg-gray-800 rounded-full" />
                </div>

                {/* screen */}
                <div className="flex-1 bg-gradient-to-b from-[#1e7a8c] to-[#0f4a56] flex flex-col items-center px-3 pt-5 pb-4 gap-3 overflow-hidden">

                  {/* app logo */}
                  <div className="w-14 h-14 bg-white rounded-[1.1rem] flex items-center justify-center shadow-xl">
                    <span className="text-3xl font-black text-[#004090]">H</span>
                  </div>
                  <p className="text-white text-[11px] font-black tracking-[0.2em]">HELPAANA</p>
                  <p className="text-yellow-400 text-[8px] font-bold tracking-widest -mt-1">PREMIUM SERVICES</p>

                  {/* search bar mock */}
                  <div className="w-full bg-white/15 rounded-xl px-3 py-2 mt-1">
                    <p className="text-white/50 text-[9px]">🔍 Search for a service...</p>
                  </div>

                  {/* service icons grid */}
                  <div className="grid grid-cols-3 gap-1.5 w-full">
                    {[
                      { e: "👴", l: "Attendant" },
                      { e: "🐾", l: "Pet Walk" },
                      { e: "🪔", l: "Pandit Ji" },
                      { e: "💄", l: "Cosmetic" },
                      { e: "🏨", l: "Hotel" },
                      { e: "🥗", l: "Food" },
                    ].map(({ e, l }) => (
                      <div key={l} className="bg-white/10 rounded-xl flex flex-col items-center justify-center py-2 gap-0.5">
                        <span className="text-base leading-none">{e}</span>
                        <span className="text-white/70 text-[7px] font-semibold">{l}</span>
                      </div>
                    ))}
                  </div>

                  {/* mock book button */}
                  <div className="w-full bg-yellow-400 rounded-xl py-2.5 text-center mt-auto shadow">
                    <span className="text-[#004090] text-[11px] font-black tracking-wide">BOOK NOW →</span>
                  </div>
                </div>

                {/* home bar */}
                <div className="h-6 bg-black flex items-center justify-center">
                  <div className="w-20 h-1 bg-gray-700 rounded-full" />
                </div>
              </div>

              {/* floating rating chip */}
              <div className="absolute -bottom-2 -left-4 md:-left-10 bg-white rounded-2xl shadow-2xl px-4 py-2.5 flex items-center gap-2">
                <span className="text-yellow-400 text-xl leading-none">★</span>
                <div>
                  <p className="text-gray-800 font-black text-sm leading-none">4 / 5</p> 
                </div>
              </div>

              {/* floating downloads chip */}
            
            </div>

          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-12 md:py-20 bg-gray-50/50">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: <CheckCircle size={32} />,
                title: "Verified Professionals",
                desc: "Background checked and trained experts for every service, ensuring safety and quality.",
              },
              {
                icon: <Zap size={32} />,
                title: "Fast Booking",
                desc: "Book any service in under 30 seconds with instant confirmation and real-time tracking.",
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Safe & Trusted",
                desc: "Insured services with 100% money back guarantee and 24/7 dedicated support.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#004090]/10 flex items-center justify-center text-[#004090]">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}