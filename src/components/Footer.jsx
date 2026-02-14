'use client';
import React, { useState, useEffect } from 'react';
import Footer from './Footer';

export default function ResponsiveDemo() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getDeviceType = () => {
    if (screenWidth < 640) return 'Mobile';
    if (screenWidth < 1024) return 'Tablet';
    return 'Desktop';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Device Info Banner */}
      <div className="bg-[#457B9D] text-white py-3 px-6 text-center sticky top-0 z-40">
        <p className="text-sm font-semibold">
          Current View: <span className="text-yellow-300">{getDeviceType()}</span> 
          {' '}({screenWidth}px wide)
        </p>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#457B9D]">
            Helpaana
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Responsive Footer Demo
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 sm:pb-0">
        <div className="container mx-auto px-6 py-12">
          {/* Responsive Info Cards */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📱 Responsive Footer Demo
              </h2>
              <p className="text-gray-600 mb-4">
                Resize your browser window to see how the footer adapts to different screen sizes.
              </p>
              
              <div className="space-y-4">
                {/* Mobile Info */}
                <div className={`p-4 rounded-lg border-2 transition-all ${
                  screenWidth < 640 
                    ? 'border-[#457B9D] bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      screenWidth < 640 ? 'bg-[#457B9D]' : 'bg-gray-300'
                    }`}></div>
                    <h3 className="font-bold text-gray-800">Mobile (0-639px)</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    ✓ Fixed bottom navigation bar<br />
                    ✓ 4 main icons with labels<br />
                    ✓ Always visible at bottom
                  </p>
                </div>

                {/* Tablet Info */}
                <div className={`p-4 rounded-lg border-2 transition-all ${
                  screenWidth >= 640 && screenWidth < 1024
                    ? 'border-[#457B9D] bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      screenWidth >= 640 && screenWidth < 1024 ? 'bg-[#457B9D]' : 'bg-gray-300'
                    }`}></div>
                    <h3 className="font-bold text-gray-800">Tablet (640-1023px)</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    ✓ Full footer with 2-column layout<br />
                    ✓ All links organized by category<br />
                    ✓ Social icons at bottom
                  </p>
                </div>

                {/* Desktop Info */}
                <div className={`p-4 rounded-lg border-2 transition-all ${
                  screenWidth >= 1024
                    ? 'border-[#457B9D] bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      screenWidth >= 1024 ? 'bg-[#457B9D]' : 'bg-gray-300'
                    }`}></div>
                    <h3 className="font-bold text-gray-800">Desktop (1024px+)</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    ✓ Full footer with 4-column layout<br />
                    ✓ All sections side by side<br />
                    ✓ Optimized spacing and typography
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                ✨ Key Features
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#457B9D] font-bold">✓</span>
                  <span><strong>Fully Responsive:</strong> Adapts seamlessly from mobile to desktop</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#457B9D] font-bold">✓</span>
                  <span><strong>Smart Navigation:</strong> Mobile gets bottom nav, larger screens get full footer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#457B9D] font-bold">✓</span>
                  <span><strong>SEO Friendly:</strong> All links accessible to search engines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#457B9D] font-bold">✓</span>
                  <span><strong>Accessible:</strong> ARIA labels and keyboard navigation support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#457B9D] font-bold">✓</span>
                  <span><strong>Brand Consistent:</strong> Uses Helpaana colors throughout</span>
                </li>
              </ul>
            </div>

            {/* Test Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#457B9D] to-[#2c3e50] text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Scroll Test</h3>
                <p className="text-sm opacity-90">
                  Scroll down to see how the mobile navigation stays fixed at the bottom while the desktop footer appears naturally at the end of the page.
                </p>
              </div>
              <div className="bg-gradient-to-br from-[#6b9ac4] to-[#457B9D] text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">Resize Test</h3>
                <p className="text-sm opacity-90">
                  Resize your browser window to see the footer automatically switch between mobile, tablet, and desktop layouts.
                </p>
              </div>
            </div>

            {/* Filler Content for Scrolling */}
            <div className="space-y-6 py-12">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Sample Section {item}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    This is sample content to demonstrate scrolling behavior. On mobile devices, 
                    the bottom navigation stays fixed while you scroll. On larger screens, 
                    the full footer appears at the bottom of the page naturally.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}