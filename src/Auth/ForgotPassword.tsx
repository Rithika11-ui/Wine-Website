import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="h-screen bg-[#FDFCF8] flex items-center justify-center p-6 -mt-28">
      <div className="max-w-md w-full text-center space-y-8">
        <h1 className="text-4xl font-serif italic">Reset Access</h1>
        <p className="text-stone-500 text-sm font-light">Enter your email and we'll send you instructions to recover your account.</p>
        <input type="email" placeholder="EMAIL ADDRESS" className="w-full border-b border-stone-200 py-3 bg-transparent text-center text-sm focus:border-red-900 outline-none" />
        <button className="w-full hover:bg-stone-900 text-white bg-red-900 py-4 text-[10px] uppercase tracking-[0.3em] font-bold" >
          Send Recovery Email
        </button>
        <Link to="/signin" className="block text-[10px] text-stone-400 uppercase tracking-widest hover:text-red-900">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword