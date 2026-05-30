'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL, DEFAULT_DESCRIPTION } from '@/lib/seo';

const categories = [
  {
    id: 'seniorCareCompanion',
    name: 'Elder Care Companion',
    image: '/image/categoryimg/gaurdiankids.png',
    screen: '/pages/Attendant',
    params: { categoryId: 'Attendant' },
    iconBg: '#E8F0FE',
  },
  {
    id: 'copessenger',
    name: 'Co-Pessenger For Travel',
    image: '/image/categoryimg/copessanger.png',
    screen: '/pages/Attendant',
    iconBg: '#E8F0FE',
  },
  {
    id: 'mehndi',
    name: 'Mehndi Artist',
    image: '/image/categoryimg/mehndi.png',
    screen: '/pages/Mehndi',
    params: {},
    iconBg: '#FFF8E1',
  },
  {
    id: 'Tiffin Service',
    name: 'Food For Patient',
    image: '/image/categoryimg/foodpatients.png',
    screen: '/pages/tiffinservice',
    params: { categoryId: 'Nurse' },
    iconBg: '#F1F8E9',
  },
  {
    id: 'salonMakeup',
    name: 'Salon and Makeup',
    image: '/image/categoryimg/salon.png',
    screen: '/pages/Salon',
    params: {},
    iconBg: '#FCE4EC',
  },
  {
    id: 'GaurdianKids',
    name: 'Book an Guardian',
    image: '/image/categoryimg/gaurdiankids.png',
    screen: '/pages/GuardianKids',
    params: { categoryId: 'GaurdianKids' },
    iconBg: '#FFF4E5',
  },
  {
    id: 'petWalker',
    name: 'Pet Walker',
    image: '/image/categoryimg/petwalker-removebg-preview.png',
    screen: '/pages/petwalker',
    params: { categoryId: 'petWalker' },
    iconBg: '#F0FDF4',
  },
  {
    id: 'pandit',
    name: 'Booking for Pandit Ji',
    image: '/image/categoryimg/pandit.png',
    screen: '/pages/Pandit',
    params: {},
    iconBg: '#FFF1F1',
  },
  {
    id: 'school',
    name: 'School Uniform & Accessories',
    image: '/image/categoryimg/schooluniform.png',
    screen: '/pages/School',
    params: {},
    iconBg: '#F3E5F5',
  },
  {
    id: 'groceries',
    name: 'Healthy Food',
    image: '/image/categoryimg/healthyfood.png',
    screen: '/pages/Groceries',
    params: {},
    iconBg: '#E8F5E9',
  },
  {
    id: 'ecommerce',
    name: 'E-commerece',
    image: '/image/categoryimg/school.png',
    screen: '/pages/ecommerce',
    params: {},
    iconBg: '#E8F5E9',
  },
  {
    id: 'hotel',
    name: 'Resort & Farmhouse Booking',
    image: '/image/categoryimg/resort.png',
    screen: '/pages/Hotel',
    params: {},
    iconBg: '#E0F2F1',
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic',
    image: '/image/categoryimg/makeup.png',
    screen: '/pages/Cosmetic',
    params: {},
    iconBg: '#FCE4EC',
  },
  {
    id: 'Nurse',
    name: 'Nurse For First Aid',
    image: '/image/categoryimg/nurse.png',
    screen: '/pages/nurse',
    params: { categoryId: 'Nurse' },
    iconBg: '#FFF3E0',
  },
  {
    id: 'Nursed',
    name: 'Pregnancy & Ladies Health Issues',
    image: '/image/categoryimg/womenpr.png',
    screen: '/pages/ladies',
    params: { categoryId: 'Nursed' },
    iconBg: '#FFF3E0',
  },
  {
    id: 'Gym',
    name: 'Premium Gym MemberShip',
    image: '/image/categoryimg/gym.png',
    screen: '/pages/Gym',
    iconBg: '#EFEBE9',
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
    image: '/image/categoryimg/physo.png',
    screen: '/pages/physiotherapist',
    params: {},
    iconBg: '#E0F7FA',
  },
  {
    id: 'luxuryProduct',
    name: 'Luxury Product',
    image: '/image/categoryimg/luxuryitems.png',
    screen: '/pages/Luxury',
    params: {},
    iconBg: '#EDE7F6',
  },
  {
    id: 'Fashion',
    name: 'Fashion & LyfeStyle',
    image: '/image/categoryimg/fashionlifestyle.png',
    screen: '/pages/fashion',
    params: {},
    iconBg: '#EDE7F6',
  },
  {
    id: 'ladieshealthissues',
    name: 'Pregnancy & Ladies Health Issues',
    image: '/image/categoryimg/womenpr.png',
    screen: '/pages/ladies',
    params: {},
    iconBg: '#EDE7F6',
  },
];

const trendingIds = ['mehndi', 'seniorCareCompanion'];

const TRENDING_GROUP = {
  title: 'Our Trending Categories',
  ids: ['mehndi', 'seniorCareCompanion'],
};

export default function CategoryScreen() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(4);

  const remainingCategories = categories.filter(
    (cat) => !trendingIds.includes(cat.id)
  );

  const getCategoryLink = (item) => {
    const params = {
      ...item.params,
      categoryId: item.params?.categoryId ?? item.id,
    };
    const query = '?' + new URLSearchParams(params).toString();
    return `${item.screen}${query}`;
  };

  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    localStorage.setItem('selectedCategoryId', id);
  };

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
    setItemsPerRow(getItemsInRow(document.documentElement.clientWidth));

    return () => observer.disconnect();
  }, []);

  const renderCategoryCard = (item) => (
    <Link
      key={item.id}
      href={getCategoryLink(item)}
      onClick={() => handleCategoryClick(item.id)}
      className={`cat-card ${activeCategory === item.id ? 'active' : ''}`}
      title={item.name}
      itemProp="url"
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
      <span className="cat-label" itemProp="name">{item.name}</span>

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
          text-decoration: none;
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
    </Link>
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        name: 'Helpaana Services',
        description: DEFAULT_DESCRIPTION,
        numberOfItems: categories.length,
        itemListElement: categories.map((cat, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: cat.name,
          url: `${SITE_URL}${getCategoryLink(cat)}`,
        })),
      },
      {
        '@type': 'SiteNavigationElement',
        name: 'Main Categories',
        hasPart: categories.slice(0, 8).map((cat) => ({
          '@type': 'WebPage',
          name: cat.name,
          url: `${SITE_URL}${getCategoryLink(cat)}`,
        })),
      },
    ],
  };

  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="page-container">
        <nav
          className="groups-stack"
          aria-label="Service Categories"
          itemScope
          itemType="https://schema.org/SiteNavigationElement"
        >
          {/* Trending: only Mehndi Artist + Elder Care Companion */}
          <section className="group-block">
            <h3 className="group-heading">{TRENDING_GROUP.title}</h3>
            <div className="cat-grid trending-grid">
              {TRENDING_GROUP.ids.map((id) => {
                const item = categories.find((c) => c.id === id);
                if (!item) return null;
                return renderCategoryCard(item);
              })}
            </div>
          </section>

          {/* All remaining categories together */}
          <section className="group-block">
            <div className="group-header">
              <h3 className="group-heading">All Categories</h3>
              {!showAllCategories &&
                remainingCategories.length > itemsPerRow && (
                  <button
                    className="view-all-btn"
                    onClick={() => setShowAllCategories(true)}
                    aria-label="View all service categories"
                  >
                    View All
                  </button>
                )}
            </div>
            <div className="cat-grid">
              {remainingCategories
                .slice(
                  0,
                  showAllCategories
                    ? remainingCategories.length
                    : itemsPerRow
                )
                .map((item) => renderCategoryCard(item))}
            </div>
          </section>
        </nav>
      </div>

      <style jsx>{`
        .page-wrapper {
          width: 100%;
          background: #fff;
          padding: 24px 0;
        }

        .page-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .groups-stack {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .group-block {
          width: 100%;
        }

        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .group-heading {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 20px 0;
          position: relative;
        }

        .group-header .group-heading {
          margin-bottom: 0;
        }

        .view-all-btn {
          font-size: 14px;
          font-weight: 600;
          color: #2563eb;
          background: #eff6ff;
          border: none;
          padding: 6px 16px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-all-btn:hover {
          background: #dbeafe;
          transform: scale(1.05);
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .trending-grid {
          grid-template-columns: repeat(2, 1fr);
          max-width: 520px;
          gap: 20px;
        }

        @media (min-width: 480px) {
          .trending-grid {
            max-width: 600px;
            gap: 28px;
          }
        }

        @media (min-width: 640px) {
          .cat-grid { grid-template-columns: repeat(5, 1fr); gap: 16px; }
          .group-heading { font-size: 20px; }
          .trending-grid {
            max-width: 680px;
          }
        }

        @media (min-width: 768px) {
          .cat-grid { grid-template-columns: repeat(6, 1fr); gap: 20px; }
          .page-container { padding: 0 24px; }
          .trending-grid {
            max-width: 760px;
            gap: 32px;
          }
        }

        @media (min-width: 1024px) {
          .cat-grid { grid-template-columns: repeat(7, 1fr); gap: 24px; }
          .group-heading { font-size: 22px; }
          .trending-grid {
            max-width: 840px;
          }
        }

        @media (min-width: 1280px) {
          .cat-grid { grid-template-columns: repeat(8, 1fr); }
        }
      `}</style>
    </div>
  );
}
