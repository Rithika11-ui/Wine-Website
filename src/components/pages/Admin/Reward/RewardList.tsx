import React, { useState } from 'react';
import AddCouponForm from './AddCoupon'; // Import the new split file
import { Plus } from 'lucide-react';

const RewardList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="bg-white rounded-[30px] p-8 shadow-sm h-full border border-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-[#1B1E2B]">Active Rewards</h3>
          <p className="text-sm text-[#A3AED0]">Manage your wine club coupons</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#580C1F] text-white text-sm font-bold rounded-2xl hover:bg-[#7a122b] transition-all shadow-lg shadow-red-900/20"
        >
          <Plus size={18} /> Add Coupon
        </button>
      </div>

      <div className="space-y-4">
        {/* RewardCards go here... */}
      </div>

      {/* THE SPLIT FORM COMPONENT */}
      <AddCouponForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
      />
    </div>
  );
};

export default RewardList;