import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  HeartHandshake,
  Shield,
  Layers,
  Search,
  UserCheck,
  Building2,
  Globe,
  ArrowRight,
  LifeBuoy
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, isAuthenticated } = useAuth();
  const { currentLanguage, setLanguage, languageNames, t } = useLanguage();

  const isDashboard = location.pathname.startsWith('/dashboard');

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Mission', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Find Help', path: '/find-resources' },
    { name: 'Become a Volunteer', path: '/volunteer' },
    { name: 'Partner With Us', path: '/partner-with-us' },
  ];

  return (
    <header className="bg-white border-b border-udaan-softgrey sticky top-8 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Tagline */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-udaan-navy flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path d="M12 28C14 20 20 14 36 12C36 12 30 20 28 26C26 32 20 34 16 34C13 34 12 31 12 28Z" fill="#18A999"/>
                <path d="M14 34C18 28 24 24 38 18C38 18 31 27 28 32C25 37 20 38 17 38C15 38 14 36 14 34Z" fill="#2463A6" fillOpacity="0.9"/>
                <circle cx="34" cy="14" r="3.5" fill="#E5A23C"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-udaan-navy">UDAAN</span>
                <span className="bg-udaan-blue-soft text-udaan-blue text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                  INTELLIGENCE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-tight hidden sm:block">
                Humanitarian Intelligence Network
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-udaan-blue font-semibold border-b-2 border-udaan-blue pb-0.5'
                    : 'text-slate-600 hover:text-udaan-navy'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 border border-slate-200">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1" />
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none pr-1 cursor-pointer"
              >
                {languageNames.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency / Fast Intake CTA */}
            <Link
              to="/get-help"
              className="flex items-center gap-1.5 bg-udaan-red text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-red-700 transition shadow-sm animate-pulse"
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>{t.getHelpNow}</span>
            </Link>

            {/* Dashboard / Login */}
            {isDashboard ? (
              <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                Logged in: {currentUser.name.split(' ')[0]}
              </span>
            ) : (
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 bg-udaan-navy text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-slate-800 transition shadow-sm"
              >
                <span>Command Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/get-help"
              className="bg-udaan-red text-white text-xs font-bold px-2.5 py-1.5 rounded-lg"
            >
              Get Help
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-600 hover:text-slate-900 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Select Language:</span>
            <div className="flex gap-2">
              {languageNames.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`text-xs px-2 py-1 rounded font-medium ${
                    currentLanguage === lang.code
                      ? 'bg-udaan-blue text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {lang.nativeName}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              to="/get-help"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-udaan-red text-white font-bold py-2.5 rounded-lg text-sm"
            >
              {t.getHelpNow}
            </Link>
            <Link
              to="/report-need"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-udaan-teal text-white font-semibold py-2.5 rounded-lg text-sm"
            >
              {t.reportNeed}
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-udaan-navy text-white font-medium py-2 rounded-lg text-sm"
            >
              Command Operations Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
