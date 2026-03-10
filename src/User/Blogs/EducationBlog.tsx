import React from 'react';
import assets from '../../assets/assets';
import { Link } from 'react-router-dom';

const Education = () => {
  const eduPosts = [
    { id: 1, title: "The Art of Decanting", level: "Beginner", duration: "10 min", image: assets.pourwine, desc: "Master the science behind aeration and oxidation, and learn how proper decanting techniques can transform a wine's aroma, flavor, and overall tasting experience." },
    { id: 4, title: "Soil Composition & Terroir", level: "Advanced", duration: "25 min", image: assets.soil, desc: "Explore how geology, climate, and microorganisms in the soil shape a wine's character — and why the same grape can taste wildly different depending on where it's grown." },
    { id: 5, title: "Vintage Analysis: 1990-2010", level: "Expert", duration: "45 min", image: assets.librayroom, desc: "Journey through two decades of harvests, examining how weather patterns, winemaking trends, and global events influenced the most iconic bottles of their era." },
  ];

  return (
    <div className="bg-[#FCFBFA] min-h-screen">
      {/* --- ACADEMY HERO --- */}
      <section className="relative h-[60vh] flex items-center bg-stone-900 text-white">
        <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-red-500 text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
              The Sommelier Academy
            </span>
            <h1 className="text-6xl md:text-8xl font-serif italic leading-none mb-6">
              Wine <br /> Education
            </h1>
            <p className="text-stone-400 font-light text-lg max-w-md leading-relaxed">
              A curated curriculum for the curious palate. Master the science, 
              history, and artistry behind every bottle in our cellar.
            </p>
          </div>
          <div className="hidden lg:block border border-stone-700 p-8 bg-stone-800/30 backdrop-blur-md">
             <h4 className="font-serif text-2xl mb-4 italic">Session Overview</h4>
             <ul className="space-y-4 text-sm text-stone-300">
               <li className="flex justify-between border-b border-stone-700 pb-2"><span>Modules Available</span> <span>12</span></li>
               <li className="flex justify-between border-b border-stone-700 pb-2"><span>Average Duration</span> <span>20m</span></li>
               <li className="flex justify-between"><span>Certification</span> <span>Heritage Level</span></li>
             </ul>
          </div>
        </div>
        <img src={assets.glass} className="absolute inset-0 w-full h-full object-cover opacity-20" alt="" />
      </section>

      {/* --- KNOWLEDGE TIMELINE --- */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif text-stone-900 mb-16 text-center">Course Curriculum</h2>
          
          <div className="space-y-24 relative">
            {/* Center Line for Timeline */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-stone-200 -translate-x-1/2 hidden md:block" />

            {eduPosts.map((post, index) => (
              <div key={post.id} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                  <div className="relative overflow-hidden group">
                    <img src={post.image} className="w-full aspect-[4/3] object-cover hover:grayscale-0 transition-all duration-700" alt="" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-4">
                    <span className="text-red-900 text-[9px] font-bold uppercase tracking-widest">{post.level}</span>
                    <span className="w-8 h-[1px] bg-stone-300" />
                    <span className="text-stone-400 text-[9px] font-bold uppercase tracking-widest">{post.duration}</span>
                  </div>
                  <h3 className="text-4xl font-serif text-stone-800 italic">{post.title}</h3>
                  <p className="text-stone-500 font-light leading-relaxed">
                    {post.desc}
                  </p>
                  <Link to={`/blog/post/${post.id}`} className="inline-block pt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900 border-b-2 border-red-900 pb-1 hover:text-red-900 transition-colors">
                    Begin Module
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EDUCATION FOOTER --- */}
      <section className="bg-stone-100 py-20 border-t border-stone-200">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
           <div className="w-20 h-20 rounded-full border border-stone-300 flex items-center justify-center mb-6">
              <img src={assets.logo} alt="" />
           </div>
           <h3 className="text-2xl font-serif mb-4">The Wine Shop</h3>
           <p className="text-stone-500 max-w-sm font-light mb-8 italic">"Knowledge is the only vintage that improves with every glass."</p>
           <button className="bg-red-900 text-white px-10 py-4 text-[10px] uppercase font-bold tracking-widest hover:bg-stone-900 transition-colors">
              Download Full Syllabus
           </button>
        </div>
      </section>
    </div>
  );
};

export default Education;