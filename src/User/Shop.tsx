import React, { useContext, useState } from 'react';
import { ChevronDown, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import { products } from './../assets/assets';

const Shop = () => {
const { products, loadingProducts } = useContext(StoreContext);
  const [activeCategory, setActiveCategory] = useState('All Wines');
  const [priceRange, setPriceRange] = useState(200);



  return (
    <div className="bg-[#FCFBFA] min-h-screen font-sans selection:bg-red-100">
      
      {/* --- REFINED HEADER --- */}
      <section className="pt-24 pb-16 bg-white border-b border-stone-100">
        <div className="container mx-auto px-6 text-center">
          <span className="inline-block text-[10px] uppercase tracking-[0.5em] text-red-800 font-bold mb-4 px-4 py-1 border-x border-red-800/20">
            Est. 1924
          </span>
          <h1 className="text-5xl md:text-7xl font-serif italic text-stone-900 mb-4">The Wine Cellar</h1>
          <p className="text-stone-500 max-w-lg mx-auto text-sm leading-relaxed font-light">
            Discover our hand-picked selection of world-class vintages, from the rolling hills of Tuscany to the valleys of Napa.
          </p>
        </div>
      </section>

      {/* --- STICKY FILTER BAR --- */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-stone-100 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div className="hidden lg:flex gap-8">
              {['All Wines', 'Red', 'White', 'Rose', 'Sparkling'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] uppercase tracking-widest transition-all relative py-2 ${
                    activeCategory === cat ? 'text-red-900 font-bold' : 'text-stone-400 hover:text-stone-900'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-900 animate-in fade-in slide-in-from-bottom-1" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest font-bold text-stone-800">
            <div className="flex items-center gap-2 cursor-pointer hover:text-red-900 transition-colors">
              <span>Sort: Recommended</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* --- POLISHED SIDEBAR --- */}
          <aside className="w-full lg:w-72 space-y-10 lg:sticky lg:top-[185px] lg:self-start lg:max-h-[calc(100vh-185px)] lg:overflow-y-auto">
            <div>
              <h3 className="text-lg font-serif mb-6 text-stone-900">Filters</h3>

              <div className="space-y-8">
                {/* Category Select */}
                <div className="group">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block mb-3">Category</label>
                  <select className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 text-sm text-stone-700 outline-none focus:border-red-900 transition-colors appearance-none cursor-pointer">
                    <option>All Varieties</option>
                    <option>Cabernet Sauvignon</option>
                    <option>Shiraz</option>
                    <option>Pinot Noir</option>
                  </select>
                </div>

                {/* Price Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Price Range</label>
                    <span className="text-sm font-medium text-red-900">${priceRange}</span>
                  </div>
                  <input
                    type="range"
                    min="0" max="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                  />
                </div>

                {/* Rating - Bug 3: was looping over url (products), now loops over [1,2,3,4,5] */}
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block mb-4">Min. Rating</label>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 border-stone-300 rounded text-red-900 focus:ring-red-900" />
                        <div className="flex items-center gap-1 text-stone-500 group-hover:text-stone-900 transition-colors">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < star ? "currentColor" : "none"} className={i < star ? "text-amber-500" : "text-stone-200"} />
                          ))}
                          <span className="text-xs ml-1 font-medium">& Up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-red-900 transition-colors duration-500">
              Apply Filters
            </button>
          </aside>

          {/* --- REFINED PRODUCT GRID --- */}
          <main className="flex-1">
            {products.length === 0 ? (<p className="text-stone-400 text-3xl text-center">No Products Found.</p>) :
                products.map((product: any) => (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
              
                <div key={product.id} className="group">
                  <div className="relative aspect-[3/4] bg-[#F7F7F7] flex items-center justify-center p-10 overflow-hidden group-hover:bg-white group-hover:shadow-2xl transition-all duration-700">
                    {product.tag && (
                      <span className="absolute top-4 left-4 text-[7px] uppercase tracking-[0.3em] font-bold bg-red-900 text-white px-3 py-1.5 shadow-sm">
                        {product.tag}
                      </span>
                    )}
                    {/* Bug 4: Fixed link path to include /home prefix */}
                    <Link to={`/home/shop/product/${product.id}`}>
                      <img
                        src={product.img}
                        alt={product.name}
                        className="h-full w-auto object-contain transition-all duration-1000 group-hover:scale-105 group-hover:-translate-y-4"
                      />
                    </Link>
                    <button className="absolute bottom-0 inset-x-0 text-white py-4 text-[10px] uppercase tracking-widest font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-4 bg-red-900">
                      <ShoppingBag size={20} /> Add to Cart
                    </button>
                  </div>

                  <div className="mt-8 text-center space-y-2">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-red-800 font-bold">{product.category}</p>
                    <h3 className="text-2xl font-serif text-stone-900 leading-tight">{product.name}</h3>
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-[1px] w-6 bg-stone-200"></div>
                      <p className="text-sm font-medium text-stone-500">${product.price.toFixed(2)}</p>
                      <div className="h-[1px] w-6 bg-stone-200"></div>
                    </div>
                  </div>
                </div>
            </div>
              ))}
          </main>

        </div>

        {/* Pagination */}
        <div className="mt-24 flex justify-center items-center gap-3">
          <button className="px-4 py-2 border border-stone-200 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all duration-300 disabled:opacity-30">
            Prev
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 flex items-center justify-center text-xs transition-all duration-300 ${
                page === 1
                  ? 'bg-stone-900 text-white shadow-lg shadow-stone-200'
                  : 'border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-stone-300 px-2">...</span>
          <button className="px-4 py-2 border border-stone-200 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all duration-300">
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default Shop;