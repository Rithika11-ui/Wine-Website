import React, { useState } from "react";
import { ShoppingBag, X, Wine, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Shape of a favourite wine item
interface WineItem {
  id: number;
  name: string;
  category: string;
  region: string;
  vintage: string;
  price: number;
  img: string;
}

const Favorites = () => {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState<WineItem[]>([]);
  const [removing, setRemoving] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    setRemoving(id);
    setTimeout(() => {
      setFavorites((prev) => prev.filter((item) => item.id !== id));
      setRemoving(null);
    }, 500);
  };

  return (
    <div className="bg-[#FDFDFB] min-h-screen font-sans text-stone-900 pb-20">

      {/* --- HEADER --- */}
      <header className="pt-24 pb-12 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-baseline border-b border-stone-100 pb-8">
          <div>
            <h1 className="text-5xl font-serif italic tracking-tight text-stone-900">The Cellar</h1>
            {/* FIX 3: favorites (not favorite) — also safe now that [] is the default */}
            <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mt-2 font-medium">
              Your Curated Collection — {favorites.length} Bottles
            </p>
          </div>
          <button className="text-[10px] uppercase tracking-widest font-bold text-red-900 hover:opacity-60 transition-opacity flex items-center gap-2">
            <Plus size={14} /> Add Selection
          </button>
        </div>
      </header>

      {/* --- PRODUCT LIST --- */}
      <main className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* FIX 4: broken ternary/map replaced with a proper .map() call.
              FIX 5: the card <div> is now INSIDE the map callback so each
                     item gets its own element. */}
          {favorites.length === 0 ? (
            /* EMPTY STATE */
            <div className="text-center py-40 bg-white border border-stone-50 rounded-sm">
              <Wine className="mx-auto text-stone-100 mb-6" size={48} strokeWidth={1} />
              <p className="font-serif italic text-stone-400 text-lg">Your collection is empty.</p>
              <button onClick={() => navigate('/shop')} className="mt-8 text-[10px] uppercase tracking-widest font-bold border-b border-stone-900 pb-2 hover:text-red-900 hover:border-red-900 transition-all">
                Browse New Arrivals
              </button>
            </div>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className={`group relative bg-white border border-stone-100 p-8 md:p-10 transition-all duration-500 flex flex-col md:flex-row items-center gap-10 ${
                  removing === item.id ? "opacity-0 scale-95" : "opacity-100"
                } hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] hover:border-stone-200`}
              >
                {/* TOP RIGHT: REMOVE ACTION */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute top-6 right-6 text-stone-300 hover:text-red-900 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <X size={24} strokeWidth={1.6} />
                </button>

                {/* LEFT: PRODUCT IMAGE */}
                <div className="relative w-32 h-48 flex-shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-stone-50/50 rounded-full scale-90 group-hover:scale-100 transition-transform duration-700 ease-out" />
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-auto object-contain z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)] group-hover:-translate-y-2 transition-transform duration-500"
                  />
                </div>

                {/* RIGHT: CONTENT AREA */}
                <div className="flex-1 w-full space-y-6">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-red-800 font-bold italic">{item.category}</p>
                    <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">{item.name}</h2>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 font-medium">
                      {item.region} <span className="mx-2 text-stone-200">|</span> {item.vintage}
                    </p>
                  </div>

                  {/* BOTTOM BAR: PRICE & ACTION */}
                  <div className="flex items-center justify-between pt-6 border-t border-stone-50">
                    <span className="text-2xl font-serif text-stone-800 tracking-tight">
                      ${item.price.toFixed(2)}
                    </span>
                    <button className="group/btn flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-stone-900 border-b-2 border-stone-900 pb-1.5 hover:text-red-900 hover:border-red-900 transition-all duration-300">
                      <ShoppingBag size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* BACKGROUND DECOR */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.08] transition-opacity group-hover:opacity-[0.1]">
                  <Wine size={120} strokeWidth={0.5} />
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* --- FOOTER SUMMARY --- */}
      {favorites.length > 0 && (
        <section className="container mx-auto px-6 mt-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between p-12 bg-stone-900 text-white rounded-sm shadow-2xl">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <p className="text-[10px] uppercase tracking-[0.5em] text-stone-500 mb-2">Cellar Total</p>
              <p className="text-4xl font-serif italic">
                ${favorites.reduce((a, b) => a + b.price, 0).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => navigate("/shopping-cart")}
              className="w-full md:w-auto bg-white text-stone-900 px-14 py-6 text-[11px] uppercase tracking-[0.4em] font-bold hover:bg-red-900 hover:text-white transition-all duration-500"
            >
              Checkout Selection
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Favorites;