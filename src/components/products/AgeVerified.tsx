import assets from "../../assets/assets";

const AgeVerification = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-stone-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 bg-[#FDFCF8] p-12 shadow-2xl border border-stone-100">
        <div className="flex justify-center mb-4">
          <img src={assets.logo} className="h-16 w-auto" alt="Logo" />
        </div>
        <h2 className="text-3xl font-serif italic text-stone-900">Are you of legal drinking age?</h2>
        <p className="text-stone-500 text-sm font-light leading-relaxed">
          To visit our cellar, you must be at least 18 years of age. By entering, you agree to our Terms of Service.
        </p>
        <div className="flex flex-col gap-4">
          <button className="bg-red-900 text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-stone-900 transition-all">
            I am 18 or older
          </button>
          <button className="border border-stone-300 py-4 text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-stone-900 transition-all">
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerification