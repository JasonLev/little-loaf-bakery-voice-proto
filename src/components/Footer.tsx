import React from 'react';
import { bakeryInfo } from '@/data/bakeryData';

export default function Footer() {
  return (
    <footer className="py-12 bg-stone-950 text-stone-500 text-center border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="font-serif text-2xl text-stone-200 mb-4">{bakeryInfo.name}</div>
        <p className="mb-8">Handcrafted with love in West Los Angeles.</p>
        <div className="text-sm">
          © {new Date().getFullYear()} Little Loaf Bakery. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
