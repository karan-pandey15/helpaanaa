'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
  },
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
  },
  {
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
    name: 'School Uniform & Accessories',
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
  },
  {
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
    name: 'Premium Gym MemberShip',
    image: '/image/Gym.png',
    screen: '/pages/Gym',
    params: { categoryId: 'Gym' },
    iconBg: 'linear-gradient(135deg, #FFE9CC 0%, #ffd49a 100%)',
    accent: '#e8922a',
    emoji: '',
  },
  {
    id: 'Tiffin Service',
    name: 'Food For Patient & Tiffin Service',
    image: '/image/tiffinservice.png',
    screen: '/pages/tiffinservice',
    params: { categoryId: 'Nurse' },
    iconBg: 'linear-gradient(135deg, #FFE9CC 0%, #ffd49a 100%)',
    accent: '#e8922a',
    emoji: '',
  },
   {
    id: 'Physiotherapist',
    name: 'Physiotherapist',
    image: '/image/tiffinserviced.png',
    screen: '/pages/physiotherapist',
    params: { categoryId: 'Nurse' },
    iconBg: 'linear-gradient(135deg, #FFE9CC 0%, #ffd49a 100%)',
    accent: '#e8922a',
    emoji: '',
  },
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

export default function CategoryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleCategoryPress = (item) => {
    setActiveCategory(item.id);
    const query =
      item.params && Object.keys(item.params).length > 0
        ? '?' + new URLSearchParams(item.params).toString()
        : '';
    router.push(`${item.screen}${query}`);
  };

  return (
    <div className="category-wrapper">
      <div className="category-container">
        <div className="header">
          <h2 className="title">Trending Categories</h2>
        </div>

        <div className="grid">
          {categories.map((item, index) => {
            const isActive = activeCategory === item.id;
            const isHovered = hoveredCategory === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleCategoryPress(item)}
                onMouseEnter={() => setHoveredCategory(item.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`card ${isActive ? 'card-active' : ''} ${isHovered ? 'card-hovered' : ''}`}
                style={{ '--accent': item.accent, '--delay': `${index * 50}ms` }}
              >
                <div className="card-glow" style={{ background: item.accent }} />

                <div className="icon-wrap" style={{ background: item.iconBg }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="icon-image"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement.querySelector('.emoji-fallback');
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <span className="emoji-fallback">{item.emoji}</span>
                </div>

                <span className="label">{item.name}</span>

                <div className="arrow-wrap" style={{ color: item.accent }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {isActive && <div className="active-dot" style={{ background: item.accent }} />}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .category-wrapper {
          width: 100%;
          background: #ffffff;
          padding: 24px 0;
        }

        .category-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .header {
          margin-bottom: 24px;
          text-align: left;
        }

        .title {
          font-size: 24px;
          font-weight: 800;
          color: #1e293b;
          letter-spacing: -0.02em;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          background: #f8fafc;
          border-radius: 16px;
          padding: 24px 12px;
          cursor: pointer;
          border: 1px solid #f1f5f9;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          min-height: 150px;
          overflow: hidden;
        }

        .card-hovered {
          transform: translateY(-4px);
          background: #ffffff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-color: var(--accent);
        }

        .icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .card-hovered .icon-wrap {
          transform: scale(1.1);
        }

        .icon-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
        }

        .emoji-fallback {
          display: none;
          font-size: 28px;
        }

        .label {
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          text-align: center;
          line-height: 1.2;
          max-width: 90%;
        }

        .arrow-wrap {
          position: absolute;
          bottom: 12px;
          right: 12px;
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.2s ease;
        }

        .card-hovered .arrow-wrap {
          opacity: 1;
          transform: translateX(0);
        }

        .active-dot {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        @media (min-width: 640px) {
          .category-container { padding: 0 24px; }
          .grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .title { font-size: 28px; }
          .card { padding: 32px 16px; min-height: 180px; }
          .icon-wrap { width: 80px; height: 80px; }
          .label { font-size: 14px; }
        }

        @media (min-width: 1024px) {
          .grid { grid-template-columns: repeat(4, 1fr); gap: 20px; }
          .title { font-size: 32px; }
          .label { font-size: 15px; }
        }

        @media (min-width: 1280px) {
          .grid { grid-template-columns: repeat(5, 1fr); }
        }

        @media (min-width: 1536px) {
          .grid { grid-template-columns: repeat(6, 1fr); }
        }
      `}</style>
    </div>
  );
}
