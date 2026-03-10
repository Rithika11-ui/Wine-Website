import React from 'react';
import assets from '../../assets/assets';

const Lifestyle = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* --- ELEGANT HERO --- */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="z-10 text-center space-y-8">
          <div className="flex items-center justify-center gap-6 mb-4">
             <div className="h-[1px] w-16 bg-red-900/30" />
             <span className="text-[10px] uppercase tracking-[0.8em] font-bold text-stone-400">The Fine Art</span>
             <div className="h-[1px] w-16 bg-red-900/30" />
          </div>
          <h1 className="text-7xl md:text-[10rem] font-serif italic text-white/70 leading-none tracking-tighter">
            Lifestyle
          </h1>
          <p className="text-stone-500 tracking-[0.3em] uppercase text-[11px] font-light">
            Pairings • People • Places
          </p>
        </div>
        
        <div className="absolute inset-0 p-12 opacity-90 z-0">
          <img 
            src={assets.modern} 
            className="w-full h-full object-cover " 
            alt="Luxury Lifestyle" 
          />
        </div>
      </section>

      {/* --- MASONRY LOOKBOOK SECTION --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
          
          {/* Main Feature Card - Dining Under Stars */}
          <div className="md:col-span-8 group relative overflow-hidden bg-stone-100 min-h-[600px]">
            <img 
              src={assets.meeting} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              alt="Dining Experience" 
            />
            {/* Added overlay for text readability */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-100" />
            
            <div className="absolute bottom-10 left-10 text-white z-10">
              <span className="text-[9px] uppercase tracking-widest border-b border-white pb-1 mb-4 inline-block font-bold">Atmosphere</span>
              <h2 className="text-4xl font-serif italic">Dining Under the Stars</h2>
              <p className="text-white/35 text-xs font-light">Refresh the food with the view.</p>
            </div>
          </div>

          {/* Side Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            
            {/* Summer Soiree Card */}
            <div className="relative h-[300px] overflow-hidden group">
              <img 
                src={assets.summer} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                alt="Summer Soirée" 
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-100" />
              
              <div className="relative h-full p-10 flex flex-col justify-end text-white z-10">
                <h3 className="text-2xl font-serif italic mb-2">Summer Soirée</h3>
                <p className="text-stone-300 text-xs font-light leading-relaxed">Chilled whites and garden parties.</p>
              </div>
            </div>
            
            {/* Modern Pairings Card */}
            <div className="relative h-[276px] overflow-hidden group border border-stone-100">
              <img 
                src={assets.dinner}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
                alt="Modern Pairings" 
              />
              <div className="absolute inset-0 group-hover:bg-black/10 duration-100  transition-all" />
              
              <div className="relative h-full p-10 flex flex-col justify-end z-10">
                <span className="text-red-900 text-[9px] font-bold uppercase tracking-widest mb-4">New Series</span>
                <h3 className="text-2xl font-serif text-white italic mb-2">Modern Pairings</h3>
                <p className="text-white/35 text-xs font-light">Redefining the dinner table.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- EDITORIAL QUOTE --- */}
      <section className="py-32 bg-stone-50 text-center">
        <div className="max-w-xl mx-auto px-6">
          <div className="w-12 h-[1px] bg-red-900 mx-auto mb-10" />
          <h3 className="text-3xl md:text-4xl font-serif italic text-stone-800 leading-relaxed">
            "Wine is not just a drink; it is a conversation, a memory, and a way to celebrate the simple beauty of being."
          </h3>
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400">
            — The Heritage Collection
          </p>
        </div>
      </section>

    </div>
  );
};

export default Lifestyle;