'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight, ShieldCheck, Clock, Users, Award, ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 dot-grid opacity-40 -z-10" />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-blue-50 via-cyan-50 to-transparent rounded-full blur-3xl -z-10 opacity-80" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-50 to-transparent rounded-full blur-3xl -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left Content */}
          <div className="animate-slide-up">
            {/* Trust Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-amber-800 font-bold text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-800 font-semibold text-sm">Open Today until 8 PM</span>
              </div>
            </div>

            {/* Welcome Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-[2px] bg-blue-500"></span>
              <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">Aarogya Heart & Health Center</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-bold text-slate-900 leading-[1.1] mb-6">
              Premium Healthcare{' '}
              <span className="relative inline-block">
                <span className="gradient-text">You Deserve</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                  <path d="M2 6c32-4 64-5 98-4s66 2 98 0" stroke="url(#u)" strokeWidth="3" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="u" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563EB"/>
                      <stop offset="1" stopColor="#06B6D4"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-500 leading-relaxed mb-10 max-w-lg">
              Experience the best cardiac and internal medicine care in Gurgaon with Dr. Ananya Sharma. Modern facilities, compassionate service, and your health as our top priority.
            </p>

            {/* CTAs */}
            <div className="flex flex-col min-[400px]:flex-row gap-4 mb-14">
              <Link href="#booking" className="btn-primary text-base px-8 py-4 rounded-xl">
                Book Appointment
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://wa.me/918757577586?text=Hello!%20I'd%20like%20to%20inquire%20about%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base px-8 py-4 rounded-xl border-slate-200"
              >
                <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.658 1.438 5.162L2 22l4.975-.97C8.384 21.946 10.13 22.5 12 22.5 17.523 22.5 22 18.023 22 12.5S17.523 2 12 2z"/>
                </svg>
                WhatsApp Chat
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-slate-100 pt-8">
              {[
                { value: '15+', label: 'Years Experience', icon: Award },
                { value: '10k+', label: 'Happy Patients', icon: Users },
                { value: '500+', label: 'Google Reviews', icon: Star },
              ].map((stat, i) => (
                <div key={i} className="text-left">
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            {/* Background Shapes */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-[40px] rotate-3 scale-95 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-200 to-cyan-50 rounded-[40px] -rotate-2 scale-98 opacity-40" />

            {/* Main Image */}
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-blue-200/50 aspect-[4/5]">
              <Image
                src="/doctor-hero.png"
                alt="Dr. Ananya Sharma - Heart Care Specialist"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Overlay gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-900/30 to-transparent" />
            </div>

            {/* Floating Card 1 - Top Left */}
            <div className="absolute -top-4 -left-8 glass rounded-2xl p-4 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">NABH Certified</div>
                  <div className="text-xs text-slate-500">Accredited Hospital</div>
                </div>
              </div>
            </div>

            {/* Floating Card 2 - Bottom Right */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 shadow-xl animate-float-delayed">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="star-glow">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">4.9 on Google</div>
                  <div className="text-xs text-slate-500">500+ Reviews</div>
                </div>
              </div>
            </div>

            {/* Floating Card 3 - Right Middle */}
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 glass rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Quick Booking</div>
                  <div className="text-xs text-slate-500">Under 2 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 animate-bounce opacity-40">
          <ChevronDown size={24} className="text-slate-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
