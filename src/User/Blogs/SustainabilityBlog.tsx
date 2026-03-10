import React from 'react';
import assets from '../../assets/assets';

const Sustainability = () => {
  return (
    <div className="bg-[#F4F2EE] min-h-screen font-sans">
      
      {/* --- ECO-HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-[#1B2B24]">
        {/* Fixed Background Image: Increased opacity and removed mix-blend for full visibility */}
        <img 
          src={assets.banner} 
          className="absolute inset-0 w-full h-full object-cover opacity-50 z-0" 
          alt="Sustainable Vineyard" 
        />
        
        {/* Added Gradient Overlay: Ensures the image is "full" but text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2B24] via-[#1B2B24]/40 to-transparent z-10" />

        <div className="container mx-auto px-6 z-20 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-red-900" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-red-900">
                Our Living Commitment
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif italic mb-8 leading-tight">
              Grown for <br /> Generations
            </h1>
            <p className="text-xl text-stone-200 font-light max-w-xl leading-relaxed">
              Sustainability isn't a trend at our vineyard; it's our heritage. We cultivate the soil 
              today so it can breathe for another century.
            </p>
          </div>
        </div>
      </section>

      {/* --- THE IMPACT DASHBOARD --- */}
      <section className="container mx-auto px-6 -mt-20 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-white shadow-2xl">
          <div className="p-12 border-b md:border-b-0 md:border-r border-stone-100 group hover:bg-red-50 transition-colors duration-500">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-red-800 mb-4">Water Security</h4>
            <h2 className="text-4xl font-serif text-stone-900 mb-2">100%</h2>
            <p className="text-stone-500 text-sm font-light">Recycled rainwater used for irrigation.</p>
          </div>
          <div className="p-12 border-b md:border-b-0 md:border-r border-stone-100 group hover:bg-red-50 transition-colors duration-500">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-red-800 mb-4">Carbon Footprint</h4>
            <h2 className="text-4xl font-serif text-stone-900 mb-2">Net Zero</h2>
            <p className="text-stone-500 text-sm font-light">Solar powered fermentation and bottling.</p>
          </div>
          <div className="p-12 group hover:bg-red-50 transition-colors duration-500">
            <h4 className="text-[10px] uppercase tracking-widest font-bold text-red-800 mb-4">Biodiversity</h4>
            <h2 className="text-4xl font-serif text-stone-900 mb-2">12,000+</h2>
            <p className="text-stone-500 text-sm font-light">Native trees planted around our vines.</p>
          </div>
        </div>
      </section>

      {/* --- EDITORIAL CONTENT --- */}
      <section className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-serif text-stone-900 leading-tight">
              The Philosophy of <br /> <span className="italic">Minimum Intervention</span>
            </h2>
            <p className="text-stone-600 leading-relaxed font-light text-lg">
              We believe the best wines are made in the vineyard, not the laboratory. 
              By protecting the natural microbes in our soil, we produce fruit that 
              carry the true signature of our terroir.
            </p>
            <div className="pt-6">
              <button className="border-b-2 border-b-black pb-2 text-[11px] uppercase tracking-widest font-bold hover:text-red-900 hover:border-red-900 transition-all">
                Download Our 2026 Impact Report
              </button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={assets.susbanner} 
              className="w-full aspect-square object-cover rounded-sm  transition-all duration-1000" 
              alt="Organic Grapes" 
            />
            <div className="absolute -top-6 -left-6 w-32 h-32 border-l border-t border-red-900/30" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-r border-b border-red-900/30" />
          </div>
        </div>
      </section>

      {/* --- CALL TO ACTION --- */}
      <section className="bg-stone-900 py-24 text-white mb-16">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-serif italic mb-8 text-stone-300">
            "We do not inherit the earth from our ancestors, we borrow it from our children."
          </h3>
          <p className="text-red-900 text-[10px] uppercase tracking-[0.4em] font-bold">
            — The Heritage Pledge
          </p>
        </div>
      </section>
      
    </div>
  );
};

export default Sustainability;