import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const RegisterPage: React.FC = () => {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('volunteer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(role);
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-udaan-navy text-white flex items-center justify-center mx-auto shadow-md">
          <UserPlus className="w-6 h-6 text-udaan-teal" />
        </div>
        <h1 className="text-2xl font-extrabold text-udaan-navy">Register on UDAAN</h1>
        <p className="text-xs text-slate-500">Join as an authorized responder or institutional partner</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4 text-xs">
        <form onSubmit={handleRegister} className="space-y-3.5">
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Account Type / Role:</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-medium focus:outline-none"
            >
              <option value="volunteer">Field Volunteer</option>
              <option value="social_worker">Social Worker (MSW)</option>
              <option value="ngo_partner">Verified NGO Partner</option>
              <option value="administrator">City Command Administrator</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Full Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ananya Deshpande"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Email Address:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@organization.org"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Password:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-1 focus:ring-udaan-blue focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-udaan-teal hover:bg-teal-700 text-white font-bold rounded-xl transition shadow-sm text-xs"
          >
            Create Account & Enter Dashboard
          </button>
        </form>

        <div className="text-center pt-2 text-[11px] text-slate-500">
          <span>Already have an account? </span>
          <Link to="/login" className="text-udaan-blue font-bold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
