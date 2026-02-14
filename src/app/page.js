'use client';
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Auth from '@/components/Auth';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('loading');

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    const token = localStorage.getItem('userToken');

    if (hasSeenSplash) {
      if (token) {
        setCurrentScreen('home');
      } else {
        setCurrentScreen('auth');
      }
    } else {
      setCurrentScreen('splash');
    }
  }, []);

  const handleSplashFinish = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    const token = localStorage.getItem('userToken');
    if (token) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('auth');
    }
  };

  const handleAuthSuccess = () => {
    setCurrentScreen('home');
  };

  const handleSkip = () => {
    setCurrentScreen('home');
  };

  if (currentScreen === 'loading') {
    return null; // Or a simple spinner
  }

  if (currentScreen === 'splash') {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (currentScreen === 'auth') {
    return <Auth onAuthSuccess={handleAuthSuccess} onSkip={handleSkip} />;
  }

  return (
    <main className="min-h-screen bg-white pb-24 max-w-md mx-auto shadow-xl relative overflow-x-hidden">
      <Header />
 
      <Footer />
    </main>
  );
}
