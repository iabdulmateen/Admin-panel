
import React, { useState } from 'react';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

const API_BASE_URL =
  'https://e-commerce-backend-blush-mu.vercel.app/api';

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState<{
    type: 'error' | 'success';
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Only allow admin users into the admin dashboard
      if (data.role !== 'admin') {
        throw new Error('Access denied. Admin account required.');
      }

      if (!data.token) {
        throw new Error('Authentication token was not received.');
      }

      // Save authentication token
      localStorage.setItem('userToken', data.token);

      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      setMessage({
        type: 'success',
        text: 'Login successful!',
      });

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Something went wrong';

      setMessage({
        type: 'error',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 border border-slate-700/60 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">
            Admin Panel Login
          </h2>

          <p className="text-sm text-slate-400">
            Sign in to access Berry Admin Panel
          </p>
        </div>

        {message && (
          <div
            className={`p-3 rounded-xl text-sm font-medium border ${
              message.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                : 'bg-rose-950/60 border-rose-700/60 text-rose-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 text-sm outline-none focus:ring-2 focus:ring-purple-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-sm transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
          </button>

        </form>
      </div>
    </div>
  );
};
