"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartRedux, removeFromCart as removeFromCartRedux } from "@/redux/cartSlice";

// ─── CATEGORIES CONFIG ───────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "Attendant",
    name: "Physiotherapist",
    endpoint: "https://api.marasimpex.com/api/services/category/physiotherapist",
    emoji: "/image/physiotherapist.png",
  }, 
];

// ─── STATIC SERVICE DATA ─────────────────────────────────────────────────────
const STATIC_SERVICES = {
  TravelingAttendant: [
    {
      _id: "traveling_attendant_1",
      name: "Book Traveling Attendant",  
      price: 999,
      description:
        "Professional attendant for traveling needs. Includes support for gender, religion reference, and location selection.",
      emoji: "/image/physiotherapist.png",
      isTraveling: true,
    },
    {
      _id: "traveling_vehicle_1",
      name: "Traveling with Vehicle",
      price: 2499,
      description:
        "Professional attendant for traveling with vehicle. Support for Two Wheeler and Four Wheeler.",
      emoji: "/image/physiotherapist.png",
      isTraveling: true,
      withVehicle: true,
    },
  ],
};

// ─── localStorage HELPERS ────────────────────────────────────────────────────
const CART_KEY = "marasimpex_cart";
const USER_KEY = "marasimpex_user";

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {}
}
function loadUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ─── EMOJI HELPER ────────────────────────────────────────────────────────────
const SERVICE_EMOJIS = ["🙏", "⭐", "🌸", "🪔", "🌺", "🔔", "🕉️", "✨"];
function getServiceEmoji(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++)
    hash = (hash * 31 + id.charCodeAt(i)) % SERVICE_EMOJIS.length;
  return SERVICE_EMOJIS[Math.abs(hash) % SERVICE_EMOJIS.length];
}

function renderEmojiOrImage(emoji, id, className = "") {
  if (!emoji) emoji = getServiceEmoji(id);
  if (emoji?.startsWith("/")) {
    return (
      <img 
        src={emoji} 
        alt="service" 
        className={className}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }
  return <span className={className}>{emoji}</span>;
}

// ─── CART BUTTON ─────────────────────────────────────────────────────────────
function CartButton({ cartItems, onViewCart }) {
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);
  const totalAmt = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  if (totalQty === 0) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <button
        onClick={onViewCart}
        className="pointer-events-auto w-full max-w-4xl mx-auto flex items-center justify-between bg-violet-600 text-white px-5 py-3 active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-2">
          <span className="bg-white text-violet-600 font-bold text-xs w-6 h-6 flex items-center justify-center">
            {totalQty}
          </span>
          <span className="font-semibold text-sm">View Cart 🛒</span>
        </div>
        <span className="font-bold text-sm">
          ₹{totalAmt.toLocaleString("en-IN")}
        </span>
      </button>
    </div>
  );
}

// ─── SEARCH OVERLAY ───────────────────────────────────────────────────────────
function SearchOverlay({ services, onClose, onSelectService }) {
  const [query, setQuery] = useState("");
  const allServices = Object.values(services).flat();
  const filtered = query.trim()
    ? allServices.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
        <button onClick={onClose}>
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <input
          autoFocus
          className="flex-1 text-sm outline-none placeholder-gray-400"
          placeholder="Search services..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button onClick={() => setQuery("")}>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {query.trim() === "" && (
          <p className="text-center text-gray-400 text-sm mt-10">
            Type to search services…
          </p>
        )}
        {filtered.length === 0 && query.trim() !== "" && (
          <p className="text-center text-gray-400 text-sm mt-10">
            No results for &quot;{query}&quot;
          </p>
        )}
        {filtered.map((item) => (
          <button
            key={item._id}
            onClick={() => {
              onSelectService(item);
              onClose();
            }}
            className="w-full flex items-center gap-3 py-3 border-b border-gray-100 text-left"
          >
            <div className="w-10 h-10 bg-violet-50 flex items-center justify-center text-xl flex-shrink-0 overflow-hidden">
              {renderEmojiOrImage(item.emoji, item._id, "w-full h-full object-cover")}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
              <p className="text-xs text-violet-600 font-bold">
                ₹{item.price?.toLocaleString("en-IN")}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SERVICE DETAIL MODAL ────────────────────────────────────────────────────
function ServiceDetailModal({ item, qty, onClose, onAdd, onInc, onDec }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-video bg-violet-50 flex items-center justify-center text-8xl overflow-hidden">
          <div className="absolute inset-0">
            {renderEmojiOrImage(item.emoji, item._id, "w-full h-full object-cover")}
            {(item.images?.[0]?.url || item.image) && (
              <img 
                src={item.images?.[0]?.url || item.image} 
                alt={item.name}
                className="w-full h-full object-cover absolute inset-0"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-colors border border-white/30"
          >
            ✕
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900 leading-tight mb-2">{item.name}</h2>
              <div className="flex items-center gap-3">
                <span className="bg-violet-100 text-violet-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">Professional</span>
                {item.time && (
                  <span className="text-xs text-gray-400 font-bold flex items-center gap-1">
                    ⏱ {item.time} Duration
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-violet-600 block">₹{item.price?.toLocaleString("en-IN")}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">All inclusive</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{item.description || "Expert physiotherapy session tailored to your needs. Our certified professionals ensure the best care in the comfort of your home."}</p>
          </div>

          <div className="space-y-4">
            {qty > 0 ? (
              <div className="flex items-center justify-between bg-violet-600 rounded-2xl p-2 shadow-xl shadow-violet-200">
                <button
                  onClick={onDec}
                  className="text-white text-3xl font-bold w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                >
                  −
                </button>
                <div className="flex flex-col items-center">
                  <span className="text-white font-black text-xl leading-none">{qty}</span>
                  <span className="text-white/60 text-[10px] font-bold uppercase mt-1">Items in cart</span>
                </div>
                <button
                  onClick={onInc}
                  className="text-white text-3xl font-bold w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={onAdd}
                className="w-full bg-gray-900 hover:bg-violet-600 text-white font-black py-5 rounded-2xl text-base transition-all duration-300 shadow-lg hover:shadow-violet-200 transform hover:-translate-y-1"
              >
                ADD TO CART
              </button>
            )}
            
            <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest py-2">
              Secure Booking • Professional Experts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INNER COMPONENT — uses useSearchParams (must be inside Suspense) ─────────
function AllCategoryInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams?.get("categoryId");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [user, setUser] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [apiErrors, setApiErrors] = useState({});

  // Hydrate from localStorage (client only)
  useEffect(() => {
    setUser(loadUser());
  }, []);

  // Set initial selected category from query param
  useEffect(() => {
    const found = categoryId
      ? CATEGORIES.find((c) => c.id === categoryId)
      : null;
    setSelectedCategory(found || CATEGORIES[0]);
  }, [categoryId]);

  // Fetch all services from API + static data
  const fetchAllServices = useCallback(async () => {
    setLoading(true);
    const errors = {};

    const results = await Promise.allSettled(
      CATEGORIES.map(async (cat) => {
        if (STATIC_SERVICES[cat.id]) {
          return { id: cat.id, services: STATIC_SERVICES[cat.id] };
        }
        if (cat.endpoint) {
          try {
            const res = await fetch(cat.endpoint, {
              cache: "no-store",
              headers: { Accept: "application/json" },
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const list = Array.isArray(data)
              ? data
              : data.services || data.data || data.gyms || [];
            
            // Map price if missing (e.g., Gym has monthlyPrice)
            const mappedList = list.map(item => ({
              ...item,
              price: item.price || item.monthlyPrice || 0
            }));
            return { id: cat.id, services: mappedList };
          } catch (err) {
            errors[cat.id] = err.message;
            return { id: cat.id, services: [] };
          }
        }
        return { id: cat.id, services: [] };
      })
    );

    const map = {};
    results.forEach((r) => {
      if (r.status === "fulfilled") {
        map[r.value.id] = r.value.services;
      }
    });

    setServices(map);
    setApiErrors(errors);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllServices();
  }, [fetchAllServices]);

  // ── Cart helpers ────────────────────────────────────────────────────────────
  const getQty = (id) => cartItems.find((i) => i.id === id)?.quantity || 0;

  const addToCart = (item) => {
    const emoji = item.emoji || getServiceEmoji(item._id);
    dispatch(addToCartRedux({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image || null,
      emoji: emoji,
    }));
  };

  const incrementQty = (id) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      dispatch(addToCartRedux({
        id: item.id,
        name: item.name,
        price: item.price,
      }));
    }
  };

  const decrementQty = (id) => {
    dispatch(removeFromCartRedux(id));
  };

  const currentServices = selectedCategory
    ? services[selectedCategory.id] || []
    : [];

  const handleServiceClick = (item) => {
    let imageUrl = null;
    if (Array.isArray(item.images) && item.images.length > 0) {
      imageUrl = typeof item.images[0] === 'string' ? item.images[0] : item.images[0].url;
    } else {
      imageUrl = item.image || item.images?.[0]?.url || item.images?.[0];
    }

    if (!imageUrl && item.emoji?.startsWith("/")) {
      imageUrl = item.emoji;
    }
    if (!imageUrl) {
      imageUrl = "https://images.unsplash.com/photo-1584512603392-f0c3d99c1ce0?q=80&w=800";
    }
    const emoji = (item.emoji && !item.emoji.startsWith("/")) ? item.emoji : getServiceEmoji(item._id);
    
    // Prepare working hours for Gym
    let hours = item.time || "9 AM - 6 PM";
    if (item.workingHours) {
      hours = `${item.workingHours.from} - ${item.workingHours.to}`;
    }

    const params = new URLSearchParams({
      title: item.name,
      price: item.price,
      description: item.description || "",
      category: selectedCategory?.name || "Service",
      isTraveling: item.isTraveling ? "true" : "false",
      withVehicle: item.withVehicle ? "true" : "false",
      image: imageUrl,
      emoji: emoji,
      hours: hours,
      duration: item.monthlyPrice ? "Monthly" : (item.time || "1 Hour"),
    });
    router.push(`/pages/ServiceDetail?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white relative">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100 sticky top-0 z-30 w-full shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all active:scale-90"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-none">Physiotherapy Services</h1>
            <p className="text-[10px] text-violet-600 font-medium tracking-wide uppercase mt-1">Professional Care at Home</p>
          </div>
        </div>
        <button
          onClick={() => setSearchOpen(true)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50 text-violet-600 hover:bg-violet-100 transition-all active:scale-90"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </button>
      </div>

      {/* ── USER BADGE ── */}
      {user && (
        <div className="mx-4 mt-3 px-4 py-2 bg-gradient-to-r from-violet-50 to-transparent rounded-lg flex items-center gap-2 text-xs text-violet-700 font-semibold border-l-4 border-violet-500">
          <span>👋</span>
          <span>Welcome, {user.name || user.email || "User"}</span>
        </div>
      )}

      {/* ── LOADER ── */}
      {loading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-400">Loading our expert services…</p>
        </div>
      ) : (
        <div
          className="flex flex-1 overflow-hidden"
          style={{ height: "calc(100vh - 80px)" }}
        >
          {/* ── SIDEBAR ── */}
          <div className="w-[120px] lg:w-[180px] flex-shrink-0 bg-white border-r border-gray-100 overflow-y-auto flex flex-col">
            {/* Featured Image in Sidebar */}
            <div className="p-3 mb-2">
              <div className="rounded-2xl overflow-hidden shadow-md border-2 border-violet-100 aspect-[4/5] bg-violet-50 relative group">
                <img 
                  src="/image/physiotherapist.png" 
                  alt="Physiotherapist"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="px-2 space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory?.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex flex-col items-center py-4 px-2 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-200 translate-x-1" 
                        : "text-gray-600 hover:bg-violet-50 hover:text-violet-600"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 flex items-center justify-center text-2xl mb-2 rounded-xl transition-all ${
                        isActive
                          ? "bg-white/20 scale-110"
                          : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      {cat.emoji?.startsWith("/") ? (
                        <img src={cat.emoji} alt={cat.name} className="w-8 h-8 object-contain" />
                      ) : (
                        cat.emoji
                      )}
                    </div>
                    <span
                      className={`text-[10px] lg:text-xs text-center font-bold leading-tight uppercase tracking-wider ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {cat.name}
                    </span>
                    {apiErrors[cat.id] && (
                      <span className="text-[9px] text-red-400 mt-1 font-bold animate-pulse">
                        Offline
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Support Info in Sidebar */}
            <div className="mt-auto p-4 hidden lg:block">
              <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                <p className="text-[10px] font-bold text-violet-700 uppercase mb-1">Need Help?</p>
                <p className="text-[9px] text-violet-600 leading-tight">Consult with our specialists today.</p>
              </div>
            </div>
          </div>

          {/* ── SERVICES GRID ── */}
          <div className="flex-1 bg-[#fcfaff] overflow-y-auto pb-32">
            <div className="max-w-7xl mx-auto p-4 lg:p-8">
              {selectedCategory && (
                <div className="mb-8 flex items-end justify-between border-b border-violet-100 pb-4">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                      <span className="w-2 h-8 bg-violet-600 rounded-full inline-block" />
                      {selectedCategory.name}
                    </h2>
                    <p className="text-sm text-gray-500 font-medium mt-1 ml-4">
                      {currentServices.length} Expert Services Available
                    </p>
                  </div>
                  {apiErrors[selectedCategory.id] && (
                    <div className="flex items-center gap-2 text-xs text-red-500 font-bold bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                      </span>
                      API Connection Error
                    </div>
                  )}
                </div>
              )}

              {currentServices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner">📭</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">No Services Found</h3>
                  <p className="text-gray-400 text-sm max-w-xs mx-auto mb-8 leading-relaxed">
                    We couldn't find any services in this category at the moment.
                  </p>
                  <button
                    onClick={fetchAllServices}
                    className="bg-violet-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg shadow-violet-200 hover:scale-105 transition-transform active:scale-95"
                  >
                    Refresh Services
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {currentServices.map((item) => {
                    const qty = getQty(item._id);
                    let imageUrl = null;
                    if (Array.isArray(item.images) && item.images.length > 0) {
                      imageUrl = typeof item.images[0] === 'string' ? item.images[0] : item.images[0].url;
                    } else {
                      imageUrl = item.image || item.images?.[0]?.url || item.images?.[0];
                    }

                    return (
                      <div
                        key={item._id}
                        className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-violet-200/50 transition-all duration-500 flex flex-col cursor-pointer"
                        onClick={() => handleServiceClick(item)}
                      >
                        {/* Image / emoji Container */}
                        <div className="w-full aspect-[4/3] bg-violet-50 relative overflow-hidden">
                          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110 flex items-center justify-center text-6xl">
                            {renderEmojiOrImage(item.emoji, item._id, "w-full h-full object-cover")}
                            {imageUrl && (
                              <img
                                src={imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover absolute inset-0"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            )} 
                          </div>
                          
                          {/* Badge Overlay */}
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-violet-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                            Certified
                          </div>

                          {qty > 0 && (
                            <div className="absolute top-4 right-4 bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg animate-bounce">
                              {qty}
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="text-base font-bold text-gray-900 leading-tight mb-2 group-hover:text-violet-600 transition-colors line-clamp-2 min-h-[2.5rem]">
                            {item.name}
                          </h3>
                          
                          <div className="flex items-center gap-3 mb-5">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Starting from</span>
                              <span className="text-xl font-black text-violet-600">
                                ₹{item.price?.toLocaleString("en-IN")}
                              </span>
                            </div>
                            {item.time && (
                              <div className="ml-auto bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                                <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                                  ⏱ {item.time}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-auto pt-4 border-t border-gray-50">
                            {qty > 0 ? (
                              <div
                                className="flex items-center justify-between bg-violet-600 rounded-2xl p-1 shadow-lg shadow-violet-200"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  onClick={() => decrementQty(item._id)}
                                  className="text-white font-bold text-xl w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                                >
                                  −
                                </button>
                                <span className="text-white font-black text-lg">
                                  {qty}
                                </span>
                                <button
                                  onClick={() => incrementQty(item._id)}
                                  className="text-white font-bold text-xl w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(item);
                                }}
                                className="w-full bg-gray-900 text-white hover:bg-violet-600 text-xs font-black py-3.5 rounded-2xl transition-all duration-300 transform group-hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-violet-200"
                              >
                                ADD TO CART
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── CART BUTTON ── */}
      <CartButton
        cartItems={cartItems}
        onViewCart={() => router.push("/cart")}
      />

      {/* ── SEARCH OVERLAY ── */}
      {searchOpen && (
        <SearchOverlay
          services={services}
          onClose={() => setSearchOpen(false)}
          onSelectService={(item) => {
            const cat = CATEGORIES.find((c) =>
              (services[c.id] || []).some((s) => s._id === item._id)
            );
            if (cat) setSelectedCategory(cat);
            handleServiceClick(item);
          }}
        />
      )}

      {/* ── SERVICE DETAIL MODAL ── */}
      {detailItem && (
        <ServiceDetailModal
          item={detailItem}
          qty={getQty(detailItem._id)}
          onClose={() => setDetailItem(null)}
          onAdd={() => addToCart(detailItem)}
          onInc={() => incrementQty(detailItem._id)}
          onDec={() => decrementQty(detailItem._id)}
        />
      )}
    </div>
  );
}

// ─── SUSPENSE FALLBACK ────────────────────────────────────────────────────────
function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-400">Loading…</p>
      </div>
    </div>
  );
}

// ─── DEFAULT EXPORT ───────────────────────────────────────────────────────────
// useSearchParams() MUST be inside a Suspense boundary.
// The inner component uses it; this wrapper provides the boundary.
export default function AllCategoryPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <AllCategoryInner />
    </Suspense>
  );
}