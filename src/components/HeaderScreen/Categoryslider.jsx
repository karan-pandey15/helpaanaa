'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Need to add image cosmetic healthy foods

const categories = [
  {
    id: 'Attendant',
    name: 'Attendant For Parents',
    image: '/image/attendantcat.png',
    screen: '/pages/Attendant',
    iconBg: 'linear-gradient(135deg, #D6E4FF 0%, #b0ccff 100%)',
    accent: '#4a7fd4',
    emoji: '👴',
  },
  {
    id: 'GaurdianKids',
    name: 'Guardian For Kids',
    image: '/image/helper.png',
    screen: '/pages/GuardianKids',
    params: { categoryId: 'GaurdianKids' },
    iconBg: 'linear-gradient(135deg, #FFE9CC 0%, #ffd49a 100%)',
    accent: '#e8922a',
    emoji: '👶',
  }
  ,
  {
    id: 'petWalker',
    name: 'Pet Walker',
    image: '/image/dog.png',
    screen: '/pages/petwalker',
    params: { categoryId: 'petWalker' },
    iconBg: 'linear-gradient(135deg, #FFE9CC 0%, #ffd49a 100%)',
    accent: '#e8922a',
    emoji: '',
    
  },
  {
    id: 'pandit',
    name: 'Booking for Pandit Ji',
    image: '/image/panditcat.png',
    screen: '/pages/Pandit',
    params: {},
    iconBg: 'linear-gradient(135deg, #FFD6C8 0%, #ffb8a0 100%)',
    accent: '#e05c3a',
    emoji: '🪔',
  }, {
    id: 'mehndi',
    name: 'Mehndi Artist',
    image: '/image/mehndi3.png',
    screen: '/pages/Mehndi',
    params: {},
    iconBg: 'linear-gradient(135deg, #FFE8C0 0%, #ffd28a 100%)',
    accent: '#d4820a',
    emoji: '🌿',
  },
  {
    id: 'school',
    name: 'School Uniform & Accessories ',
    image: '/image/schoolcat.png',
    screen: '/pages/School',
    params: {},
    iconBg: 'linear-gradient(135deg, #DDD0FF 0%, #bfaaff 100%)',
    accent: '#7c52e8',
    emoji: '🏫',
  },
  {
    id: 'groceries',
    name: 'Healthy Food',
    image: '/image/healthyfoodd.png',
    screen: '/pages/Groceries',
    params: {},
    iconBg: 'linear-gradient(135deg, #C8F2D4 0%, #96e4aa 100%)',
    accent: '#27a74a',
    emoji: '🛒',
  },
  
  {
    id: 'hotel',
    name: 'Hotel & Resort Booking',
    image: '/image/hotelcat.png',
    screen: '/pages/Hotel',
    params: {},
    iconBg: 'linear-gradient(135deg, #C8F5E0 0%, #96e8c4 100%)',
    accent: '#1daa6a',
    emoji: '🏨',
  },  {
    id: 'cosmetic',
    name: 'Cosmetic',
    image: '/image/cosmeticcimage.png',
    screen: '/pages/Cosmetic',
    params: {},
    iconBg: 'linear-gradient(135deg, #FFD0EC 0%, #ffaad8 100%)',
    accent: '#d43a8f',
    emoji: '💄',
  },
  {
    id: 'Nurse',
    name: 'Nurse For First Aid',
    image: '/image/nurse.png',
    screen: '/pages/nurse',
    params: { categoryId: 'Nurse' },
    iconBg: 'linear-gradient(135deg, #FFE9CC 0%, #ffd49a 100%)',
    accent: '#e8922a',
    emoji: '',
      },

      
  {
    id: 'Gym',
    name: 'Gym MemberShip',
    image: '/image/Gym.png',
    screen: '/pages/Gym',
    params: { categoryId: 'Gym' },
    iconBg: 'linear-gradient(135deg, #FFE9CC 0%, #ffd49a 100%)',
    accent: '#e8922a',
    emoji: '',
      },

      
  {
    id: 'Tiffin Service',
    name: 'Tiffin Service',
    image: '/image/tiffinservice.png',
    screen: '/pages/tiffinservice',
    params: { categoryId: 'Nurse' },
    iconBg: 'linear-gradient(135deg, #FFE9CC 0%, #ffd49a 100%)',
    accent: '#e8922a',
    emoji: '',
      } , 
  
  {
    id: 'groceries2',
    name: 'Groceries',
    image: '/image/grocerycat.png',
    screen: '/pages/Groceries',
    params: {},
    iconBg: 'linear-gradient(135deg, #C8F2D4 0%, #96e4aa 100%)',
    accent: '#27a74a',
    emoji: '🛒',
  },
];

export default function CategorySlider() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Attendant');

  const handleCategoryPress = (screen, categoryId) => {
    setActiveCategory(categoryId);
    router.push(screen);
  };

  return (
    <div className="bg-white py-4 shadow-sm overflow-hidden">
      <div className="flex flex-row overflow-x-auto no-scrollbar scroll-smooth gap-4 px-4 pb-2 pt-2">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryPress(category.screen, category.id)}
              className="flex-none flex flex-col items-center w-[85px] sm:w-[100px]"
            >
              {/* Circular Image Container */}
              <div 
                className={`w-[55px] h-[55px] sm:w-[65px] sm:h-[65px] rounded-full overflow-hidden flex items-center justify-center mb-2 border-2 transition-all duration-300 ${
                  isActive ? 'border-[#457b9d] scale-110 shadow-md' : 'border-transparent hover:border-gray-200'
                }`}
                style={{ background: category.iconBg }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/65?text=?';
                  }}
                />
              </div>

              {/* Category Name */}
              <span className={`text-[11px] sm:text-[12px] text-center font-bold leading-tight line-clamp-2 transition-colors duration-300 ${
                isActive ? 'text-[#457b9d]' : 'text-gray-600'
              }`}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}