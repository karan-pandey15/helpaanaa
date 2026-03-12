'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const categories = [
  { id: 'Attendant', name: 'Attendant For Parents', image: '/image/attendantcat.png', screen: '/pages/Attendant', iconBg: 'linear-gradient(135deg,#D6E4FF,#b0ccff)', emoji: '👴' },
  { id: 'GaurdianKids', name: 'Guardian For Kids', image: '/image/helper.png', screen: '/pages/GuardianKids', params: { categoryId: 'GaurdianKids' }, iconBg: 'linear-gradient(135deg,#FFE9CC,#ffd49a)', emoji: '👶' },
  { id: 'petWalker', name: 'Pet Walker', image: '/image/dog.png', screen: '/pages/petwalker', params: { categoryId: 'petWalker' }, iconBg: 'linear-gradient(135deg,#DCFCE7,#a7f3c0)', emoji: '🐾' },
  { id: 'pandit', name: 'Booking for Pandit Ji', image: '/image/panditcat.png', screen: '/pages/Pandit', iconBg: 'linear-gradient(135deg,#FFD6C8,#ffb8a0)', emoji: '🪔' },
  { id: 'mehndi', name: 'Mehndi Artist', image: '/image/mehndi3.png', screen: '/pages/Mehndi', iconBg: 'linear-gradient(135deg,#FFE8C0,#ffd28a)', emoji: '🌿' },
  { id: 'school', name: 'School Uniform', image: '/image/schoolcat.png', screen: '/pages/School', iconBg: 'linear-gradient(135deg,#DDD0FF,#bfaaff)', emoji: '🏫' },
  { id: 'groceries', name: 'Healthy Food', image: '/image/healthyfoodd.png', screen: '/pages/Groceries', iconBg: 'linear-gradient(135deg,#C8F2D4,#96e4aa)', emoji: '🥗' },
  { id: 'hotel', name: 'Resort & Farmhouse Booking', image: '/image/hotelcat.png', screen: '/pages/Hotel', iconBg: 'linear-gradient(135deg,#C8F5E0,#96e8c4)', emoji: '🏨' },
  { id: 'cosmetic', name: 'Cosmetic', image: '/image/cosmeticcimage.png', screen: '/pages/Cosmetic', iconBg: 'linear-gradient(135deg,#FFD0EC,#ffaad8)', emoji: '💄' },
  { id: 'Nurse', name: 'Nurse For First Aid', image: '/image/nurse.png', screen: '/pages/nurse', params: { categoryId: 'Nurse' }, iconBg: 'linear-gradient(135deg,#FEE2E2,#fca5a5)', emoji: '🏥' },
  { id: 'Gym', name: 'Premium Gym MemberShip', image: '/image/Gym.png', screen: '/pages/Gym', params: { categoryId: 'Gym' }, iconBg: 'linear-gradient(135deg,#E0F2FE,#7dd3fc)', emoji: '💪' },
  { id: 'TiffinService', name: 'Patient Tiffin Service & Food Service', image: '/image/tiffinservice.png', screen: '/pages/tiffinservice', iconBg: 'linear-gradient(135deg,#FEF9C3,#fde047)', emoji: '🍱' },
  { id: 'physiotherapist', name: 'Physiotherapist', image: '/image/physiotherapist.png', screen: '/pages/physiotherapist', iconBg: 'linear-gradient(135deg,#FEF9C3,#fde047)', emoji: '🧑‍⚕️' },
  { id: 'groceries2', name: 'Groceries', image: '/image/grocerycat.png', screen: '/pages/Groceries', iconBg: 'linear-gradient(135deg,#C8F2D4,#96e4aa)', emoji: '🛒' },
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
        outline:3px solid #1B6B7B;
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