"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
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
  FileText,
  Clipboard,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const LadiesServiceDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const title = searchParams.get('title') || 'Health Issue Details';
  const image = searchParams.get('image') || '/image/lifestyle.png';
  const emoji = searchParams.get('emoji') || '🩺';
  const price = Number(searchParams.get('price') || 499);
  const description = searchParams.get('description') || 'Consultation for women health issues.';
  const category = searchParams.get('category') || 'Gynecologist';
  const serviceId = searchParams.get('id') || `ladies_${Date.now()}`;

  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [consultationType, setConsultationType] = useState('hospital'); // 'online' or 'hospital'
  const [dates, setDates] = useState([]);

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
      });
    }
    setDates(nextDates);
  };

  const handleBooking = () => {
    if (!selectedTime) return alert('Please select a preferred time for consultation');
    
    const selectedDateObj = dates.find(d => d.id === selectedDate);
    const serviceItem = {
      id: serviceId,
      name: `${title} (${consultationType === 'online' ? 'Online Consulting' : 'Hospital Visit'})`,
      image: image,
      date: `${selectedDateObj.dayName}, ${selectedDateObj.dateNum} ${selectedDateObj.monthName}`,
      time: selectedTime,
      price: price,
      consultationType: consultationType,
      quantity: 1,
      category: category,
      emoji: emoji
    };

    dispatch(addToCart(serviceItem));
    router.push('/cart');
  };

  const prescriptionData = [
    { med: "Tab. Mefkind-Spas", dose: "1-0-1", duration: "3 Days", instruction: "After food" },
    { med: "Tab. Folvite 5mg", dose: "0-1-0", duration: "1 Month", instruction: "Daily afternoon" },
    { med: "Syp. Hemfer", dose: "2 tsp", duration: "1 Month", instruction: "Twice daily after meals" },
  ];

  const adviceList = [
    "Drink at least 3-4 liters of water daily.",
    "Maintain a balanced diet rich in iron and calcium.",
    "Avoid spicy and oily food during peak symptoms.",
    "Perform light exercise/yoga for 30 mins daily.",
    "Follow up with the doctor in 15 days or if symptoms persist."
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* ── Fixed Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-pink-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()}
            className="p-2.5 bg-pink-50 hover:bg-pink-100 rounded-lg transition-all active:scale-95"
          >
            <ArrowLeft size={20} className="text-pink-600" />
          </button>
          <h1 className="text-sm font-black italic tracking-tighter text-gray-900 uppercase">Consultation Detail</h1>
        </div>
        <div className="bg-pink-500/10 px-4 py-2 rounded-full flex items-center gap-2">
          <Zap size={14} className="text-pink-600 fill-current" />
          <span className="text-[10px] font-black text-pink-600 uppercase tracking-wider">Fast Booking</span>
        </div>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row pt-20">
        
        {/* ── LEFT SIDE: Image Section ── */}
        <div className="w-full lg:w-[45%] h-[40vh] lg:h-[calc(100vh-5rem)] lg:sticky lg:top-20 relative bg-pink-50">
          <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center p-10">
            <div className="absolute inset-0 flex items-center justify-center text-9xl z-0 opacity-10">
              {emoji}
            </div>
            <img 
              src={image} 
              alt={title}
              className="relative z-10 w-full h-full object-contain"
            />
            <div className="absolute bottom-8 left-6 right-6 z-30">
              <span className="px-3 py-1.5 bg-pink-600 text-white text-[10px] font-black uppercase mb-3 inline-block rounded shadow-lg">
                {category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black italic tracking-tighter text-gray-900 leading-[0.95] uppercase drop-shadow-sm">
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDE: Content Section ── */}
        <div className="w-full lg:w-[55%] bg-white">
          <div className="p-6 lg:p-8 space-y-8 pb-32">
            
            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center justify-center">
                <Star className="text-yellow-500 mb-1" size={16} />
                <span className="text-xs font-black">4.9</span>
                <span className="text-[8px] text-gray-400 font-bold uppercase">Rating</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center justify-center">
                <Users className="text-pink-600 mb-1" size={16} />
                <span className="text-xs font-black">2k+</span>
                <span className="text-[8px] text-gray-400 font-bold uppercase">Consulted</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center justify-center">
                <ShieldCheck className="text-green-500 mb-1" size={16} />
                <span className="text-xs font-black">Safe</span>
                <span className="text-[8px] text-gray-400 font-bold uppercase">Verified</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl flex flex-col items-center justify-center">
                <Clock className="text-blue-500 mb-1" size={16} />
                <span className="text-xs font-black">30m</span>
                <span className="text-[8px] text-gray-400 font-bold uppercase">Session</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-pink-50 p-5 rounded-2xl border border-pink-100">
              <div className="flex items-center gap-2 mb-2">
                <Info size={16} className="text-pink-600" />
                <h3 className="text-sm font-black uppercase text-pink-700 italic">Medical Concern</h3>
              </div>
              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                {description} Our specialists provide compassionate care and evidence-based treatments tailored to your unique needs.
              </p>
            </div>

            {/* Resolution Process */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black italic tracking-tight text-gray-900 uppercase flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-pink-600" />
                  How we resolve it
                </h3>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">3 Simple Steps</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { title: "Book Slot", desc: "Choose Online or Visit", icon: "🗓️" },
                  { title: "Consult", desc: "Talk to Specialist", icon: "👩‍⚕️" },
                  { title: "Resolve", desc: "Prescription & Care", icon: "✨" },
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="text-2xl mb-2">{step.icon}</div>
                    <h4 className="text-[10px] font-black uppercase text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-[9px] text-gray-500 font-bold leading-tight">{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Prescription Preview (Dummy Data) */}
            <section className="border-2 border-dashed border-pink-200 rounded-2xl p-5 bg-white shadow-sm">
              <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <h3 className="text-base font-black italic tracking-tight text-gray-900 uppercase flex items-center gap-2">
                  <Clipboard size={18} className="text-pink-600" />
                  Prescription Preview
                </h3>
                <span className="text-[9px] font-black bg-pink-100 text-pink-600 px-2 py-1 rounded uppercase">Sample Only</span>
              </div>
              
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] sm:text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 uppercase">
                        <th className="py-2 font-black">Medicine</th>
                        <th className="py-2 font-black">Dosage</th>
                        <th className="py-2 font-black">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {prescriptionData.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-50">
                          <td className="py-3 font-bold">{item.med}</td>
                          <td className="py-3 font-medium">{item.dose}</td>
                          <td className="py-3 font-medium">{item.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 bg-yellow-50 p-3 rounded-lg flex gap-3 items-start">
                  <AlertCircle size={14} className="text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-[10px] font-black text-yellow-700 uppercase mb-1">General Advice</h4>
                    <ul className="text-[10px] text-yellow-800 list-disc list-inside font-medium space-y-1">
                      {adviceList.map((advice, idx) => (
                        <li key={idx}>{advice}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Consultation Type Selector */}
            <section className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
              <h3 className="text-base font-black italic tracking-tight text-gray-900 mb-4 uppercase flex items-center gap-2">
                <Info size={18} className="text-pink-600" />
                Select Consultation Type
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setConsultationType('online')}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                    consultationType === 'online'
                      ? 'bg-pink-50 border-pink-600 text-pink-600 shadow-sm'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-pink-200'
                  }`}
                >
                  <div className={`p-3 rounded-full mb-2 ${consultationType === 'online' ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Zap size={20} />
                  </div>
                  <span className="font-black text-[11px] uppercase tracking-tight text-center">Online Consulting</span>
                  <span className="text-[9px] font-bold mt-1 opacity-70 uppercase tracking-widest">Video Call / Chat</span>
                </button>

                <button
                  onClick={() => setConsultationType('hospital')}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                    consultationType === 'hospital'
                      ? 'bg-blue-50 border-blue-600 text-blue-600 shadow-sm'
                      : 'bg-white border-gray-100 text-gray-400 hover:border-blue-100'
                  }`}
                >
                  <div className={`p-3 rounded-full mb-2 ${consultationType === 'hospital' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <MapPin size={20} />
                  </div>
                  <span className="font-black text-[11px] uppercase tracking-tight text-center">Hospital Visit</span>
                  <span className="text-[9px] font-bold mt-1 opacity-70 uppercase tracking-widest">Physical Checkup</span>
                </button>
              </div>
            </section>

            {/* Date Selector */}
            <section>
              <h3 className="text-base font-black italic tracking-tight text-gray-900 mb-4 uppercase flex items-center gap-2">
                <Calendar size={18} />
                Schedule Consultation
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {dates.map((date) => (
                  <button
                    key={date.id}
                    onClick={() => setSelectedDate(date.id)}
                    className={`flex flex-col items-center min-w-[75px] py-4 px-3 rounded-xl border-2 transition-all duration-300 ${
                      selectedDate === date.id 
                        ? 'bg-pink-600 border-pink-600 text-white scale-105 shadow-lg' 
                        : 'bg-white border-gray-100 text-gray-400 hover:border-pink-200'
                    }`}
                  >
                    <span className="text-[9px] font-black uppercase mb-1">{date.dayName}</span>
                    <span className="text-2xl font-black">{date.dateNum}</span>
                    <span className="text-[9px] font-bold mt-0.5 uppercase">{date.monthName}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Time Selector */}
            <section>
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">Available Time Slots</h3>
              <div className="grid grid-cols-3 gap-2.5">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-3.5 px-2 rounded-lg border-2 font-black text-[11px] transition-all duration-200 ${
                      selectedTime === time 
                        ? 'bg-gray-900 border-gray-900 text-white shadow-lg' 
                        : 'bg-white border-gray-100 text-gray-500 hover:border-pink-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </section>

            {/* Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 flex items-center justify-between gap-4 lg:relative lg:border-none lg:p-0">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Consultation Fee</span>
                <span className="text-2xl font-black text-pink-600">₹{price}</span>
              </div>
              <button 
                onClick={handleBooking}
                className="flex-1 max-w-xs bg-pink-600 text-white font-black py-4 rounded-xl shadow-xl shadow-pink-200 active:scale-95 transition-all uppercase tracking-widest text-sm"
              >
                Confirm Booking
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default LadiesServiceDetail;
