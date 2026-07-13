"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.marasappnew&hl=en_IN";

const STORAGE_KEY = "helpaana_app_banner_dismissed";

export default function AppDownloadBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setVisible(false);
      }
    } catch {
      /* keep visible */
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Download Helpaana app"
      className="w-full border-b border-black/5 bg-white"
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-2.5 px-3 py-2.5 sm:gap-3.5 sm:px-5 sm:py-3 md:px-6">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss app download banner"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[#5a6a72] transition-colors hover:bg-gray-100 hover:text-[#1898A5]"
        >
          <X size={18} strokeWidth={2.25} />
        </button>

        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border-2 border-white bg-[#0d5560] shadow-sm sm:h-10 sm:w-10"
          aria-hidden="true"
        >
          <span className="text-base font-black leading-none text-white sm:text-lg">
            H
          </span>
        </div>

        <p className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-[#2d3a40] sm:text-sm md:text-[15px]">
          <span className="sm:hidden">
            Book home services faster on the Helpaana app
          </span>
          <span className="hidden sm:inline">
            Get the best deals on mehndi, elder care &amp; 15+ home services —
            only on the Helpaana app
          </span>
        </p>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 rounded-lg bg-[#1898A5] px-3.5 py-2 text-[12px] font-bold tracking-wide text-white shadow-sm transition-all hover:bg-[#147a88] active:scale-95 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-[13px]"
        >
          Get App
        </a>
      </div>
    </div>
  );
}
