import React from "react";
import { bakeryInfo } from "@/data/bakeryData";
import { Heart, Utensils, Users } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Grid */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-amber-200/20 rounded-full blur-3xl transform -translate-x-10 translate-y-10"></div>
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="space-y-6 mt-12">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop"
                    alt="Sourdough preparation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-md border border-stone-100">
                  <p className="font-serif text-3xl text-amber-700 mb-1">
                    100%
                  </p>
                  <p className="text-sm font-medium text-stone-600 uppercase tracking-wide">
                    Organic Flour
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-amber-700 rounded-2xl shadow-md text-white">
                  <p className="font-serif text-3xl mb-1">48hr</p>
                  <p className="text-sm font-medium text-amber-100 uppercase tracking-wide">
                    Fermentation
                  </p>
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1581339399838-2a120c18bba3?q=80&w=1974&auto=format&fit=crop"
                    alt="Fresh baked bread"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">
                Our Story
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-stone-900 mt-4 mb-6 leading-tight">
                Handcrafted with{" "}
                <span className="italic text-amber-700">love</span> in every
                loaf.
              </h2>
              <div className="w-20 h-1 bg-amber-700"></div>
            </div>

            <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
              <p>"{bakeryInfo.about.team}"</p>
              <p>{bakeryInfo.about.philosophy}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-stone-200">
              <Feature icon={Heart} title="Made with Love" />
              <Feature icon={Utensils} title="Small Batch" />
              <Feature icon={Users} title="Family Owned" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-4 sm:block sm:text-center group">
      <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 mb-0 sm:mb-4 group-hover:bg-amber-700 group-hover:text-white transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="font-semibold text-stone-900">{title}</h4>
    </div>
  );
}
