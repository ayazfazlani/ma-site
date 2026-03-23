'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "923367057973"; // Replace with actual number if different
  const message = "Hi Ayaz, I'm interested in your software development services!";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 ease-out active:scale-95"
        aria-label="Contact on WhatsApp"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 blur-md group-hover:opacity-60 transition-opacity"></div>

        {/* Main Icon */}
        <MessageCircle className="w-8 h-8 relative z-10" />

        {/* Ripple Animation */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:hidden"></span>

        {/* Tooltip */}
        <div className="absolute right-full mr-4 px-3 py-1 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
          Chat with Ayaz
        </div>
      </button>
    </div>
  );
};

export default WhatsAppButton;
