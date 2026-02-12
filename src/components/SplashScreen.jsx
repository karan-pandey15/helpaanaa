'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 4500); // Total duration of animations
    return () => clearTimeout(timer);
  }, [onFinish]);

  const letters = "Helpaana".split("");

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const logoVariants = {
    initial: { scale: 0, opacity: 0, rotate: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      rotate: 360,
      transition: { 
        duration: 0.6,
        type: "spring",
        stiffness: 50,
        damping: 7
      }
    }
  };

  const letterVariants = {
    initial: { y: 30, opacity: 0, scale: 0.5 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 1.3 + i * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 8
      }
    })
  };

  const taglineVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 0.9,
      transition: { delay: 3, duration: 0.5 }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#023e8a] z-50"
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      <motion.div
        className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center mb-8 shadow-2xl overflow-hidden"
        variants={logoVariants}
      >
        <motion.div animate="animate" variants={pulseVariants}>
           <span className="text-[#023e8a] text-5xl md:text-7xl font-bold italic">H</span>
        </motion.div>
      </motion.div>

      <div className="flex flex-row items-center mb-5">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={letterVariants}
            className="text-white text-4xl md:text-6xl font-bold tracking-wider drop-shadow-lg"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.p
        className="text-white text-base md:text-lg font-medium tracking-wide"
        variants={taglineVariants}
      >
        Helping you find your way around
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
