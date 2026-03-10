import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { login } from '../service/AuthApi';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res  = await login({ email, password })
      
      const user = res.data;
      console.log("USER:", user);
      console.log("ROLE:", user?.role);
      if (user?.role === 0) {
        navigate("/admin");
        console.log("successfully");
      } else {
        navigate("/home")
        console.log("err");
      }
      
    } catch (err) {
      setError("Invalid Email or Password.")
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-screen bg-[#FDFCF8] flex items-center justify-center py-8 px-6">
      
      {/* --- FORM CONTAINER --- */}
      <div className="w-full max-w-sm z-10 bg-[#FDFCF8]">
        <div className="space-y-12 -mt-28">
          
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-6xl font-serif italic text-stone-900 tracking-tighter">Sign In</h1>
            <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-bold">Access Your Private Collection</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={(e) =>{ e.preventDefault(); handleLogin();}}>
            
            {error && <p className="text-red-600 text-xs text-center">{error}</p> }
                     
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-1">Email Address</label>
              <input value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus required
                type="email" 
                className="w-full border-b border-stone-200 py-3 bg-transparent text-sm focus:border-red-900 outline-none transition-all placeholder:text-stone-200" 
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-1">Password</label>
              </div>
              <input value={password}
                type="password" required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-stone-200 py-3 bg-transparent text-sm focus:border-red-900 outline-none transition-all" 
              />
              <div className='flex justify-end item-end pt-2'>

                <Link to="/forgot-pw" className="text-[9px] text-red-900 uppercase tracking-widest font-bold hover:text-stone-900 transition-colors">Forgot Password?</Link>
              </div>
            </div>

            <button type="submit" className="w-full hover:bg-stone-900 text-white py-5 text-[10px] uppercase tracking-[0.5em] font-bold bg-red-900 transition-all shadow-2xl">
               {loading ? "Loading..." : "Access Collection"}
            </button>
          </form>

          {/* Social Auth */}
          <div className="space-y-1 text-center ">
            <div className="relative flex items-center -mt-5">
              <div className="flex-grow border-t border-stone-100"></div>
              <span className="flex-shrink mx-4 text-stone-500 text-[10px] uppercase tracking-[0.2em]">or sign in with</span>
              <div className="flex-grow border-t border-stone-100"></div>
            </div>
            <div className="flex justify-center gap-6">
              <button className="w-20 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <img src={assets.google} className="" alt="Google" />
              </button>
              <button className="w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <img src={assets.facebook} className="" alt="Facebook" />
              </button>
              <button className="w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <img src={assets.instagram} className="" alt="Instagram" />
              </button>
            </div>
            <p className="text-center text-[10px] text-stone-400 uppercase tracking-[0.2em] pt-4">
              Not a member? <Link to="/signup" className="text-red-900 font-bold border-b border-red-900/20 ml-2">Join the Estate</Link>
            </p>
          </div>
              
        </div>
      </div>
    </div>
  );
};

export default Login