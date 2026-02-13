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
    // params: { categoryId: 'Attendant' },
    iconBg: '#D6E4FF',
  },
  {
    id: 'GaurdianKids',
    name: 'Guardian For Kids',
    image: '/image/helper.png',
    screen: '/all-category',
    params: { categoryId: 'GaurdianKids' },
    iconBg: '#FFE9CC',
  },
  {
    id: 'pandit',
    name: 'Booking for Pandit Ji',
    image: '/image/panditcat.png',
    screen: '/fresh-fruit',
    params: {},
    iconBg: '#FFD6C8',
  },
  {
    id: 'hotel',
    name: 'Hotel & Resort Booking',
    image: '/image/hotelcat.png',
    screen: '/hotel',
    params: {},
    iconBg: '#C8F5E0',
  },
  {
    id: 'school',
    name: 'School',
    image: '/image/schoolcat.png',
    screen: '/milk-bread',
    params: {},
    iconBg: '#DDD0FF',
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic',
    image: '/image/cosmeticcat.png',
    screen: '/fresh-veg',
    params: {},
    iconBg: '#FFD0EC',
  },
  {
    id: 'groceries',
    name: 'Groceries',
    image: '/image/grocerycat.png',
    screen: '/grocery',
    params: {},
    iconBg: '#C8F2D4',
  },
  {
    id: 'mehndi',
    name: 'Mehndi Artist',
    image: '/image/mehndi3.png',
    screen: '/mehndi-artist',
    params: {},
    iconBg: '#FFE8C0',
  },
];

export default function CategoryScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryPress = (item) => {
    setActiveCategory(item.id);
    const query =
      item.params && Object.keys(item.params).length > 0
        ? '?' + new URLSearchParams(item.params).toString()
        : '';
    router.push(`${item.screen}${query}`);
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>Trending Categories</p>

      <div style={styles.grid}>
        {categories.map((item) => {
          const isActive = activeCategory === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleCategoryPress(item)}
              style={{
                ...styles.card,
                ...(isActive ? styles.cardActive : {}),
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.96)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  ...styles.iconWrap,
                  backgroundColor: item.iconBg,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={44}
                  height={44}
                  style={styles.iconImage}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <span style={styles.label}>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 10,
    marginLeft: 2,
    letterSpacing: '-0.2px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 4,
    paddingRight: 4,
    cursor: 'pointer',
    border: '1.5px solid #f0f0f0',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    width: '100%',
    minHeight: 0,
  },
  cardActive: {
    border: '1.5px solid #457b9d',
    backgroundColor: '#f0f7ff',
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    overflow: 'hidden',
    flexShrink: 0,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  label: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#2d2d2d',
    textAlign: 'center',
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
};