import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { register } from '../service/AuthApi';
import { validationPassword, validateConfirmPassword, validateEmail } from '../utils/Validations';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
    setPasswordErrors(validationPassword(e.target.value));
  };

  const handleConfirmPassword = (e: any) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(validateConfirmPassword(password, e.target.value));
  };

  const handledRegister = async () => {
    if (passwordErrors.length > 0 || emailError || confirmPasswordError) return;
    setLoading(true);
    setError("");
    try {
      const res = await register({ userName, email, password, phoneNumber });
      const user = res.data;
      if (user?.role === 0) {
        navigate('/admin');
      } else {
        navigate('/home');
      }
    } catch (error: any) {
      console.log(error.response?.data);
      setError("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#FDFCF8] flex items-center justify-center py-12 px-6">
      <div className="w-full max-w-sm z-10 bg-[#FDFCF8]">
        <div className="space-y-12">

          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-6xl font-serif italic text-stone-900 tracking-tighter">Register</h1>
            <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-bold">Become a Part of the Legacy</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handledRegister(); }}>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-1">Username</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoFocus
                type="text"
                placeholder="johndoe"
                className="w-full border-b border-stone-200 py-2 bg-transparent text-sm focus:border-red-900 outline-none transition-all placeholder:text-stone-200"
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-1">Email Address</label>
              <input
                value={email}
                type="email"
                onChange={(e) => handleEmail(e)}
                placeholder="john@gmail.com"
                className={`w-full border-b py-2 bg-transparent text-sm outline-none transition-all placeholder:text-stone-200 ${
                  emailError ? 'border-red-500' : 'border-stone-200 focus:border-red-900'
                }`}
              />
              {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-1">Phone Number</label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                placeholder="+85512345678"
                className="w-full border-b border-stone-200 py-2 bg-transparent text-sm focus:border-red-900 outline-none transition-all placeholder:text-stone-200"
              />
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-1">Password</label>
              <input
                value={password}
                onChange={(e) => handlePasswordChange(e)}
                type="password"
                placeholder="e.g. Pass123!"
                className={`w-full border-b py-2 bg-transparent text-sm outline-none transition-all placeholder:text-stone-200 ${
                  passwordErrors.length > 0 ? 'border-red-500' : 'border-stone-200 focus:border-red-900'
                }`}
              />
              {passwordErrors.length > 0 && (
                <ul className="mt-1 space-y-0.5">
                  {passwordErrors.map((err, i) => (
                    <li key={i} className="text-xs text-red-500">{err}</li>
                  ))}
                </ul>
              )}
              {password.length > 0 && passwordErrors.length === 0 && (
                <p className="text-xs text-green-500 mt-1">✓ Password looks good</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold ml-1">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => handleConfirmPassword(e)}
                type="password"
                placeholder="Re-enter password"
                className={`w-full border-b py-2 bg-transparent text-sm outline-none transition-all placeholder:text-stone-200 ${
                  confirmPasswordError ? 'border-red-500' : 'border-stone-200 focus:border-red-900'
                }`}
              />
              {confirmPasswordError && <p className="text-xs text-red-500 mt-1">{confirmPasswordError}</p>}
              {confirmPassword.length > 0 && !confirmPasswordError && (
                <p className="text-xs text-green-500 mt-1">✓ Passwords match</p>
              )}
            </div>

            {error && <p className="text-xs text-red-500 text-center">{error}</p>}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || passwordErrors.length > 0 || !!emailError || !!confirmPasswordError}
                className="w-full bg-red-900 hover:bg-stone-900 disabled:bg-stone-300 text-white py-5 text-[10px] uppercase tracking-[0.5em] font-bold transition-all shadow-2xl"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </div>
          </form>

          {/* Social Auth */}
          <div className="space-y-3">
            <div className="relative flex items-center -mt-5">
              <div className="flex-grow border-t border-stone-100"></div>
              <span className="flex-shrink mx-4 text-stone-500 text-[10px] uppercase tracking-[0.2em]">or join with</span>
              <div className="flex-grow border-t border-stone-100"></div>
            </div>

            <div className="flex justify-center gap-6">
              <button className="w-20 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <img src={assets.google} alt="Google" />
              </button>
              <button className="w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <img src={assets.facebook} alt="Facebook" />
              </button>
              <button className="w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all">
                <img src={assets.instagram} alt="Instagram" />
              </button>
            </div>

            <p className="text-center text-[10px] text-stone-400 uppercase tracking-[0.2em]">
              Already a member? <Link to="/signin" className="text-red-900 font-bold border-b border-red-900/20 ml-2">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;