'use client';
import React from 'react';
import { Search, Heart, ShoppingCart, User, MapPin, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-[#2a84a2] text-white p-4 space-y-4 rounded-b-[20px]">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
             {/* Icon placeholder for drill/logo */}
             <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M19,2H5A2,2 0 0,0 3,4V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V4A2,2 0 0,0 19,2M19,20H5V4H19V20Z" />
             </svg>
          </div>
          <span className="text-xl font-bold">16 minutes</span>
        </div>
        <div className="flex gap-4">
          <Heart className="w-6 h-6" />
          <ShoppingCart className="w-6 h-6" />
          <User className="w-6 h-6" />
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-sm font-medium">
        <span className="font-bold">Home</span>
        <span className="opacity-80">- Main St, Lucknow, Uttar ...</span>
        <ChevronDown className="w-4 h-4" />
      </div>

      {/* Search and Shop Now */}
      <div className="flex gap-3 items-center">
        <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 text-gray-500 shadow-inner">
          <Search className="w-5 h-5 mr-2" />
          <input 
            type="text" 
            placeholder='Search for "Tomato"' 
            className="bg-transparent outline-none w-full text-gray-800"
          />
        </div>
        <div className="bg-white rounded-xl flex items-center p-1 pr-3 shadow-md">
            <div className="bg-[#00aaff] p-2 rounded-lg mr-2">
                <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-[#00aaff] text-[10px] font-bold uppercase leading-none">Shop</span>
                <span className="text-[#00aaff] text-xs font-bold leading-none">Fresh Now</span>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
