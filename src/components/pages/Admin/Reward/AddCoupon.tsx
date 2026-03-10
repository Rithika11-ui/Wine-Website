import React, { useState } from 'react';
import { X, Tag, Percent, Calendar, CheckCircle } from 'lucide-react';

interface AddCouponFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCouponForm: React.FC<AddCouponFormProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#111C44]/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white rounded-[30px] shadow-2xl p-8 relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-[#1B1E2B] tracking-tight">Add New Coupon</h3>
            <p className="text-sm text-[#A3AED0]">Create a unique discount for your customers</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#F4F7FE] rounded-full transition-colors text-[#A3AED0]">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          {/* Coupon Code Input */}
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-[#1B1E2B] uppercase ml-1">Coupon Code</label>
            <div className="relative">
              <Tag className="absolute left-4 top-3.5 text-[#A3AED0]" size={18} />
              <input 
                type="text" 
                placeholder="e.g. VINTAGE2026" 
                className="w-full bg-[#F4F7FE] border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-[#1B1E2B] focus:ring-2 focus:ring-[#580C1F]/20 placeholder:text-[#A3AED0]"
              />
            </div>
          </div>

          {/* Discount & Expiry Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#1B1E2B] uppercase ml-1">Discount %</label>
              <div className="relative">
                <Percent className="absolute left-4 top-3.5 text-[#A3AED0]" size={18} />
                <input 
                  type="number" 
                  placeholder="20" 
                  className="w-full bg-[#F4F7FE] border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-[#1B1E2B] focus:ring-2 focus:ring-[#580C1F]/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-bold text-[#1B1E2B] uppercase ml-1">Expiry Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-[#A3AED0]" size={18} />
                <input 
                  type="date" 
                  className="w-full bg-[#F4F7FE] border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold text-[#1B1E2B] focus:ring-2 focus:ring-[#580C1F]/20"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full py-4 bg-[#580C1F] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#7a122b] shadow-lg shadow-red-900/20 transition-all active:scale-95">
              <CheckCircle size={18} /> Generate Coupon
            </button>
            <button 
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-transparent text-[#A3AED0] text-sm font-bold hover:text-[#1B1E2B] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCouponForm;