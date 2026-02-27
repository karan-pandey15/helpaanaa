'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = [
  {
    id: 'Attendant',
    name: 'Attended For Parents',
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
    name: 'School',
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
        {/* Header */}
        <div className="header">
           
          <h2 className="title">Trending Categories</h2> 
        </div>

        {/* Grid */}
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
                style={{ '--accent': item.accent, '--delay': `${index * 60}ms` }}
              >
                {/* Glow blob on hover */}
                <div className="card-glow" style={{ background: item.accent }} />

                {/* Icon */}
                <div className="icon-wrap" style={{ background: item.iconBg }}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="icon-image"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.querySelector('.emoji-fallback').style.display = 'flex';
                    }}
                  />
                  <span className="emoji-fallback">{item.emoji}</span>
                </div>

                {/* Label */}
                <span className="label">{item.name}</span>

                {/* Arrow */}
                <div className="arrow-wrap" style={{ color: item.accent }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Active dot */}
                {isActive && <div className="active-dot" style={{ background: item.accent }} />}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .category-wrapper {
          width: 100%;
          background: linear-gradient(160deg, #f8faff 0%, #ffffff 50%, #fff8f5 100%);
          min-height: 100%;
          padding: 0;
        }

        .category-container {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 40px 48px 48px;
          box-sizing: border-box;
        }

        /* ── Header ── */
        .header {
          margin-bottom: 36px;
        }

        .header-tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #e05c3a;
          background: #fff3f0;
          border: 1px solid #ffd5cc;
          border-radius: 20px;
          padding: 4px 14px;
          margin-bottom: 12px;
        }

        .title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: clamp(26px, 3.5vw, 42px);
          font-weight: 900;
          color: #0f172a;
          margin: 0 0 10px;
          line-height: 1.15;
          letter-spacing: -1px;
        }

        .subtitle {
          font-size: clamp(13px, 1.5vw, 16px);
          color: #64748b;
          margin: 0;
          font-weight: 400;
        }

        /* ── Grid ── */
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
        }

        /* ── Card ── */
        .card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          background: #ffffff;
          border-radius: 20px;
          padding: 28px 16px 22px;
          cursor: pointer;
          border: 1.5px solid #eef0f6;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.25s ease,
                      border-color 0.2s ease;
          outline: none;
          width: 100%;
          min-height: 185px;
          overflow: hidden;
          animation: fadeSlideUp 0.5s ease both;
          animation-delay: var(--delay);
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-hovered {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
          border-color: var(--accent);
        }

        .card-active {
          border-color: var(--accent);
          background: linear-gradient(160deg, #fff 60%, #f9f9ff 100%);
          box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
        }

        /* Glow */
        .card-glow {
          position: absolute;
          top: -30px;
          right: -30px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(30px);
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .card-hovered .card-glow {
          opacity: 0.18;
        }

        /* Icon */
        .icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .card-hovered .icon-wrap {
          transform: scale(1.08) rotate(-2deg);
        }

        .icon-image {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover;
        }

        .emoji-fallback {
          display: none;
          font-size: 34px;
          align-items: center;
          justify-content: center;
        }

        /* Label */
        .label {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 13.5px;
          font-weight: 700;
          color: #1e293b;
          text-align: center;
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-width: 90%;
          letter-spacing: -0.2px;
        }

        /* Arrow */
        .arrow-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s ease, transform 0.25s ease;
        }

        .card-hovered .arrow-wrap {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 900px) {
          .grid { grid-template-columns: repeat(2, 1fr); }
          .category-container { padding: 32px 24px; }
        }

        @media (max-width: 600px) {
          .grid { 
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .category-container { padding: 20px 16px; }
          .card { 
            padding: 20px 12px 16px;
            min-height: 160px;
            border-radius: 16px;
          }
          .icon-wrap {
            width: 60px;
            height: 60px;
          }
          .emoji-fallback { font-size: 28px; }
          .label { font-size: 12px; }
          .title { margin-bottom: 24px; }
        }
      `}</style>
    </div>
  );
}
