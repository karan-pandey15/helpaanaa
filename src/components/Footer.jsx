'use client';
import React from 'react';
import { Home, Search, Heart, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();

  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/' },
    { icon: <Search size={24} />, label: 'Search', path: '/pages/SearchScreen' },
    { icon: <Heart size={24} />, label: 'Favorites', path: '/favorites' },
    { icon: <User size={24} />, label: 'Profile', path: '/pages/profile' },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-md mx-auto">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => router.push(item.path)}
            className="flex flex-col items-center justify-center space-y-1 text-gray-600 hover:text-[#457b9d] transition-colors"
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </footer>
  );
}