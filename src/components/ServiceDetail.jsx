"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar, 
  Info, 
  CheckCircle2,
  ChevronRight,
  Star,
  Users,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceDetail = ({ 
  title: propTitle, 
  image: propImage, 
  basePrice: propBasePrice = 299, 
  item: propItem = null 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const title = propTitle || searchParams.get('title') || 'Service Details';
  const image = propImage || searchParams.get('image') || 'https://images.unsplash.com/photo-1584512603392-f0c3d99c1ce0?q=80&w=800';
  const basePrice = Number(propBasePrice || searchParams.get('price') || 299);
  
  const item = propItem || {
    description: searchParams.get('description') || '',
    category: searchParams.get('category') || 'General',
    time: searchParams.get('duration') || '1-2 Hours',
    hour: searchParams.get('hours') || '9 AM - 6 PM',
    isTraveling: searchParams.get('isTraveling') === 'true',
    suggestion: searchParams.get('suggestion') || 'Highly recommended for quality results.'
  };

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [hours, setHours] = useState(1);
  const [description, setDescription] = useState(item.description || '');
  const [dates, setDates] = useState([]);

  // Traveling Details
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('');
  const [location, setLocation] = useState('');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');

  const timeSlots = [
    '09:00 AM', '11:00 AM', '01:00 PM',
    '03:00 PM', '05:00 PM', '07:00 PM',
  ];

  useEffect(() => {
    generateDates();
  }, []);

  const generateDates = () => {
    const today = new Date();
    const nextDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      nextDates.push({
        id: i,
        dayName: days[date.getDay()],
        dateNum: date.getDate(),
        monthName: months[date.getMonth()],
        year: date.getFullYear()
      });
    }
    setDates(nextDates);
  };

  const handleAddToCart = () => {
    if (!selectedTime) return alert('Please select a preferred time');
    
    const selectedDateObj = dates.find(d => d.id === selectedDate);
    const serviceItem = {
      id: item?._id || `service_${Date.now()}`,
      name: title,
      image: image,
      date: `${selectedDateObj.dayName}, ${selectedDateObj.dateNum} ${selectedDateObj.monthName}`,
      time: selectedTime,
      hours: hours,
      description,
      price: basePrice,
      totalPrice: basePrice * hours,
      quantity: 1,
      gender,
      religion,
      location,
      pickup,
      drop,
      isTraveling: item.isTraveling
    };

    dispatch(addToCart(serviceItem));
    router.push('/cart');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 font-sans overflow-x-hidden">
      {/* ── Fixed Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-xl border-b border-gray-100/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all active:scale-90"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <h1 className="text-sm font-black italic tracking-tighter text-gray-900 uppercase">Service Detail</h1>
        </div>
        <div className="bg-[#457b9d]/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Zap size={14} className="text-[#457b9d] fill-current" />
          <span className="text-[10px] font-black text-[#457b9d] uppercase">Quick Book</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto w-full pt-16">
        {/* ── Hero Image ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative h-[45vh] w-full overflow-hidden"
        >
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          
          <div className="absolute bottom-10 left-6 right-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase rounded-lg mb-3 inline-block shadow-sm">
                {item.category}
              </span>
              <h2 className="text-4xl font-black italic tracking-tighter text-gray-900 leading-[0.9] drop-shadow-sm uppercase">
                {title}
              </h2>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Main Content ── */}
        <div className="px-6 -mt-6 relative z-10 space-y-10">
          
          {/* Stats Row */}
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <StatCard icon={Star} value="4.9" label="Rating" color="text-yellow-500" />
            <StatCard icon={Users} value="500+" label="Booked" color="text-[#457b9d]" />
            <StatCard icon={ShieldCheck} value="Safe" label="Verified" color="text-green-500" />
            <StatCard icon={Clock} value={item.time} label="Duration" color="text-blue-500" />
          </div>

          {/* Pricing & Info */}
          <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100 shadow-sm">
            <div className="flex items-end justify-between mb-6">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Pricing</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-gray-900">₹{basePrice}</span>
                  <span className="text-xs font-bold text-gray-400">/ per service</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-green-600 bg-green-100 px-2 py-1 rounded-md uppercase mb-1">Save 10%</span>
                <span className="text-sm font-bold text-gray-400 line-through">₹{Math.round(basePrice * 1.1)}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              Our professionals are highly trained to ensure the best experience. We guarantee 100% satisfaction and timely delivery of services.
            </p>
          </div>

          {/* Date Selector */}
          <section>
            <h3 className="text-lg font-black italic tracking-tight text-gray-900 mb-6 uppercase">Select Schedule</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {dates.map((date) => (
                <button
                  key={date.id}
                  onClick={() => setSelectedDate(date.id)}
                  className={`flex flex-col items-center min-w-[85px] py-6 rounded-3xl border-2 transition-all duration-300 ${selectedDate === date.id ? 'bg-[#457b9d] border-[#457b9d] text-white shadow-2xl shadow-[#457b9d]/30 scale-105' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest mb-2">{date.dayName}</span>
                  <span className="text-2xl font-black">{date.dateNum}</span>
                  <span className="text-[10px] font-bold mt-1 uppercase">{date.monthName}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Time Selector */}
          <section>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Pick a Time</h3>
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-4 rounded-2xl border-2 font-black text-[11px] transition-all duration-200 ${selectedTime === time ? 'bg-gray-900 border-gray-900 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-500'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>

          {/* Traveling Section */}
          {item.isTraveling && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-6"
            >
              <div className="h-[2px] w-full bg-gray-100" />
              <h3 className="text-lg font-black italic text-gray-900 uppercase">Passenger Details</h3>
              
              <div className="space-y-5">
                <InputField label="Preferred Gender" value={gender} onChange={setGender} placeholder="Male / Female / Any" />
                <InputField label="Religion" value={religion} onChange={setReligion} placeholder="e.g. Hindu, Muslim, Sikh" />
                <InputField label="Pickup Address" value={pickup} onChange={setPickup} placeholder="Where to pick up?" />
                <InputField label="Destination" value={drop} onChange={setDrop} placeholder="Where to go?" />
              </div>
            </motion.section>
          )}

          {/* Requirements */}
          <section>
            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Special Requests</h3>
            <textarea 
              className="w-full bg-gray-50 border border-gray-100 rounded-[30px] p-6 text-sm font-medium focus:ring-2 focus:ring-[#457b9d] focus:bg-white outline-none transition-all h-32"
              placeholder="Tell us more about your specific needs..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </section>

          <div className="h-20" />
        </div>
      </div>

      {/* ── Action Footer ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 p-6 z-[100] rounded-t-[40px] shadow-2xl">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Pay</span>
            <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{basePrice * hours}</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-[#457b9d] text-white py-5 rounded-[24px] font-black text-lg shadow-xl shadow-[#457b9d]/20 active:scale-95 transition-all flex items-center justify-center gap-2 group italic uppercase"
          >
            Confirm Booking
            <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, value, label, color }) => (
  <div className="flex-1 min-w-[80px] bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
    <Icon size={18} className={`${color} mb-1.5`} />
    <span className="text-sm font-black text-gray-900">{value}</span>
    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">{label}</span>
  </div>
);

const InputField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 mb-2 block">{label}</label>
    <input 
      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[#457b9d] outline-none transition-all"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ServiceDetail;
