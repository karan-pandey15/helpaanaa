"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import {
  Menu, X, ShoppingCart, User, MapPin, Search,
  ChevronDown, LogOut, LogIn, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: 'Book an Attendant', path: '/pages/Attendant' },
  { name: 'Book an Guardian', path: '/pages/GuardianKids' },
  { name: 'Pet Walker', path: '/pages/petwalker' },
  { name: 'Booking for Pandit Ji', path: '/pages/Pandit' },
  { name: 'Mehndi Artist', path: '/pages/Mehndi' },
  { name: 'School Uniform & Accessories', path: '/pages/School' },
  { name: 'Healthy Food', path: '/pages/Groceries' },
  { name: 'Resort & Farmhouse Booking', path: '/pages/Hotel' },
  { name: 'Cosmetic', path: '/pages/Cosmetic' },
  { name: 'Nurse For First Aid', path: '/pages/nurse' },
  { name: 'Premium Gym MemberShip', path: '/pages/gym' },
  { name: 'Food For Patient & Tiffin Service', path: '/pages/tiffinservice' },
  { name: 'Groceries', path: '/pages/Groceries' },
  { name: 'Physiotherapist', path: '/pages/physiotherapist' },
  { name: 'Salon and Makeup', path: '/pages/Salon' },
  { name: 'Luxury Product', path: '/pages/Luxury' },
  { name: 'Fashion & LyfeStyle', path: '/pages/fashion' },
  { name: 'Pregnancy & Ladies Health Issues', path: '/pages/ladies' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
    setIsLoggedIn(!!token);
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };

  const handleLogin = () => router.push("/pages/auth");

  if (
    pathname.includes("/pages/ServiceDetail") ||
    pathname.includes("/pages/ladies") ||
    pathname.includes("/pages/Mehndi")
  ) return null;

  return (
    <>
      <header className="sticky top-0 z-50 w-full shadow-md bg-white border-b border-gray-100">
        {/* ── Main Row ── */}
        <div className="max-w-[1280px] mx-auto h-[80px] px-4 md:px-6 flex items-center justify-between gap-3 md:gap-5">

          {/* ── Logo ── */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center justify-center">
              <Image
                src="/image/helpaanaremovebglogo.png"
                alt="HelpAana Logo"
                width={160}
                height={70}
                priority
                className="object-contain"
                style={{ height: "70px", width: "auto" }}
              />
            </div>
          </Link>

          {/* ── Delivery Location (Desktop) ── */}
          <div
            className="hidden lg:flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2 transition-all duration-200 hover:bg-gray-50"
            style={{ border: "1px solid rgba(0,0,0,0.05)" }}
          >
            <MapPin size={17} className="text-[#F5A623] flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-400 leading-none uppercase tracking-widest">
                Deliver To
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[13px] font-semibold text-[#001a4d] truncate max-w-[110px]">
                  Select Location
                </span>
                <ChevronDown size={13} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* ── Search Bar (Desktop) ── */}
          <div className="hidden md:flex flex-1 max-w-[50%] relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
            <input
              type="text"
              placeholder={`Search "${categories[placeholderIndex].name}"`}
              className="w-full h-[45px] rounded-full text-sm text-gray-800 bg-gray-50 pl-10 pr-4 outline-none transition-all duration-200 border border-gray-200 focus:bg-white focus:border-[#F5A623] focus:ring-2 focus:ring-[#F5A623]/20"
            />
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Deal of the Day — desktop only */}
            <Link
              href="/pages/dealday"
              className="hidden lg:flex items-center gap-1.5 font-extrabold text-[13px] px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #F5A623 0%, #f0800a 100%)",
                color: "white",
                boxShadow: "0 4px 12px rgba(245,166,35,0.2)",
              }}
            >
              <Zap size={14} />
              Deal of the Day
            </Link>

            {/* Cart */}
            <Link
              href="/pages/cart"
              className="relative flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-gray-50"
              style={{
                width: 42, height: 42,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
            >
              <ShoppingCart size={19} className="text-[#001a4d]" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 text-[9px] font-black w-[18px] h-[18px] flex items-center justify-center rounded-full"
                  style={{
                    background: "#F5A623",
                    color: "white",
                    border: "2px solid white",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login / Logout */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 font-bold text-[13px] px-4 py-2.5 rounded-full transition-all duration-200 active:scale-95"
                style={{
                  background: "#fee2e2",
                  border: "1.5px solid #fecaca",
                  color: "#ef4444",
                }}
              >
                <LogOut size={15} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 font-bold text-[13px] px-4 py-2.5 rounded-full transition-all duration-200 active:scale-95"
                style={{
                  background: "rgba(245,166,35,0.1)",
                  border: "1.5px solid rgba(245,166,35,0.2)",
                  color: "#f0800a",
                }}
              >
                <LogIn size={15} />
                <span className="hidden sm:inline">Login</span>
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-gray-50"
              style={{
                width: 42, height: 42,
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={22} className="text-[#001a4d]" />
            </button>
          </div>
        </div>

        {/* ── Mobile Search + Deal Bar ── */}
        <div
          className="md:hidden flex items-center gap-3 px-4 py-3"
          style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={15}
            />
            <input
              type="text"
              placeholder={`Search "${categories[placeholderIndex].name}"`}
              className="w-full h-[42px] rounded-full text-[13px] text-gray-800 bg-white pl-10 pr-4 outline-none border border-gray-200 shadow-sm"
            />
          </div>
          <Link
            href="/pages/dealday"
            className="flex flex-col items-center justify-center font-extrabold rounded-full px-4 h-[42px] text-[10px] leading-tight active:scale-95 transition-transform whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #F5A623 0%, #f0800a 100%)",
              color: "white",
              boxShadow: "0 3px 10px rgba(245,166,35,0.2)",
              minWidth: 80,
            }}
          >
            <span className="uppercase tracking-tight">DEAL OF</span>
            <span className="uppercase">THE DAY ⚡</span>
          </Link>
        </div>
      </header>

      {/* ══════════════════════════════════════
          Mobile Drawer Menu
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 h-full w-[82%] max-w-[340px] z-[110] shadow-2xl flex flex-col bg-white"
            >
              {/* Drawer Header */}
              <div
                className="flex items-center justify-between px-5 py-4 border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Link href="/" className="flex-shrink-0">
                    <div className="flex items-center justify-center">
                      <Image
                        src="/image/helpaanaremovebglogo.png"
                        alt="HelpAana Logo"
                        width={120}
                        height={50}
                        priority
                        className="object-contain"
                        style={{ height: "70px", width: "auto" }}
                      />
                    </div>
                  </Link>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl text-gray-400 hover:text-[#001a4d] transition-colors bg-gray-50 border border-gray-100"
                  style={{ width: 36, height: 36 }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Services List */}
              <div className="flex-1 overflow-y-auto py-3 px-3" style={{ scrollbarWidth: "none" }}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[2.5px] px-3 mb-3">
                  Our Services
                </p>
                <nav className="flex flex-col gap-0.5">
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href={cat.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between py-3 px-4 rounded-xl text-gray-600 font-medium text-[13.5px] transition-all duration-150 hover:bg-gray-50 hover:text-[#001a4d] group border-b border-gray-50"
                    >
                      {cat.name}
                      <ChevronDown
                        size={13}
                        className="-rotate-90 text-gray-300 group-hover:text-[#F5A623] transition-colors"
                      />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Drawer Footer */}
              <div
                className="p-4 space-y-3 border-t border-gray-100"
              >
                <Link
                  href="/pages/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl transition-all bg-gray-50 border border-gray-100"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #001a4d, #004090)" }}
                  >
                    <User size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-[#001a4d] text-[14px]">My Account</p>
                    <p className="text-[11px] text-gray-400">View & Edit Profile</p>
                  </div>
                </Link>

                {isLoggedIn ? (
                  <button
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-[14px] active:scale-95 transition-transform bg-red-500 text-white shadow-sm"
                  >
                    <LogOut size={17} /> Logout
                  </button>
                ) : (
                  <button
                    onClick={() => { handleLogin(); setIsMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-[14px] active:scale-95 transition-transform shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #F5A623 0%, #f0800a 100%)",
                      color: "white",
                    }}
                  >
                    <LogIn size={17} /> Login
                  </button>
                )}

                <button
                  onClick={() => { router.push("/pages/dealday"); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-[14px] active:scale-95 transition-transform text-[#001a4d] bg-gray-50 border border-gray-100"
                >
                  <Zap size={16} className="text-[#F5A623]" />
                  Deal of the Day
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}