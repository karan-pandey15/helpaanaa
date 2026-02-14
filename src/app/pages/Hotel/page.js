"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = "https://api.marasimpex.com/api/hotels";
const BLUE    = "#008cff";
const DARK    = "#0f172a";

const IconBack = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconSearch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconLocation = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#008cff" stroke="#008cff" strokeWidth="0">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="0">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// ── Hotel Detail (inline sub-component) ──────────────────────────────────────
function HotelDetail({ hotel, onBack }) {
  const [activeImage, setActiveImage] = useState(0);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", backgroundColor: "#f1f5f9", fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: "hidden" }}>
      {toast && (
        <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", backgroundColor: "#10b981", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", animation: "fadeDown 0.25s ease" }}>
          {toast}
        </div>
      )}

      {/* Back header */}
      <div style={{ backgroundColor: "#fff", padding: "15px 20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #f1f5f9", flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", color: "#000" }}>
          <IconBack />
        </button>
        <p style={{ fontSize: 18, fontWeight: 800, color: DARK, margin: 0, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{hotel.name}</p>
      </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 100 }}>
        {/* Image gallery */}
        <div style={{ position: "relative", height: 260, backgroundColor: "#f1f5f9" }}>
          {hotel.images?.[activeImage]?.url ? (
            <img src={hotel.images[activeImage].url} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 60 }}>🏨</span>
            </div>
          )}
          {hotel.images?.length > 1 && (
            <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
              {hotel.images.map((_, i) => (
                <button key={i} onClick={() => setActiveImage(i)} style={{ width: i === activeImage ? 20 : 8, height: 8, borderRadius: 4, backgroundColor: i === activeImage ? "#fff" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.2s" }} />
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: 20 }}>
          {/* Name + Rating */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <p style={{ fontSize: 22, fontWeight: 900, color: DARK, margin: 0, flex: 1 }}>{hotel.name}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 4, backgroundColor: "#10b981", padding: "4px 10px", borderRadius: 6 }}>
              <span style={{ color: "#fff", fontSize: 14 }}>★</span>
              <span style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>{hotel.rating ?? "4.5"}</span>
            </div>
          </div>
          <p style={{ fontSize: 14, color: BLUE, fontWeight: 600, margin: "0 0 16px" }}>📍 {hotel.displayLocation}</p>

          {/* Price card */}
          <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 4px" }}>Per Night</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: DARK }}>₹</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: DARK }}>{hotel.pricePerNight?.toLocaleString()}</span>
            </div>
            <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>+ ₹{Math.round((hotel.pricePerNight || 0) * 0.12)} taxes & fees</p>
          </div>

          {/* Amenities */}
          {hotel.amenities?.length > 0 && (
            <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: DARK, margin: "0 0 12px" }}>Amenities</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {hotel.amenities.map((amt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "#f0fdf4", padding: "6px 12px", borderRadius: 20 }}>
                    <span style={{ color: "#10b981" }}>✓</span>
                    <span style={{ fontSize: 13, color: "#475569" }}>{amt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {hotel.description && (
            <div style={{ backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: "0 1px 6px rgba(0,0,0,0.08)" }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: DARK, margin: "0 0 8px" }}>About</p>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, margin: 0 }}>{hotel.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Book Now footer */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTop: "1px solid #f1f5f9", padding: "14px 20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
        <div>
          <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>Per Night</p>
          <p style={{ fontSize: 22, fontWeight: 900, color: DARK, margin: "2px 0 0" }}>₹{hotel.pricePerNight?.toLocaleString()}</p>
        </div>
        <button onClick={() => showToast("Booking request sent!")} style={{ backgroundColor: BLUE, color: "#fff", border: "none", borderRadius: 12, padding: "14px 28px", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
          Book Now
        </button>
      </div>

      <style>{`@keyframes fadeDown { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } } * { box-sizing: border-box; } button { transition: transform 0.1s, opacity 0.1s; } button:active { transform: scale(0.96); opacity: 0.85; }`}</style>
    </div>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function HotelScreen() {
  const router = useRouter();
  const [loading,          setLoading]          = useState(true);
  const [hotels,           setHotels]           = useState([]);
  const [filteredHotels,   setFilteredHotels]   = useState([]);
  const [locations,        setLocations]        = useState(["All"]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [wishlist,         setWishlist]         = useState([]);
  const [toast,            setToast]            = useState(null);
  const [showSearch,       setShowSearch]       = useState(false);
  const [searchQuery,      setSearchQuery]      = useState("");
  const [selectedHotel,    setSelectedHotel]    = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(API_URL);
        const json = await res.json();
        if (json.ok) {
          const processed = json.hotelRooms.map(h => ({
            ...h,
            displayLocation: h.location || h.city || "Location Not Specified",
            city: h.city || "Unknown City",
          }));
          setHotels(processed);
          setFilteredHotels(processed);
          setLocations(["All", ...new Set(processed.map(h => h.city).filter(Boolean))]);
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleLocationSelect = (city) => {
    setSelectedLocation(city);
    setSearchQuery(""); setShowSearch(false);
    setFilteredHotels(city === "All" ? hotels : hotels.filter(h => h.city === city));
  };

  const displayedHotels = showSearch && searchQuery.trim()
    ? filteredHotels.filter(h => h.name?.toLowerCase().includes(searchQuery.toLowerCase()) || h.displayLocation?.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredHotels;

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2500); };
  const toggleWishlist = (id) => { setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]); };

  if (selectedHotel) return <HotelDetail hotel={selectedHotel} onBack={() => setSelectedHotel(null)} />;

  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100dvh", backgroundColor: "#fff" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "4px solid #e5e7eb", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Loading Hotels…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", backgroundColor: "#f1f5f9", fontFamily: "'Segoe UI', system-ui, sans-serif", overflow: "hidden" }}>
      {toast && (
        <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", backgroundColor: toast.type === "error" ? "#ef4444" : "#10b981", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 600, zIndex: 9999, boxShadow: "0 4px 16px rgba(0,0,0,0.15)", maxWidth: "88vw", textAlign: "center", animation: "fadeDown 0.25s ease" }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ backgroundColor: "#fff", borderBottom: "1px solid #f1f5f9", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", padding: "15px 20px", gap: 15 }}>
          <button onClick={() => router.back()} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", color: "#000" }}><IconBack /></button>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: DARK, margin: 0 }}>Hotels & Homestays</p>
            <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0 0" }}>{displayedHotels.length} Properties found</p>
          </div>
          <button onClick={() => { setShowSearch(s => !s); setSearchQuery(""); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", color: "#000" }}><IconSearch /></button>
        </div>
        {showSearch && (
          <div style={{ padding: "0 20px 12px" }}>
            <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search hotels or locations..."
              style={{ width: "100%", padding: "9px 14px", border: `1px solid ${BLUE}`, borderRadius: 10, fontSize: 14, outline: "none", backgroundColor: "#eff9ff", color: "#1f2937", boxSizing: "border-box" }} />
          </div>
        )}
        {/* City tabs */}
        <div style={{ padding: "12px 0", borderTop: "1px solid #e2e8f0", overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 12, paddingLeft: 20, paddingRight: 20, width: "max-content" }}>
            {locations.map(loc => {
              const active = selectedLocation === loc;
              return (
                <button key={loc} onClick={() => handleLocationSelect(loc)}
                  style={{ padding: "8px 16px", borderRadius: 20, backgroundColor: active ? BLUE : "#f8fafc", border: `1px solid ${active ? BLUE : "#e2e8f0"}`, fontSize: 14, fontWeight: 600, color: active ? "#fff" : "#64748b", cursor: "pointer", whiteSpace: "nowrap" }}>
                  {loc}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hotel list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 100px" }}>
        {displayedHotels.length > 0 ? displayedHotels.map(hotel => (
          <div key={hotel._id} onClick={() => setSelectedHotel(hotel)}
            style={{ backgroundColor: "#fff", borderRadius: 16, marginBottom: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.10)", cursor: "pointer" }}>
            {/* Image */}
            <div style={{ height: 220, position: "relative", backgroundColor: "#f1f5f9" }}>
              {hotel.images?.[0]?.url ? (
                <img src={hotel.images[0].url} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.onerror = null; e.target.style.display = "none"; }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 50 }}>🏨</span>
                </div>
              )}
              <div style={{ position: "absolute", top: 12, left: 12, backgroundColor: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", letterSpacing: 0.5 }}>{hotel.category?.toUpperCase() || "PREMIUM"}</span>
              </div>
              <button onClick={e => { e.stopPropagation(); toggleWishlist(hotel._id); showToast(wishlist.includes(hotel._id) ? "Removed from wishlist" : "Added to wishlist"); }}
                style={{ position: "absolute", top: 12, right: 12, backgroundColor: wishlist.includes(hotel._id) ? "#ef4444" : "rgba(0,0,0,0.3)", border: "none", borderRadius: 25, padding: 8, display: "flex", cursor: "pointer" }}>
                <IconHeart />
              </button>
              <div style={{ position: "absolute", bottom: 12, left: 12, backgroundColor: "#10b981", display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", borderRadius: 4 }}>
                <IconStar />
                <span style={{ color: "#fff", fontSize: 12, fontWeight: "bold" }}>{hotel.rating ?? "4.5"}</span>
              </div>
            </div>
            {/* Details */}
            <div style={{ padding: 15 }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: DARK, margin: "0 0 6px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{hotel.name}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
                <IconLocation />
                <span style={{ fontSize: 13, color: BLUE, fontWeight: 600 }}>{hotel.displayLocation}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", backgroundColor: "#cbd5e1", margin: "0 8px", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#64748b" }}>{hotel.city}</span>
              </div>
              {hotel.amenities?.length > 0 && (
                <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
                  {hotel.amenities.slice(0, 2).map((amt, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ color: "#10b981", fontSize: 13 }}>✓</span>
                      <span style={{ fontSize: 12, color: "#475569" }}>{amt}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                <div>
                  <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 2px" }}>Per Night</p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: DARK }}>₹</span>
                    <span style={{ fontSize: 22, fontWeight: 900, color: DARK }}>{hotel.pricePerNight?.toLocaleString()}</span>
                  </div>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>+ ₹{Math.round((hotel.pricePerNight || 0) * 0.12)} taxes & fees</p>
                </div>
                <div style={{ backgroundColor: BLUE, padding: "10px 20px", borderRadius: 8 }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>View Deal</span>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
            <span style={{ fontSize: 60 }}>🏨</span>
            <p style={{ marginTop: 15, fontSize: 16, color: "#94a3b8", textAlign: "center", fontWeight: 500 }}>No properties found in {selectedLocation}</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeDown { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }
        button { transition: transform 0.1s, opacity 0.1s; }
        button:active { transform: scale(0.96); opacity: 0.85; }
      `}</style>
    </div>
  );
}