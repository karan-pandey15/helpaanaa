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
  const emoji = searchParams.get('emoji') || '✨';
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
    <div className="flex flex-col min-h-screen bg-white font-sans overflow-hidden">
      {/* ── Fixed Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all active:scale-95 hover:shadow-md"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
          <h1 className="text-sm font-black italic tracking-tighter text-gray-900 uppercase">Service Detail</h1>
        </div>
        <div className="bg-[#457b9d]/10 px-4 py-2 rounded-full flex items-center gap-2">
          <Zap size={14} className="text-[#457b9d] fill-current" />
          <span className="text-[10px] font-black text-[#457b9d] uppercase tracking-wider">Quick Book</span>
        </div>
      </nav>

      {/* ── Main Container: Side-by-Side on Desktop ── */}
      <div className="flex-1 flex flex-col lg:flex-row pt-16 lg:pt-20">
        
        {/* ── LEFT SIDE: Image Section ── */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-[45%] h-[40vh] lg:h-[calc(100vh-5rem)] lg:sticky lg:top-20 relative bg-gradient-to-br from-violet-50 to-blue-50"
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Background Emoji */}
            <div className="absolute inset-0 flex items-center justify-center text-8xl lg:text-9xl z-0 opacity-20">
              {emoji}
            </div>
            
            {/* Main Image */}
            <img 
              src={image} 
              alt={title}
              className="absolute inset-0 w-full h-full object-cover z-10"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20" />
            
            {/* Title Overlay on Image */}
            <div className="absolute bottom-8 left-6 right-6 z-30">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="px-3 py-1.5 bg-yellow-400 text-black text-[10px] font-black uppercase mb-3 inline-block rounded shadow-lg">
                  {item.category}
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black italic tracking-tighter text-white leading-[0.95] uppercase drop-shadow-2xl">
                  {title}
                </h2>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT SIDE: Content Section ── */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-[55%] bg-white"
        >
          <div className="p-6 lg:p-8 space-y-6 lg:space-y-8 pb-32 lg:pb-24">
            
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3">
              <StatCard icon={Star} value="4.9" label="Rating" color="text-yellow-500" />
              <StatCard icon={Users} value="500+" label="Booked" color="text-[#457b9d]" />
              <StatCard icon={ShieldCheck} value="Safe" label="Verified" color="text-green-500" />
              <StatCard icon={Clock} value={item.time} label="Duration" color="text-blue-500" />
            </div>

            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Total Pricing</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl lg:text-5xl font-black text-gray-900">₹{basePrice}</span>
                    <span className="text-xs font-bold text-gray-500">/ service</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase">Save 10%</span>
                  <span className="text-sm font-bold text-gray-400 line-through mt-1">₹{Math.round(basePrice * 1.1)}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Our professionals are highly trained to ensure the best experience. We guarantee 100% satisfaction and timely delivery of services.
              </p>
            </div>

            {/* Date Selector */}
            <section>
              <h3 className="text-base font-black italic tracking-tight text-gray-900 mb-4 uppercase flex items-center gap-2">
                <Calendar size={18} />
                Select Schedule
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {dates.map((date) => (
                  <button
                    key={date.id}
                    onClick={() => setSelectedDate(date.id)}
                    className={`flex flex-col items-center min-w-[75px] py-4 px-3 rounded-xl border-2 transition-all duration-300 ${
                      selectedDate === date.id 
                        ? 'bg-[#457b9d] border-[#457b9d] text-white scale-105 shadow-lg' 
                        : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase tracking-wider mb-1">{date.dayName}</span>
                    <span className="text-2xl font-black">{date.dateNum}</span>
                    <span className="text-[9px] font-bold mt-0.5 uppercase">{date.monthName}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Time Selector */}
            <section>
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                <Clock size={16} />
                Pick a Time
              </h3>
              <div className="grid grid-cols-3 gap-2.5">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3.5 px-2 rounded-lg border-2 font-black text-[11px] transition-all duration-200 ${
                      selectedTime === time 
                        ? 'bg-gray-900 border-gray-900 text-white shadow-lg scale-105' 
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:shadow-md'
                    }`}
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
                className="space-y-4 pt-4 border-t-2 border-gray-100"
              >
                <h3 className="text-base font-black italic text-gray-900 uppercase flex items-center gap-2">
                  <Users size={18} />
                  Passenger Details
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Preferred Gender" value={gender} onChange={setGender} placeholder="Male / Female / Any" />
                  <InputField label="Religion" value={religion} onChange={setReligion} placeholder="e.g. Hindu, Muslim" />
                  <InputField label="Pickup Address" value={pickup} onChange={setPickup} placeholder="Where to pick up?" />
                  <InputField label="Destination" value={drop} onChange={setDrop} placeholder="Where to go?" />
                </div>
              </motion.section>
            )}

            {/* Requirements */}
            <section>
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Special Requests</h3>
              <textarea 
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-[#457b9d] focus:border-[#457b9d] focus:bg-white outline-none transition-all resize-none"
                placeholder="Tell us more about your specific needs..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </section>
          </div>
        </motion.div>
      </div>

      {/* ── Action Footer ── */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-[45%] bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 lg:p-6 z-[100] shadow-lg">
        <div className="max-w-full mx-auto flex items-center justify-between gap-4 lg:gap-6">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Total Pay</span>
            <span className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tighter">₹{basePrice * hours}</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-[#457b9d] to-[#1d3557] text-white py-4 px-6 rounded-xl font-black text-base lg:text-lg active:scale-95 transition-all flex items-center justify-center gap-2 group italic uppercase shadow-lg hover:shadow-xl"
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
  <div className="flex-1 min-w-0 bg-white p-3 lg:p-4 rounded-xl border border-gray-200 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow">
    <Icon size={16} className={`${color} mb-1`} />
    <span className="text-xs lg:text-sm font-black text-gray-900 truncate">{value}</span>
    <span className="text-[8px] lg:text-[9px] font-bold text-gray-400 uppercase tracking-tighter truncate">{label}</span>
  </div>
);

const InputField = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 block">{label}</label>
    <input 
      className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#457b9d] focus:border-[#457b9d] outline-none transition-all"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default ServiceDetail;