import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ className = "", size = "md", light = true }) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  const containerSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14"
  };

  const zapSizes = {
    sm: 14,
    md: 18,
    lg: 24
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative"
      >
        <div className={`
          ${containerSizes[size]} 
          bg-gradient-to-br from-[#FF9D00] to-[#FF4D00] 
          rounded-2xl shadow-xl flex items-center justify-center
          border-2 border-white/20
        `}>
          <span className={`font-serif font-bold text-white leading-none ${size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-2xl' : 'text-xl'}`}>H</span>
        </div>
      </motion.div>
      
      <div className="flex flex-col justify-center">
        <h1 className={`
          font-serif font-black italic tracking-tight leading-none
          ${sizeClasses[size]} 
          ${light ? 'text-white' : 'text-[#1d4e6e]'}
        `}>
          HELP<span className="text-[#FFC107]">AANA</span>
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-[3px] w-8 bg-[#FFC107] rounded-full" />
          <span className={`
            text-[10px] uppercase tracking-[0.1em] font-black
            ${light ? 'text-white' : 'text-slate-600'}
          `}>
            Premium Services
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
