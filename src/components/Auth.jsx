'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

const API_BASE_URL = 'https://api.marasimpex.com/auth';

const Auth = ({ onAuthSuccess, onSkip }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  useEffect(() => {
    const state = { page: 'auth', timestamp: Date.now() };
    window.history.pushState(state, '', window.location.href);
    
    const handlePopState = (event) => {
      const newState = { page: 'auth', timestamp: Date.now() };
      window.history.pushState(newState, '', window.location.href);
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (modalVisible) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [modalVisible]);

  // Form states
  const [loginPhone, setLoginPhone] = useState('');
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    phone: '',
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginPhone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: loginPhone }),
        signal: controller.signal
      });

      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userPhone', loginPhone);
        onAuthSuccess();
      } else {
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        alert('Request timed out. Please try again.');
      } else {
        alert('Network error. Please check your connection.');
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, phone, houseNo, street, city, state, pincode } = signupForm;

    if (!name || !email || phone.length !== 10) {
      alert('Please fill all required fields correctly');
      return;
    }
    if (!houseNo || !street || !city || !state || pincode.length !== 6) {
      alert('Please fill all address fields correctly');
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupForm),
        signal: controller.signal
      });

      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userPhone', phone);
        onAuthSuccess();
      } else {
        alert(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        alert('Request timed out. Please try again.');
      } else {
        alert('Network error. Please check your connection.');
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const openPolicy = (type) => {
    const content = type === 'terms' ? {
      title: 'Terms of Use',
      body: `Welcome to Helpaana. By using our application, you agree to the following terms and conditions...`
    } : {
      title: 'Privacy Policy',
      body: `Your privacy is important to us. This Privacy Policy explains how Helpaana collects, uses, and protects your information...`
    };
    setModalContent(content);
    setModalVisible(true);
  };

  const isLoginEnabled = loginPhone.length === 10;
  const isSignupEnabled = 
    signupForm.name && signupForm.email && signupForm.phone.length === 10 &&
    signupForm.houseNo && signupForm.street && signupForm.city && 
    signupForm.state && signupForm.pincode.length === 6;

  return (
    <div className="min-h-screen bg-[#023e8a] flex flex-col p-6 text-white overflow-y-auto">
      {/* Skip Button */}
      <button 
        onClick={onSkip}
        className="self-end pt-4 pb-4 px-2 font-semibold text-lg flex items-center"
      >
        Skip <ChevronRight className="ml-1 w-5 h-5" />
      </button>

      {/* Logo */}
      <div className="mt-10">
        <h1 className="text-6xl font-bold tracking-wider">Helpaana</h1>
      </div>

      {/* Tagline */}
      <div className="mt-5 mb-8">
        <p className="text-2xl font-semibold leading-relaxed">Book Your Pandit, Tour Cook,</p>
        <p className="text-2xl font-semibold leading-relaxed">Your Stay All in a Tap*</p>
      </div>

      {/* Tabs */}
      <div className="relative h-12 bg-white/15 rounded-full flex items-center mb-8 p-1 overflow-hidden">
        <motion.div 
          className="absolute h-10 w-1/2 bg-[#FF6B9D] rounded-full"
          animate={{ x: activeTab === 'login' ? 0 : '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button 
          className={`flex-1 z-10 font-semibold transition-colors ${activeTab === 'login' ? 'text-white' : 'text-white/70'}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button 
          className={`flex-1 z-10 font-semibold transition-colors ${activeTab === 'signup' ? 'text-white' : 'text-white/70'}`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>

      {/* Forms */}
      <div className="flex-1">
        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Phone Number</label>
              <div className="bg-white rounded-2xl flex items-center px-4 h-14 text-gray-800">
                <span className="font-bold mr-2 text-lg">+91</span>
                <input 
                  type="tel"
                  placeholder="Enter 10-digit number"
                  className="flex-1 outline-none text-lg bg-transparent"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                  maxLength={10}
                />
              </div>
            </div>
            <button 
              type="submit"
              disabled={!isLoginEnabled || isLoading}
              className={`w-full h-14 bg-[#FF6B9D] rounded-full font-bold text-xl shadow-lg transition-opacity ${(!isLoginEnabled || isLoading) ? 'opacity-60' : 'opacity-100'}`}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4 pb-10">
            <div className="space-y-1">
              <label className="text-sm font-semibold">Full Name *</label>
              <input 
                className="w-full bg-white rounded-2xl px-4 h-12 text-gray-800 outline-none"
                placeholder="Enter your full name"
                value={signupForm.name}
                onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold">Email *</label>
              <input 
                type="email"
                className="w-full bg-white rounded-2xl px-4 h-12 text-gray-800 outline-none"
                placeholder="Enter your email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold">Phone Number *</label>
              <div className="bg-white rounded-2xl flex items-center px-4 h-12 text-gray-800">
                <span className="font-bold mr-2">+91</span>
                <input 
                  type="tel"
                  placeholder="10-digit number"
                  className="flex-1 outline-none bg-transparent"
                  value={signupForm.phone}
                  onChange={(e) => setSignupForm({...signupForm, phone: e.target.value.replace(/[^0-9]/g, '').slice(0, 10)})}
                  maxLength={10}
                />
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-[#FFD700] font-bold">Address Details</h3>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-semibold">House No *</label>
                <input 
                  className="w-full bg-white rounded-2xl px-4 h-12 text-gray-800 outline-none"
                  placeholder="123"
                  value={signupForm.houseNo}
                  onChange={(e) => setSignupForm({...signupForm, houseNo: e.target.value})}
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-sm font-semibold">Street *</label>
                <input 
                  className="w-full bg-white rounded-2xl px-4 h-12 text-gray-800 outline-none"
                  placeholder="Main St"
                  value={signupForm.street}
                  onChange={(e) => setSignupForm({...signupForm, street: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold">City *</label>
              <input 
                className="w-full bg-white rounded-2xl px-4 h-12 text-gray-800 outline-none"
                placeholder="Lucknow"
                value={signupForm.city}
                onChange={(e) => setSignupForm({...signupForm, city: e.target.value})}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-semibold">State *</label>
                <input 
                  className="w-full bg-white rounded-2xl px-4 h-12 text-gray-800 outline-none"
                  placeholder="UP"
                  value={signupForm.state}
                  onChange={(e) => setSignupForm({...signupForm, state: e.target.value})}
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-sm font-semibold">Pincode *</label>
                <input 
                  className="w-full bg-white rounded-2xl px-4 h-12 text-gray-800 outline-none"
                  placeholder="226001"
                  value={signupForm.pincode}
                  onChange={(e) => setSignupForm({...signupForm, pincode: e.target.value.replace(/[^0-9]/g, '').slice(0, 6)})}
                  maxLength={6}
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={!isSignupEnabled || isLoading}
              className={`w-full h-14 bg-[#FF6B9D] rounded-full font-bold text-xl mt-4 shadow-lg transition-opacity ${(!isSignupEnabled || isLoading) ? 'opacity-60' : 'opacity-100'}`}
            >
              {isLoading ? 'Loading...' : 'Create Account'}
            </button>
          </form>
        )}
      </div>

      {/* Footer Links */}
      <div className="py-6 text-center text-[13px] leading-5">
        <p>By continuing, you agree to our</p>
        <p>
          <span className="text-[#FFD700] font-semibold cursor-pointer" onClick={() => openPolicy('terms')}>Terms of Use</span>
          <span> & </span>
          <span className="text-[#FFD700] font-semibold cursor-pointer" onClick={() => openPolicy('privacy')}>Privacy Policy</span>
        </p>
      </div>

      {/* Policy Modal */}
      <AnimatePresence>
        {modalVisible && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-white rounded-t-[32px] h-[90%] p-6 text-gray-800 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-2xl font-bold">{modalContent.title}</h2>
                <button onClick={() => setModalVisible(false)}>
                  <X className="w-8 h-8 text-gray-600" />
                </button>
              </div>
              <div className="whitespace-pre-line leading-relaxed text-sm">
                {modalContent.body}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;
