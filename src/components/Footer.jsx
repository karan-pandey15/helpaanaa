'use client';
import React from 'react';
import { Home, Grid, MessageSquare, User } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-3 flex justify-between items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-40">
      <div className="flex flex-col items-center gap-1 text-[#023e8a]">
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-bold">Home</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-gray-400">
        <Grid className="w-6 h-6" />
        <span className="text-[10px] font-bold">Cleaning</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-gray-400">
        <MessageSquare className="w-6 h-6" />
        <span className="text-[10px] font-bold">Self Help</span>
      </div>
      <div className="flex flex-col items-center gap-1 text-gray-400">
        <User className="w-6 h-6" />
        <span className="text-[10px] font-bold">Account</span>
      </div>
    </footer>
  );
};

export default Footer;
