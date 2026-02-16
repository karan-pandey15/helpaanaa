"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartRedux } from "@/redux/cartSlice";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ACCENT = "#457B9D";

const CATEGORIES = [
  { id: "Bridal",     name: "Bridal Wedding",    icon: "/image/mehndi.png" },
  { id: "Arabic",     name: "Arabic Mehndi",     icon: "/image/mehnditwo.png" },
  { id: "Simple",     name: "Simple Mehndi",     icon: "/image/mehndi3.png" },
  { id: "Group",      name: "For Group",         icon: "/image/mehndi.png" },
  { id: "KittyParty", name: "For Kitty Party",   icon: "/image/mehndi3.png" },
  { id: "Corporate",  name: "Corporate Office",  icon: "/image/mehndi.png" },
  { id: "Individual", name: "Single Individual", icon: "/image/mehnditwo.png" },
];

const MEHNDI_SERVICES = {
  Bridal: [
    { _id: "m1", name: "Full Hand Bridal Mehndi", price: 1500, time: "3-4 Hours", image: "/image/mehndi.png",    description: "Intricate full hand design for brides." },
    { _id: "m2", name: "Leg Mehndi Bridal",        price: 1200, time: "2 Hours",   image: "/image/mehnditwo.png", description: "Traditional bridal patterns for legs." },
  ],
  Arabic: [
    { _id: "m3", name: "Simple Arabic Design",     price: 500,  time: "1 Hour",    image: "/image/mehnditwo.png", description: "Beautiful and quick Arabic patterns." },
    { _id: "m4", name: "Heavy Arabic Mehndi",      price: 800,  time: "1.5 Hours", image: "/image/mehnditwo.png", description: "Detailed Arabic floral designs." },
  ],
  Simple: [
    { _id: "m5", name: "Minimalist Mehndi",        price: 300,  time: "30 Mins",   image: "/image/mehndi3.png",   description: "Elegant and simple patterns." },
    { _id: "m6", name: "Kids Mehndi",              price: 200,  time: "20 Mins",   image: "/image/mehndi3.png",   description: "Cute and small designs for children." },
  ],
  Group: [
    { _id: "m7", name: "Family Group (5-10)",      price: 5000, time: "4-6 Hours", image: "/image/mehndi.png",    description: "Mehndi for group events and family gatherings." },
    { _id: "m8", name: "Small Group (3-5)",         price: 2500, time: "3 Hours",   image: "/image/mehnditwo.png", description: "Perfect for small get-togethers." },
  ],
  KittyParty: [
    { _id: "m9", name: "Kitty Party Special",      price: 1500, time: "2 Hours",   image: "/image/mehndi3.png",   description: "Fast and trendy designs for kitty parties." },
  ],
  Corporate: [
    { _id: "m10", name: "Corporate Event Booking", price: 8000, time: "Full Day",  image: "/image/mehndi.png",    description: "Professional mehndi for corporate events." },
  ],
  Individual: [
    { _id: "m11", name: "Single Person Premium",   price: 1000, time: "1.5 Hours", image: "/image/mehnditwo.png", description: "Detailed custom design for a single individual." },
  ],
};

const PACKAGES = [
  { name: "Basic",    priceAdd: 0,   desc: "Simple patterns" },
  { name: "Standard", priceAdd: 100, desc: "Detailed patterns" },
  { name: "Premium",  priceAdd: 200, desc: "Heavy intricate style" },
];

const TIMES = [
  "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM",
];

function generateDates() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      full:    d.toISOString().split("T")[0],
      day:     d.toLocaleDateString("en-US", { weekday: "short" }),
      date:    d.getDate(),
      month:   d.toLocaleDateString("en-US", { month: "short" }),
      display: d.toLocaleDateString("en-US", {
        weekday: "short", day: "numeric", month: "short", year: "numeric",
      }),
    };
  });
}

// ─── ICONS ──────────────────────────────────────────────────────────────────
const IconBack = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconSearch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconCart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconBrush = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1 1 2.26 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
  </svg>
);
const IconInfo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#457B9D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="8" strokeWidth="3" />
    <line x1="12" y1="12" x2="12" y2="16" />
  </svg>
);
const IconArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconHandRight = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);
const IconRadioOn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#457B9D" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="5" fill="#457B9D" />
  </svg>
);
const IconRadioOff = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

// ─── SUB-COMPONENT: DETAILS ────────────────────────────────────────────────
function MehndiArtistDetails({ artist, onBack, onAddToCart }) {
  const DATES = generateDates();
  const [selectedDate,    setSelectedDate]    = useState(null);
  const [selectedTime,    setSelectedTime]    = useState(null);
  const [peopleCount,     setPeopleCount]     = useState(1);
  const [selectedHands,   setSelectedHands]   = useState(2);
  const [selectedPackage, setSelectedPackage] = useState("Standard");
  const [instructions,    setInstructions]    = useState("");

  const currentPkg  = PACKAGES.find(p => p.name === selectedPackage);
  const totalPrice  = (artist.price + (currentPkg?.priceAdd || 0)) * selectedHands * peopleCount;

  const handleBooking = () => {
    if (!selectedDate) return alert("Please select a date");
    if (!selectedTime) return alert("Please select a time slot");
    const dateObj = DATES.find(d => d.full === selectedDate);
    
    onAddToCart({
      id: `${artist._id}_${Date.now()}`,
      name: `${artist.name} (${selectedPackage})`,
      price: artist.price + (currentPkg?.priceAdd || 0),
      totalPrice,
      quantity: peopleCount,
      hands: selectedHands,
      date: dateObj?.display,
      time: selectedTime,
      instructions,
      package: selectedPackage,
      category: "Mehndi Artist",
      image: artist.image || "/image/mehndi.png",
    });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", backgroundColor: "#f4f7fa", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      {/* Detail Header */}
      <div style={{
        backgroundColor: "#457B9D", height: 200,
        borderBottomLeftRadius: 35, borderBottomRightRadius: 35,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", position: "relative", flexShrink: 0,
      }}>
        <button onClick={onBack}
          style={{
            position: "absolute", top: 18, left: 18,
            backgroundColor: "rgba(255,255,255,0.2)", border: "none",
            borderRadius: 12, width: 40, height: 40,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "#fff",
          }}><IconBack /></button>

        <div style={{
          width: 70, height: 70, borderRadius: 35,
          backgroundColor: "rgba(255,255,255,0.15)",
          border: "2px solid rgba(255,255,255,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10,
        }}><IconBrush /></div>

        <p style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: 0 }}>{artist.name}</p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 600, margin: "4px 0 0" }}>{artist.description}</p>
      </div>

      {/* Detail Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 120px", marginTop: -20 }}>
        {/* People Count */}
        <div style={{
          backgroundColor: "#fff", borderRadius: 18, border: "1px solid #f1f5f9",
          boxShadow: "0 2px 10px rgba(69,123,157,0.08)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 18px", marginBottom: 20, marginTop: 8,
        }}>
          <div>
            <p style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", margin: 0 }}>Number of People</p>
            <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0 0" }}>How many individuals?</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", backgroundColor: "#f1f5f9", borderRadius: 12, padding: 4, gap: 4 }}>
            <button onClick={() => peopleCount > 1 && setPeopleCount(c => c - 1)}
              style={{ width: 32, height: 32, borderRadius: 10, border: "none", backgroundColor: "#fff", cursor: "pointer", fontSize: 18, fontWeight: 700, color: "#457B9D" }}>−</button>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", minWidth: 28, textAlign: "center" }}>{peopleCount}</span>
            <button onClick={() => setPeopleCount(c => c + 1)}
              style={{ width: 32, height: 32, borderRadius: 10, border: "none", backgroundColor: "#fff", cursor: "pointer", fontSize: 18, fontWeight: 700, color: "#457B9D" }}>+</button>
          </div>
        </div>

        {/* Hand Selection */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>Select Hands</p>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ hands: 1, label: "1 Hand" }, { hands: 2, label: "2 Hands" }].map(opt => {
              const active = selectedHands === opt.hands;
              return (
                <button key={opt.hands} onClick={() => setSelectedHands(opt.hands)}
                  style={{
                    flex: 1, padding: "12px 8px",
                    backgroundColor: active ? "#457B9D" : "#fff",
                    border: `1px solid ${active ? "#457B9D" : "#f1f5f9"}`,
                    borderRadius: 16, cursor: "pointer",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                  }}>
                  <div style={{ display: "flex" }}>
                    <IconHandRight color={active ? "#fff" : "#457B9D"} />
                    {opt.hands === 2 && <IconHandRight color={active ? "#fff" : "#457B9D"} />}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: active ? "#fff" : "#475569" }}>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Package Selection */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>Select Package</p>
          {PACKAGES.map(pkg => {
            const active = selectedPackage === pkg.name;
            return (
              <button key={pkg.name} onClick={() => setSelectedPackage(pkg.name)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 16px", marginBottom: 8,
                  backgroundColor: active ? "#eef6fa" : "#fff",
                  border: `1px solid ${active ? "#457B9D" : "#f1f5f9"}`,
                  borderRadius: 16, cursor: "pointer", textAlign: "left",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {active ? <IconRadioOn /> : <IconRadioOff />}
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: active ? "#457B9D" : "#334155", margin: 0 }}>{pkg.name}</p>
                    <p style={{ fontSize: 11, color: "#64748b", margin: "1px 0 0" }}>{pkg.desc}</p>
                  </div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 800, color: active ? "#457B9D" : "#475569" }}>+₹{pkg.priceAdd}</span>
              </button>
            );
          })}
        </div>

        {/* Date Selection */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>Select Date</p>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 5 }}>
            {DATES.map((item, i) => {
              const active = selectedDate === item.full;
              return (
                <button key={i} onClick={() => setSelectedDate(item.full)}
                  style={{
                    minWidth: 65, height: 80, flexShrink: 0,
                    backgroundColor: active ? "#457B9D" : "#fff",
                    border: `1px solid ${active ? "#457B9D" : "#f1f5f9"}`,
                    borderRadius: 16, cursor: "pointer",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", gap: 1,
                  }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: active ? "rgba(255,255,255,0.85)" : "#64748b" }}>{item.day}</span>
                  <span style={{ fontSize: 18, fontWeight: 800, color: active ? "#fff" : "#1e293b" }}>{item.date}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: active ? "rgba(255,255,255,0.85)" : "#64748b" }}>{item.month}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Selection */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>Select Time</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TIMES.map((time, i) => {
              const active = selectedTime === time;
              return (
                <button key={i} onClick={() => setSelectedTime(time)}
                  style={{
                    width: "calc(33.33% - 6px)", padding: "10px 0",
                    backgroundColor: active ? "#457B9D" : "#fff",
                    border: `1px solid ${active ? "#457B9D" : "#f1f5f9"}`,
                    borderRadius: 10, cursor: "pointer",
                    fontSize: 11, fontWeight: 700, color: active ? "#fff" : "#1e293b",
                  }}>
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", margin: "0 0 12px" }}>Special Instructions</p>
          <textarea
            value={instructions} onChange={e => setInstructions(e.target.value)}
            placeholder="Any specific design request or landmark..."
            style={{
              width: "100%", height: 80, backgroundColor: "#fff", borderRadius: 16,
              border: "1px solid #f1f5f9", padding: "12px 14px",
              fontSize: 13, color: "#1e293b", resize: "none", outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Detail Footer */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff",
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
        padding: "14px 20px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div>
          <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, margin: 0 }}>Total Amount</p>
          <p style={{ fontSize: 22, fontWeight: 800, color: "#457B9D", margin: "2px 0 0" }}>₹{totalPrice.toLocaleString()}</p>
        </div>
        <button onClick={handleBooking}
          style={{
            backgroundColor: "#457B9D", color: "#fff", border: "none",
            borderRadius: 12, padding: "12px 20px",
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 14, fontWeight: 800, cursor: "pointer",
          }}>
          Confirm Booking <IconArrow />
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT: LIST ───────────────────────────────────────────────────
export default function MehndiArtist() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [selectedArtist,   setSelectedArtist]   = useState(null);
  const [toast,            setToast]            = useState(null);
  const [showSearch,       setShowSearch]       = useState(false);
  const [searchQuery,      setSearchQuery]      = useState("");

  const currentServices = MEHNDI_SERVICES[selectedCategory.id] || [];
  const totalCartQty = cart.reduce((s, i) => s + (i.quantity || 1), 0);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCartRedux(item));
    showToast(`${item.name} added to cart`);
    setSelectedArtist(null); // Return to list after booking
  };

  const handleArtistClick = (artist) => {
    setSelectedArtist(artist);
  };

  const filteredServices = showSearch && searchQuery.trim()
    ? currentServices.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : currentServices;

  if (selectedArtist) {
    return (
      <MehndiArtistDetails 
        artist={selectedArtist} 
        onBack={() => setSelectedArtist(null)} 
        onAddToCart={handleAddToCart}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", backgroundColor: "#fff", fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: "hidden" }}>

      {toast && (
        <div style={{
          position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
          backgroundColor: toast.type === "error" ? "#ef4444" : "#16a34a",
          color: "#fff", padding: "10px 20px", borderRadius: 10,
          fontSize: 13, fontWeight: 600, zIndex: 9999,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)", maxWidth: "86vw",
          textAlign: "center", animation: "fadeDown 0.25s ease",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #f3f4f6", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => router.back()}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "#000" }}>
              <IconBack />
            </button>
            <span style={{ fontSize: 18, fontWeight: 600, color: "#000" }}>Mehndi Artists</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => { setShowSearch(s => !s); setSearchQuery(""); }}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", color: "#000" }}>
              <IconSearch />
            </button>
            <button onClick={() => router.push("/cart")}
              style={{ position: "relative", backgroundColor: ACCENT, border: "none", borderRadius: 10, padding: "6px 10px", cursor: "pointer", display: "flex", color: "#fff" }}>
              <IconCart />
              {totalCartQty > 0 && (
                <span style={{ position: "absolute", top: -6, right: -6, backgroundColor: "#ef4444", color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {totalCartQty}
                </span>
              )}
            </button>
          </div>
        </div>
        {showSearch && (
          <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search mehndi services..."
            style={{ width: "100%", padding: "9px 14px", border: `1px solid ${ACCENT}`, borderRadius: 10, fontSize: 14, outline: "none", backgroundColor: "#f0f7f9", color: "#1f2937", boxSizing: "border-box" }}
          />
        )}
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Sidebar */}
        <div style={{ width: 100, backgroundColor: "#fff", borderRight: "1px solid #f3f4f6", overflowY: "auto", flexShrink: 0 }}>
          {CATEGORIES.map(cat => {
            const active = selectedCategory.id === cat.id;
            return (
              <button key={cat.id} onClick={() => setSelectedCategory(cat)}
                style={{ width: "100%", padding: "12px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, backgroundColor: active ? "#eef6fa" : "#fff", border: "none", cursor: "pointer", borderRight: active ? `3px solid ${ACCENT}` : "3px solid transparent" }}>
                <div style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: active ? "#e0eff5" : "#f9fafb", border: `1px solid ${active ? ACCENT : "#e5e7eb"}`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  <img src={cat.icon} alt={cat.name} style={{ width: 35, height: 35, objectFit: "contain" }} onError={e => { e.target.onerror = null; e.target.src = "/image/mehndi.png"; }} />
                </div>
                <span style={{ fontSize: 10, textAlign: "center", fontWeight: 500, color: active ? ACCENT : "#374151", lineHeight: 1.3, padding: "0 2px" }}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ flex: 1, backgroundColor: "#f9fafb", overflowY: "auto", padding: 8 }}>
          {filteredServices.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 40 }}>🪷</span>
              <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
                {showSearch && searchQuery ? "No results found" : "No services available"}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px 0" }}>
              {filteredServices.map(item => (
                <div key={item._id} style={{ width: "49%", backgroundColor: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.08)", cursor: "pointer" }}
                  onClick={() => handleArtistClick(item)}>
                  <div style={{ width: "100%", aspectRatio: "1.2", backgroundColor: "#f3f4f6", overflow: "hidden" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.onerror = null; e.target.src = "/image/mehndi.png"; }} />
                  </div>
                  <div style={{ padding: 8 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1f2937", margin: "0 0 4px", height: 36, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {item.name}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: "bold", color: ACCENT }}>₹{item.price}</span>
                      {item.time && <span style={{ fontSize: 10, color: "#6b7280" }}>{item.time}</span>}
                    </div>
                    <button style={{ width: "100%", backgroundColor: "#fff", border: `1px solid ${ACCENT}`, borderRadius: 6, padding: "6px 0", fontSize: 12, fontWeight: "bold", color: ACCENT, cursor: "pointer" }}>
                      VIEW & BOOK
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
        button { transition: transform 0.1s, opacity 0.1s; }
        button:active { transform: scale(0.96); opacity: 0.85; }
      `}</style>
    </div>
  );
}
