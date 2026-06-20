import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, GraduationCap, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password) {
      setError('Please enter a password');
      return;
    }
    const success = login(password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-teal-700" />
            </div>
            <h1 className="font-serif text-xl font-bold text-gray-900">Admin Login</h1>
            <p className="font-serif text-sm text-gray-500 mt-1">Enter your password to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-serif text-gray-500 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  placeholder="Enter admin password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                <Lock className="w-3.5 h-3.5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-600 text-white text-sm font-serif rounded-lg hover:bg-teal-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <a
              href="/"
              className="block text-xs text-center text-gray-400 hover:text-teal-600 transition-colors"
            >
              Back to site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
