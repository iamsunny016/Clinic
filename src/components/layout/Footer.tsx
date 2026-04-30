import Link from 'next/link';
import { Phone, Mail, MapPin, Globe, MessageCircle, Activity, ArrowUpRight, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* Top CTA Band */}
      <div className="gradient-bg py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Ready to prioritize your health?</h3>
            <p className="text-blue-100 text-sm">
              Book an appointment today and take the first step towards a healthier future.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="https://wa.me/918757577586"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
            <Link
              href="#booking"
              className="flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
            >
              Book Appointment
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="white" fillOpacity="0.2"/>
                  <path d="M2 12h3l2-5 3 10 2-5h3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-tight leading-none">
                  Aarogya<span className="text-blue-400">Heart</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Medical Center</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Providing exceptional healthcare with a patient-first approach since 2009. Your health is our priority.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, MessageCircle, Activity].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {['Our Services', 'About Doctor', 'Book Appointment', 'Patient Reviews', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3 text-sm">
              {['General Checkup', 'Cardiology', 'Lab Diagnostics', 'Vaccination', 'Physiotherapy', 'Neurology'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Get In Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={14} className="text-blue-400" />
                </div>
                <span className="text-slate-400 leading-relaxed">Medical Plaza, Sector 15, Gurgaon, Haryana, 122001</span>
              </li>
              <li>
                <a href="tel:+918757577586" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={14} className="text-blue-400" />
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors">+91 87575 77586</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@aarogyaheart.com" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-blue-400" />
                  </div>
                  <span className="text-slate-400 group-hover:text-white transition-colors">contact@aarogyaheart.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            © 2024 Aarogya Heart & Health. Made with <Heart size={12} className="text-red-500" fill="currentColor" /> for better health.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">HIPAA Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
