"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "@/redux/cartSlice";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddItem = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => router.back()} className="p-2 bg-white rounded-full shadow-sm">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">My Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <ShoppingCart size={80} className="mb-4 opacity-20" />
          <p className="text-lg">Your cart is empty</p>
          <button 
            onClick={() => router.push("/")}
            className="mt-4 px-6 py-2 bg-[#457b9d] text-white rounded-lg"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{items.length} Items</span>
            <button 
              onClick={handleClearCart}
              className="text-red-500 text-sm flex items-center gap-1"
            >
              <Trash2 size={16} /> Clear Cart
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ShoppingCart size={24} />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-[#457b9d] font-bold mt-1">₹{item.price}</p>
                </div>

                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 hover:bg-white rounded transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => handleAddItem(item)}
                    className="p-1 hover:bg-white rounded transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-white p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-3xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-[#457b9d]">₹{totalAmount}</span>
            </div>
            <button className="w-full py-4 bg-[#457b9d] text-white font-bold rounded-2xl shadow-lg active:scale-[0.98] transition-transform">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
