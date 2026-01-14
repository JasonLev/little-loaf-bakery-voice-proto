import React from 'react';
import { bakeryInfo } from '@/data/bakeryData';

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-stone-200">
      {/* Placeholder for a high-quality background image */}
      <div 
        className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop")',
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      
      <div className="relative z-20 text-center px-4 max-w-4xl">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white drop-shadow-lg mb-6">
          {bakeryInfo.name}
        </h1>
        <p className="text-xl md:text-2xl text-stone-100 font-medium tracking-wide mb-8 drop-shadow-md">
          {bakeryInfo.tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#products" 
            className="px-8 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-full transition-colors duration-300 font-medium text-lg"
          >
            Explore Our Menu
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 bg-white hover:bg-stone-100 text-stone-900 rounded-full transition-colors duration-300 font-medium text-lg"
          >
            Order Now
          </a>
        </div>
      </div>
    </section>
  );
}
