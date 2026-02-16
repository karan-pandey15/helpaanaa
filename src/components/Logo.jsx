import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

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
    <div className={`flex items-center gap-2.5 ${className}`}>
      <motion.div 
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <div className={`
          ${containerSizes[size]} 
          bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 
          rounded-xl shadow-lg flex items-center justify-center
          ring-2 ring-white/20
        `}>
          <Zap 
            size={zapSizes[size]} 
            className="text-white fill-current drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" 
          />
        </div>
        
        {/* Animated glow effect */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className={`
            absolute inset-0 bg-yellow-400 blur-md -z-10 rounded-xl
            ${containerSizes[size]}
          `}
        />
      </motion.div>
      
      <div className="flex flex-col -space-y-1">
        <h1 className={`
          font-black tracking-tighter italic
          ${sizeClasses[size]} 
          ${light ? 'text-white' : 'text-[#1d4e6e]'}
        `}>
          HELP<span className={light ? 'text-yellow-400' : 'text-orange-500'}>AANA</span>
        </h1>
        <div className="flex items-center gap-1">
          <div className={`h-[2px] w-4 rounded-full ${light ? 'bg-yellow-400/50' : 'bg-orange-500/50'}`} />
          <span className={`
            text-[9px] uppercase tracking-[0.25em] font-extrabold
            ${light ? 'text-blue-100' : 'text-slate-500'}
          `}>
            Premium Services
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
