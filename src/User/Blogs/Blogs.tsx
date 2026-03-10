/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import assets from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';

const Blog = ({ category = 'All' }) => {
  const { pathname } = useLocation();
  const posts = [
    { id: 1, title: "The Art of Decanting", category: "Education", date: "Feb 21, 2026", image: assets.educationblog, excerpt: "..." },
    { id: 2, title: "Sustainable Vineyards", category: "Sustainability", date: "Feb 18, 2026", image: assets.sustainability, excerpt: "..." },
    { id: 3, title: "Perfect Pairings", category: "Lifestyle", date: "Feb 12, 2026", image: assets.lifestyle, excerpt: "..." },
  ];
  const filterBlog = category === "All" ? posts : posts.filter(post => post.category === category);
  useEffect(() => {
    window.scroll(0, 0);
  },[pathname])
  return (
    <div className="bg-[#FCFBFA] min-h-screen font-sans">
      
      {/* --- FEATURED HERO SECTION --- */}
      <section className="relative h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className="w-full h-full object-cover pointer-events-none scale-105"
          >
            <source src={assets.vdoblog} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[1px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-white">
          <div className="max-w-3xl">
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold border-l-2 border-red-800 pl-4 mb-8 block">
              {category === 'All' ? 'Featured Story' : `${category} Journal`}
            </span>
            <h1 className="text-5xl md:text-8xl font-serif italic mb-8 leading-[1.1] drop-shadow-sm">
              {category === 'All'? posts[0].title : `${category} Insights`}
            </h1>
            <p className="text-xl text-stone-100 mb-10 font-light max-w-xl leading-relaxed">
              {posts[0].excerpt}
            </p>
            <button className="bg-white text-stone-900 px-10 py-5 text-[11px] uppercase tracking-widest font-bold hover:bg-red-900 hover:text-white transition-all duration-700 shadow-xl">
              Read Story
            </button>
          </div>
        </div>
      </section>

      {/* --- JOURNAL SECTION --- */}
      <section className="container mx-auto px-6 py-28">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-2">
            <h2 className="text-5xl font-serif text-stone-900">Journal</h2>
            <div className="h-1 w-12 bg-red-900" />
            <p className="text-stone-500 font-light text-lg">Notes on viticulture, culture, and taste.</p>
          </div>
          
          <div className="flex flex-wrap gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-stone-400">
            <Link to = '/blog'>
              <button className="text-red-900 border-b-2 border-red-900 pb-2">All Stories</button>
            </Link>
            <Link to = '/blog/education'>
              <button className="hover:text-stone-900 transition-colors pb-2">Education</button>
            </Link>
            <Link to = '/blog/sustainability'>
              <button className="hover:text-stone-900 transition-colors pb-2">Sustainability</button>
            </Link>
            <Link to = '/blog/lifestyle'>
              <button className="hover:text-stone-900 transition-colors pb-2">Lifestyle</button>
            </Link>
          </div>
        </div>

        {/* --- ARTICLE GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="relative aspect-[16/11] overflow-hidden mb-8 shadow-sm">
                <Link to= {`/blog/${post.category.toLowerCase()}`}>
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" 
                  alt={post.title} 
                />
                <span className="absolute top-3 left-5 bg-red-900 text-white px-5 py-2 text-[9px] uppercase tracking-[0.3em] font-bold">
                  {post.category}
                </span>
                </Link>
                {/* Brand Tag: bg-red-900 text-white */}
                {/* <span className="absolute top-0 left-0 bg-red-900 text-white px-5 py-2 text-[9px] uppercase tracking-[0.3em] font-bold">
                  {post.category}
                </span> */}
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-red-800 font-bold">
                  {post.date}
                </p>
                
                <h3 className="text-3xl font-serif text-stone-900 leading-snug group-hover:text-red-900 transition-colors duration-500">
                  {post.title}
                </h3>
                
                <p className="text-stone-500 text-base leading-relaxed line-clamp-3 font-light">
                  {post.excerpt}
                </p>

                {/* Read More / Mote Feature */}
                <div className="flex items-center gap-4 pt-4 group/mote">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900 group-hover/mote:text-red-900 transition-colors">
                    Read More
                  </span>
                  <div className="flex-1 h-[1px] bg-stone-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-900 -translate-x-full group-hover/mote:translate-x-0 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      {category === 'All' && (
        <section className="bg-stone-100 py-32 mt-20">
          <div className="container mx-auto px-6 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img src={assets.lagacy} className="w-4/5 aspect-[4/5] object-cover shadow-2xl" alt="Our Heritage" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-900/10 -z-10" />
              </div>
              
              <div className="space-y-8">
                <span className="text-[10px] uppercase tracking-[0.5em] text-red-800 font-bold">Our Legacy</span>
                <h2 className="text-5xl md:text-6xl font-serif italic text-stone-900 leading-tight">
                  A Century of <br /> Winemaking Excellence
                </h2>
                <p className="text-stone-600 text-lg font-light leading-relaxed">
                  Founded in the heart of the valley, our vineyard has survived generations of 
                  changing climates and trends. We remain committed to the traditional methods 
                  that made our first vintage a masterpiece.
                </p>
                <div className="grid grid-cols-2 gap-10 pt-8 border-t border-stone-200">
                  <div>
                    <h4 className="text-3xl font-serif text-stone-900">1924</h4>
                    <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-2">First Vintage</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-serif text-stone-900">42</h4>
                    <p className="text-stone-400 text-[10px] uppercase tracking-widest mt-2">Global Awards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Blog;