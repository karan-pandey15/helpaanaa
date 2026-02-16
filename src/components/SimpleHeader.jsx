'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function SimpleHeader({ title }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-[#457b9d] px-4 pt-10 pb-4 flex items-center gap-4 shadow-md">
      <button 
        onClick={() => router.back()} 
        className="text-black p-1 hover:bg-black/10 rounded-full transition-colors"
        aria-label="Go back"
      >
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-xl font-bold text-black">{title}</h1>
    </header>
  );
}
