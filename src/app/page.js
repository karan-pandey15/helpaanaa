'use client';
import { useState, useEffect, useCallback } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Auth from '@/components/Auth';
import Header from '@/components/Header';
import Carousel from '@/components/Carousel';
import Categories from '@/components/Categories';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('loading');

  useEffect(() => {
    // Check storage only after mounting to avoid hydration mismatch
    const hasSeenSplash = typeof window !== 'undefined' ? sessionStorage.getItem('hasSeenSplash') : null;
    const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;

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

  const handleSplashFinish = useCallback(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    const token = localStorage.getItem('userToken');
    if (token) {
      setCurrentScreen('home');
    } else {
      setCurrentScreen('auth');
    }
  }, []);

  const handleAuthSuccess = useCallback(() => {
    setCurrentScreen('home');
  }, []);

  const handleSkip = useCallback(() => {
    setCurrentScreen('home');
  }, []);

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
    <main className="min-h-screen bg-white pb-24 w-full">
      {/* Container with responsive max-width and centering */}
      <div className="w-full max-w-md mx-auto lg:max-w-full">
        <div className=" ">
          <Header />
          {/* Add your other components here */}
        </div>
      </div>
    </main>
  );
}