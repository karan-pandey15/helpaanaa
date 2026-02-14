"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// ============================================
// MOCK DATA & CONSTANTS
// ============================================
const THEME_COLOR = '#023e8a';
const PANDIT_IMAGE = 'https://lh3.googleusercontent.com/ogw/AF2bZygnDN02Te97on5Wf-4sDfYUPxMX27fbGwu4tJIZbNoA2eI=s64-c-mo';

const PANDITS = [
  {
    id: '1',
    name: 'Pandit Rajesh Sharma',
    specialization: 'Vedic Astrology & Kundli',
    experience: '15 years',
    rating: 5,
    reviews: 2,
    languages: ['Hindi', 'English', 'Sanskrit'],
    price: 299,
    image: PANDIT_IMAGE,
    available: true,
    expertise: ['Marriage Matching', 'Career Guidance', 'Health Issues', 'Kundli Making'],
  },
  {
    id: '2',
    name: 'Pandit Anil Kumar',
    specialization: 'Palmistry & Numerology',
    experience: '12 years',
    rating: 4,
    reviews: 1,
    languages: ['Hindi', 'English'],
    price: 249,
    image: PANDIT_IMAGE,
    available: true,
    expertise: ['Love Life', 'Business Consultation', 'Future Prediction', 'Palmistry'],
  },
  {
    id: '3',
    name: 'Pandit Suresh Mishra',
    specialization: 'Vastu Shastra Expert',
    experience: '20 years',
    rating: 5,
    reviews: 2,
    languages: ['Hindi', 'English', 'Bengali'],
    price: 399,
    image: PANDIT_IMAGE,
    available: false,
    expertise: ['Home Vastu', 'Office Vastu', 'Remedies', 'Vastu'],
  },
  {
    id: '6',
    name: 'Pandit Mahesh Singh',
    specialization: 'Puja & Rituals',
    experience: '18 years',
    rating: 5,
    reviews: 1,
    languages: ['Hindi', 'Sanskrit'],
    price: 349,
    image: PANDIT_IMAGE,
    available: true,
    expertise: ['Pooja Booking', 'Festival Rituals', 'Remedies', 'Pooja Booking'],
  },
];

const POOJAS = [
  {
    id: 'p1',
    title: 'Satyanarayan Puja',
    description: 'Performed to seek blessings of Lord Vishnu for prosperity and happiness.',
    image: '/image/panditji.png',
    price: 2100,
    location: 'At your Home',
    duration: '2-3 Hours',
  },
  {
    id: 'p2',
    title: 'Ganesha Puja',
    description: 'Performed before new beginnings to remove obstacles.',
    image: '/image/pandiit.png',
    price: 1500,
    location: 'Home / Temple',
    duration: '1-2 Hours',
  },
  {
    id: 'p3',
    title: 'Griha Pravesh Puja',
    description: 'Purifies the new home and brings peace and prosperity.',
    image: '/image/pandit.png',
    price: 5100,
    location: 'New Home',
    duration: '4-5 Hours',
  },
  {
    id: 'p4',
    title: 'Laxmi Puja',
    description: 'Performed to invite wealth and financial growth.',
    image: '/image/panditji.png',
    price: 2500,
    location: 'Home / Office',
    duration: '2 Hours',
  },
];

const TEMPLES_DATA = [
  {
    id: 'ram-mandir-ayodhya',
    name: 'Shri Ram Mandir',
    location: 'Ayodhya, UP',
    image: '/image/panditji.png',
  },
  {
    id: 'kashi-vishwanath',
    name: 'Kashi Vishwanath',
    location: 'Varanasi, UP',
    image: '/image/pandiit.png',
  },
  {
    id: 'banke-bihari',
    name: 'Banke Bihari',
    location: 'Vrindavan, UP',
    image: '/image/pandit.png',
  },
];

const SERVICES = [
  { id: '1', name: 'Prasad Seva', icon: '⭐', key: 'Online Prasad Seva' },
  { id: '2', name: 'Pooja Booking', icon: '🕉️', key: 'Pooja Booking' },
  { id: '3', name: 'Kundli Making', icon: '📜', key: 'Kundli Making' }, 
  { id: '4', name: 'Vastu', icon: '🏠', key: 'Vastu' },
  { id: '5', name: 'Palmistry', icon: '🤚', key: 'Palmistry' },
  { id: '6', name: 'Tarot', icon: '🃏', key: 'Tarot' }, 
];

// --- HELPERS ---
const generateDates = () => {
  const next7Days = [];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    next7Days.push({
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
      fullDate: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    });
  }
  return next7Days;
};

// --- SVG ICONS ---
const ArrowBack = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function PanditPage() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState('services');
  const [selectedService, setSelectedService] = useState('Kundli Making');
  const [selectedPandit, setSelectedPandit] = useState(null);
  
  // States
  const [poojaMode, setPoojaMode] = useState('grid');
  const [selectedPooja, setSelectedPooja] = useState(null);
  const [prasadMode, setPrasadMode] = useState('grid');
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [cart, setCart] = useState([]);
  
  // Form fields
  const [devoteeName, setDevoteeName] = useState('');
  const [gotra, setGotra] = useState('');
  const [rashi, setRashi] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [dates] = useState(generateDates());
  const [offeringDate, setOfferingDate] = useState(dates[0].fullDate);
  const [selectedDate, setSelectedDate] = useState(dates[0].fullDate);
  const [selectedTime, setSelectedTime] = useState('08:00 AM');

  // Load cart from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('pandit_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // Save cart to LocalStorage
  useEffect(() => {
    localStorage.setItem('pandit_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, cartId: Date.now() }]);
  };

  const getFilteredPandits = () => {
    let filtered = PANDITS;
    if (selectedService && selectedService !== 'Pooja Booking' && selectedService !== 'Online Prasad Seva') {
      filtered = filtered.filter((pandit) =>
        pandit.specialization.toLowerCase().includes(selectedService.toLowerCase()) ||
        pandit.expertise.some((exp) => exp.toLowerCase().includes(selectedService.toLowerCase()))
      );
    }
    return filtered;
  };

  // --- RENDERS ---

  const renderPoojaGrid = () => (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h2 className="text-xl font-bold text-gray-800">Select Pooja</h2>
      <div className="grid grid-cols-2 gap-3">
        {POOJAS.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <img src={item.image} className="h-28 w-full object-cover" alt={item.title} />
            <div className="p-3 flex flex-col flex-1">
              <h3 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h3>
              <p className="text-blue-700 font-bold text-sm mt-1">₹{item.price}</p>
              <button 
                onClick={() => { setSelectedPooja(item); setPoojaMode('detail'); }}
                className="mt-2 w-full py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold border border-blue-100"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPoojaDetail = () => (
    <div className="flex flex-col p-4 pb-24 h-full overflow-y-auto">
      <button onClick={() => setPoojaMode('grid')} className="flex items-center gap-1 text-purple-600 mb-4 font-medium">
        <ArrowBack /> <span className="text-sm">Back to List</span>
      </button>
      <img src={selectedPooja?.image} className="w-full h-48 object-cover rounded-2xl shadow-lg" alt="" />
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-gray-800">{selectedPooja?.title}</h2>
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-black text-blue-700">₹{selectedPooja?.price}</span>
          <span className="text-sm text-gray-500">📍 {selectedPooja?.location}</span>
        </div>
        
        <h4 className="font-bold text-gray-800 mt-6 mb-3">Select Date</h4>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map((d, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedDate(d.fullDate)}
              className={`flex flex-col items-center min-w-[60px] p-3 rounded-xl border transition-all ${selectedDate === d.fullDate ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-600'}`}
            >
              <span className="text-[10px] uppercase font-bold">{d.day}</span>
              <span className="text-lg font-black">{d.date}</span>
            </button>
          ))}
        </div>

        <h4 className="font-bold text-gray-800 mt-6 mb-2">Description</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{selectedPooja?.description}</p>
        
        <button 
          onClick={() => {
            addToCart({ ...selectedPooja, date: selectedDate, category: 'Pooja' });
            alert('Added to cart!');
          }}
          className="mt-8 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-transform"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  const renderPrasadGrid = () => (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h2 className="text-xl font-bold text-gray-800">Sacred Prasad Seva</h2>
      <div className="grid grid-cols-2 gap-3">
        {TEMPLES_DATA.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <img src={item.image} className="h-28 w-full object-cover" alt="" />
            <div className="p-3">
              <h3 className="text-sm font-bold text-gray-800">{item.name}</h3>
              <p className="text-xs text-gray-500 mt-1">📍 {item.location}</p>
              <button 
                onClick={() => { setSelectedTemple(item); setPrasadMode('form'); }}
                className="mt-3 w-full py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold border border-blue-100"
              >
                Select Temple
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPrasadForm = () => (
    <div className="flex flex-col p-4 pb-24 h-full overflow-y-auto">
      <button onClick={() => setPrasadMode('grid')} className="flex items-center gap-1 text-purple-600 mb-4 font-medium">
        <ArrowBack /> <span className="text-sm">Back to Temples</span>
      </button>
      <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedTemple?.name} - Sankalp Form</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Devotee Full Name *</label>
          <input 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={devoteeName} onChange={(e) => setDevoteeName(e.target.value)} placeholder="Name for Sankalp"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Rashi *</label>
            <input 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm"
              value={rashi} onChange={(e) => setRashi(e.target.value)} placeholder="Your Rashi"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Gotra</label>
            <input 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm"
              value={gotra} onChange={(e) => setGotra(e.target.value)} placeholder="Your Gotra"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 uppercase mb-1 block">Delivery Address *</label>
          <textarea 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm h-20"
            value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Complete address for Prasad delivery"
          />
        </div>
        
        <button 
          onClick={() => {
            if (!devoteeName || !address) return alert('Fill mandatory fields');
            addToCart({ name: `Prasad - ${selectedTemple.name}`, price: 1101, devotee: devoteeName, category: 'Prasad' });
            alert('Added to Cart!');
            setPrasadMode('grid');
          }}
          className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg mt-4"
        >
          Book Prasad Seva
        </button>
      </div>
    </div>
  );

  const renderPanditList = () => (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <h2 className="text-xl font-bold text-gray-800">{selectedService} Experts</h2>
      <div className="flex flex-col gap-3">
        {getFilteredPandits().map((p) => (
          <div 
            key={p.id} 
            onClick={() => { setSelectedPandit(p); setCurrentView('profile'); }}
            className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-4 cursor-pointer active:scale-[0.98] transition-all"
          >
            <img src={p.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{p.name}</h3>
              <p className="text-[11px] text-gray-500 font-medium">{p.specialization}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 px-1.5 py-0.5 bg-yellow-50 rounded-lg">
                  <StarIcon />
                  <span className="text-[10px] font-bold text-yellow-700">{p.rating}</span>
                </div>
                <span className="text-sm font-black text-blue-700">₹{p.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="min-h-screen bg-white max-w-md mx-auto relative flex flex-col font-sans">
      <div className="relative h-72 bg-blue-900 overflow-hidden">
        <div className="absolute top-6 left-4 z-10">
          <button onClick={() => setCurrentView('services')} className="p-2 bg-white/20 backdrop-blur rounded-full text-white">
            <ArrowBack />
          </button>
        </div>
        <img src={selectedPandit?.image} className="w-full h-full object-cover opacity-80" alt="" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-900 to-transparent">
          <h2 className="text-2xl font-black text-white">{selectedPandit?.name}</h2>
          <p className="text-blue-100 text-sm opacity-90">{selectedPandit?.specialization}</p>
        </div>
      </div>
      
      <div className="p-6 -mt-6 bg-white rounded-t-3xl flex-1 shadow-2xl">
        <h3 className="font-bold text-gray-800 mb-3">Expertise</h3>
        <div className="flex flex-wrap gap-2 mb-8">
          {selectedPandit?.expertise.map((e, i) => (
            <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100 uppercase tracking-tight">
              {e}
            </span>
          ))}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-8">
          <h4 className="font-bold text-gray-800 text-sm mb-1">Languages</h4>
          <p className="text-gray-500 text-xs">{selectedPandit?.languages.join(', ')}</p>
        </div>

        <button 
          onClick={() => alert('Booking request sent!')}
          className="w-full py-4 bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 active:scale-95 transition-all"
        >
          Connect Now - ₹{selectedPandit?.price}
        </button>
      </div>
    </div>
  );

  // --- MAIN LAYOUT ---

  if (currentView === 'profile') return renderProfile();

  return (
    <div className="min-h-screen bg-white max-w-md mx-auto relative flex flex-col font-sans overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-50 bg-white sticky top-0 z-50">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowBack />
        </button>
        <h1 className="text-lg font-black text-gray-800 tracking-tight uppercase">Pandit Ji Seva</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-24 border-r border-gray-50 overflow-y-auto bg-white scrollbar-hide">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedService(s.key);
                if (s.key === 'Pooja Booking') setPoojaMode('grid');
                if (s.key === 'Online Prasad Seva') setPrasadMode('grid');
              }}
              className={`w-full py-5 flex flex-col items-center gap-2 border-b border-gray-50 transition-all ${selectedService === s.key ? 'bg-blue-50 border-r-4 border-blue-600' : ''}`}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-[9px] font-black text-center px-1 uppercase leading-tight ${selectedService === s.key ? 'text-blue-700' : 'text-gray-400'}`}>
                {s.name}
              </span>
            </button>
          ))}
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 bg-gray-50/30 overflow-y-auto overflow-x-hidden">
          {selectedService === 'Pooja Booking' ? (poojaMode === 'grid' ? renderPoojaGrid() : renderPoojaDetail()) : 
           selectedService === 'Online Prasad Seva' ? (prasadMode === 'grid' ? renderPrasadGrid() : renderPrasadForm()) : 
           renderPanditList()}
        </div>
      </div>

      {/* FLOATING CART SUMMARY */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[85%] z-[100]">
          <button className="w-full bg-blue-700 text-white rounded-2xl py-4 px-6 flex items-center justify-between shadow-2xl shadow-blue-200 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-black uppercase opacity-70 tracking-widest">{cart.length} ITEMS</span>
              <span className="text-lg font-black tracking-tight">₹{cart.reduce((a, b) => a + b.price, 0)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-widest">VIEW CART</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
