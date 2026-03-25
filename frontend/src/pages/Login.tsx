import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/api/authService';
import { LogIn, Activity } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('admin123');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login({ username, password });
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        navigate('/');
      }
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3"></div>

      <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-3xl shadow-xl z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-2xl mb-4 border border-indigo-100">
            <Activity className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">AI Sales Predictor</h1>
          <p className="text-slate-500 font-medium tracking-wide">Enter your credentials to access</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-2 block uppercase tracking-wide">Username</label>
            <input
              type="text" value={username} required
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
              placeholder="Username"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 ml-2 block uppercase tracking-wide">Password</label>
            <input
              type="password" value={password} required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="group w-full flex justify-center py-4 px-4 rounded-2xl text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-8"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign in to Dashboard
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Hint: Use <span className="font-bold text-slate-800">admin</span> / <span className="font-bold text-slate-800">admin123</span>
        </p>
      </div>
    </div>
  );
}
