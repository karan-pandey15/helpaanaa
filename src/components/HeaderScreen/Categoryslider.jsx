'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = [
  {
    id: 1,
    name: 'Attended',
    image: '/image/attendantcat.png',
   screen: '/pages/Attendant',
    // params: { categoryId: 'Attendant' },
  },
  {
    id: 3,
    name: 'Pandit Ji',
    image: '/image/panditcat.png',
    screen: '/pages/Pandit',
  },
  {
    id: 2,
    name: 'Hotel Resort',
    image: '/image/hotelcat.png',
    screen: '/pages/Hotel',
  },
  {
    id: 4,
    name: 'Groceries',
    image: '/image/grocerycat.png',
    screen: '/pages/Groceries',
  },
  {
    id: 5,
    name: 'School Items',
    image: '/image/schoolcat.png',
    screen: '/pages/School',
  },
];

export default function CategorySlider() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(1);

  const handleCategoryPress = (screen, categoryId) => {
    setActiveCategory(categoryId);
    router.push(screen);
  };

  return (
    <div className="bg-[#457b9d] py-[5px]">
      <div className="flex flex-row justify-between px-[10px]">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryPress(category.screen, category.id)}
              className="relative flex flex-col items-center"
              style={{ width: '18%' }}
            >
              {/* Circular Image Container */}
              <div className="w-[70px] h-[70px] rounded-[25px] overflow-hidden flex items-center justify-center mb-1">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={70}
                  height={70}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/70?text=?';
                  }}
                />
              </div>

              {/* Category Name */}
              <span className="text-[10px] text-center text-[#333] font-medium leading-tight line-clamp-2">
                {category.name}
              </span>

              {/* Active Underline */}
              {isActive && (
                <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#333] rounded-sm" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}