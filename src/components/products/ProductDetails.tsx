import React, { useState } from 'react';
import { Heart, ChevronRight, Star, CreditCard } from 'lucide-react';
import { products } from '../../assets/assets';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const product = products.find((t) => t.id === Number(id));
  
  if (!product) return (
    <div className="h-screen flex items-center justify-center font-serif italic text-2xl bg-[#FDFCF8]">
      Product not found.
    </div>
  );

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="bg-[#FDFCF8] min-h-screen">
      <div className="container mx-auto px-6 py-12">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-12">
          <Link to="/" className="hover:text-red-900 transition-colors">Home</Link> 
          <ChevronRight size={10} />
          <Link to="/shop" className="hover:text-red-900 transition-colors">Shop</Link> 
          <ChevronRight size={10} />
          <span className="text-red-900 font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: PRODUCT IMAGE --- */}
          <div className="lg:col-span-7 bg-white p-12 relative group overflow-hidden border border-stone-100 shadow-sm">
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              <span className="bg-red-900 text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2">
                Limited Vintage
              </span>
              {/* {hasDiscount && (
                <span className="bg-stone-900 text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2">
                  Special Offer
                </span>
              )} */}
            </div>
            <img 
              src={product.img} 
              className="w-full h-[650px] object-contain transform group-hover:scale-105 transition-transform duration-1000" 
              alt={product.name} 
            />
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Header & Pricing */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-red-900 text-[11px] uppercase tracking-[0.5em] font-bold">Heritage Collection</p>
                <h1 className="text-6xl font-serif italic text-stone-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-baseline gap-3">
                  {hasDiscount ? (
                    <>
                      <p className="text-4xl text-red-900 font-serif font-medium tabular-nums">${product.discountPrice}</p>
                      <p className="text-xl text-stone-300 font-serif line-through tabular-nums">${product.price}</p>
                    </>
                  ) : (
                    <p className="text-4xl text-stone-900 font-serif font-medium tabular-nums">${product.price}</p>
                  )}
                </div>
                <div className="h-6 w-px bg-stone-200"></div>
                <div className="flex items-center gap-2">
                  <div className="flex text-red-900">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} stroke="currentColor"/>
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400 font-bold uppercase tracking-widest">(4.8 / 122 Reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex justify-evenly items-center border-y border-stone-100 py-6 my-6">
              
              {/* Volume */}
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-900">Volume</span>
                <span className="text-[11px] uppercase tracking-widest text-stone-500 font-light">
                  {product.volume}
                </span>
              </div>

              {/* Divider */}
              <div className="h-10 w-px bg-stone-100"></div>

              {/* Alcohol */}
              <div className="flex flex-col gap-1 text-center">
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-900">Alcohol</span>
                <span className="text-[11px] uppercase tracking-widest text-stone-500 font-light">
                  {product.alcohol} Vol
                </span>
              </div>

              {/* Divider */}
              <div className="h-10 w-px bg-stone-100"></div>

              {/* Region */}
              <div className="flex flex-col gap-1 text-right">
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-900">Region</span>
                <span className="text-[11px] italic font-serif text-stone-500 lowercase leading-none">
                  {product.region}
                </span>
              </div>

            </div>

            {/* Description */}
            <p className="text-stone-500 text-sm leading-relaxed font-light">
              {product.desc}
            </p>

            {/* --- QUANTITY & ACTIONS AREA --- */}
              <div className="space-y-10 pt-4 border-t border-stone-100">
                
                {/* Refined Quantity Row */}
                <div className="flex items-center gap-10">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-900 min-w-[80px]">
                    Quantity
                  </span>

                  <div className="inline-flex items-center border border-stone-200 bg-white shadow-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-black hover:bg-stone-50 transition-all active:scale-95"
                    >
                      <svg width="12" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="16" height="2" fill="currentColor"/>
                      </svg>
                    </button>

                    <div className="w-10 h-10 flex items-center justify-center border-x border-stone-100">
                      <span className="font-serif text-lg font-medium text-black tabular-nums select-none">
                        {quantity}
                      </span>
                    </div>

                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-black hover:bg-stone-50 transition-all active:scale-95"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="7" width="16" height="2" fill="currentColor"/>
                        <rect x="7" width="2" height="16" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* High-Impact Action Row */}
                <div className="flex gap-4">
                  <Link 
                    to="/shopping-cart" 
                    className="flex-[3] bg-red-900 text-white py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-stone-900 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg"
                  >
                    <CreditCard size={18} strokeWidth={1.5} /> 
                    Proceed to Checkout
                  </Link>

                  <button type='button' className="flex-1 border border-stone-200 text-stone-900 hover:border-red-900 hover:text-red-900 hover:bg-red-50/30 transition-all flex items-center justify-center">
                    <Heart size={22} strokeWidth={1.5} />
                  </button>
                </div>
              </div>

            {/* --- DETAILS ACCORDION --- */}
            <div className="pt-8 space-y-2">
              <details className="group border-b border-stone-100 pb-4 cursor-pointer" open>
                <summary className="flex justify-between items-center list-none text-[12px] uppercase tracking-[0.3em] font-bold text-stone-900">
                  Tasting Notes <span className="group-open:rotate-45 transition-transform text-red-900 text-xl">+</span>
                </summary>
                <div className="text-sm text-stone-500 mt-6 leading-relaxed space-y-4 font-light italic">
                  <p>{product.tastingNotes || "A sophisticated profile of blackberry, tobacco, and velvet tannins with a long, elegant finish."}</p>
                </div>
              </details>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;