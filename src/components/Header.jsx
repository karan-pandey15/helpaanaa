"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { 
  ChevronDown, 
  Heart, 
  ShoppingCart, 
  User, 
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SearchBar from "./HeaderScreen/SearchBar.jsx";
import CategorySlider from "./HeaderScreen/Categoryslider.jsx";
import CategoryScreen from "./HeaderScreen/CategoryScreen.jsx";
import BannerComponent from "./HeaderScreen/BannerComponent.jsx";
import Logo from "./Logo.jsx";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://api.marasimpex.com';

// ── Helpaana Brand Component ─────────────────────────────────────
const HelpaanaBrand = () => (
  <Logo size="md" light={true} />
);

// ── Main Header Component ────────────────────────────────────────
export default function Header() {
  const router = useRouter();
  const [currentAddress, setCurrentAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await Promise.all([fetchAddresses(), fetchFavoriteCount()]);
      setLoading(false);
    };
    fetchInitialData();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
      if (!token) return;

      const res = await fetch(`${BASE_URL}/user/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        const list = data.addresses || (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          const def = list.find((a) => a.isDefault);
          setCurrentAddress(def || list[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    }
  };

  const fetchFavoriteCount = () => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('user_favorites') : null;
      const favorites = raw ? JSON.parse(raw) : [];
      setFavoriteCount(favorites.length);
    } catch {
      setFavoriteCount(0);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      {/* ── Fixed Header Wrapper ───────────────────────────────── */}
      <header className="sticky top-0 z-[100] w-full">
        {/* Main Gradient Bar */}
        <div className="bg-[#457b9d] shadow-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 pt-10 pb-4">
            
            <div className="flex items-center justify-between gap-4">
              {/* Left Side: Brand & Address */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="cursor-pointer"
                  onClick={() => router.push('/')}
                >
                  <HelpaanaBrand />
                </motion.div>

                {/* Address Selector */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => router.push('/pages/addresses')}
                  className="flex flex-col items-start group max-w-[200px]"
                >
                  <div className="flex items-center gap-1 text-white/70 group-hover:text-white transition-colors">
                    <MapPin size={14} />
                    <span className="text-xs font-bold uppercase tracking-wider">Deliver to</span>
                    <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
                  </div>
                  
                  <div className="w-full truncate text-left">
                    {loading ? (
                      <div className="h-4 w-32 bg-white/20 animate-pulse rounded mt-1" />
                    ) : (
                      <p className="text-sm font-semibold text-white truncate drop-shadow-sm">
                        {currentAddress ? (
                          `${currentAddress.label || 'Home'}: ${currentAddress.street}, ${currentAddress.city}`
                        ) : (
                          "Select a delivery location"
                        )}
                      </p>
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Right Side: Action Icons */}
              <div className="flex items-center gap-2 sm:gap-4">
          
                <ActionButton 
                  icon={ShoppingCart} 
                  badge={cartCount} 
                  onClick={() => router.push('/pages/cart')}
                  label="Cart"
                  highlight
                />
                <ActionButton 
                  icon={User} 
                  onClick={() => router.push('/pages/profile')}
                  label="Profile"
                />
              </div>
            </div>

            {/* Search Bar Row */}
            <div className="mt-4">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ──────────────────────────────────── */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto">
          {/* Top Sections */}
          <div className="bg-white">
            <CategorySlider />
          </div>
         <BannerComponent />
          <div className="px-4 py-2">
            <CategoryScreen />
          </div>

          {/* Spacer for bottom padding */}
          <div className="h-20" />
        </div>
      </main>

      {/* Floating Action Button for Cart (Optional) */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110]"
          >
            <button 
              onClick={() => router.push('/pages/cart')}
              className="bg-[#1d4e6e] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 hover:scale-105 transition-transform active:scale-95"
            >
              <ShoppingCart size={20} />
              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase font-bold text-white/70 leading-none">View Cart</span>
                <span className="text-sm font-bold">{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</span>
              </div>
              <div className="w-[1px] h-8 bg-white/20 mx-1" />
              <ChevronDown size={20} className="-rotate-90" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Helper Components ──────────────────────────────────────────

const ActionButton = ({ icon: Icon, badge, onClick, label, highlight }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`relative p-2.5 rounded-2xl transition-all duration-200 group
      ${highlight ? 'bg-white/10 hover:bg-white/20' : 'hover:bg-white/10'}`}
  >
    <Icon 
      size={24} 
      className={`transition-transform duration-200 group-hover:scale-110 
        ${highlight ? 'text-yellow-400' : 'text-white'}`}
    />
    {badge > 0 && (
      <span className="absolute -top-1 -right-1 bg-[#FF0066] text-white text-[10px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center border-2 border-[#457b9d] shadow-sm">
        {badge > 99 ? '99+' : badge}
      </span>
    )}
  </button>
);