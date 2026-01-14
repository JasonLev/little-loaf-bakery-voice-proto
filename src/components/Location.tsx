import React from 'react';
import { bakeryInfo } from '@/data/bakeryData';
import { MapPin, Clock, Truck, Mail, Instagram } from 'lucide-react';

export default function Location() {
  return (
    <section id="contact" className="py-20 px-4 bg-stone-900 text-stone-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-serif text-4xl mb-8">Visit & Contact</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">Location</h4>
                  <p className="text-stone-400">{bakeryInfo.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">Pick-up Hours</h4>
                  <ul className="text-stone-400 space-y-1">
                    <li><span className="text-stone-300 font-medium">Mon - Thu:</span> {bakeryInfo.hours.monday_thursday}</li>
                    <li><span className="text-stone-300 font-medium">Friday:</span> {bakeryInfo.hours.friday}</li>
                    <li><span className="text-stone-300 font-medium">Sunday:</span> {bakeryInfo.hours.sunday}</li>
                    <li className="italic text-sm mt-2">{bakeryInfo.hours.special_request}</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-amber-500 mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">Delivery</h4>
                  <p className="text-stone-400">{bakeryInfo.delivery}</p>
                </div>
              </div>

              <div className="pt-8 flex gap-6 border-t border-stone-800">
                <a href={`mailto:${bakeryInfo.contact.email}`} className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>Email Us</span>
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
                  <Instagram className="w-5 h-5" />
                  <span>{bakeryInfo.contact.instagram}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-stone-800 p-8 rounded-2xl border border-stone-700">
            <h3 className="font-serif text-2xl mb-6 text-white">Have a Question?</h3>
            <p className="text-stone-400 mb-8">
              Want to place a special order or ask about our seasonal offerings? Send us a message and we'll get back to you as soon as we're out of the kitchen!
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-stone-300">Name</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-stone-300">Email</label>
                <input type="email" className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-stone-300">Message</label>
                <textarea rows={4} className="w-full bg-stone-900 border border-stone-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500 transition-colors"></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
