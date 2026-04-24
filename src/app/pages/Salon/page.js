"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartRedux, removeFromCart as removeFromCartRedux } from "@/redux/cartSlice";
import { 
  Star, 
  Clock, 
  MapPin, 
  Search, 
  ChevronRight, 
  ArrowLeft, 
  Info, 
  CheckCircle2, 
  Heart, 
  Share2, 
  ShoppingCart,
  User,
  Scissors,
  Sparkles,
  Zap,
  ShieldCheck,
  Smartphone,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── DATA: SALON SERVICES ───────────────────────────────────────────────────
const SALON_CATEGORIES = [
  { id: "makeup", name: "Makeup", emoji: "💄", icon: <Sparkles className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" },
  { id: "hair", name: "Hair Care", emoji: "💇‍♀️", icon: <Scissors className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1560869713-7d0a294308ed?q=80&w=1920&auto=format&fit=crop" },
  { id: "facial", name: "Facial & Cleanup", emoji: "✨", icon: <Sparkles className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1570172619235-514f7132142d?q=80&w=2070&auto=format&fit=crop" },
  { id: "waxing", name: "Waxing & Threading", emoji: "🍯", icon: <Zap className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070&auto=format&fit=crop" },
  { id: "nails", name: "Manicure & Pedicure", emoji: "💅", icon: <Sparkles className="w-5 h-5" />, image: "https://images.unsplash.com/photo-1604654894610-df490c81726a?q=80&w=2070&auto=format&fit=crop" },
];

const MAKEUP_ARTISTS = [
  {
    id: "artist_1",
    name: "Priya Sharma",
    specialty: "Bridal & Party Makeup",
    rating: 4.9,
    reviews: 124,
    experience: "8+ Years",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    bio: "Certified bridal makeup artist specializing in HD and Airbrush makeup for weddings and high-profile events."
  },
  {
    id: "artist_2",
    name: "Ananya Iyer",
    specialty: "Editorial & Glam",
    rating: 4.8,
    reviews: 98,
    experience: "5+ Years",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    bio: "Known for creating stunning editorial looks and glamorous party makeovers that last all night."
  },
  {
    id: "artist_3",
    name: "Meera Reddy",
    specialty: "Natural & Minimalist",
    rating: 4.7,
    reviews: 156,
    experience: "6+ Years",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop",
    bio: "Focuses on enhancing natural beauty with minimalist techniques and organic skin-friendly products."
  }
];

const SALON_SERVICES = {
  makeup: [
    { _id: "m_1", name: "Party Makeup (HD)", price: 2499, time: "90 Mins", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop", description: "Flawless HD makeup for parties and events. Includes lashes and draping." },
    { _id: "m_2", name: "Bridal Makeup (Airbrush)", price: 14999, time: "180 Mins", image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935&auto=format&fit=crop", description: "Premium airbrush bridal makeup for the perfect wedding look. Includes trial, lashes, hair styling and draping." },
    { _id: "m_3", name: "Engagement Makeup", price: 5999, time: "120 Mins", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop", description: "Elegant makeup for your special engagement day." },
  ],
  hair: [
    { _id: "h_1", name: "L'Oreal Hair Spa", price: 999, time: "60 Mins", image: "https://images.unsplash.com/photo-1560869713-7d0a294308ed?q=80&w=1920&auto=format&fit=crop", description: "Nourishing hair spa treatment to restore shine and health to your hair." },
    { _id: "h_2", name: "Keratin Treatment", price: 3499, time: "150 Mins", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop", description: "Smoothing keratin treatment for frizz-free, silky hair." },
    { _id: "h_3", name: "Global Hair Color", price: 2999, time: "120 Mins", image: "https://images.unsplash.com/photo-1620331311520-246422ff83f9?q=80&w=1974&auto=format&fit=crop", description: "Full hair color transformation using premium ammonia-free colors." },
  ],
  facial: [
    { _id: "f_1", name: "O3+ Bridal Glow Facial", price: 2999, time: "90 Mins", image: "https://images.unsplash.com/photo-1570172619235-514f7132142d?q=80&w=2070&auto=format&fit=crop", description: "Advanced brightening facial for an instant bridal glow." },
    { _id: "f_2", name: "Diamond Facial", price: 1599, time: "60 Mins", image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop", description: "Luxury diamond facial for skin rejuvenation and radiance." },
  ],
  waxing: [
    { _id: "w_1", name: "Full Body Waxing (Rica)", price: 1999, time: "120 Mins", image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=2070&auto=format&fit=crop", description: "Painless Rica waxing for full body including arms, legs, and underarms." },
    { _id: "w_2", name: "Face Threading Combo", price: 199, time: "30 Mins", image: "https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?q=80&w=2070&auto=format&fit=crop", description: "Professional threading for eyebrows, upper lip, and chin." },
  ],
  nails: [
    { _id: "n_1", name: "Classic Gel Manicure", price: 799, time: "45 Mins", image: "https://images.unsplash.com/photo-1604654894610-df490c81726a?q=80&w=2070&auto=format&fit=crop", description: "Long-lasting gel manicure with your choice of color." },
    { _id: "n_2", name: "Luxury Spa Pedicure", price: 999, time: "60 Mins", image: "https://images.unsplash.com/photo-1519415510236-85591bf59286?q=80&w=2070&auto=format&fit=crop", description: "Relaxing spa pedicure with exfoliation, massage, and polish." },
  ]
};

// ─── HELPERS ────────────────────────────────────────────────────────────────
const CART_KEY = "marasimpex_cart";
function saveCart(items) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch {}
}

// ─── COMPONENT: SERVICE CARD ──────────────────────────────────────────────
function ServiceCard({ item, qty, onAdd, onInc, onDec, onOpenDetail }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group">
      <div 
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => onOpenDetail(item)}
      >
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[10px] font-bold bg-black/20 backdrop-blur-md px-2 py-1 rounded-full border border-white/20">
          <Clock size={12} />
          {item.time}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-900 leading-tight flex-1">{item.name}</h3>
          <span className="text-violet-600 font-extrabold text-lg ml-2">₹{item.price}</span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 h-8">{item.description}</p>
        
        {qty > 0 ? (
          <div className="flex items-center justify-between bg-violet-50 border border-violet-100 rounded-xl p-1">
            <button 
              onClick={onDec}
              className="w-8 h-8 flex items-center justify-center bg-white text-violet-600 rounded-lg shadow-sm font-bold hover:bg-violet-600 hover:text-white transition-colors"
            >
              −
            </button>
            <span className="font-bold text-violet-700">{qty}</span>
            <button 
              onClick={onInc}
              className="w-8 h-8 flex items-center justify-center bg-white text-violet-600 rounded-lg shadow-sm font-bold hover:bg-violet-600 hover:text-white transition-colors"
            >
              +
            </button>
          </div>
        ) : (
          <button 
            onClick={onAdd}
            className="w-full bg-violet-600 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-violet-700 active:scale-95 transition-all shadow-md shadow-violet-100"
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
}

// ─── COMPONENT: ARTIST CARD ───────────────────────────────────────────────
function ArtistCard({ artist }) {
  return (
    <div className="flex-shrink-0 w-72 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-violet-100">
          <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{artist.name}</h4>
          <p className="text-[10px] text-violet-600 font-bold uppercase tracking-wider">{artist.specialty}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold">{artist.rating}</span>
            <span className="text-[10px] text-gray-400">({artist.reviews})</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-4 line-clamp-2">{artist.bio}</p>
      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
          <Clock size={12} />
          {artist.experience} exp
        </div>
        <button className="text-violet-600 text-xs font-bold flex items-center gap-1 hover:underline">
          View Profile <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
function SalonPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const [activeCategory, setActiveCategory] = useState("makeup");
  const [detailItem, setDetailItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getQty = (id) => cartItems.find((i) => i.id === id)?.quantity || 0;

  const handleAddToCart = (item) => {
    dispatch(addToCartRedux({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: "Salon"
    }));
  };

  const handleRemoveOne = (id) => {
    dispatch(removeFromCartRedux(id));
  };

  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);
  const totalAmt = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const filteredServices = SALON_SERVICES[activeCategory].filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-32">
      {/* ── Hero Section ── */}
      <section className="relative pt-10 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10 bg-gradient-to-l from-violet-600 to-transparent rounded-bl-[100px]" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6"
            >
              <Sparkles size={14} />
              PREMIUM WOMEN'S SALON AT HOME
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-6"
            >
              Professional <br />
              <span className="text-violet-600">Makeup & Salon</span> <br />
              at Your Doorstep
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg mb-8 max-w-lg mx-auto md:mx-0"
            >
              Expert artists, premium products, and a luxury salon experience in the comfort of your home.
            </motion.p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
              {[
                { icon: <ShieldCheck className="text-green-500" />, text: "Verified Artists" },
                { icon: <CheckCircle2 className="text-blue-500" />, text: "Genuine Products" },
                { icon: <Zap className="text-yellow-500" />, text: "45-min Service" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  {item.icon}
                  {item.text}
                </div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-violet-200 rounded-3xl rotate-6 -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" 
                alt="Salon at home" 
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <Star fill="currentColor" size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold">TOP RATED</p>
                  <p className="font-black text-gray-900">4.9/5 Average</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Category Tabs ── */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-y border-gray-100 py-4 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {SALON_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all flex-shrink-0 ${
                activeCategory === cat.id 
                ? "bg-violet-600 text-white shadow-lg shadow-violet-200 scale-105" 
                : "bg-white text-gray-500 hover:bg-gray-50 border border-gray-100"
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* ── Makeup Artists Showcase ── */}
      {activeCategory === "makeup" && (
        <section className="py-12 px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl font-black text-gray-900 tracking-tight">Meet Our <span className="text-violet-600">Expert Artists</span></h3>
              <p className="text-sm text-gray-500">Certified professionals for your special day</p>
            </div>
            <button className="text-violet-600 font-bold text-sm flex items-center gap-1">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {MAKEUP_ARTISTS.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}

      {/* ── Services Grid ── */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-violet-200">
            {SALON_CATEGORIES.find(c => c.id === activeCategory)?.emoji}
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{SALON_CATEGORIES.find(c => c.id === activeCategory)?.name} Services</h3>
            <p className="text-sm text-gray-500">Premium treatments curated for you</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((item) => (
            <ServiceCard 
              key={item._id} 
              item={item} 
              qty={getQty(item._id)}
              onAdd={() => handleAddToCart(item)}
              onInc={() => handleAddToCart(item)}
              onDec={() => handleRemoveOne(item._id)}
              onOpenDetail={setDetailItem}
            />
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 px-4 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-600 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">The HelpAana <span className="text-violet-400">Promise</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">We redefine the salon experience by bringing luxury and hygiene directly to your home.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <ShieldCheck size={40} className="text-violet-400" />, title: "Hygiene First", desc: "Mono-dose kits and single-use disposables for every service." },
            { icon: <User size={40} className="text-violet-400" />, title: "Expert Professionals", desc: "Top 1% artists with minimum 5 years of verified experience." },
            { icon: <Smartphone size={40} className="text-violet-400" />, title: "Easy Booking", desc: "Book in seconds and get service at your preferred time." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="mb-6">{feature.icon}</div>
              <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Floating Cart Button ── */}
      <AnimatePresence>
        {totalQty > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-4 right-4 z-[110]"
          >
            <button 
              onClick={() => router.push("/cart")}
              className="max-w-lg mx-auto w-full bg-violet-600 text-white p-5 rounded-3xl shadow-2xl flex items-center justify-between group active:scale-95 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <ShoppingCart size={24} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-70">{totalQty} ITEMS SELECTED</p>
                  <p className="text-xl font-black">₹{totalAmt.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-black text-sm tracking-widest">
                VIEW CART
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Service Detail Modal ── */}
      <AnimatePresence>
        {detailItem && (
          <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center px-0 sm:px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="relative h-64 sm:h-80">
                <img src={detailItem.image} alt={detailItem.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setDetailItem(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <ArrowLeft className="rotate-90 sm:rotate-0" size={20} />
                </button>
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <div className="bg-violet-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg">
                    {detailItem.time}
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 leading-tight mb-2">{detailItem.name}</h2>
                    <div className="flex items-center gap-2 text-violet-600 font-bold text-sm">
                      <Sparkles size={16} />
                      Premium Service
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400 font-bold line-through">₹{detailItem.price + 500}</p>
                    <p className="text-3xl font-black text-violet-600">₹{detailItem.price}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Info size={18} className="text-violet-600" />
                    Service Details
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{detailItem.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  {getQty(detailItem._id) > 0 ? (
                    <div className="flex-1 flex items-center justify-between bg-violet-50 border border-violet-100 rounded-2xl p-2">
                      <button 
                        onClick={() => handleRemoveOne(detailItem._id)}
                        className="w-12 h-12 flex items-center justify-center bg-white text-violet-600 rounded-xl shadow-sm font-bold text-xl hover:bg-violet-600 hover:text-white transition-all"
                      >
                        −
                      </button>
                      <span className="font-black text-xl text-violet-700">{getQty(detailItem._id)}</span>
                      <button 
                        onClick={() => handleAddToCart(detailItem)}
                        className="w-12 h-12 flex items-center justify-center bg-white text-violet-600 rounded-xl shadow-sm font-bold text-xl hover:bg-violet-600 hover:text-white transition-all"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddToCart(detailItem)}
                      className="flex-1 bg-violet-600 text-white font-black py-4 rounded-2xl text-base shadow-xl shadow-violet-200 hover:bg-violet-700 active:scale-95 transition-all"
                    >
                      ADD TO CART
                    </button>
                  )}
                  <button className="w-14 h-14 border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                    <Heart size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SalonPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="w-16 h-16 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SalonPageInner />
    </Suspense>
  );
}
