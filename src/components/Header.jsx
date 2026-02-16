'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  ChevronDown, Heart, ShoppingCart, User
} from 'lucide-react';
import SearchBar from './HeaderScreen/SearchBar.jsx';
import CategorySlider from './HeaderScreen/Categoryslider.jsx';
import CategoryScreen from './HeaderScreen/CategoryScreen.jsx';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-api.com';

// ── Helpaana Logo SVG Component ──────────────────────────────────
function HelpaanaLogo({ size = 'md' }) {
  const scales = {
    sm: { width: 110, height: 28, font: 15 },
    md: { width: 136, height: 34, font: 19 },
    lg: { width: 170, height: 42, font: 24 },
  };
  const s = scales[size] || scales.md;

  return (
    <svg
      width={s.width}
      height={s.height}
      viewBox="0 0 136 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Helpaana"
    >
      <defs>
        {/* Main gradient for letter fill */}
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="55%" stopColor="#e0f0ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffd166" stopOpacity="1" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Drop shadow */}
        <filter id="shadow" x="-5%" y="-5%" width="115%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#0a3a5e" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Background pill */}
      <rect
        x="0" y="2" width="136" height="30"
        rx="8"
        fill="rgba(255,255,255,0.10)"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="0.8"
      />

      {/* Bolt icon accent */}
      <g transform="translate(6, 6)">
        {/* Lightning bolt shape */}
        <polygon
          points="12,2 6,13 11,13 8,24 18,10 12,10 15,2"
          fill="url(#logoGrad)"
          filter="url(#glow)"
          opacity="0.95"
        />
        <polygon
          points="12,2 6,13 11,13 8,24 18,10 12,10 15,2"
          fill="none"
          stroke="#ffd166"
          strokeWidth="0.6"
          opacity="0.6"
        />
      </g>

      {/* Wordmark: "Helpaana" */}
      <text
        x="28"
        y="23.5"
        fontFamily="'Georgia', 'Playfair Display', serif"
        fontWeight="800"
        fontSize="19"
        letterSpacing="-0.5"
        fill="url(#logoGrad)"
        filter="url(#shadow)"
      >
        Helpaana
      </text>

      {/* Underline accent stroke */}
      <line
        x1="28" y1="27"
        x2="131" y2="27"
        stroke="url(#logoGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* Small dot accent at end */}
      <circle cx="133" cy="27" r="1.5" fill="#ffd166" opacity="0.8" />
    </svg>
  );
}

// ── Address Block ────────────────────────────────────────────────
function AddressBlock({ loading, currentAddress, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 w-full text-left group mt-1"
      aria-label="Change delivery address"
    >
      <div className="flex-1 min-w-0">
        {loading ? (
          <div className="h-3 w-36 bg-white/25 rounded-full animate-pulse" />
        ) : currentAddress ? (
          <p className="text-[11.5px] text-white/85 truncate leading-tight">
            <span className="font-semibold text-white/95">
              {currentAddress.label || 'Home'}
            </span>
            <span className="text-white/50 mx-1">·</span>
            <span>
              {currentAddress.street}, {currentAddress.city}
            </span>
          </p>
        ) : (
          <p className="text-[11.5px] font-semibold text-yellow-300 group-hover:text-yellow-200 transition-colors">
            + Add delivery address
          </p>
        )}
      </div>
      <ChevronDown
        size={14}
        className="text-white/70 flex-shrink-0 group-hover:text-white transition-colors mt-px"
      />
    </button>
  );
}

// ── Icon Button ──────────────────────────────────────────────────
function IconButton({ icon: Icon, onClick, badge, label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="relative p-1.5 rounded-xl hover:bg-white/15 active:scale-90 transition-all duration-150"
    >
      <Icon size={22} className="text-white drop-shadow-sm" />
      {badge > 0 && <Badge count={badge} />}
    </button>
  );
}

// ── Badge ────────────────────────────────────────────────────────
function Badge({ count }) {
  return (
    <span className="absolute -top-1 -right-1 bg-[#FF0066] text-white text-[9px] font-bold rounded-full min-w-[15px] h-[15px] flex items-center justify-center px-0.5 shadow-md border border-[#457b9d]/40">
      {count > 99 ? '99+' : count}
    </span>
  );
}

// ── Main Header ──────────────────────────────────────────────────
export default function Header() {
  const router = useRouter();

  const [currentAddress, setCurrentAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    fetchAddresses();
    fetchFavoriteCount();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) { setLoading(false); return; }

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
    } finally {
      setLoading(false);
    }
  };

  const fetchFavoriteCount = () => {
    try {
      const raw = localStorage.getItem('user_favorites');
      const favorites = raw ? JSON.parse(raw) : [];
      setFavoriteCount(favorites.length);
    } catch {
      setFavoriteCount(0);
    }
  };

  return (
    <div className="flex flex-col bg-white">

      {/* ── Sticky Header Bar ──────────────────────────────────── */}
      <div className="sticky top-0 z-50">

        {/* Gradient background with subtle noise texture */}
        <div
          className="relative"
          style={{
            background: 'linear-gradient(135deg, #1d4e6e 0%, #457b9d 55%, #2c6a8a 100%)',
            boxShadow: '0 4px 20px rgba(29, 78, 110, 0.35)',
          }}
        >
          {/* Decorative top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] opacity-60"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, #ffd166 30%, #fff 60%, transparent 100%)',
            }}
          />

          {/* Header content */}
          <div className="flex items-center justify-between px-4 pt-10 pb-2.5">

            {/* Left: Logo + Address */}
            <div className="flex-1 mr-3">
              {/* Logo */}
              <div className="flex items-center">
                <HelpaanaLogo size="md" />
              </div>

              {/* Address */}
              <AddressBlock
                loading={loading}
                currentAddress={currentAddress}
                onClick={() => router.push('/address')}
              />
            </div>

            {/* Right: Action icons */}
            <div className="flex items-center gap-0.5">
              <IconButton
                icon={Heart}
                label="Favourites"
                badge={favoriteCount}
                onClick={() => router.push('/favorites')}
              />
              <IconButton
                icon={ShoppingCart}
                label="Cart"
                badge={cartCount}
                onClick={() => router.push('/cart')}
              />
              <IconButton
                icon={User}
                label="Profile"
                onClick={() => router.push('/pages/profile')}
              />
            </div>
          </div>

          {/* Search bar sits flush inside the header gradient */}
          <div className="pb-3 px-4">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* ── Below-the-fold scrollable content ──────────────────── */}
      <div className="flex-1">
        <CategorySlider />
        <CategoryScreen />
        <div className="h-24" />
      </div>
    </div>
  );
}