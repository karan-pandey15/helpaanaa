'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Zap, ChevronDown, Heart, ShoppingCart, User, RefreshCw
} from 'lucide-react';
import SearchBar from './HeaderScreen/SearchBar.jsx';
import CategorySlider from './HeaderScreen/Categoryslider.jsx';
// import BannerComponent from './BannerComponent';
import CategoryScreen from './HeaderScreen/CategoryScreen.jsx';
// import CartButton from './CartButton';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-api.com';

export default function Header() {
  const router = useRouter();
  const categoryRef = useRef(null);

  const [currentAddress, setCurrentAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    fetchAddresses();
    fetchFavoriteCount();
    fetchCartCount();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) { setLoading(false); return; }

      const res = await fetch(`${BASE_URL}/user/addresses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.ok) {
        const list = data.addresses || (Array.isArray(data) ? data : []);
        setAddresses(list);
        if (list.length > 0) {
          const def = list.find(a => a.isDefault);
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

  const fetchCartCount = () => {
    try {
      const raw = localStorage.getItem('cart_items');
      const items = raw ? JSON.parse(raw) : [];
      setCartCount(items.length);
    } catch {
      setCartCount(0);
    }
  };

 

  return (
    <div className="flex flex-col h-screen bg-white">

      {/* ── Fixed Header ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-[#457b9d]">
        <div className="flex items-center justify-between px-4 pt-10 pb-3">

          {/* Left: time + address */}
          <div className="flex-1 mr-3">
            <div className="flex items-center gap-1 mb-1">
              <Zap size={22} className="text-black fill-black" />
              <span className="text-xl font-bold text-black">16 minutes</span>
            </div>

            <button
              onClick={() => router.push('/address')}
              className="flex items-center gap-1 w-full text-left"
            >
              <div className="flex-1 min-w-0">
                {loading ? (
                  <div className="h-3.5 w-36 bg-white/30 rounded animate-pulse" />
                ) : currentAddress ? (
                  <p className="text-[13px] text-black opacity-80 truncate">
                    <span className="font-semibold opacity-100">
                      {currentAddress.label || 'Home'} –
                    </span>{' '}
                    {currentAddress.street}, {currentAddress.city}, {currentAddress.state}...
                  </p>
                ) : (
                  <p className="text-[13px] font-semibold text-black">Select Address</p>
                )}
              </div>
              <ChevronDown size={20} className="text-black flex-shrink-0" />
            </button>
          </div>

          {/* Right: icons */}
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/favorites')} className="relative p-1">
              <Heart size={24} className="text-black" />
              {favoriteCount > 0 && <Badge count={favoriteCount} />}
            </button>

            <button onClick={() => router.push('/cart')} className="relative p-1">
              <ShoppingCart size={24} className="text-black" />
              {cartCount > 0 && <Badge count={cartCount} />}
            </button>

            <button onClick={() => router.push('/profile')} className="p-1">
              <User size={24} className="text-black" />
            </button>
          </div>
        </div>

        <SearchBar />
      </div>

      {/* ── Scrollable Content ───────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
   

         <CategorySlider />
       
      <CategoryScreen /> 
       {/*  <BannerComponent />
      */}
        <div className="h-24" />
      </div>

      {/* <CartButton /> */}
    </div>
  );
}

function Badge({ count }) {
  return (
    <span className="absolute -top-1.5 -right-1.5 bg-[#FF0066] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5">
      {count}
    </span>
  );
}