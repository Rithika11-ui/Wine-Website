import React from 'react';
import assets from '../../assets/assets';
import { X, Minus, Plus, ShoppingBag, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#FDFCF8] min-h-screen py-16 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT SIDE: THE PRODUCT TABLE --- */}
          <div className="lg:col-span-8">
            {/* Table Header - Clean and spaced like your sample */}
            <div className="grid grid-cols-12 pb-6 border-b border-stone-200 text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>

            {/* List of Bottles */}
            <div className="divide-y divide-stone-100">
              {[1, 2, 3].map((item) => (
                <div key={item} className="grid grid-cols-12 py-10 items-center group">
                  
                  {/* Column 1: Product Branding */}
                  <div className="col-span-6 flex gap-8">
                    <div className="relative w-28 h-36 bg-white flex items-center justify-center p-4 border border-stone-50 overflow-hidden shadow-sm">
                      {item === 1 && (
                        <span className="absolute top-0 left-0 bg-red-900 text-white text-[8px] px-3 py-1 font-bold z-10 tracking-widest uppercase">
                          Special
                        </span>
                      )}
                      <img src={assets.auswat} className="h-full object-contain group-hover:scale-110 transition-transform duration-700" alt="Vintage Wine" />
                    </div>
                    
                    <div className="flex flex-col justify-center space-y-2">
                      <h3 className="font-serif italic text-xl text-stone-900 leading-tight">Heritage Cabernet</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-stone-900">$ 85.00</span>
                        <span className="text-[10px] text-stone-300 line-through tracking-widest">$ 110.00</span>
                      </div>
                      <p className="text-[9px] text-stone-400 uppercase tracking-widest">SKU: 8901425031926</p>
                      <p className="text-[9px] text-red-900 font-bold uppercase tracking-widest pt-1">Priority Shipping: 4 Jun 2026</p>
                    </div>
                  </div>

                  {/* Column 2: Minimalist Quantity Selector */}
                  <div className="col-span-3 flex justify-center">
                    <div className="flex items-center gap-6 border border-stone-200 px-5 py-2 hover:border-stone-400 transition-colors">
                      <button type='button' title="Decrease quantity" className="text-stone-300 hover:text-red-900"><Minus size={14} /></button>
                      <span className="text-sm font-bold text-stone-900">1</span>
                      <button type='button' title="Increase quantity" className="text-stone-300 hover:text-red-900"><Plus size={14} /></button>
                    </div>
                  </div>

                  {/* Column 3: Price Total */}
                  <div className="col-span-2 text-right">
                    <span className="font-serif text-xl text-stone-900">$ 85.00</span>
                  </div>

                  {/* Column 4: Remove Action */}
                  <div className="col-span-1 flex justify-end">
                    <button title="Remove item from cart" className="w-10 h-14 bg-stone-50 flex items-center justify-center text-stone-300 hover:bg-red-900 hover:text-white transition-all">
                      <X size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: ORDER SUMMARY (Sample Logic) --- */}
          <div className="lg:col-span-4">
            <div className="bg-white p-10 border border-stone-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)] sticky top-32">
              <h2 className="text-2xl font-serif italic text-stone-900 mb-10 text-center uppercase tracking-tighter">Order Summary</h2>
              
              {/* Shipping Logic Progress */}
              <div className="bg-stone-50 p-5 flex gap-4 items-center mb-10 border border-stone-100">
                <CheckCircle size={18} className="text-red-900" />
                <p className="text-[11px] text-stone-600 font-medium tracking-wide leading-tight">
                  Complimentary shipping is available on this order.
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-5 text-sm mb-10 border-b border-stone-50 pb-8">
                <div className="flex justify-between text-stone-400">
                  <span className="uppercase tracking-widest text-[10px] font-bold">Item Total (3 Items)</span>
                  <span className="font-medium text-stone-900">$ 255.00</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span className="uppercase tracking-widest text-[10px] font-bold">Estate Discount</span>
                  <span className="text-red-900 italic">- $ 15.00</span>
                </div>
                
                {/* Shipping Radio Sample Logic */}
                <div className="pt-6 space-y-4">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="ship_opt" defaultChecked className="accent-red-900" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-600">Standard Delivery</span>
                    </div>
                    <span className="text-stone-900 text-xs">$ 12.00</span>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="ship_opt" className="accent-red-900" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Local Estate Pickup</span>
                    </div>
                    <span className="text-red-900 font-bold uppercase text-[9px]">Free</span>
                  </label>
                </div>
              </div>

              {/* Coupon Box - Refined Style */}
              <div className="flex mb-10 border border-stone-200">
                <input 
                  type="text" 
                  placeholder="COUPON CODE" 
                  className="flex-1 px-4 py-4 text-[10px] bg-transparent outline-none uppercase tracking-widest"
                />
                <button className="bg-stone-900 text-white px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900 transition-all">Apply</button>
              </div>

              <div className="flex justify-between items-baseline mb-10">
                <span className="text-xl font-serif italic text-stone-900 tracking-tighter">Grand Total</span>
                <span className="text-3xl font-serif font-bold text-stone-900">$ 252.00</span>
              </div>

              {/* Bundle Logic */}
              <label className="flex items-start gap-4 mb-10 cursor-pointer group">
                <div className="pt-1">
                  <input type="checkbox" className="w-4 h-4 accent-red-900" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-stone-900">Ship as Single Consignment</span>
                  <span className="text-[10px] text-stone-400 italic font-light">Optimized for safety • Est. Delivery: Oct 2026</span>
                </div>
              </label>

              <button  onClick={() => navigate('/shop/checkout')} className="w-full bg-stone-900 hover:bg-red-900 text-white py-6 text-[11px] uppercase tracking-[0.5em] font-bold transition-all shadow-2xl flex items-center justify-center gap-3">
                Checkout <ShoppingBag size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage;