import React, { useEffect, useRef, useState } from 'react';
import { Heart, ShoppingCart, User, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import assets from '../assets/assets';

const Header = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const header = [
  { label: 'HOME', path: '/home', hasDropdown: false },
  { label: 'SHOP', path: '/shop', hasDropdown: true },
  { label: 'BLOG', path: '/blog', hasDropdown: false },
  { label: 'ABOUT US', path: '/about-us', hasDropdown: false },
  { label: 'CONTACT US', path: '/contact-us', hasDropdown: false },
  { label: '', path: '/favorite-cart', hasDropdown: false },
  { label: '', path: '/shopping-cart', hasDropdown: false },
  { label: '', path: '/user-profile', hasDropdown: false },
  
];


  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setIsShopOpen(true), 500);
  }

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setIsShopOpen(false), 200);
  }
  
  useEffect(() => {
    setIsShopOpen(false);
  }, [location.pathname])
 
  return (
    <header className="w-full border-b border-gray-100 sticky top-0 z-50 bg-white">

      <div className="bg-[#2D2926] text-white text-center py-2 text-xs uppercase tracking-widest">
        Free shipping on orders over $150
      </div>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-tight">
            {header.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.label}
                  className="relative flex items-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <p className={`cursor-pointer transition-colors duration-200 hover:text-red-800 ${
                    isActive(item.path) ? 'text-red-800 font-medium' : 'text-stone-600'
                  }`}>
                    {item.label}
                  </p>
                  <div className="absolute h-6 w-full top-full" />

                  {/* Dropdown */}
                  <div className={`
                    absolute top-[calc(100%+8px)] left-[-150px] w-[850px] bg-white
                    shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-t border-stone-100
                    transition-all duration-300 ease-out
                    ${isShopOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-3'}
                  `}>
                    <div className="grid grid-cols-3 gap-16 p-12">

                      {/* Column 1: Popular */}
                      <div>
                        <h4 className="text-red-900 text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Popular</h4>
                        <ul className="space-y-4 text-[13px] text-stone-600 font-sans tracking-wide">
                          <li><Link to="/shop" className="hover:text-red-900">Shop All</Link></li>
                          <li><Link to="/shop/red" className="hover:text-red-900">Red Wines</Link></li>
                          <li><Link to="/shop/white" className="hover:text-red-900">White Wines</Link></li>
                          <li><Link to="/shop/sparkling" className="hover:text-red-900">Sparkling</Link></li>
                          <li><Link to="/shop/rose" className="hover:text-red-900">Rosé</Link></li>
                        </ul>
                      </div>

                      {/* Column 2: Varieties */}
                      <div>
                        <h4 className="text-red-900 text-[10px] uppercase tracking-[0.3em] font-bold mb-8">Varieties</h4>
                        <ul className="space-y-4 text-[13px] text-stone-600 font-sans tracking-wide">
                          <li><Link to="/shop/cabernet" className="hover:text-red-900">Cabernet Sauvignon</Link></li>
                          <li><Link to="/shop/shiraz" className="hover:text-red-900">Shiraz</Link></li>
                          <li><Link to="/shop/pinot-noir" className="hover:text-red-900">Pinot Noir</Link></li>
                          <li><Link to="/shop/chardonnay" className="hover:text-red-900">Chardonnay</Link></li>
                          <li><Link to="/shop/merlot" className="hover:text-red-900">Merlot</Link></li>
                        </ul>
                      </div>

                      {/* Column 3: Promo */}
                      <div className="bg-stone-50 p-8 flex flex-col items-center justify-center text-center group/promo">
                        <img
                          src={assets.glass}
                          alt="Featured Range"
                          className="w-auto mb-6 opacity-40 group-hover/promo:opacity-100 transition-opacity duration-700"
                        />
                        <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 mb-2">Heritage Range</p>
                        <h5 className="italic text-base text-stone-900 mb-6">Explore Our <br /> Award Winners</h5>
                        <Link
                          to="/shop"
                          className="text-[10px] font-bold text-red-900 border-b border-red-900 pb-1 uppercase tracking-widest hover:text-stone-900 hover:border-stone-900 transition-colors"
                        >
                          View Collection
                        </Link>
                      </div>

                    </div>
                  </div>
                </div>

              ) : (

                // Normal links
                <Link
                  key={item.label}
                  to={item.path}
                  className={`transition-colors duration-200 hover:text-red-800 ${
                    isActive(item.path) ? 'text-red-800 font-medium' : 'text-stone-600'
                  }`}
                >
                  {item.label}
                </Link>

              )
            )}
          </nav>

          {/* LOGO */}
          <div className="flex-shrink-0">
            <img
              src={assets.logo}
              alt="Wine Shop Logo"
              className="h-24 w-auto border border-b-gray-300 rounded-full shadow-sm me-72"
            />
          </div>

          {/* ICONS */}
          <div className="flex items-center space-x-4 text-gray-600">
            <button className="hover:text-red-800"><Link to={'/favorite-cart'}><Heart size={20} /></Link></button>
            <Link to='/shopping-cart' className="hover:text-red-800 relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-800 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <button className="hover:text-red-800"> <Link to={'/user-profile'}><User size={20} /></Link></button>
            <button className="md:hidden"><Menu size={24} /></button>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;