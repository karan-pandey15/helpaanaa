"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, X, ChevronLeft, ChevronRight, AlertCircle, ImageIcon } from "lucide-react";

const API_BASE_URL = "https://api.marasimpex.com/api/search";

const transformSearchResultToProduct = (searchResult) => {
  if (!searchResult) return null;
  try {
    const priceData = searchResult.price || {};
    return {
      _id: searchResult._id || "",
      name: searchResult.name || "Unknown Product",
      category: searchResult.category || "Uncategorized",
      description: searchResult.description || "",
      brand: searchResult.brand || "",
      sub_category: searchResult.sub_category || "",
      images: [
        {
          url:
            searchResult.image ||
            "https://via.placeholder.com/300?text=No+Image",
        },
      ],
      price: {
        selling_price:
          priceData.selling_price || searchResult.price || 0,
        mrp: priceData.mrp || searchResult.price || 0,
        discount_percent: priceData.discount_percent || 0,
      },
      quantity_info: {
        size: searchResult.size || "1",
        unit: searchResult.unit || "piece",
      },
      inventory: {
        stock_available: searchResult.stock_available !== false,
      },
      averageRating: searchResult.averageRating || 0,
      slug: searchResult.slug || "",
    };
  } catch (err) {
    console.error("Error transforming product:", err);
    return null;
  }
};

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimer = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    debounceTimer.current = setTimeout(async () => {
      try {
        const searchUrl = `${API_BASE_URL}?query=${encodeURIComponent(trimmedQuery)}&limit=20`;
        console.log("🔍 Searching:", searchUrl);

        const response = await fetch(searchUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();
        console.log("✅ API Response:", data);

        if (data.success && Array.isArray(data.results)) {
          const transformedResults = data.results
            .map(transformSearchResultToProduct)
            .filter((p) => p !== null && p._id);

          setSearchResults(transformedResults);
          setError(null);
          if (transformedResults.length === 0)
            setError("No products found for your search");
        } else if (!data.success) {
          setSearchResults([]);
          setError(data.message || "Search failed. Please try again.");
        } else {
          setSearchResults([]);
          setError("Unexpected response format. Please try again.");
        }
      } catch (err) {
        console.error("❌ Search error:", err);
        setSearchResults([]);
        setError("Connection failed. Please check your internet and try again.");
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  const handleProductPress = (product) => {
    if (!product || !product._id || product._id.trim() === "") {
      alert("Invalid product data");
      return;
    }
    // Navigate to product detail — pass slug or _id
    router.push(`/product/${product.slug || product._id}`);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setError(null);
    inputRef.current?.focus();
  };

  const isPlaceholderImage = (url) =>
    !url || url === "https://via.placeholder.com/300?text=No+Image";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* ── Search Bar ── */}
      <div className="flex items-center px-3 py-3 border-b border-gray-100 mt-6 gap-3">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={26} color="#333" />
        </button>

        {/* Input */}
        <div className="flex-1 flex items-center bg-[#F3F3F3] px-4 py-[10px] rounded-xl">
          <Search size={18} color="#888" className="mr-2 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[15px] text-[#333] placeholder-[#888] outline-none"
            autoFocus
          />
        </div>

        {/* Clear */}
        {query.length > 0 && (
          <button
            onClick={handleClearSearch}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={22} color="#333" />
          </button>
        )}
      </div>

      {/* ── Loading ── */}
      {query.length > 0 && loading && (
        <div className="flex-1 flex flex-col items-center justify-center py-16">
          <div className="w-10 h-10 border-4 border-[#6A1B9A] border-t-transparent rounded-full animate-spin" />
          <p className="mt-3 text-sm text-gray-500 font-medium">
            Searching products...
          </p>
        </div>
      )}

      {/* ── Error ── */}
      {query.length > 0 && !loading && error && (
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-5">
          <AlertCircle size={50} color="#E57373" />
          <p className="mt-4 text-[15px] text-[#E57373] font-medium text-center">
            {error}
          </p>
          <p className="mt-2 text-[13px] text-gray-400 text-center">
            Try searching with different words
          </p>
        </div>
      )}

      {/* ── Empty ── */}
      {query.length > 0 && !loading && !error && searchResults.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-5">
          <Search size={50} color="#DDD" />
          <p className="mt-4 text-[15px] text-gray-400 font-medium text-center">
            No products found
          </p>
        </div>
      )}

      {/* ── Results List ── */}
      {!loading && query.length > 0 && searchResults.length > 0 && (
        <div className="flex-1 overflow-y-auto px-3 pt-3 pb-6 space-y-2.5">
          {searchResults.map((item, index) => {
            const imageUrl = item.images?.[0]?.url;
            const price = item.price?.selling_price || 0;
            const mrp = item.price?.mrp || 0;

            return (
              <button
                key={item._id || index}
                onClick={() => handleProductPress(item)}
                className="w-full flex items-center px-3 py-3 bg-[#FAFAFA] rounded-xl
                           border border-[#F0F0F0] hover:border-[#6A1B9A]/30 hover:bg-purple-50/40
                           transition-all duration-150 text-left"
              >
                {/* Image */}
                <div className="mr-3 shrink-0">
                  {!isPlaceholderImage(imageUrl) ? (
                    <div className="w-[60px] h-[60px] rounded-lg overflow-hidden bg-white border border-gray-100">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="w-full h-full bg-[#F5F5F5] items-center justify-center hidden"
                      >
                        <ImageIcon size={28} color="#CCC" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-[60px] h-[60px] rounded-lg bg-[#F5F5F5] flex items-center justify-center">
                      <ImageIcon size={28} color="#CCC" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#333] leading-[18px] line-clamp-2 mb-1">
                    {item.name || "Unknown"}
                  </p>
                  {item.category && (
                    <p className="text-[12px] text-gray-400 truncate">
                      {item.category}
                    </p>
                  )}
                </div>

                {/* Price + Arrow */}
                <div className="flex flex-col items-end ml-2 shrink-0">
                  <p className="text-[14px] font-bold text-[#2d8659] mb-0.5">
                    ₹{Math.floor(price)}
                  </p>
                  {mrp > price && (
                    <p className="text-[11px] text-gray-300 line-through mb-1">
                      ₹{Math.floor(mrp)}
                    </p>
                  )}
                  <ChevronRight size={18} color="#DDD" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Empty state when no query ── */}
      {query.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-5">
          <Search size={50} color="#DDD" />
          <p className="mt-4 text-[15px] text-gray-400 font-medium text-center">
            Start typing to search products
          </p>
        </div>
      )}
    </div>
  );
}