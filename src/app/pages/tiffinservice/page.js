"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartRedux, removeFromCart as removeFromCartRedux } from "@/redux/cartSlice";

// ─── CATEGORIES CONFIG ───────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "SmallLunch",
    name: "Small Lunch",
    emoji: "🍱",
  },
  {
    id: "BigLunch",
    name: "Big Lunch",
    emoji: "🥘",
  },
];

// ─── STATIC SERVICE DATA ─────────────────────────────────────────────────────
const STATIC_SERVICES = {
  SmallLunch: [
    {
      _id: "small_lunch_1",
      name: "Basic Tiffin (Small)",
      price: 60,
      description: "Includes 4 Rotis, 1 Sabzi, Dal, and Rice. Perfect for a light meal.",
      emoji: "🍱",
      image: "/image/tiffinservice.png"
    },
    {
      _id: "small_lunch_2",
      name: "Executive Tiffin (Small)",
      price: 80,
      description: "Includes 4 Rotis, 2 Sabzi, Dal, Rice, and Salad.",
      emoji: "🥗",
      image: "/image/tiffinservice.png"
    }
  ],
  BigLunch: [
    {
      _id: "big_lunch_1",
      name: "Premium Tiffin (Big)",
      price: 120,
      description: "Includes 6 Rotis, 2 Special Sabzi, Dal Fry, Jeera Rice, Sweet, and Raita.",
      emoji: "🥘",
      image: "/image/tiffinservice.png"
    },
    {
      _id: "big_lunch_2",
      name: "Deluxe Tiffin (Big)",
      price: 150,
      description: "Full meal with Paneer Sabzi, Seasonal Veg, Dal, Pulao, 6 Butter Rotis, Sweet, and Papad.",
      emoji: "🍛",
      image: "/image/tiffinservice.png"
    }
  ],
};

// ─── EMOJI HELPER ────────────────────────────────────────────────────────────
const SERVICE_EMOJIS = ["🍱", "🍛", "🥘", "🍲", "🥗", "🍴", "😋", "✨"];
function getServiceEmoji(id) {
  let hash = 0;
  for (let i = 0; i < id.length; i++)
    hash = (hash * 31 + id.charCodeAt(i)) % SERVICE_EMOJIS.length;
  return SERVICE_EMOJIS[Math.abs(hash) % SERVICE_EMOJIS.length];
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
        className="pointer-events-auto w-full max-w-4xl mx-auto flex items-center justify-between bg-violet-600 text-white px-5 py-3 active:scale-95 transition-transform rounded-lg shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="bg-white text-violet-600 font-bold text-xs w-6 h-6 flex items-center justify-center rounded-full">
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
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <input
          autoFocus
          className="flex-1 text-sm outline-none placeholder-gray-400"
          placeholder="Search tiffin services..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button onClick={() => setQuery("")}>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {query.trim() === "" && (
          <p className="text-center text-gray-400 text-sm mt-10">Type to search lunch options…</p>
        )}
        {filtered.length === 0 && query.trim() !== "" && (
          <p className="text-center text-gray-400 text-sm mt-10">No results for "{query}"</p>
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
            <div className="w-10 h-10 bg-violet-50 flex items-center justify-center text-xl flex-shrink-0">
              {item.emoji || getServiceEmoji(item._id)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{item.name}</p>
              <p className="text-xs text-violet-600 font-bold">₹{item.price?.toLocaleString("en-IN")}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── INNER COMPONENT ─────────────────────────────────────────────────────────
function TiffinServiceInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams?.get("categoryId");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState(STATIC_SERVICES);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Set initial selected category
  useEffect(() => {
    const found = categoryId ? CATEGORIES.find((c) => c.id === categoryId) : null;
    setSelectedCategory(found || CATEGORIES[0]);
  }, [categoryId]);

  // ── Cart helpers ────────────────────────────────────────────────────────────
  const getQty = (id) => cartItems.find((i) => i.id === id)?.quantity || 0;

  const addToCart = (item) => {
    dispatch(addToCartRedux({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image || "/image/tiffinservice.png",
      emoji: item.emoji || getServiceEmoji(item._id),
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

  const currentServices = selectedCategory ? services[selectedCategory.id] || [] : [];

  const handleServiceClick = (item) => {
    const params = new URLSearchParams({
      title: item.name,
      price: item.price,
      description: item.description || "",
      category: selectedCategory?.name || "Tiffin",
      image: item.image || "/image/tiffinservice.png",
      emoji: item.emoji || getServiceEmoji(item._id),
    });
    router.push(`/pages/ServiceDetail?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white relative">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30 w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-lg font-semibold text-gray-900">Tiffin Services</span>
        </div>
        <button
          onClick={() => setSearchOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 60px)" }}>
        {/* ── SIDEBAR ── */}
        <div className="w-[100px] flex-shrink-0 bg-white border-r border-gray-100 overflow-y-auto lg:w-[150px]">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory?.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full flex flex-col items-center py-3 px-1 transition-colors ${
                  isActive ? "bg-violet-50" : "hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-14 h-14 flex items-center justify-center text-2xl mb-1.5 border transition-colors ${
                    isActive ? "bg-violet-100 border-violet-400" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {cat.emoji}
                </div>
                <span className={`text-[10px] text-center font-medium leading-tight px-1 ${
                  isActive ? "text-violet-700" : "text-gray-600"
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── SERVICES GRID ── */}
        <div className="flex-1 bg-gray-50 overflow-y-auto pb-28">
          <div className="max-w-7xl mx-auto p-4 lg:p-6">
            {selectedCategory && (
              <div className="px-2 py-2 mb-4">
                <h2 className="text-lg font-bold text-gray-800">{selectedCategory.name}</h2>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentServices.map((item) => {
                const qty = getQty(item._id);
                const emoji = item.emoji || getServiceEmoji(item._id);
                const imageUrl = item.image || "/image/tiffinservice.png";

                return (
                  <div
                    key={item._id}
                    className="bg-white overflow-hidden border border-gray-100 flex flex-col cursor-pointer active:scale-95 transition-transform rounded-xl shadow-sm"
                    onClick={() => handleServiceClick(item)}
                  >
                    <div className="w-full aspect-square bg-violet-50 flex items-center justify-center overflow-hidden relative text-5xl">
                      {emoji}
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover absolute inset-0"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    </div>

                    <div className="p-3 flex flex-col flex-1">
                      <p className="text-sm font-bold text-gray-800 leading-tight line-clamp-2 min-h-[2.5rem]">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between mt-2 mb-3">
                        <span className="text-base font-extrabold text-violet-600">
                          ₹{item.price?.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {qty > 0 ? (
                        <div
                          className="flex items-center justify-between bg-violet-600 px-3 py-1.5 rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => decrementQty(item._id)}
                            className="text-white font-bold text-xl w-8 h-8 flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="text-white font-bold text-base">{qty}</span>
                          <button
                            onClick={() => incrementQty(item._id)}
                            className="text-white font-bold text-xl w-8 h-8 flex items-center justify-center"
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
                          className="w-full border-2 border-violet-500 text-violet-600 text-sm font-bold py-2 hover:bg-violet-50 transition-colors rounded-lg"
                        >
                          ADD TO CART
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── CART BUTTON ── */}
      <CartButton cartItems={cartItems} onViewCart={() => router.push("/cart")} />

      {/* ── SEARCH OVERLAY ── */}
      {searchOpen && (
        <SearchOverlay
          services={services}
          onClose={() => setSearchOpen(false)}
          onSelectService={(item) => handleServiceClick(item)}
        />
      )}
    </div>
  );
}

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

export default function TiffinServicePage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <TiffinServiceInner />
    </Suspense>
  );
}