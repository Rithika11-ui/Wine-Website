import { ArrowLeft, Lock, Mail, Loader2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../service/AuthApi';
import api from '../../service/Api';

const SecurityLogin = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Change Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState("");

  // Change Email
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleChangePassword = async () => {
    setPwError("");
    if (!newPassword || !currentPassword) return setPwError("All fields are required.");
    if (newPassword !== confirmPassword) return setPwError("Passwords do not match.");
    if (newPassword.length < 8) return setPwError("Password must be at least 8 characters.");

    setPwLoading(true);
    try {
      await api.put("/auth/change-password", { currentPassword, newPassword });
      setPwSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err: any) {
      setPwError(err?.response?.data?.message ?? "Failed to change password.");
    } finally {
      setPwLoading(false);
    }
  };

  const handleChangeEmail = async () => {
    setEmailError("");
    if (!newEmail || !emailPassword) return setEmailError("All fields are required.");

    setEmailLoading(true);
    try {
      await api.put(`/users/${user?.id}`, { email: newEmail, password: emailPassword });
      const updated = { ...user, email: newEmail };
      localStorage.setItem("users", JSON.stringify(updated));
      setEmailSuccess(true);
      setNewEmail("");
      setEmailPassword("");
      setTimeout(() => setEmailSuccess(false), 3000);
    } catch (err: any) {
      setEmailError(err?.response?.data?.message ?? "Failed to change email.");
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-stone-900">
      <div className="container mx-auto px-6 py-6">
         <button
              onClick={() => navigate('/user-profile')}
              className="text-stone-400 hover:text-red-900 transition-colors mb-8 block "
            >
              <ArrowLeft size={24} />
          </button>
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
           
            <div>
              <h1 className="text-5xl font-serif italic text-stone-900">Security & Login</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mt-1">Manage your credentials</p>
            </div>
          </div>

          <div className="space-y-6">

            {/* --- CHANGE PASSWORD --- */}
            <div className="bg-white border border-stone-100 shadow-sm p-10 space-y-8">
              <div className="flex items-center gap-3 border-b border-stone-50 pb-6">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center">
                  <Lock size={16} className="text-stone-400" />
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-normal">Change Password</h2>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">Update your account password</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Current Password */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm pr-8"
                    />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-0 top-2 text-stone-300 hover:text-stone-600">
                      {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm pr-8"
                    />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-0 top-2 text-stone-300 hover:text-stone-600">
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm pr-8"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-0 top-2 text-stone-300 hover:text-stone-600">
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {pwError && <p className="text-red-600 text-xs">{pwError}</p>}

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleChangePassword}
                    disabled={pwLoading}
                    className="bg-stone-900 text-white px-10 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {pwLoading ? <><Loader2 size={18} className="animate-spin" /> Updating...</> : "Update Password"}
                  </button>
                  {pwSuccess && <p className="text-green-600 text-xs uppercase tracking-widest font-bold">Password updated!</p>}
                </div>
              </div>
            </div>

            {/* --- CHANGE EMAIL --- */}
            <div className="bg-white border border-stone-100 shadow-sm p-10 space-y-8">
              <div className="flex items-center gap-3 border-b border-stone-50 pb-6">
                <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center">
                  <Mail size={16} className="text-stone-400" />
                </div>
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-widest">Change Email</h2>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">Current: {user?.email}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">New Email Address</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Confirm with Password</label>
                  <input
                    type="password"
                    value={emailPassword}
                    onChange={(e) => setEmailPassword(e.target.value)}
                    className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm"
                  />
                </div>

                {emailError && <p className="text-red-600 text-xs">{emailError}</p>}

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={handleChangeEmail}
                    disabled={emailLoading}
                    className="bg-stone-900 text-white px-10 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
                  >
                    {emailLoading ? <><Loader2 size={18} className="animate-spin" /> Updating...</> : "Update Email"}
                  </button>
                  {emailSuccess && <p className="text-green-600 text-xs uppercase tracking-widest font-bold">Email updated!</p>}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityLogin;