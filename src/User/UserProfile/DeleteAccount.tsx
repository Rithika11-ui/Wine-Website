import { ArrowLeft, AlertTriangle, ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const reasons = [
  "I no longer use this service",
  "I have a duplicate account",
  "I have privacy concerns",
  "The service does not meet my expectations",
  "I am switching to a different service",
  "Other",
];

const steps = ["Reason", "Warning", "Confirm"];

const AccountDeletion = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!password) return setError("Please enter your password to confirm.");
    setLoading(true);
    setError("");
    try {
      await new Promise(r => setTimeout(r, 1500)); // replace with API call
      localStorage.removeItem("token");
      localStorage.removeItem("users");
      navigate('/signin');
    } catch (err) {
      setError("Failed to delete account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FDFCF8] min-h-screen font-sans text-stone-900">
      <div className="container mx-auto px-6 py-6">

        {/* Back arrow */}
        <button
          onClick={() => step === 0 ? navigate('/user-profile') : setStep(s => s - 1)}
          className="text-stone-400 hover:text-red-900 transition-colors mb-6 block"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-5xl font-serif italic text-stone-900">Delete Account</h1>
            <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold mt-1">This action is permanent and cannot be undone</p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-2`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    i < step ? "bg-red-900 text-white" :
                    i === step ? "bg-stone-900 text-white" :
                    "bg-stone-100 text-stone-400"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${
                    i === step ? "text-stone-900" : "text-stone-300"
                  }`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <ChevronRight size={14} className="text-stone-200 mx-1" />
                )}
              </div>
            ))}
          </div>

          {/* --- STEP 0: REASON --- */}
          {step === 0 && (
            <div className="bg-white border border-stone-100 shadow-sm p-10 space-y-6">
              <div>
                <h2 className="text-xl font-serif italic mb-1">Why are you leaving?</h2>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Your feedback helps us improve</p>
              </div>

              <div className="space-y-3">
                {reasons.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => setSelectedReason(reason)}
                    className={`w-full text-left px-5 py-4 border transition-all text-sm ${
                      selectedReason === reason
                        ? "border-red-900/40 bg-red-50 text-stone-900"
                        : "border-stone-100 hover:border-stone-200 text-stone-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                        selectedReason === reason ? "border-red-900 bg-red-900" : "border-stone-300"
                      }`} />
                      {reason}
                    </div>
                  </button>
                ))}
              </div>

              {selectedReason === "Other" && (
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Please specify</label>
                  <input
                    type="text"
                    value={otherReason}
                    onChange={e => setOtherReason(e.target.value)}
                    placeholder="Tell us more..."
                    className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm"
                  />
                </div>
              )}

              <button
                onClick={() => setStep(1)}
                disabled={!selectedReason || (selectedReason === "Other" && !otherReason)}
                className="w-full bg-stone-900 text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-red-900 transition-all disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          )}

          {/* --- STEP 1: WARNING --- */}
          {step === 1 && (
            <div className="bg-white border border-red-900/20 shadow-sm p-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={24} className="text-red-900" />
                </div>
                <div>
                  <h2 className="text-xl font-serif italic">Before you go</h2>
                  <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mt-0.5">Please read carefully</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "Your account and all personal data will be permanently deleted.",
                  "Your order history and saved addresses will be lost forever.",
                  "Any unused credits or active memberships will be forfeited.",
                  "This action cannot be reversed or recovered.",
                ].map((warning, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-red-50 border border-red-900/10">
                    <span className="text-red-900 font-bold text-xs flex-shrink-0 mt-0.5">✕</span>
                    <p className="text-sm text-stone-600">{warning}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(0)}
                  className="flex-1 border border-stone-200 text-stone-600 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-50 transition-all"
                >
                  Go Back
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-red-900 text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-900 transition-all"
                >
                  I Understand
                </button>
              </div>
            </div>
          )}

          {/* --- STEP 2: CONFIRM --- */}
          {step === 2 && (
            <div className="bg-white border border-stone-100 shadow-sm p-10 space-y-8">
              <div>
                <h2 className="text-xl font-serif italic mb-1">Final Confirmation</h2>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Enter your password to permanently delete your account</p>
              </div>

              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-stone-50 border border-stone-100 p-5 space-y-2">
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Reason for leaving</p>
                  <p className="text-sm text-stone-600">{selectedReason === "Other" ? otherReason : selectedReason}</p>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-stone-400 font-bold">Your Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(""); }}
                    placeholder="Enter your password"
                    className="w-full border-b border-stone-100 py-2 outline-none focus:border-red-900 bg-transparent text-sm"
                  />
                </div>

                {error && <p className="text-red-600 text-xs">{error}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-stone-200 text-stone-600 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-50 transition-all"
                >
                  Go Back
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 bg-red-900 text-white py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-900 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 size={14} className="animate-spin" /> Deleting...</> : "Delete My Account"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AccountDeletion;







