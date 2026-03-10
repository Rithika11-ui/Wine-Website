import React from 'react'
import { Link } from 'react-router-dom';
import assets from '../assets/assets';
import { Droplets, ShieldCheck, Wine, Zap,Grape, FlaskConical, Wrench, UtensilsCrossed } from 'lucide-react';

const Homepage = () => {

  const blogPosts = [ 
    {
      subtitle: "Our Blog",
      src: "https://www.taylorswines.com.au/cdn/shop/videos/c/vp/fca3edb3a00b45418f5ab22e36f8818f/fca3edb3a00b45418f5ab22e36f8818f.m3u8",
      title: "Our Story"
    },
    {
    subtitle: "Our Time",
    src: "https://v1.pinimg.com/videos/mc/720p/ec/d3/45/ecd345b782943ed71df446dc2885f119.mp4",
    date : "29 Nov 2025",
    title : "Wine A Bit, You'll Feel Better",
    },
    {
    subtitle: "Our Story",
    src: "https://v1.pinimg.com/videos/mc/720p/22/c6/6a/22c66ad25aade49f490d5ed0897d5ebb.mp4",
    date: "15 Dec 2025",
    title: "The Art of Choosing the Perfect Wine",
    },
    
  ];
  return (
   
    <div className="bg-[#FDFCF8] text-stone-900 overflow-x-hidden">
      <section className="relative min-h-[90vh] flex items-center pt-12">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000">
            <path d="M0 200 Q 250 100 500 200 T 1000 200 M0 500 Q 250 400 500 500 T 1000 500" fill="none" stroke="black" strokeWidth="2" />
          </svg>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center">
          
          <div className="hidden lg:block lg:col-span-3 overflow-visible">
            <div className="animate-slide-shiver ">
              <img
                src={assets.auswat}
                alt="Premium Red"
              
                className="w-40 ms-20 h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 text-center z-10 px-4">
            <div className="relative inline-block">
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-[120px] font-bold text-stone-100 -z-10 select-none">PREMIUM</span>
              <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-10 text-stone-900">
                Keep Calm And <br />
                <span className="italic font-light text-stone-800">Pour On</span>
              </h1>
            </div>
            
            <div className="mt-4">
              <Link
                to="/shop"
                className="inline-block border border-stone-800 px-12 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-red-900 hover:border-red-900 hover:text-white transition-all duration-500 font-bold"
              >
                Explore More
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-20">
            <div className="bg-white/90 backdrop-blur-sm p-6 shadow-2xl border border-stone-100 self-center lg:self-start max-w-[220px]">
              <div className="flex -space-x-3 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-stone-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="user avatar" />
                  </div>
                ))}
              </div>
              <p className="text-3xl font-bold text-stone-900 leading-none">2k+</p>
              <p className="text-[10px] uppercase tracking-widest text-red-900 italic font-bold mt-1">Happy Customers</p>
            </div>

          
          </div>
        </div>
      </section>

      <section className="py-24 bg-red-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h4 className="text-red-900 uppercase tracking-widest text-xs font-bold mb-2 italic">Our Selection</h4>
            <h2 className="text-4xl font-serif italic text-white">Trending Collection</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Cabernet Sauvignon', price: '$45.00', img: 'https://i.pinimg.com/1200x/03/04/f0/0304f065bd3479278fb00e6eff4b7c46.jpg' },
              { name: 'Chardonnay Reserva', price: '$38.00', img: 'https://i.pinimg.com/1200x/a4/64/28/a46428dca29520a2c4005c1fe5b2ca27.jpg'},
              { name: 'Vintage Merlot', price: '$52.00', img: 'https://i.pinimg.com/1200x/64/a4/ef/64a4efc8001d3c3d92ee0068f19ae70a.jpg' }
            ].map((wine, idx) => (
              <div key={idx} className="group text-center">
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-stone-50">
                  <img src={wine.img} alt={wine.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-red-900 text-white text-[10px] uppercase tracking-widest px-6 py-3 whitespace-nowrap">Quick View</button>
                  </div>
                </div>
                <h3 className="font-serif italic text-xl mb-1 text-white">{wine.name}</h3>
                <p className=" font-serif text-white">{wine.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
        

        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 text-center">
            <p className="uppercase tracking-widest text-red-900 text-xl font-bold mb-2">Trusted Quality</p>
            <h2 className="text-4xl font-serif italic mb-16">Premium Quality</h2>
          
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: <Wine size={32} />, title: "100% Organic", desc: "Sourced from chemical-free soil." },
                { icon: <ShieldCheck size={32} />, title: "Secret Formula", desc: "A heritage recipe passed down." },
                { icon: <Droplets size={32} />, title: "Taste And Blend", desc: "Perfectly balanced acidity." },
                { icon: <Zap size={32} />, title: "Stabilize Wines", desc: "Modern aging techniques." }
              ].map((item, idx) => (
                <div key={idx} className="p-10 border border-stone-100 hover:shadow-2xl transition-all bg-[#FDFCF8] group">
                  <div className="text-red-900 mb-6 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="font-serif text-xl mb-3">{item.title}</h4>
                  <p className="text-xs text-stone-500 mb-8 leading-relaxed">{item.desc}</p>
                  <button className="bg-red-900 text-white text-[9px] font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-stone-900">Read More</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#FDFCF8] relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-xl uppercase tracking-widest text-red-900 font-bold mb-2">Since 1976</p>
              <h2 className="text-4xl font-serif italic">Our Wine Stories</h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
              <div className="space-y-20 text-right hidden lg:block">
              <div>
                <h5 className="font-bold text-lg">1958</h5>
                <p className="text-xs text-stone-500 uppercase tracking-tighter">Purchased Farm</p>
                <p>It is a long established fact that reader will be distracted by the readable content.</p>
              </div>
              <div>
                <h5 className="font-bold text-lg">1963</h5>
                <p className="text-xs text-stone-500 uppercase tracking-tighter">First Vineyard</p>
                <p>It is a long established fact that reader will be distracted by the readable content.</p>
              </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-red-900/10 blur-[100px] rounded-full scale-150 group-hover:bg-red-900/20 transition-all" />
                <img src={assets.masendes} className="h-[500px] w-auto relative z-10 rotate-12 drop-shadow-2xl" alt="History" />
              </div>

              <div className="space-y-20 text-left hidden lg:block">
              <div>
                <h5 className="font-bold text-lg">1990</h5>
                <p className="text-xs text-stone-500 uppercase tracking-tighter">First Customers</p>
                <p>It is a long established fact that reader will be distracted by the readable content.</p>
              </div>
              <div>
                <h5 className="font-bold text-lg">2013</h5>
                <p className="text-xs text-stone-500 uppercase tracking-tighter">Taste And Blend</p>
                <p>It is a long established fact that reader will be distracted by the readable content.</p>
              </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 bg-white">
          <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-24">
          
            <div className="relative flex items-center justify-center">
              <div className="absolute w-[140%] h-[140%] animate-rotate-slow">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" fill="transparent" />
                  <text className="text-[12px] uppercase tracking-[0.5em] fill-stone-300 font-bold">
                    <textPath href="#circlePath">
                      Try With Real Commitment • Pour On Wine Alone • Taste The Soul •
                    </textPath>
                  </text>
                </svg>
              </div>
              <img src={assets.thera} className="h-[500px] relative z-10 drop-shadow-xl" alt="Special Collection" />
            </div>

            <div className="max-w-md text-center lg:text-left">
              <p className="text-red-900 italic font-bold text-xl mb-3 tracking-widest"> Rose All Day</p>
              <h2 className="text-5xl md:text-6xl font-serif italic mb-8 leading-tight text-stone-900">Wine Flies When You’re Having Fun</h2>
              <ul className="space-y-4 mb-12 text-sm text-stone-600 font-medium">
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="w-1.5 h-1.5 bg-red-900 rounded-full"></span> Sip happens
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="w-1.5 h-1.5 bg-red-900 rounded-full"></span> Time to wine down
                </li>
                <li className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="w-1.5 h-1.5 bg-red-900 rounded-full"></span> Liquid therapy
                </li>
              </ul>
              <Link
                to="/shop"
                className="inline-block border border-stone-800 px-12 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-red-900 hover:border-red-900 hover:text-white transition-all duration-500 font-bold"
              >
                Explore More
              </Link>
            </div>
          </div>
      </section>
      

      <section className="relative h-[100vh] w-full bg-[#F3EEF3] overflow-hidden">
      <div className="absolute top-[25%] left-0 w-[42%] h-[190px]  bg-red-900 flex items-center px-14">
        <span className="text-6xl font-serif italic text-stone-200 select-none">
          Light
        </span>
      </div>
      <div className="absolute bottom-[30%] right-0 w-[39%] h-[190px] bg-[#FDFCF8] flex items-center justify-end px-14">
        <span className="text-6xl font-serif italic text-stone-400 select-none">
          Dark
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center gap-[10%] z-10">

        <div className="-mt-[15%] me-49">
          <img
              
              src={assets.rockart}
            className="animate-slide-shiver h-[650px] w-full drop-shadow-2xl rotate-[-25deg] overflow-visible"
            alt="Light Wine"
          />
        </div>

        <div className="mt-14">
          <img
            src={assets.reddeer}
            className="animate-slide-shiver h-[650px] w-auto drop-shadow-2xl rotate-[-25deg] overflow-visible"
            alt="Dark Wine"
          />
        </div>

      </div>

    </section>

      <section className="py-24 bg-[#FDFCF8] overflow-hidden">
          <div className="text-center mb-16 me-2">
              <h2 className="text-4xl font-serif italic">Our Craft Process</h2>
            </div>
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
    
    <div className="lg:col-span-3 space-y-8 relative z-10 ">
      {['2k+ Happy Customers', '19+ Branches', '99+ Awards'].map((s, i) => (
        <div 
          key={i} 
          className="bg-white  p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.03)] border-b-2 border-transparent hover:border-red-900 transition-all duration-500 group"
        >
          <h3 className="text-5xl font-serif text-red-900 mb-2 group-hover:scale-110 transition-transform duration-500">
            {s.split(' ')[0]}
          </h3>
          <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400 italic font-medium">
            {s.split(' ').slice(1).join(' ')}
          </p>
        </div>
      ))}
    </div>

    <div className="lg:col-span-4 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-red-900/5 blur-[100px] rounded-full scale-125 pointer-events-none" />
      
      <div className="flex items-center relative">
        <h2 className="[writing-mode:vertical-lr] ml-32 rotate-180 text-4xl font-serif italic text-stone-400 select-none tracking-tighter">
          All You Need Is Love....And Wine
        </h2>
        
        <img 
          src={assets.hope} 
          className="h-[600px] w-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.2)] hover:rotate-2 transition-transform duration-700 ease-out cursor-crosshair ml-16" 
          alt="Premium Selection" 
        />
      </div>
    </div>

    <div className="lg:col-span-5 grid grid-cols-1 gap-4">
      {[
        { title: 'Harvesting',     icon: <Grape size={24} /> },
        { title: 'Fermentation',   icon: <FlaskConical size={24} /> },
        { title: 'Corkscrews',     icon: <Wrench size={24} /> },
        { title: 'Catering Bowls', icon: <UtensilsCrossed size={24} /> },
      ].map((item, i) => (
        <div 
          key={i} 
          className="flex items-center gap-6 p-6 rounded-sm hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group cursor-pointer border-l-2 border-transparent hover:border-red-900"
        >
          <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center text-red-950 group-hover:bg-red-950 group-hover:text-white transition-all duration-500 shrink-0">
            {item.icon}
          </div>
          <div>
            <h4 className="text-xl font-serif italic text-stone-900 mb-1 group-hover:text-red-900 transition-colors">
              {item.title}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed max-w-xs">
              Meticulously curated processes ensuring every drop meets our heritage standard of excellence.
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
      </section>

      <section className="py-24 bg-white flex flex-col lg:flex-row items-center justify-center gap-24 overflow-hidden">
        <div className="relative">
          <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite]" viewBox="0 0 200 200">
            <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" fill="transparent" />
            <text className="text-[8px] uppercase tracking-[0.2em] fill-stone-300 font-bold">
              <textPath href="#circlePath">Try With Real Commitment Plya • They Say You Can't Live On Wine Alone •</textPath>
            </text>
          </svg>
          <img src={assets.taylor} className="h-[500px] relative z-10" alt="CTA" />
        </div>
        <div className="max-w-md text-center lg:text-left">
           <p className="text-red-900 italic font-bold text-xl mb-2">Wine Flies</p>
           <h2 className="text-5xl italic mb-6 leading-tight">Wine Flies When You’re Having Fun</h2>
           <button className="bg-white text-black border-spacing-2 hover:bg-red-950 hover:text-white px-10 py-4 text-[10px] uppercase tracking-widest font-bold">Learn More</button>
        </div>
      </section>

      <section className="py-24 bg-[#FDFCF8]">
        <div className="container mx-auto px-6">
          <div className="text-center ">
              <p className="text-xl uppercase tracking-widest text-red-900 font-bold mb-2 mt-4 ">Since 1976</p>
              <h2 className="text-4xl font-serif italic">Our Wine Stories</h2>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            

            {/* <div className="bg-white p-10 flex flex-col items-center justify-center text-center">
              <p className="text-md uppercase text-red-900 font-bold mb-2">{ post.subtitle }</p>
              <video
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                className="w-full h-48 object-cover pointer-events-none"
              >
                <source  type="application/x-mpegURL" />
              </video>
              <h3 className="text-3xl italic mb-4 mt-4">Our Stories</h3>
            </div> */}

            
          
            {blogPosts.map((post, i) => (
              
              <div key={i} className="bg-white border-2 border-gray-50  hover:border-red-900  hover:scale-105 transform transition duration-300 ease-in-out group overflow-hidden mt-10">
                <p className="text-md text-center uppercase text-red-900 font-bold mb-2 italic pt-6">{post.subtitle}</p>
              <div className="h-48 overflow-hidden">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  disablePictureInPicture
                  className="w-full h-full mt-2 object-cover pointer-events-none"
                >
                  <source src={post.src} type="video/mp4" />
                </video>
              </div>
              <div className="p-6 text-center">
                {/* <p className="text-[9px] text-stone-400 mb-2 font-bold uppercase">📅 {post.date}</p> */}
                <h1 className="italic mb-4 text-2xl ">{post.title}</h1>
              </div>
            </div>
            ))}

          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-stone-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xl uppercase tracking-widest text-red-900 font-bold flex items-center justify-center gap-2">
              <Wine size={20} /> DISCOVER
            </p>
            <h2 className="text-5xl font-serif italic mt-2">The New Wine</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
             { name: 'Rose Wine', img: assets.taylorpink },
              { name: 'White Wines', img: assets.pinot },      
              { name: 'Sparkling', img: assets.plaradin },   
              { name: 'Vintages', img: assets.leradict },    
              { name: 'Red Wine', img: assets.almendro },      
              { name: 'Dessert', img: assets.calvahas },
            ].map((category, idx) => (
              <div key={idx} className="relative group cursor-pointer flex flex-col items-center">
                <div className="h-80 w-full flex items-center justify-center p-4 relative overflow-hidden">
                  
                  <img 
                    src={category.img} 
                    className="h-full object-contain transition-all duration-700 group-hover:opacity-20 group-hover:scale-110" 
                    alt={category.name} 
                  />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="[writing-mode:vertical-lr] text-3xl font-serif italic text-stone-800 tracking-tighter">
                      {category.name}
                    </h3>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
    
  );

  
}

export default Homepage
