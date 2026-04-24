'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// salon & servies 
// food for pateints
// mehendi artist
// old age caretakers
// copassenger for travelling

const categories = [
  {
    id: 'Attendant',
    name: 'Book an Attendant',
    image: '/image/categoryimg/gaurdiankids.png',
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
    image: '/image/categoryimg/foodpatient.png',
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
    id: 'petWalker',
    name: 'Pet Walker',
    image: '/image/categoryimg/petwalker.png',
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
    image: '/image/categoryimg/school.png',
    screen: '/pages/School',
    params: {},
    iconBg: '#F3E5F5',
  },
  ,

  {
    id: 'ecommerce',
    name: 'E-commerece',
    image: '/image/categoryimg/school.png',
    screen: '/pages/ecommerce',
    params: {},
    iconBg: '#E8F5E9',
  },
  {
    id: 'groceries',
    name: 'Healthy Food',
    image: '/image/categoryimg/gaurdiankids.png', image: '/image/healthyfoodd.png',
    screen: '/pages/Groceries',
    params: {},
    iconBg: '#E8F5E9',
  },
  {
    id: 'hotel',
    name: 'Resort & Farmhouse Booking',
    image: '/image/categoryimg/gaurdiankids.png',
    screen: '/pages/Hotel',
    params: {},
    iconBg: '#E0F2F1',
  },
  {
    id: 'cosmetic',
    name: 'Cosmetic',
    image: '/image/categoryimg/gaurdiankids.png',
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
    id: 'Tiffin Service',
    name: 'Food For Patient & Tiffin Service',
    image: '/image/categoryimg/foodpatient.png',
    screen: '/pages/tiffinservice',
    params: { categoryId: 'Nurse' },
    iconBg: '#F1F8E9',
  },
  {
    id: 'groceries2',
    name: 'Groceries',
    image: '/image/categoryimg/gaurdiankids.png',
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
    image: '/image/categoryimg/luxury.png',
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
    localStorage.setItem('selectedCategoryId', item.id);
    const params = { ...item.params, categoryId: item.id };
    const q = '?' + new URLSearchParams(params).toString();
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
                  width={80}
                  height={80}
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