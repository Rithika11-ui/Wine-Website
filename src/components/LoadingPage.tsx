import assets from "../assets/assets";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full bg-[#FDFCF8] flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Breathing Circle Effect */}
        <div className="absolute w-32 h-32 border border-red-900/20 rounded-full animate-ping" />
        <img src={assets.logo} className="h-20 w-auto relative z-10 animate-pulse" alt="Logo" />
      </div>
      <p className="mt-8 text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold animate-pulse">
        Preparing the Vintage...
      </p>
    </div>
  );
}; 

export default LoadingPage