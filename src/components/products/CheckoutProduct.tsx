import React, { useContext, } from 'react';
import { CreditCard, ChevronLeft, X, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Checkout = () => {
  const { cart, subTotal , removeProduct  , addCount, removeCount } = useContext(StoreContext);
  

  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-stone-900">
      
      {/* --- HEADER --- */}
      <header className="border-b border-stone-100 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/shop" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-600 hover:text-red-900 transition-colors">
            <ChevronLeft size={16} /> Continue Shopping
          </Link>
          
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* --- LEFT: DYNAMIC ORDER REVIEW (CRUD) --- */}
          <div className="lg:col-span-7 space-y-10">
            <div className="flex items-baseline justify-between border-b border-stone-100 pb-6">
              <h2 className="text-4xl font-serif italic">Your Collection</h2>
              {/* <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{cartItems.length} Items Selected</span> */}
            </div>
              <div className='flex justify-between items-center relative'>
                <h3 className='ps-8 text-md uppercase tracking-wide text-stone-400 font-medium '>Product</h3>
                <h3 className='text-md ps-24 uppercase tracking-wide text-stone-400 font-medium'>Quantity</h3>
                <h3 className='pe-12 text-md  uppercase tracking-wide text-stone-400 font-medium '>Price</h3>
             </div>

            <div className="space-y-8">
              {/* {cartItems.map((item) => ( */}
                <div key={cart.id} className="group relative flex gap-8 items-center bg-white p-6 border border-stone-50 shadow-md transition-all">
                  {/* Remove Button */}
                  <button 
                    type="button"
                    aria-label="Remove product from cart"
                    onClick={() => removeProduct(cart.id)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-stone-300 rounded-full flex items-center justify-center hover:text-red-700 text-red-900 hover:shadow-md transition-all z-10"
                  >
                    <X size={20} />
                  </button>

                  <div className="w-24 h-32 bg-[#FDFCF8] flex items-center justify-center p-4 flex-shrink-0">
                    <img src={cart.img} className="h-full object-contain" alt={cart.name} />
                  </div>

                  <div className="flex-1 grid grid-cols-3 items-center gap-4">
                    
                    {/* Column 1: Product Info */}
                    <div className="space-y-1">
                      <h4 className="text-xl font-serif italic text-stone-900 leading-tight">{cart.name}</h4>
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest">Vintage {cart.vintage} • 750ml</p>
                    </div>

                    {/* Column 2: Quantity Selector (Centered) */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="inline-flex items-center border border-stone-200 bg-white">
                        <button 
                          onClick={() => addCount()} 
                          className="w-8 h-8 flex items-center justify-center text-black border-r  hover:bg-stone-50 transition-all"
                        >
                          <span className="text-xl font-medium">−</span>
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center border-x border-stone-50">
                          <span className="text-[14px] font-semibold tabular-nums">{cart.qty}</span>
                        </div>
                        <button 
                          onClick={() => removeCount()} 
                          className="w-8 h-8 flex items-center justify-center text-black border-l hover:bg-stone-50 transition-all"
                        >
                          <span className="text-xl font-medium">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Column 3: Total Price (Right Aligned) */}
                    <div className="text-right">
                      <span className="text-lg font-serif font-medium text-stone-900 tabular-nums">
                        ${(cart.price * cart.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              {/* ))} */}
            </div>
          </div>

          {/* --- RIGHT: DELIVERY & FINAL SUMMARY --- */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              
              {/* Delivery Section */}
              <section className="bg-white p-10 border border-stone-100 shadow-sm space-y-8">
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                  <h3 className="text-xl font-serif italic">Delivery Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">First Name</label>
                      <input type="text" placeholder="Enter your first name" className="w-full border-b py-2 outline-none border-red-900 text-sm bg-transparent" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Last Name</label>
                      <input type="text" placeholder="Enter your last name" className="w-full border-b py-2 outline-none border-red-900 text-sm bg-transparent" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Email Address</label>
                      <div className="flex items-center gap-2 border-b border-red-900 transition-colors">
                        <Mail size={12} className="text-stone-300" />
                        <input type="email" placeholder="For your receipt" className="w-full py-2 outline-none text-sm bg-transparent placeholder:text-stone-200" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Phone Number</label>
                      <div className="flex items-center gap-2 border-b border-red-900 transition-colors">
                        <Phone size={12} className="text-stone-300" />
                        <input type="tel" placeholder="+885(0) 551097" className="w-full py-2 outline-none text-sm bg-transparent placeholder:text-stone-200" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Shipping Address</label>
                    <div className="flex items-center gap-2 border-b border-red-900 transition-colors">
                      <MapPin size={12} className="text-stone-300" />
                      <input type="text" placeholder="Street, Apartment, Unit" className="w-full py-2 outline-none text-sm bg-transparent placeholder:text-stone-200" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">City</label>
                      <input type="text" placeholder="Enter your city" className="w-full border-b py-2 outline-none border-red-900 text-sm bg-transparent" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Postcode</label>
                      <input type="text" placeholder="Enter your postcode" className="w-full border-b py-2 outline-none border-red-900 text-sm bg-transparent" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Country</label>
                    <input type="text" placeholder="Enter your country" className="w-full border-b py-2 outline-none border-red-900 text-sm bg-transparent" />
                  </div>
                </div>
              </section>

              {/* Final Summary Card */}
              <div className="bg-stone-900 p-10 text-white shadow-2xl">
                <div className="space-y-4">
                  <div className="flex justify-between text-stone-400 text-xs uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>${subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-400 text-xs uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-red-500">Complimentary</span>
                  </div>
                  <div className="pt-6 border-t border-white/10 flex justify-between items-baseline">
                    <span className="text-xl font-serif italic">Total</span>
                    <span className="text-4xl font-serif font-bold">${subTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link to='/payment'>
                <button className="w-full bg-red-900 text-white py-6 mt-10 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-white hover:text-stone-900 transition-all shadow-xl flex items-center justify-center gap-4">
                  Secure Payment <CreditCard size={18} strokeWidth={1.5} />
                  </button>
                  </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;