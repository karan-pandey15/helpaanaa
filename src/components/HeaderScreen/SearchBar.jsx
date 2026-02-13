"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";

const placeholderItems = [
  "Safai Abhiyaan",
  "Potato",
  "Tomato",
  "Onion",
  "Cabbage",
  "Brinjal",
  "Mango",
  "Apple",
  "Banana",
  "Grapes",
];

export default function SearchBar({ onAdPress }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out → swap → fade in
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholderItems.length);
        setVisible(true);
      }, 200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#457b9d] pl-4">
      <div className="flex items-center">
        {/* Search Box */}
        <button
          onClick={() => router.push("/pages/SearchScreen")}
          className="flex-1 flex items-center bg-white px-4 py-[10px] rounded-full mr-3 mb-2
                     shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        >
          <Search size={22} color="#666" className="mr-3 shrink-0" />
          <span
            className="text-[15px] text-[#888] font-normal text-left truncate transition-opacity duration-200"
            style={{ opacity: visible ? 1 : 0 }}
          >
            Search for &ldquo;{placeholderItems[index]}&rdquo;
          </span>
        </button>

        {/* Ad / Shop Fresh Now */}
        <button
          onClick={onAdPress}
          className="flex items-center bg-white pl-3 py-[10px] rounded-tl-xl rounded-bl-xl
                     rounded-tr-none rounded-br-none shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className="mr-2">
            <p className="text-[13px] font-bold text-[#1E88E5] leading-4">Shop</p>
            <p className="text-[13px] font-bold text-[#1E88E5] leading-4">Fresh Now</p>
          </div>
          <div className="flex items-center gap-1 pr-3">
            <div className="w-6 h-6 rounded bg-[#1E88E5] flex items-center justify-center shrink-0">
              <ShoppingCart size={14} color="#FFF" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}