'use client';

import React, { useState, useEffect } from 'react';
import { bakeryInfo } from '@/data/bakeryData';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Story', href: '#about' },
    { name: 'Menu', href: '#products' },
    { name: 'Visit Us', href: '#contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm border-stone-200/50' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="relative group">
            <span className={`font-serif text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-amber-900' : 'text-white'
            }`}>
              {bakeryInfo.name}
            </span>
            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full`}></span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-amber-500 ${
                  isScrolled ? 'text-stone-600' : 'text-stone-100'
                }`}
              >
                {link.name}
              </a>
            ))}
            <button className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
              isScrolled 
                ? 'bg-amber-700 text-white hover:bg-amber-800' 
                : 'bg-white text-amber-900 hover:bg-amber-50'
            }`}>
              Order Online
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 rounded-full transition-colors hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-stone-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-stone-900' : 'text-white'}`} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div className={`fixed inset-0 z-40 bg-stone-900/95 backdrop-blur-xl transition-transform duration-500 md:hidden flex items-center justify-center ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col items-center gap-8 p-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="font-serif text-3xl text-stone-100 hover:text-amber-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="mt-4 px-8 py-3 bg-amber-600 text-white rounded-full text-lg font-bold hover:bg-amber-700 transition-colors">
            Order Online
          </button>
        </div>
      </div>
    </>
  );
}
