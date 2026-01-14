import React from 'react';
import { bakeryInfo } from '@/data/bakeryData';
import { Heart, Utensils, Users } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">Our Story</h2>
          <div className="w-24 h-1 bg-amber-700 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xl text-stone-700 leading-relaxed italic">
              "{bakeryInfo.about.team}"
            </p>
            <p className="text-lg text-stone-600 leading-relaxed">
              {bakeryInfo.about.philosophy}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="text-amber-700 w-6 h-6" />
                </div>
                <h4 className="font-semibold text-stone-900">Made with Love</h4>
              </div>
              <div className="text-center">
                <div className="bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Utensils className="text-amber-700 w-6 h-6" />
                </div>
                <h4 className="font-semibold text-stone-900">Small Batch</h4>
              </div>
              <div className="text-center">
                <div className="bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="text-amber-700 w-6 h-6" />
                </div>
                <h4 className="font-semibold text-stone-900">Family Owned</h4>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-stone-200 rounded-2xl overflow-hidden shadow-xl transform rotate-3">
               <img 
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop" 
                alt="Bakery workspace" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 aspect-square w-2/3 bg-stone-100 rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 border-8 border-white hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1581339399838-2a120c18bba3?q=80&w=1974&auto=format&fit=crop" 
                alt="Bread close up" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
