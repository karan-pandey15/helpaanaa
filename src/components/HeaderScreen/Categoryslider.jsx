'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = [
  { id: 'Attendant',     name: 'Attendant For Parents',       image: '/image/attendantcat.png',   screen: '/pages/Attendant',      iconBg: 'linear-gradient(135deg,#D6E4FF,#b0ccff)', emoji: '👴' },
  { id: 'GaurdianKids',  name: 'Guardian For Kids',           image: '/image/helper.png',          screen: '/pages/GuardianKids',   params: { categoryId: 'GaurdianKids' }, iconBg: 'linear-gradient(135deg,#FFE9CC,#ffd49a)', emoji: '👶' },
  { id: 'petWalker',     name: 'Pet Walker',                  image: '/image/dog.png',             screen: '/pages/petwalker',      params: { categoryId: 'petWalker' },    iconBg: 'linear-gradient(135deg,#DCFCE7,#a7f3c0)', emoji: '🐾' },
  { id: 'pandit',        name: 'Booking for Pandit Ji',       image: '/image/panditcat.png',       screen: '/pages/Pandit',         iconBg: 'linear-gradient(135deg,#FFD6C8,#ffb8a0)', emoji: '🪔' },
  { id: 'mehndi',        name: 'Mehndi Artist',               image: '/image/mehndi3.png',         screen: '/pages/Mehndi',         iconBg: 'linear-gradient(135deg,#FFE8C0,#ffd28a)', emoji: '🌿' },
  { id: 'school',        name: 'School Uniform',              image: '/image/schoolcat.png',       screen: '/pages/School',         iconBg: 'linear-gradient(135deg,#DDD0FF,#bfaaff)', emoji: '🏫' },
  { id: 'groceries',     name: 'Healthy Food',                image: '/image/healthyfoodd.png',    screen: '/pages/Groceries',      iconBg: 'linear-gradient(135deg,#C8F2D4,#96e4aa)', emoji: '🥗' },
  { id: 'hotel',         name: 'Resort & Farmhouse Booking',              image: '/image/hotelcat.png',        screen: '/pages/Hotel',          iconBg: 'linear-gradient(135deg,#C8F5E0,#96e8c4)', emoji: '🏨' },
  { id: 'cosmetic',      name: 'Cosmetic',                    image: '/image/cosmeticcimage.png',  screen: '/pages/Cosmetic',       iconBg: 'linear-gradient(135deg,#FFD0EC,#ffaad8)', emoji: '💄' },
  { id: 'Nurse',         name: 'Nurse For First Aid',         image: '/image/nurse.png',           screen: '/pages/nurse',          params: { categoryId: 'Nurse' },        iconBg: 'linear-gradient(135deg,#FEE2E2,#fca5a5)', emoji: '🏥' },
  { id: 'Gym',           name: 'Gym MemberShip',              image: '/image/Gym.png',             screen: '/pages/Gym',            params: { categoryId: 'Gym' },          iconBg: 'linear-gradient(135deg,#E0F2FE,#7dd3fc)', emoji: '💪' },
  { id: 'TiffinService', name: 'Tiffin Service',              image: '/image/tiffinservice.png',   screen: '/pages/tiffinservice',  iconBg: 'linear-gradient(135deg,#FEF9C3,#fde047)', emoji: '🍱' },
  { id: 'physiotherapist', name: 'physiotherapist',              image: '/image/tiffinservice',   screen: '/pages/physiotherapist',  iconBg: 'linear-gradient(135deg,#FEF9C3,#fde047)', emoji: '🍱' },
  { id: 'groceries2',    name: 'Groceries',                   image: '/image/grocerycat.png',      screen: '/pages/Groceries',      iconBg: 'linear-gradient(135deg,#C8F2D4,#96e4aa)', emoji: '🛒' },
];

export default function CategorySlider() {
  const router = useRouter();
  const [active, setActive] = useState(null);

  const go = (item) => {
    setActive(item.id);
    const q = item.params && Object.keys(item.params).length > 0
      ? '?' + new URLSearchParams(item.params).toString() : '';
    router.push(`${item.screen}${q}`);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800&display=swap');

        /* ── wrapper ── */
        .cs-wrap {
          width: 100%;
          background: #fff;
          border-bottom: 1px solid #e8f0f7;
          box-shadow: 0 2px 14px rgba(27,107,123,0.07);
          padding: 16px 0 14px;
          font-family: 'Nunito', sans-serif;
        }

        /* ── centered container ── */
        .cs-inner {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          box-sizing: border-box;
          /* equal left-right padding */
          padding: 0 16px;
        }
        @media (min-width: 768px)  { .cs-inner { padding: 0 32px; } }
        @media (min-width: 1280px) { .cs-inner { padding: 0 48px; } }

        /* ══════════════════════════════
           MOBILE  →  5-per-row smooth slider
           (< 768px)
        ══════════════════════════════ */
        .cs-mobile {
          display: flex;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 10px 0;
          scroll-snap-type: x mandatory;
        }
        .cs-mobile::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) { .cs-mobile { display: none; } }

        /* Each mobile item = exactly 1/5 of container width */
        .cs-mobile .cs-item {
          flex: 0 0 20%;
          min-width: 0;
          box-sizing: border-box;
          padding: 0 4px;
          scroll-snap-align: start;
        }

        /* ══════════════════════════════
           DESKTOP  →  show 10, scroll rest
           (≥ 768px)
        ══════════════════════════════ */
        .cs-desktop {
          display: none;
          overflow-x: auto;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .cs-desktop::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) { .cs-desktop { display: flex; } }

        /* Each desktop item = exactly 1/10 of container so 10 show at once */
        .cs-desktop .cs-item {
          flex: 0 0 10%;
          min-width: 0;
          box-sizing: border-box;
          padding: 0 4px;
        }

        /* ── shared item shell ── */
        .cs-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: transform 0.2s ease;
          width: 100%;
        }
        .cs-item:hover  { transform: translateY(-3px); }
        .cs-item:active { transform: scale(0.93); }

        /* ── icon circle ── */
        .cs-icon {
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.11);
          margin: 0 auto 7px;
        }
        .cs-icon:hover {
          transform: scale(1.06);
          box-shadow: 0 5px 16px rgba(0,0,0,0.17);
        }
        .cs-icon.on {
          outline: 2.5px solid #1B6B7B;
          outline-offset: 2.5px;
          box-shadow: 0 4px 18px rgba(27,107,123,0.30);
          transform: scale(1.08);
        }

        /* Mobile icon: fits 5 across comfortably */
        .cs-mobile .cs-icon {
          width: clamp(44px, 14vw, 58px);
          height: clamp(44px, 14vw, 58px);
        }

        /* Desktop icon */
        .cs-desktop .cs-icon {
          width: 68px;
          height: 68px;
        }
        @media (min-width: 1024px) {
          .cs-desktop .cs-icon { width: 76px; height: 76px; }
        }

        /* ── label ── */
        .cs-label {
          font-weight: 700;
          color: #4B5563;
          text-align: center;
          line-height: 1.25;
          transition: color 0.2s;
        }
        .cs-label.on { color: #1B6B7B; }

        /* Mobile label: tiny, 2-line clamp */
        .cs-mobile .cs-label {
          font-size: clamp(8px, 2.2vw, 10px);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          max-width: 100%;
        }

        /* Desktop label: single line, ellipsis */
        .cs-desktop .cs-label {
          font-size: 11px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          padding: 0 2px;
        }
        @media (min-width: 1024px) { .cs-desktop .cs-label { font-size: 12px; } }

        /* emoji fallback */
        .cs-emoji { display: none; font-size: 1.5rem; position: absolute; }
      `}</style>

      <div className="cs-wrap">
        <div className="cs-inner">

          {/* ── MOBILE: 5 per row ── */}
          <div className="cs-mobile">
            {categories.map((item) => (
              <button key={item.id} onClick={() => go(item)} className="cs-item" aria-label={item.name}>
                <div className={`cs-icon ${active === item.id ? 'on' : ''}`} style={{ background: item.iconBg }}>
                  <Image
                    src={item.image} alt={item.name}
                    width={58} height={58}
                    className="w-full h-full object-contain p-[9px]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fb = e.currentTarget.parentElement?.querySelector('.cs-emoji');
                      if (fb) fb.style.display = 'block';
                    }}
                  />
                  <span className="cs-emoji">{item.emoji}</span>
                </div>
                <span className={`cs-label ${active === item.id ? 'on' : ''}`}>{item.name}</span>
              </button>
            ))}
          </div>

          {/* ── DESKTOP: 10 visible, scroll for more ── */}
          <div className="cs-desktop">
            {categories.map((item) => (
              <button key={item.id} onClick={() => go(item)} className="cs-item" aria-label={item.name}>
                <div className={`cs-icon ${active === item.id ? 'on' : ''}`} style={{ background: item.iconBg }}>
                  <Image
                    src={item.image} alt={item.name}
                    width={76} height={76}
                    className="w-full h-full object-contain p-[11px]"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fb = e.currentTarget.parentElement?.querySelector('.cs-emoji');
                      if (fb) fb.style.display = 'block';
                    }}
                  />
                  <span className="cs-emoji">{item.emoji}</span>
                </div>
                <span className={`cs-label ${active === item.id ? 'on' : ''}`}>{item.name}</span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}