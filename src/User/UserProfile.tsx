import React from 'react';
import { User, Lock, MapPin, Bell, Wine, ChevronRight, Camera, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserAccount = () => {
  return (
    <div className="bg-[#FDFCF8] h-screen font-sans text-stone-900">
      <div className="container mx-auto px-6 py-6 lg:py-6">
        
        {/* --- HEADER SECTION --- */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-5xl font-serif italic text-stone-900">My Account</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mt-2">Manage your estate preferences</p>
          </div>
          
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- PROFILE CARD --- */}
          <div className="lg:col-span-2 bg-white border border-stone-100 p-10 shadow-sm space-y-10">
            <div className="flex items-center gap-8 border-b border-stone-50 pb-10">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center overflow-hidden">
                   <User size={40} className="text-stone-300" />
                </div>
                <button className="absolute bottom-0 right-0 bg-stone-900 text-white p-2 rounded-full hover:bg-red-900 transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-serif italic">Alexander Vane</h2>
                <p className="text-sm text-stone-400 font-light">Member since October 2024</p>
              </div>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">First Name</label>
                <input type="text" defaultValue="Alexander" className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Last Name</label>
                <input type="text" defaultValue="Vane" className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Email Address</label>
                <input type="email" defaultValue="alex.vane@heritage.com" className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 000-1212" className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm" />
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="bg-stone-900 text-white px-10 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900 transition-all shadow-lg">
                  Save Information
                </button>
              </div>
            </form>
          </div>

          {/* --- SIDEBAR MODULES --- */}
          <div className="space-y-8">
            
            {/* Membership Module */}
            <div className="bg-stone-900 p-8 text-white">
              <div className="flex justify-between items-start mb-6">
                <Wine size={24} className="text-white" />
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold border border-stone-700 px-3 py-1">Active</span>
              </div>
              <h3 className="text-xl font-serif italic mb-1">Gold Reserve Tier</h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-6">12 Bottles to Platinum</p>
              <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden">
                <div className="bg-red-900 h-full w-[65%]" />
              </div>
            </div>

            {/* Quick Actions List */}
            <div className="bg-white border border-stone-100 shadow-sm divide-y divide-stone-50">
              <button className="w-full flex items-center justify-between p-6 hover:bg-stone-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <Lock size={16} className="text-stone-400" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Security & Login</span>
                </div>
                <ChevronRight size={14} className="text-stone-300 group-hover:text-red-900 transition-colors" />
              </button>
              
              <button className="w-full flex items-center justify-between p-6 hover:bg-stone-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <MapPin size={16} className="text-stone-400" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Manage Addresses</span>
                </div>
                <ChevronRight size={14} className="text-stone-300 group-hover:text-red-900 transition-colors" />
              </button>

              <button className="w-full flex items-center justify-between p-6 hover:bg-stone-50 transition-colors group">
                <div className="flex items-center gap-4">
                  <Bell size={16} className="text-stone-400" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Notifications</span>
                </div>
                <ChevronRight size={14} className="text-stone-300 group-hover:text-red-900 transition-colors" />
              </button>
              
              <button className="w-full flex items-center justify-between p-6 hover:bg-stone-50 transition-colors group">
                <div className="flex items-center gap-4 text-red-900">
                  <Settings size={16} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Account Deletion</span>
                </div>
                <ChevronRight size={14} className="text-stone-300 group-hover:text-red-900 transition-colors" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserAccount;