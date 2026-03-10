import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
         
          <div className="col-span-1">
            <h3 className="text-white font-serif text-xl mb-6 italic">Our Heritage</h3>
            <p className="text-sm leading-relaxed italic">
              "Bringing the finest French traditions to the heart of Spain since 1976. Hand-selected vineyards, bottled with passion."
            </p>
          </div>

        
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/shop" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">Red Wines</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">White Wines</a></li>
              <li><a href="/shop" className="hover:text-white transition-colors">Rare Vintages</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Customer Care</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/contact" className="hover:text-white transition-colors">Shipping Policy</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Wholesale</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-6">Join the Cellar</h4>
            <p className="text-sm mb-4">Subscribe for exclusive tastings and early access.</p>
            <div className="flex border-b border-gray-600 py-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none focus:outline-none text-sm w-full"
              />
              <button className="text-xs uppercase font-bold tracking-widest hover:text-white transition-colors">Join</button>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 mb-8" />

        <div className="flex flex-col md:row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs">© 2024 Wine Shop Spain. Please drink responsibly.</p>
          <div className="flex space-x-6 py-5">
            <Facebook size={20} className="cursor-pointer hover:text-white" />
            <Instagram size={20} className="cursor-pointer hover:text-white" />
            <Twitter size={20} className="cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;