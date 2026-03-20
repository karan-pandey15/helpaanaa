'use client';

import { useState, useRef } from 'react';
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
    id: 'Nursed',
    name: 'Ladies Health Issues',
    image: '/image/preg.png',
    screen: '/pages/ladies',
    params: { categoryId: 'Nursed' },
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

export default function CategorySlider() {

  const router = useRouter();
  const [active, setActive] = useState(null);

  const sliderRef = useRef(null);

  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const go = (item) => {
    setActive(item.id);
    const q = item.params && Object.keys(item.params).length > 0
      ? '?' + new URLSearchParams(item.params).toString() : '';
    router.push(`${item.screen}${q}`);
  };

  const mouseDown = (e) => {
    isDown.current = true;
    sliderRef.current.classList.add('dragging');
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const mouseLeave = () => {
    isDown.current = false;
    sliderRef.current.classList.remove('dragging');
  };

  const mouseUp = () => {
    isDown.current = false;
    sliderRef.current.classList.remove('dragging');
  };

  const mouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      <style jsx>{`

      .wrapper{
        width:100%;
        background:#fff;
        padding:16px 0;
        border-bottom:1px solid #eee;
      }

      .slider{
        display:flex;
        overflow-x:auto;
        gap:8px;
        scroll-behavior:smooth;
        padding:10px 20px;
        cursor:grab;
      }

      .slider.dragging{
        cursor:grabbing;
      }

      .slider::-webkit-scrollbar{
        display:none;
      }

      .item{
        flex:0 0 auto;
        width:110px;
        display:flex;
        flex-direction:column;
        align-items:center;
        border:none;
        background:none;
        cursor:pointer;
      }

      .icon{
        width:70px;
        height:70px;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        margin-bottom:6px;
        box-shadow:0 3px 10px rgba(0,0,0,0.15);
        transition:0.3s;
      }

      .icon.active{
        outline:3px solid #004090;
        transform:scale(1.08);
      }

      .label{
        font-size:12px;
        text-align:center;
        font-weight:700;
      }

      @media(max-width:768px){

        .item{
          width:80px;
        }

        .icon{
          width:55px;
          height:55px;
        }

        .label{
          font-size:10px;
        }

      }

      `}</style>

      <div className="wrapper">

        <div
          className="slider"
          ref={sliderRef}
          onMouseDown={mouseDown}
          onMouseLeave={mouseLeave}
          onMouseUp={mouseUp}
          onMouseMove={mouseMove}
        >

          {categories.map((item) => (

            <button
              key={item.id}
              className="item"
              onClick={() => go(item)}
            >

              <div
                className={`icon ${active === item.id ? 'active' : ''}`}
                style={{ background: item.iconBg }}
              >

                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  style={{ objectFit: 'contain', padding: 10 }}
                />

              </div>

              <span className="label">{item.name}</span>

            </button>

          ))}

        </div>

      </div>
    </>
  );
}