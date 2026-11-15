import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, ShieldCheck, UserCheck, ArrowRight, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { loginAs, availableRoles } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs('administrator');
    navigate('/dashboard');
  };

  const handleRoleQuickLogin = (role: UserRole) => {
    loginAs(role);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-udaan-navy text-white flex items-center justify-center mx-auto shadow-md">
          <Lock className="w-6 h-6 text-udaan-teal" />
        </div>
        <h1 className="text-2xl font-extrabold text-udaan-navy">Staff & Partner Sign In</h1>
        <p className="text-xs text-slate-500">Access role-authorized operations on UDAAN</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-5 text-xs">
        {/* Quick 1-Click Role Login for Evaluators */}
        <div className="space-y-2">
          <span className="font-bold text-slate-700 block text-xs">
            Instant Demo Logins (Click to Enter as Any Role):
          </span>
          <div className="space-y-1.5">
            {availableRoles.slice(0, 4).map((r) => (
              <button
                key={r.role}
                type="button"
                onClick={() => handleRoleQuickLogin(r.role)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-udaan-blue-soft hover:border-udaan-blue/40 text-left transition flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="text-slate-800 block text-xs">{r.label}</strong>
                  <span className="text-[10px] text-slate-500">{r.description}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-slate-400 text-[10px] uppercase">Or Standard Login</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* Traditional Email Form */}
        <form onSubmit={handleCustomLogin} className="space-y-3.5">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin.operations@udaan-network.org"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-udaan-navy hover:bg-slate-800 text-white font-bold rounded-xl transition shadow-sm text-xs"
          >
            Sign In with Email
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] text-slate-500">
          <span>Need an account? </span>
          <Link to="/register" className="text-udaan-blue font-bold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};
