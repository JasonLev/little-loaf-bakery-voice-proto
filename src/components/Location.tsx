import React from 'react';
import { bakeryInfo } from '@/data/bakeryData';
import { MapPin, Clock, Truck, Mail, Instagram, Send } from 'lucide-react';

export default function Location() {
  return (
    <section id="contact" className="relative py-24 px-6 bg-stone-900 text-stone-100 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=2080&auto=format&fit=crop")',
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/80 to-stone-900/90 z-10"></div>

      <div className="max-w-7xl mx-auto relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-12">
            <div>
              <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">Get in Touch</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white mt-4 mb-6">Visit & Contact</h2>
              <p className="text-stone-400 text-lg max-w-md font-light">
                We'd love to hear from you. Stop by for a fresh loaf or send us a message about a special order.
              </p>
            </div>

            <div className="space-y-8">
              <InfoItem icon={MapPin} title="Location">
                <p className="text-stone-300 text-lg">{bakeryInfo.location}</p>
              </InfoItem>

              <InfoItem icon={Clock} title="Pick-up Hours">
                <ul className="text-stone-300 space-y-2">
                  <li className="flex justify-between max-w-xs"><span className="text-stone-500">Mon - Thu</span> <span>{bakeryInfo.hours.monday_thursday}</span></li>
                  <li className="flex justify-between max-w-xs"><span className="text-stone-500">Friday</span> <span>{bakeryInfo.hours.friday}</span></li>
                  <li className="flex justify-between max-w-xs"><span className="text-stone-500">Sunday</span> <span>{bakeryInfo.hours.sunday}</span></li>
                </ul>
                <p className="text-amber-500 text-sm mt-4 italic">{bakeryInfo.hours.special_request}</p>
              </InfoItem>

              <div className="pt-8 flex gap-8 border-t border-stone-800">
                <SocialLink href={`mailto:${bakeryInfo.contact.email}`} icon={Mail} label="Email Us" />
                <SocialLink href="#" icon={Instagram} label={bakeryInfo.contact.instagram} />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="font-serif text-2xl mb-2 text-white">Send a Message</h3>
            <p className="text-stone-400 mb-8 text-sm">Have a question about ingredients or want to place a large order?</p>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">Name</label>
                  <input type="text" className="w-full bg-stone-800/50 border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-white placeholder-stone-600" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">Email</label>
                  <input type="email" className="w-full bg-stone-800/50 border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-white placeholder-stone-600" placeholder="jane@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">Message</label>
                <textarea rows={4} className="w-full bg-stone-800/50 border border-stone-700 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-white placeholder-stone-600" placeholder="I'd like to order..."></textarea>
              </div>
              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group">
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoItem({ icon: Icon, title, children }: { icon: any, title: string, children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-6">
      <div className="p-3 bg-stone-800 rounded-xl text-amber-500 shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="font-bold text-lg mb-3 text-white">{title}</h4>
        {children}
      </div>
    </div>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
  return (
    <a href={href} className="flex items-center gap-3 text-stone-400 hover:text-amber-400 transition-colors group">
      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      <span className="font-medium">{label}</span>
    </a>
  );
}
