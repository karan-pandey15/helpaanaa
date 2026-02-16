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
      setCurrentScreen('home');
    } else {
      setCurrentScreen('splash');
    }
  }, []);

  const handleSplashFinish = useCallback(() => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setCurrentScreen('home');
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
    <main className="min-h-screen bg-white pb-24 max-w-md mx-auto shadow-xl relative overflow-x-hidden">
      <Header />
 
    </main>
  );
}
