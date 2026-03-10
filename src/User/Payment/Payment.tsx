import React, { useState } from 'react';
import { ShieldCheck, CreditCard, ChevronLeft, CheckCircle2, Banknote, QrCode, TicketPercent } from 'lucide-react';
import { Link } from 'react-router-dom';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [coupon, setCoupon] = useState('');

  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-stone-900">
      {/* --- SECURE HEADER --- */}
      <header className="border-b border-stone-100 py-6 bg-white">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/shop/checkout" className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-600 hover:text-red-900 transition-colors">
            <ChevronLeft size={16} /> Back to Delivery
          </Link>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 font-bold">
            <ShieldCheck size={14} className="text-emerald-600" /> Secure Checkout
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- LEFT: PAYMENT METHODS --- */}
          <div className="lg:col-span-7 space-y-10">
            <div className="border-b border-stone-100 pb-6">
              <h2 className="text-4xl font-serif italic text-stone-900">Payment Method</h2>
            </div>

            {/* Selectable Payment List */}
            <div className="space-y-4">
              {/* Credit Card */}
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-6 border flex items-center justify-between transition-all ${paymentMethod === 'card' ? 'border-red-900 ring-1 ring-red-900 bg-white' : 'border-stone-200 text-stone-500 hover:border-stone-400'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-red-900' : 'border-stone-300'}`}>
                    {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-red-900" />}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold uppercase tracking-widest text-stone-900">Credit / Debit Card</p>
                    <p className="text-[11px] font-light">Secure payment via encrypted gateway</p>
                  </div>
                </div>
                <CreditCard size={24} strokeWidth={1.5} />
              </button>

              {/* Cash on Delivery */}
              <button 
                onClick={() => setPaymentMethod('cod')}
                className={`w-full p-6 border flex items-center justify-between transition-all ${paymentMethod === 'cod' ? 'border-red-900 ring-1 ring-red-900 bg-white' : 'border-stone-200 text-stone-500 hover:border-stone-400'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-red-900' : 'border-stone-300'}`}>
                    {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-red-900" />}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold uppercase tracking-widest text-stone-900">Cash on Delivery</p>
                    <p className="text-[11px] font-light">Pay when your vintage arrives</p>
                  </div>
                </div>
                <Banknote size={24} strokeWidth={1.5} />
              </button>

              {/* Scan QR */}
              <button 
                onClick={() => setPaymentMethod('qr')}
                className={`w-full p-6 border flex items-center justify-between transition-all ${paymentMethod === 'qr' ? 'border-red-900 ring-1 ring-red-900 bg-white' : 'border-stone-200 text-stone-500 hover:border-stone-400'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'qr' ? 'border-red-900' : 'border-stone-300'}`}>
                    {paymentMethod === 'qr' && <div className="w-2 h-2 rounded-full bg-red-900" />}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold uppercase tracking-widest text-stone-900">Scan QR Code</p>
                    <p className="text-[11px] font-light">Instant mobile banking transfer</p>
                  </div>
                </div>
                <QrCode size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Conditional Form: Credit Card */}
            {paymentMethod === 'card' && (
              <div className="pt-6 space-y-6 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Card Number</label>
                    <input type="text" className="w-full border-b border-stone-200 py-3 outline-none focus:border-red-900 text-sm bg-transparent" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Expiry Date</label>
                    <input type="text" className="w-full border-b border-stone-200 py-3 outline-none focus:border-red-900 text-sm bg-transparent" placeholder="MM / YY" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">CVC / CVV</label>
                    <input type="text" className="w-full border-b border-stone-200 py-3 outline-none focus:border-red-900 text-sm bg-transparent" placeholder="123" />
                  </div>
                </div>
              </div>
            )}

            {/* Conditional Display: QR Code */}
            {paymentMethod === 'qr' && (
              <div className="pt-6 flex flex-col items-center space-y-4 animate-in zoom-in-95 duration-500">
                <div className="p-4 bg-white border border-stone-200">
                  <div className="w-48 h-48 bg-stone-100 flex items-center justify-center">
                    <QrCode size={120} strokeWidth={1} className="text-stone-900" />
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-widest text-stone-400">Scan to complete transaction</p>
              </div>
            )}
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="lg:col-span-5">
            <div className="bg-white p-10 border border-stone-100 shadow-sm sticky top-32 space-y-8">
              <h3 className="text-[11px] uppercase tracking-[0.4em] font-bold text-stone-900 border-b border-stone-100 pb-4">Order Summary</h3>
              
              {/* Coupon Section */}
              <div className="space-y-3">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold flex items-center gap-2">
                  <TicketPercent size={14} /> Have a Privilege Code?
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="ENTER CODE" 
                    className="flex-1 border border-stone-200 px-4 py-2 text-[10px] tracking-widest outline-none focus:border-red-900 transition-all uppercase"
                  />
                  <button className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 bg-stone-900 text-white hover:bg-red-900 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-4 pt-4 border-t border-stone-50">
                <div className="flex justify-between text-stone-500 text-sm font-light">
                  <span>Subtotal</span>
                  <span>$130.00</span>
                </div>
                <div className="flex justify-between text-stone-500 text-sm font-light">
                  <span>Shipping</span>
                  <span className="text-emerald-600 uppercase text-[10px] font-bold tracking-tighter">Complimentary</span>
                </div>
                <div className="flex justify-between items-baseline pt-4 border-t border-stone-100">
                  <span className="text-xl font-serif italic">Total</span>
                  <span className="text-3xl font-bold tracking-tighter text-red-900">$130.00</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 text-stone-400">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span className="text-[10px] uppercase tracking-widest">Age Verified</span>
                </div>
                <button className="w-full bg-stone-900 text-white py-6 text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-red-900 transition-all shadow-xl flex items-center justify-center gap-4 group">
                  Finalize Order
                  <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;