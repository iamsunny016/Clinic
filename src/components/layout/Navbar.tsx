'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Calendar, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'py-3 bg-white/95 backdrop-blur-xl shadow-[0_1px_30px_rgba(0,0,0,0.06)] border-b border-slate-100'
            : 'py-5 bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" fillOpacity="0.2"/>
                  <path d="M2 12h3l2-5 3 10 2-5h3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-bold text-xl tracking-tight leading-none">
                Aarogya<span className="text-blue-600 font-extrabold">Heart</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mt-1.5">Cardiac & Medical Center</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-sm transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+918757577586"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              <Phone size={15} className="text-blue-500" />
              +91 87575 77586
            </a>
            <Link href="#booking" className="btn-primary py-2.5 px-5 text-sm">
              <Calendar size={15} />
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-72 z-50 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-slate-900">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              <X size={20} />
            </button>
          </div>
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-medium transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-8 space-y-3">
            <a href="tel:+918757577586" className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-slate-700">
              <Phone size={18} className="text-blue-500" />
              <span className="font-medium">+91 87575 77586</span>
            </a>
            <Link
              href="#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary w-full"
            >
              <Calendar size={18} />
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
