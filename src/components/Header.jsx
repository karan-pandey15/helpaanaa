"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { 
  Menu, 
  X, 
  ShoppingCart, 
  User, 
  MapPin, 
  Search, 
  ChevronDown 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

const categories = [
  { name: "Attendant For Parents", path: "/pages/Attendant" },
  { name: "Guardian For Kids", path: "/pages/GuardianKids" },
  { name: "Pet Walker", path: "/pages/petwalker" },
  { name: "Booking for Pandit Ji", path: "/pages/Pandit" },
  { name: "Mehndi Artist", path: "/pages/Mehndi" },
  { name: "School Uniform & Accessories", path: "/pages/School" },
  { name: "Healthy Food", path: "/pages/Groceries" },
  { name: "Hotel & Resort Booking", path: "/pages/Hotel" },
  { name: "Cosmetic", path: "/pages/Cosmetic" },
  { name: "Nurse For First Aid", path: "/pages/nurse" },
  { name: "Gym MemberShip", path: "/pages/Gym" },
  { name: "Tiffin Service", path: "/pages/tiffinservice" },
  { name: "Groceries", path: "/pages/Groceries" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % categories.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#1B6B7B] text-white shadow-md">
        <div className="max-w-[1280px] mx-auto h-[60px] md:h-[70px] px-4 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="sm" className="sm:scale-110" />
          </Link>

          {/* Delivery Location (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 cursor-pointer hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">
            <MapPin size={18} className="text-[#F5A623]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/70 leading-none">DELIVER TO</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold truncate max-w-[120px]">Select Location</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {/* Search Bar (Center) */}
          <div className="hidden md:flex flex-1 max-w-[60%] relative group">
            <input 
              type="text" 
              placeholder={`Search for "${categories[placeholderIndex].name}"`}
              className="w-full bg-white text-gray-800 h-10 px-10 rounded-full text-sm outline-none focus:ring-2 focus:ring-[#F5A623] transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link href="/pages/ShopFresh" className="hidden lg:block bg-[#F5A623] text-[#1B6B7B] font-bold px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform active:scale-95 shadow-lg">
              Deal Of the Day
            </Link>

            <Link href="/pages/cart" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#F5A623] text-[#1B6B7B] text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1B6B7B]">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link href="/pages/profile" className="hidden sm:block p-2 hover:bg-white/10 rounded-full transition-colors">
              <User size={22} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-1 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (Only on Mobile) */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder={`Search for "${categories[placeholderIndex].name}"`}
              className="w-full bg-white text-gray-800 h-10 px-10 rounded-full text-sm outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-[320px] bg-white z-[110] shadow-2xl p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <Logo size="sm" className="brightness-0" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-800">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Our Services</p>
                <nav className="flex flex-col gap-1">
                  {categories.map((cat, idx) => (
                    <Link 
                      key={idx} 
                      href={cat.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-3 px-4 rounded-xl text-gray-700 font-medium hover:bg-[#1B6B7B]/10 hover:text-[#1B6B7B] transition-all flex items-center justify-between group"
                    >
                      {cat.name}
                      <ChevronDown size={14} className="-rotate-90 text-gray-300 group-hover:text-[#1B6B7B]" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t mt-auto">
                <Link 
                  href="/pages/profile" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors mb-4"
                >
                  <div className="w-10 h-10 bg-[#1B6B7B] rounded-full flex items-center justify-center text-white">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">My Account</p>
                    <p className="text-xs text-gray-500">View & Edit Profile</p>
                  </div>
                </Link>
                <button className="w-full bg-[#F5A623] text-[#1B6B7B] font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
                  Shop Fresh Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
