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
        whileHover={{ scale: 1.05 }}
        className="relative"
      >
        <div className={`
          ${containerSizes[size]} 
          bg-[#F5A623] 
          rounded-full shadow-md flex items-center justify-center
        `}>
          <span className={`font-bold text-white leading-none ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'}`}>H</span>
        </div>
      </motion.div>
      
      <div className="flex flex-col justify-center">
        <h1 className={`
          font-bold tracking-tight leading-none
          ${sizeClasses[size]} 
          text-white
        `}>
          HELP<span className="text-[#F5A623]">AANA</span>
        </h1>
        <div className="mt-0.5">
          <span className={`
            text-[8px] sm:text-[10px] uppercase tracking-[0.15em] font-bold
            text-white/90
          `}>
            PREMIUM SERVICES
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
