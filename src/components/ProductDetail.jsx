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

const ProductDetail = ({ 
  name: propName, 
  image: propImage, 
  price: propPrice, 
  mrp: propMrp,
  item: propItem = null 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const name = propName || searchParams.get('name') || 'Product Details';
  const mainImage = propImage || searchParams.get('image') || 'https://images.unsplash.com/photo-1584512603392-f0c3d99c1ce0?q=80&w=800';
  const sellingPrice = Number(propPrice || searchParams.get('price') || 0);
  const mrp = Number(propMrp || searchParams.get('mrp') || sellingPrice);
  const discountPercent = Math.round(((mrp - sellingPrice) / mrp) * 100);
  
  const item = propItem || {
    description: searchParams.get('description') || 'Experience professional and high-quality product tailored to your needs.',
    category: searchParams.get('category') || 'Ecommerce',
    sub_category: searchParams.get('sub_category') || 'General',
    id: searchParams.get('id'),
    unit: searchParams.get('unit') || 'piece',
    size: searchParams.get('size') || '',
    images: JSON.parse(searchParams.get('images') || '[]')
  };

  const [activeImage, setActiveImage] = useState(mainImage);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [dates, setDates] = useState([]);
  const [additionalRequest, setAdditionalRequest] = useState('');

  // Rating and Review State
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newReview, setNewReview] = useState('');
  const [userName, setUserName] = useState('');
  const [averageRating, setAverageRating] = useState(5);

  const timeSlots = [
    '09:00 AM', '11:00 AM', '01:00 PM',
    '03:00 PM', '05:00 PM', '07:00 PM',
  ];

  useEffect(() => {
    generateDates();
    loadReviews();
    if (item.images && item.images.length > 0) {
      setActiveImage(item.images[0].url);
    }
  }, [name]);

  const loadReviews = () => {
    const savedReviews = localStorage.getItem(`reviews_prod_${item.id || name}`);
    if (savedReviews) {
      const parsedReviews = JSON.parse(savedReviews);
      setReviews(parsedReviews);
      
      if (parsedReviews.length > 0) {
        const sum = parsedReviews.reduce((acc, curr) => acc + curr.rating, 0);
        setAverageRating((sum / parsedReviews.length).toFixed(1));
      }
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.trim() || !userName.trim()) return alert('Please provide your name and review');

    const reviewObj = {
      id: Date.now(),
      userName,
      rating: newRating,
      comment: newReview,
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [reviewObj, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_prod_${item.id || name}`, JSON.stringify(updatedReviews));
    
    const sum = updatedReviews.reduce((acc, curr) => acc + curr.rating, 0);
    setAverageRating((sum / updatedReviews.length).toFixed(1));

    setNewReview('');
    setNewRating(5);
    setUserName('');
  };

  const handleShare = async () => {
    const shareData = {
      title: `HelpAana - ${name}`,
      text: `Check out this product: ${name}`,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert('Product link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

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
    const selectedDateObj = dates.find(d => d.id === selectedDate);
    const productItem = {
      id: item.id || `prod_${Date.now()}`,
      name: name,
      image: activeImage,
      price: sellingPrice,
      totalPrice: sellingPrice * quantity,
      quantity: quantity,
      category: item.category,
      sub_category: item.sub_category,
      size: item.size,
      unit: item.unit,
      additionalRequest,
      deliveryDate: `${selectedDateObj.dayName}, ${selectedDateObj.dateNum} ${selectedDateObj.monthName}`
    };

    dispatch(addToCart(productItem));
    router.push('/cart');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="hidden sm:flex items-center text-xs text-gray-500 gap-2">
            <span>Ecommerce</span>
            <ChevronRight size={12} />
            <span>{item.sub_category}</span>
            <ChevronRight size={12} />
            <span className="font-bold text-gray-800">{name}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Share2 
            size={20} 
            className="text-gray-600 cursor-pointer hover:text-[#004090] transition-colors" 
            onClick={handleShare}
            title="Share this product"
          />
          <Heart size={20} className="text-gray-600 cursor-pointer hover:text-red-500 transition-colors" />
          <button onClick={() => router.push('/cart')} className="relative">
            <ShoppingCart size={22} className="text-gray-700 hover:text-[#004090]" />
            <span className="absolute -top-2 -right-2 bg-[#004090] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white">0</span>
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-[1500px] mx-auto w-full pt-16 pb-32">
        <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-6 lg:p-8">
          
          <div className="w-full lg:w-[40%] flex flex-col gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#004090] uppercase tracking-wider block">
                {item.sub_category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight">
                {name}
              </h1>
              <div className="flex items-center gap-1 mt-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(averageRating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{averageRating}</span>
                <span className="text-xs text-gray-500">({reviews.length} reviews)</span>
              </div>
            </div>

            <div className="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden relative group">
              <img 
                src={activeImage} 
                alt={name}
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#004090] text-white px-2 py-1 text-[10px] font-bold rounded shadow-sm">
                  {discountPercent}% OFF
                </div>
              )}
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {(item.images.length > 0 ? item.images : [{url: activeImage}]).map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImage(img.url)}
                  className={`w-16 h-16 border rounded cursor-pointer p-1 transition-all ${activeImage === img.url ? 'border-[#004090] ring-1 ring-[#004090]' : 'border-gray-200 hover:border-[#004090]'}`}
                >
                  <img src={img.url} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-bold mb-3 text-gray-900">About this product</h3>
              <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-line">
                {item.description}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                <Info size={16} className="text-[#004090]" />
                Special Instructions?
              </h4>
              <textarea 
                value={additionalRequest}
                onChange={(e) => setAdditionalRequest(e.target.value)}
                placeholder="Any special requests for your order?"
                className="w-full bg-white border border-gray-300 rounded p-3 text-sm focus:ring-1 focus:ring-[#004090] focus:border-[#004090] outline-none transition-all resize-none"
                rows={3}
              />
            </div>

            <div className="border-t border-gray-200 pt-8 mt-4">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <MessageSquare size={22} className="text-[#004090]" />
                Customer Reviews
              </h3>

              <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 space-y-4">
                <h4 className="text-sm font-bold text-gray-800">Write a Review</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Your Name</label>
                    <input 
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#004090]/20 focus:border-[#004090] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Rating</label>
                    <div className="flex gap-2 items-center h-[42px]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star 
                            size={24} 
                            fill={star <= newRating ? "#FACC15" : "none"} 
                            className={star <= newRating ? "text-yellow-400" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Your Review</label>
                  <textarea 
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Share your experience with this product..."
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#004090]/20 focus:border-[#004090] outline-none min-h-[100px]"
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-[#004090] hover:bg-[#003070] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-md"
                >
                  <Send size={16} />
                  Submit Review
                </button>
              </form>

              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <MessageSquare size={32} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-bold text-gray-900">{review.userName}</h5>
                          <div className="flex text-yellow-400 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[35%] space-y-6 border-b lg:border-b-0 pb-8 pt-0 lg:pt-14">
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-[#004090] text-white px-2 py-0.5 text-[10px] font-bold rounded">HelpAana Choice</span>
              <span className="text-gray-500">for "{name}"</span>
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                {discountPercent > 0 && (
                  <span className="text-2xl font-light text-red-700">-{discountPercent}%</span>
                )}
                <div className="flex items-start">
                  <span className="text-sm mt-1 font-medium">₹</span>
                  <span className="text-3xl font-medium">{sellingPrice}</span>
                </div>
              </div>
              {mrp > sellingPrice && (
                <p className="text-xs text-gray-500">M.R.P.: <span className="line-through">₹{mrp}</span></p>
              )}
              <div className="bg-gray-100 p-2 rounded inline-block text-[11px] font-bold text-gray-700 border border-gray-200">
                Inclusive of all taxes
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-4">
              <FeatureItem icon={CheckCircle2} label="Verified" color="text-green-600" />
              <FeatureItem icon={ShieldCheck} label="Safe" color="text-[#004090]" />
              <FeatureItem icon={Zap} label="Fast Delivery" color="text-yellow-600" />
              <FeatureItem icon={Clock} label={item.size + ' ' + item.unit} color="text-gray-600" />
            </div>

            <hr className="border-gray-200" />

            <div className="space-y-6">
              <section>
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Calendar size={18} />
                  Delivery Date (Estimated)
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
                <h3 className="text-sm font-bold mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </section>
            </div>
          </div>

          <div className="w-full lg:w-[25%] pt-0 lg:pt-14">
            <div className="lg:sticky lg:top-24 border border-gray-200 rounded-lg p-4 space-y-4 shadow-sm bg-white">
              <div className="text-2xl font-medium">₹{sellingPrice * quantity}</div>
              
              <div className="space-y-3 pt-2">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#004090] hover:bg-[#003070] text-white py-2.5 rounded-full font-medium text-sm border border-[#004090] shadow-sm transition-all"
                >
                  Buy Now
                </button>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Sold by</span>
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

export default ProductDetail;
