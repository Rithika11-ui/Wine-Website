import { Loader2, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../service/AuthApi';

interface SignOutProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignOut = ({ isOpen, onClose }: SignOutProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await Promise.all([
        logout(),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);
      onClose();
      navigate('/signin');
    } catch (err: any) {
      setError("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white shadow-2xl p-10 max-w-sm w-full mx-4 space-y-6">

        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <LogOut size={24} className="text-red-900" />
          </div>
          <h2 className="text-2xl font-serif italic text-stone-900">Sign Out</h2>
          <p className="text-xs text-stone-400 uppercase tracking-widest">
            Are you sure you want to leave your collection?
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-xs text-center">{error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 border border-stone-200 text-stone-700 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-stone-50 transition-all"
          >
            Cancel
          </button>
          <button
              onClick={handleLogout}
              disabled={loading}
              className="flex-1 bg-red-900 text-white py-4 text-[10px] uppercase tracking-widest font-bold transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin mx-auto" />
              ) : (
                "Sign Out"
              )}
            </button>
        </div>

      </div>
    </div>
  );
};

export default SignOut;