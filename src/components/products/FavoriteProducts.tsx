import { Heart } from "lucide-react";
import assets from "../../assets/assets";

const Favorites = () => {
  return (
    <div className="bg-[#FDFCF8] min-h-screen py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-red-900 text-[10px] uppercase tracking-[0.5em] font-bold">Personal Gallery</p>
          <h1 className="text-5xl font-serif italic">Your Favorites</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="group text-center bg-white border border-stone-50 p-8 hover:shadow-2xl transition-all duration-700">
              <div className="relative aspect-[2/3] mb-6 overflow-hidden">
                <button className="absolute top-0 right-0 z-10 text-red-900"><Heart fill="currentColor" size={18}/></button>
                <img src={assets.auswat} alt="" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" />
              </div>
              <h3 className="font-serif italic text-xl mb-1">Chardonnay Reserva</h3>
              <p className="text-stone-400 text-[10px] uppercase tracking-widest mb-6">$38.00</p>
              <button className="border-b border-stone-900 pb-1 text-[10px] uppercase tracking-widest font-bold hover:text-red-900 hover:border-red-900 transition-all">
                Move to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites