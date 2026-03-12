import React, { useState } from 'react';
import { ChevronDown, ShoppingBag, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  img: string;
  tag?: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Château Margaux 2022",
    price: 299.99,
    category: "Red Wine",
    img: "https://assets.wine.com/winecom/image/upload/w_600,h_400,dpr_2.0,c_fit,q_auto:good,fl_progressive/jirrdoplunlf1vimiw4h.jpg",
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Penfolds Grange 2018",
    price: 450.00,
    category: "Red Wine",
    img: "https://images.vivino.com/thumbs/ApnIiXjcAt4eu2poxMnCQA_pb_x600.png",
    tag: "Rare",
  },
  {
    id: "3",
    name: "Cloudy Bay Sauvignon Blanc",
    price: 89.99,
    category: "White Wine",
    img: "https://images.vivino.com/thumbs/ApnIiXjcAt4eu2poxMnCQA_pb_x600.png",
  },
  {
    id: "4",
    name: "Moët & Chandon Impérial",
    price: 149.99,
    category: "Sparkling",
    img: "https://images.vivino.com/thumbs/ApnIiXjcAt4eu2poxMnCQA_pb_x600.png",
    tag: "New",
  },
  {
    id: "5",
    name: "Whispering Angel Rosé",
    price: 79.99,
    category: "Rosé",
    img: "https://images.vivino.com/thumbs/ApnIiXjcAt4eu2poxMnCQA_pb_x600.png",
  },
  {
    id: "6",
    name: "Opus One 2019",
    price: 399.99,
    category: "Red Wine",
    img: "https://images.vivino.com/thumbs/ApnIiXjcAt4eu2poxMnCQA_pb_x600.png",
    tag: "Limited",
  },
];

const Shop = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Wines');
  const [priceRange, setPriceRange] = useState(500);

  return (
    <div className="bg-[#FCFBFA] min-h-screen font-sans selection:bg-red-100">

      {/* --- HEADER --- */}
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
          <div className="hidden lg:flex gap-8">
            {['All Wines', 'Red', 'White', 'Rosé', 'Sparkling'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] uppercase tracking-widest transition-all relative py-2 ${
                  activeCategory === cat ? 'text-red-900 font-bold' : 'text-stone-400 hover:text-stone-900'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-900" />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-red-900 transition-colors text-[11px] uppercase tracking-widest font-bold text-stone-800">
            <span>Sort: Recommended</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* --- SIDEBAR --- */}
          <aside className="w-full lg:w-72 space-y-10 lg:sticky lg:top-[185px] lg:self-start">
            <div>
              <h3 className="text-lg font-serif mb-6 text-stone-900">Filters</h3>
              <div className="space-y-8">

                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block mb-3">Category</label>
                  <select className="w-full bg-white border border-stone-200 px-4 py-3 text-sm text-stone-700 outline-none focus:border-red-900 transition-colors appearance-none cursor-pointer">
                    <option>All Varieties</option>
                    <option>Cabernet Sauvignon</option>
                    <option>Shiraz</option>
                    <option>Pinot Noir</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Price Range</label>
                    <span className="text-sm font-medium text-red-900">${priceRange}</span>
                  </div>
                  <input
                    type="range" min="0" max="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-1 bg-stone-200 appearance-none cursor-pointer accent-stone-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block mb-4">Min. Rating</label>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <label key={star} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 border-stone-300 rounded accent-red-900" />
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

          {/* --- PRODUCT GRID --- */}
          <main className="flex-1">
            {mockProducts.length === 0 ? (
              <p className="text-stone-400 text-3xl text-center">No Products Found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-20">
                {mockProducts.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative aspect-[3/4] bg-[#F7F7F7] flex items-center justify-center p-10 overflow-hidden group-hover:bg-white group-hover:shadow-2xl transition-all duration-700">
                      {product.tag && (
                        <span className="absolute top-4 left-4 text-[7px] uppercase tracking-[0.3em] font-bold bg-red-900 text-white px-3 py-1.5 shadow-sm">
                          {product.tag}
                        </span>
                      )}
                      <Link to={`/shop/product/${product.id}`}>
                        <img
                          src={product.img}
                          alt={product.name}
                          className="h-full w-auto object-contain transition-all duration-1000 group-hover:scale-105 group-hover:-translate-y-4"
                        />
                      </Link>
                      <button onClick={() => navigate('/checkout')} className="absolute bottom-0 inset-x-0 text-white py-4 text-[10px] uppercase tracking-widest font-bold translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-4 bg-red-900">
                        <ShoppingBag size={20} /> Add to Cart
                      </button>
                    </div>

                    <div className="mt-8 text-center space-y-2">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-red-800 font-bold">{product.category}</p>
                      <h3 className="text-2xl font-serif text-stone-900 leading-tight">{product.name}</h3>
                      <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-6 bg-stone-200" />
                        <p className="text-sm font-medium text-stone-500">${product.price.toFixed(2)}</p>
                        <div className="h-[1px] w-6 bg-stone-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>

        {/* Pagination */}
        <div className="mt-24 flex justify-center items-center gap-3">
          <button className="px-4 py-2 border border-stone-200 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all duration-300">
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