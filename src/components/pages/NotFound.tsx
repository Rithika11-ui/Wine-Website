import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen bg-[#FCFBFA] flex flex-col overflow-hidden">

      {/* Background decorative number */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-[40vw] font-serif font-bold text-stone-300 leading-none"
          style={{ letterSpacing: '-0.05em' }}
        >
          404
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">

        {/* Top label */}
        <div
          className="mb-8 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '100ms'
          }}
        >
          <span className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] text-red-800 font-bold">
            <span className="h-[1px] w-8 bg-red-800/40 inline-block" />
            Page Not Found
            <span className="h-[1px] w-8 bg-red-800/40 inline-block" />
          </span>
        </div>

        {/* Heading */}
        <div
          className="transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '200ms'
          }}
        >
          <h1 className="text-5xl md:text-7xl font-serif italic text-stone-900 mb-2 leading-tight">
            Error
          </h1>
        </div>

        {/* Decorative divider */}
        <div
          className="flex items-center gap-4 my-8 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transitionDelay: '300ms'
          }}
        >
          <div className="h-[1px] w-12 bg-stone-300" />
          <div className="w-1 h-1 rounded-full bg-red-900" />
          <div className="h-[1px] w-12 bg-stone-300" />
        </div>

        {/* Description */}
        <p
          className="text-stone-400 text-sm max-w-sm leading-relaxed font-light mb-12 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '400ms'
          }}
        >
          The vintage you're looking for seems to have disappeared from our collection. 
          Let us guide you back to something worth savouring.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '500ms'
          }}
        >
          <Link
            to="/"
            className="px-10 py-4 bg-stone-900 text-white text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-red-900 transition-colors duration-500"
          >
            Return Home
          </Link>
          <Link
            to="/shop"
            className="px-10 py-4 border border-stone-300 text-stone-600 text-[10px] uppercase tracking-[0.3em] font-bold hover:border-stone-900 hover:text-stone-900 transition-all duration-300"
          >
            Browse Wines
          </Link>
        </div>

      </div>

      {/* Bottom label */}
      <div
        className="absolute -bottom-10 left-0 w-full text-center transition-all duration-700 z-20"
        style={{
          opacity: mounted ? 1 : 0,
          transitionDelay: '600ms'
        }}
      >
        <p className="text-[13px] uppercase tracking-[0.4em] text-red-900">
          Est. 1924 — The Wine Cellar
        </p>
      </div>

    </div>
  );
};

export default NotFound;