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
  Zap,
  Car,
  MessageSquare,
  Send,
  Share2,
  Heart,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceDetail = ({ 
  title: propTitle, 
  image: propImage, 
  basePrice: propBasePrice, 
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
    description: searchParams.get('description') || 'Experience professional and high-quality service tailored to your needs. Our experts ensure every detail is handled with care.',
    category: searchParams.get('category') || 'Premium Service',
    time: searchParams.get('duration') || '1-2 Hours',
    hour: searchParams.get('hours') || '9 AM - 6 PM',
    isTraveling: searchParams.get('isTraveling') === 'true',
    withVehicle: searchParams.get('withVehicle') === 'true',
    suggestion: searchParams.get('suggestion') || 'Highly recommended for quality results.'
  };

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [hours, setHours] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState(item.description || '');
  const [dates, setDates] = useState([]);
  const [additionalRequest, setAdditionalRequest] = useState('');

  // Traveling Details
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('');
  const [location, setLocation] = useState('');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  
  // Vehicle Details
  const [vehicleType, setVehicleType] = useState('Four Wheeler');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const timeSlots = [
    '09:00 AM', '11:00 AM', '01:00 PM',
    '03:00 PM', '05:00 PM', '07:00 PM',
  ];

  useEffect(() => {
    generateDates();
  }, [title]);

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
      totalPrice: basePrice * hours * quantity,
      quantity: quantity,
      gender,
      religion,
      location,
      pickup,
      drop,
      vehicleType: item.withVehicle ? vehicleType : null,
      vehicleNumber: item.withVehicle ? vehicleNumber : null,
      isTraveling: item.isTraveling,
      withVehicle: item.withVehicle,
      additionalRequest
    };

    dispatch(addToCart(serviceItem));
    router.push('/cart');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
      {/* ── Top Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="hidden sm:flex items-center text-xs text-gray-500 gap-2">
            <span>Services</span>
            <ChevronRight size={12} />
            <span>{item.category}</span>
            <ChevronRight size={12} />
            <span className="font-bold text-gray-800">{title}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Share2 size={20} className="text-gray-600 cursor-pointer hover:text-[#004090]" />
          <Heart size={20} className="text-gray-600 cursor-pointer hover:text-red-500" />
          <button onClick={() => router.push('/cart')} className="relative">
            <ShoppingCart size={22} className="text-gray-700 hover:text-[#004090]" />
            <span className="absolute -top-2 -right-2 bg-[#004090] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">0</span>
          </button>
        </div>
      </nav>

      {/* ── Main Content Area ── */}
      <div className="flex-1 max-w-[1500px] mx-auto w-full pt-16 pb-32">
        <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-6 lg:p-8">
          
          {/* ── Left Column: Title & Image Flow ── */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6">
            
            {/* 1. Heading (Title) at the Top */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight">
                {title}
              </h1>
            </div>

            {/* 2. Image below the Heading */}
            <div className="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden relative group">
              <img 
                src={image} 
                alt={title}
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#004090] text-white px-2 py-1 text-[10px] font-bold rounded shadow-sm">
                Top Rated
              </div>
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-16 h-16 border rounded cursor-pointer p-1 ${i === 1 ? 'border-[#004090] ring-1 ring-[#004090]' : 'border-gray-200 hover:border-[#004090]'}`}>
                  <img src={image} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>

            {/* 3. Description below the Image */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900">About this service</h3>
              <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* 4. Add more thing section at the last */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                <Info size={16} className="text-[#004090]" />
                Additional Requests?
              </h4>
              <textarea 
                value={additionalRequest}
                onChange={(e) => setAdditionalRequest(e.target.value)}
                placeholder="Need something extra? Let us know here..."
                className="w-full bg-white border border-gray-300 rounded p-3 text-sm focus:ring-1 focus:ring-[#004090] focus:border-[#004090] outline-none transition-all resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* ── Center Column: Info & Details ── */}
          <div className="w-full lg:w-[35%] space-y-6 border-b lg:border-b-0 pb-8 pt-0 lg:pt-14">
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-[#004090] text-white px-2 py-0.5 text-[10px] font-bold rounded">HelpAana Choice</span>
              <span className="text-gray-500">for "{title}"</span>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-light text-red-700">-10%</span>
                <div className="flex items-start">
                  <span className="text-sm mt-1 font-medium">₹</span>
                  <span className="text-3xl font-medium">{basePrice}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">M.R.P.: <span className="line-through">₹{Math.round(basePrice * 1.1)}</span></p>
              <div className="bg-gray-100 p-2 rounded inline-block text-[11px] font-bold text-gray-700 border border-gray-200">
                Inclusive of all taxes
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-4">
              <FeatureItem icon={CheckCircle2} label="Verified" color="text-green-600" />
              <FeatureItem icon={ShieldCheck} label="Safe" color="text-[#004090]" />
              <FeatureItem icon={Zap} label="Quick" color="text-yellow-600" />
              <FeatureItem icon={Clock} label={item.time} color="text-gray-600" />
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-6">
              <section>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Calendar size={18} />
                  Choose Date
                </h3>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map((date) => (
                    <button
                      key={date.id}
                      onClick={() => setSelectedDate(date.id)}
                      className={`flex flex-col items-center min-w-[60px] p-2 rounded border transition-all ${
                        selectedDate === date.id 
                          ? 'border-[#004090] bg-blue-50 ring-1 ring-[#004090]' 
                          : 'border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-[10px] uppercase text-gray-500 font-bold">{date.dayName}</span>
                      <span className="text-lg font-bold">{date.dateNum}</span>
                      <span className="text-[10px] uppercase text-gray-500">{date.monthName}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Clock size={18} />
                  Pick Time
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 rounded border text-xs font-bold transition-all ${
                        selectedTime === time 
                          ? 'border-[#004090] bg-blue-50 ring-1 ring-[#004090]' 
                          : 'border-gray-300 bg-white hover:bg-gray-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </section>

              {(item.isTraveling || item.withVehicle) && (
                <div className="space-y-4 pt-4 bg-gray-50 p-4 rounded border border-gray-200">
                  {item.isTraveling && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Service Logistics</h4>
                      <input 
                        type="text" 
                        placeholder="Pickup Location" 
                        className="w-full text-sm p-2 border border-gray-300 rounded"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                      />
                      <input 
                        type="text" 
                        placeholder="Drop Location" 
                        className="w-full text-sm p-2 border border-gray-300 rounded"
                        value={drop}
                        onChange={(e) => setDrop(e.target.value)}
                      />
                    </div>
                  )}
                  {item.withVehicle && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Vehicle Info</h4>
                      <select 
                        className="w-full text-sm p-2 border border-gray-300 rounded"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                      >
                        <option value="Two Wheeler">Two Wheeler</option>
                        <option value="Four Wheeler">Four Wheeler</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Right Column: Buy Box ── */}
          <div className="w-full lg:w-[25%] pt-0 lg:pt-14">
            <div className="lg:sticky lg:top-24 border border-gray-200 rounded-lg p-4 space-y-4 shadow-sm bg-white">
              <div className="text-2xl font-medium">₹{basePrice * hours * quantity}</div>
              
              <div className="space-y-3 pt-2">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#004090] hover:bg-[#003070] text-white py-2.5 rounded-full font-medium text-sm border border-[#004090] shadow-sm transition-all"
                >
                  Book Now
                </button>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Service from</span>
                  <span className="text-[#004090] font-bold">HelpAana</span>
                </div>
                <div className="text-[10px] text-gray-400 text-center pt-2">
                  * 100% Secure Transaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ icon: Icon, label, color }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
      <Icon size={18} className={color} />
    </div>
    <span className="text-[10px] text-gray-600 font-medium text-center">{label}</span>
  </div>
);

export default ServiceDetail;
