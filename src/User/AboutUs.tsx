import React from 'react';
import assets from '../assets/assets';

const AboutUs = () => {
  return (
    <div className="bg-[#FCFBFA] min-h-screen font-sans">
      
      {/* --- HERITAGE HERO --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={assets.heroaboutus} 
            className="w-full h-full object-cover scale-105 opacity-70" 
            alt="Vineyard Landscape" 
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <span className="text-[10px] uppercase tracking-[0.8em] font-bold mb-6 block opacity-80 text-red-900">
            Est. 1924
          </span>
          <h1 className="text-6xl md:text-[10rem] font-serif italic mb-8 leading-none tracking-tighter">
            Our Legacy
          </h1>
          <div className="h-20 w-[1px] bg-white/40 mx-auto" />
        </div>
      </section>

      {/* --- THE STORY (Text Focus) --- */}
      <section className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight italic">
            "A century of patience, <br /> poured into every glass."
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left text-stone-600 font-light leading-relaxed text-lg">
            <p>
              Founded in the golden soils of the valley, our journey began with a single vine and a 
              vision to respect the natural rhythm of the seasons. We believe that great wine is not 
              manufactured; it is raised.
            </p>
            <p>
              Today, three generations later, we maintain the same minimum-intervention philosophy. 
              By protecting our biodiversity and honoring traditional fermentation, we ensure that 
              the soul of the land remains in every vintage.
            </p>
          </div>
        </div>
      </section>

      {/* --- CRAFTSMANSHIP (Visual Split) --- */}
      <section className="bg-stone-900 text-white overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="w-100 p-12 md:p-24 flex flex-col justify-center space-y-8">
            <span className="text-red-500 text-[10px] uppercase tracking-[0.4em] font-bold">The Process</span>
            <h3 className="text-5xl font-serif italic">Hand-Harvested Excellence</h3>
            <p className="text-stone-400 font-light leading-relaxed">
              Every grape in our Reserve collection is picked by hand at the break of dawn. 
              This ensures only the most vibrant fruit makes it to our cellar, preserving 
              the delicate aromatics that mechanical harvesting loses.
            </p>
            <ul className="space-y-4 pt-4">
              {['Natural Yeast Fermentation', 'French Oak Aging', 'Small Batch Production'].map((item) => (
                <li key={item} className="flex items-center gap-4 text-sm font-light tracking-wide">
                  <div className="w-1.5 h-1.5 bg-red-900 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className=" relative h-[500px] lg:h-auto">
            <img src={assets.wyvern} className="w-full h-full object-cover" alt="Wine Barrel" />
          </div>
        </div>
      </section>

      {/* --- THE ESTATE (Grid Gallery) --- */}
      <section className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-8 md:pt-20">
            <h4 className="text-3xl font-serif italic">The Estate</h4>
            <p className="text-stone-500 font-light text-sm leading-relaxed">
              Spanning 400 acres of protected hillside, our estate is home to more than just vines. 
              It is a thriving ecosystem of native flora and fauna.
            </p>
          </div>
          <div className="md:col-span-2">
            <img src={assets.estate} className="w-full aspect-video object-cover shadow-2xl" alt="Wine Tasting" />
          </div>
        </div>
      </section>

      {/* --- FOOTER CALLOUT --- */}
      <section className="bg-stone-100 py-24 text-center">
        <h4 className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold mb-6">Visit Us</h4>
        <h2 className="text-4xl font-serif mb-10">Experience the Cellar Door</h2>
        <button className="bg-stone-900 text-white px-10 py-5 text-[11px] uppercase tracking-widest font-bold hover:bg-red-900 transition-all duration-500">
          Book a Private Tour
        </button>
      </section>

    </div>
  );
};

export default AboutUs;