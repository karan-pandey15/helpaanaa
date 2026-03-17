'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = [
  {
    id: 'Attendant',
    name: 'Book an Attendant',
    image: '/image/attendantcat.png',
    screen: '/pages/Attendant',
    iconBg: '#E8F0FE',
  },
  {
    id: 'GaurdianKids',
    name: 'Book an Guardian',
    image: '/image/helper.png',
    screen: '/pages/GuardianKids',
    params: { categoryId: 'GaurdianKids' },
    iconBg: '#FFF4E5',
  },
  {
    id: 'petWalker',
    name: 'Pet Walker',
    image: '/image/dog.png',
    screen: '/pages/petwalker',
    params: { categoryId: 'petWalker' },
    iconBg: '#F0FDF4',
  },
  {
    id: 'pandit',
    name: 'Booking for Pandit Ji',
    image: '/image/panditcat.png',
    screen: '/pages/Pandit',
    params: {},
    iconBg: '#FFF1F1',
  },
  {
    id: 'mehndi',
    name: 'Mehndi Artist',
    image: '/image/mehndi3.png',
    screen: '/pages/Mehndi',
    params: {},
    iconBg: '#FFF8E1',
  },
  {
    id: 'school',
    name: 'School Uniform & Accessories',
    image: '/image/schoolcat.png',
    screen: '/pages/School',
    params: {},
    iconBg: '#F3E5F5',
  },
  {
    id: 'groceries',
    name: 'Healthy Food',
    image: '/image/healthyfoodd.png',
    screen: '/pages/Groceries',
    params: {},
    iconBg: '#E8F5E9',
  },
  {
    id: 'hotel',
    name: 'Resort & Farmhouse Booking',
    image: '/image/hotelcat.png',
    screen: '/pages/Hotel',
    params: {},
    iconBg: '#E0F2F1',
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic',
    image: '/image/cosmeticcimage.png',
    screen: '/pages/Cosmetic',
    params: {},
    iconBg: '#FCE4EC',
  },
  {
    id: 'Nurse',
    name: 'Nurse For First Aid',
    image: '/image/nurse.png',
    screen: '/pages/nurse',
    params: { categoryId: 'Nurse' },
    iconBg: '#FFF3E0',
  },
  {
    id: 'Gym',
    name: 'Premium Gym MemberShip',
    image: '/image/Gym.png',
    screen: '/pages/gym',
    iconBg: '#EFEBE9',
  },
  {
    id: 'Tiffin Service',
    name: 'Food For Patient & Tiffin Service',
    image: '/image/tiffinservice.png',
    screen: '/pages/tiffinservice',
    params: { categoryId: 'Nurse' },
    iconBg: '#F1F8E9',
  },
  {
    id: 'groceries2',
    name: 'Groceries',
    image: '/image/grocery1.png',
    screen: '/pages/Groceries',
    params: {},
    iconBg: '#E8F5E9',
  },
  {
    id: 'physiotherapist',
    name: 'Physiotherapist',
    image: '/image/physiotherapist.png',
    screen: '/pages/physiotherapist',
    params: {},
    iconBg: '#E0F7FA',
  },
  {
    id: 'salonMakeup',
    name: 'Salon and Makeup',
    image: '/image/salon.png',
    screen: '/pages/Salon',
    params: {},
    iconBg: '#FCE4EC',
  },
  {
    id: 'luxuryProduct',
    name: 'Luxury Product',
    image: '/image/lifestyle.png',
    screen: '/pages/Luxury',
    params: {},
    iconBg: '#EDE7F6',
  },
];

const categoryGroups = [
  { title: 'Trending Category', ids: ['Attendant', 'GaurdianKids', 'petWalker'] },
  { title: 'Spiritual & Remedies', ids: ['pandit'] },
  { title: 'Find a Doctor', ids: ['physiotherapist', 'Nurse'] },
  { title: 'Health & Fitness', ids: ['Gym'] },
  { title: 'Salon & Beauty Wellness', ids: ['mehndi', 'salonMakeup', 'cosmetic'] },
  { title: 'Lifestyle & Personal Care', ids: ['luxuryProduct'] },
  { title: 'Food & Beverage', ids: ['Tiffin Service', 'groceries'] },
  { title: 'E-Commerce', ids: ['school', 'groceries2'] },
  { title: 'Prime Resort Booking', ids: ['hotel'] },
];

export default function CategoryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(4);

  const handleCategoryPress = (item) => {
    setActiveCategory(item.id);
    const query =
      item.params && Object.keys(item.params).length > 0
        ? '?' + new URLSearchParams(item.params).toString()
        : '';
    router.push(`${item.screen}${query}`);
  };

  // Use ResizeObserver on document.documentElement — no window references
  useEffect(() => {
    const getItemsInRow = (width) => {
      if (width >= 1280) return 8;
      if (width >= 1024) return 7;
      if (width >= 768) return 6;
      if (width >= 640) return 5;
      return 4;
    };

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setItemsPerRow(getItemsInRow(entry.contentRect.width));
      }
    });

    observer.observe(document.documentElement);
    // Set initial value
    setItemsPerRow(getItemsInRow(document.documentElement.clientWidth));

    return () => observer.disconnect();
  }, []);

  const renderCategoryCard = (item) => (
    <button
      key={item.id}
      onClick={() => handleCategoryPress(item)}
      className={`cat-card ${activeCategory === item.id ? 'active' : ''}`}
    >
      <div
        className="circle-wrap"
        style={{ backgroundColor: item.iconBg }}
      >
        <Image
          src={item.image}
          alt={item.name}
          width={64}
          height={64}
          className="cat-img"
        />
      </div>
      <span className="cat-label">{item.name}</span>

      <style jsx>{`
        .cat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px 4px;
          border-radius: 16px;
          transition: transform 0.2s ease, background 0.2s ease;
          width: 100%;
        }

        .cat-card:hover,
        .cat-card.active {
          transform: translateY(-3px);
          background: #f8faff;
        }

        .circle-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .cat-card:hover .circle-wrap {
          transform: scale(1.06);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }

        .cat-img {
          width: 58px;
          height: 58px;
          object-fit: contain;
        }

        .cat-label {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          text-align: center;
          line-height: 1.35;
          max-width: 90px;
          display: block;
          word-break: break-word;
        }

        @media (min-width: 480px) {
          .circle-wrap { width: 80px; height: 80px; }
          .cat-img { width: 64px; height: 64px; }
          .cat-label { font-size: 13px; max-width: 100px; }
        }

        @media (min-width: 768px) {
          .circle-wrap { width: 90px; height: 90px; }
          .cat-img { width: 72px; height: 72px; }
          .cat-label { font-size: 13.5px; max-width: 110px; }
        }

        @media (min-width: 1024px) {
          .circle-wrap { width: 100px; height: 100px; }
          .cat-img { width: 80px; height: 80px; }
          .cat-label { font-size: 14px; max-width: 120px; }
        }
      `}</style>
    </button>
  );

  return (
    <div className="page-wrapper">
      <div className="page-container">
        <div className="groups-stack">
          {categoryGroups.map((group) => (
            <div key={group.title} className="group-block">
              <h3 className="group-heading">{group.title}</h3>
              <div className="cat-grid">
                {group.ids.map((id) => {
                  const item = categories.find((c) => c.id === id);
                  if (!item) return null;
                  return renderCategoryCard(item);
                })}
              </div>
            </div>
          ))}

          <div className="group-block">
            <div className="group-header">
              <h3 className="group-heading">All Categories</h3>
              {!showAllCategories && categories.length > itemsPerRow && (
                <button
                  className="view-all-btn"
                  onClick={() => setShowAllCategories(true)}
                >
                  View All
                </button>
              )}
            </div>
            <div className="cat-grid">
              {categories
                .slice(0, showAllCategories ? categories.length : itemsPerRow)
                .map((item) => renderCategoryCard(item))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 4px;
        }

        .view-all-btn {
          font-size: 13px;
          font-weight: 700;
          color: #2563eb;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.2s ease;
        }

        .view-all-btn:hover {
          background: #eff6ff;
          text-decoration: underline;
        }

        .page-wrapper {
          width: 100%;
          background: #ffffff;
          padding: 24px 0 48px;
          min-height: 100vh;
        }

        .page-container {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .groups-stack {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .group-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .group-heading {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.01em;
          padding-left: 4px;
        }

        /* Mobile: 4 columns */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          row-gap: 20px;
        }

        /* Tablet: 5 columns */
        @media (min-width: 640px) {
          .cat-grid { grid-template-columns: repeat(5, 1fr); gap: 12px; row-gap: 24px; }
          .group-heading { font-size: 18px; }
        }

        /* Small laptop: 6 columns */
        @media (min-width: 768px) {
          .cat-grid { grid-template-columns: repeat(6, 1fr); }
          .group-heading { font-size: 19px; }
        }

        /* Desktop: 7–8 columns */
        @media (min-width: 1024px) {
          .cat-grid { grid-template-columns: repeat(7, 1fr); gap: 16px; row-gap: 28px; }
          .group-heading { font-size: 20px; }
          .page-container { padding: 0 32px; }
        }

        @media (min-width: 1280px) {
          .cat-grid { grid-template-columns: repeat(8, 1fr); }
        }
      `}</style>
    </div>
  );
}