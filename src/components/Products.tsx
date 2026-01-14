import React from "react";
import { menuItems } from "@/data/bakeryData";

export default function Products() {
  const categories = Array.from(
    new Set(menuItems.map((item) => item.category))
  );

  return (
    <section id="products" className="py-24 px-6 bg-stone-100 relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#444 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">
            Our Menu
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mt-4 mb-6">
            Daily Creations
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto font-light leading-relaxed">
            From our naturally leavened sourdough to our decadent desserts,
            everything is crafted with the finest organic ingredients.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-20 last:mb-0">
            <div className="flex items-center gap-4 mb-10">
              <h3 className="font-serif text-3xl text-stone-800 shrink-0">
                {category}
              </h3>
              <div className="h-px bg-stone-300 flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col h-full hover:-translate-y-1"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-serif font-bold text-xl text-stone-900 group-hover:text-amber-700 transition-colors">
                        {item.name}
                      </h4>
                      {!item.inStock && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-400 px-2 py-1 rounded border border-stone-200">
                          Sold Out
                        </span>
                      )}
                    </div>
                    <p className="text-stone-600 mb-6 flex-grow leading-relaxed font-light">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-6 border-t border-stone-50">
                      <div className="flex flex-wrap gap-2">
                        {item.ingredients.map((ing) => (
                          <span
                            key={ing}
                            className="text-xs bg-amber-50 text-amber-900/70 px-2 py-1 rounded-md font-medium"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
