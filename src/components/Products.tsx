import React from 'react';
import { menuItems } from '@/data/bakeryData';

export default function Products() {
  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  return (
    <section id="products" className="py-20 px-4 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">Our Creations</h2>
          <div className="w-24 h-1 bg-amber-700 mx-auto mb-8"></div>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            From our naturally leavened sourdough to our decadent desserts, everything is crafted with the finest organic ingredients.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-16 last:mb-0">
            <h3 className="font-serif text-3xl text-stone-800 mb-8 pb-2 border-b border-stone-200">
              {category}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-100 flex flex-col h-full"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-xl text-stone-900">{item.name}</h4>
                      {!item.inStock && (
                        <span className="text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-500 px-2 py-1 rounded">
                          Sold Out
                        </span>
                      )}
                    </div>
                    <p className="text-stone-600 mb-4 flex-grow">{item.description}</p>
                    <div className="mt-auto">
                      <p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-2">Ingredients</p>
                      <div className="flex flex-wrap gap-2">
                        {item.ingredients.map((ing) => (
                          <span key={ing} className="text-xs bg-stone-50 text-stone-600 px-2 py-1 rounded border border-stone-200">
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
