'use client';

import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ArrowUpRight } from 'lucide-react';

const reviews = [
  {
    name: "Rahul Sharma",
    initials: "RS",
    role: "Cardiac Patient",
    rating: 5,
    comment: "Excellent experience! Dr. Jenkins was incredibly patient and explained my cardiac condition in detail. The clinic is spotless and the entire staff is professional and warm. My ECG results came in same day!",
    date: "2 weeks ago",
    color: "bg-blue-600",
  },
  {
    name: "Anita Verma",
    initials: "AV",
    role: "General Checkup",
    rating: 5,
    comment: "The booking process was so smooth — I got a confirmed appointment within minutes. The doctor listened to all my concerns without rushing. I've finally found a clinic I trust completely.",
    date: "1 month ago",
    color: "bg-violet-600",
  },
  {
    name: "Sanjay Gupta",
    initials: "SG",
    role: "Physiotherapy Patient",
    rating: 5,
    comment: "After my knee surgery, the physiotherapy team here got me walking normally again. Very professional, modern equipment, and minimal waiting time. Highly recommend for post-operative care.",
    date: "3 weeks ago",
    color: "bg-emerald-600",
  },
  {
    name: "Priya Nair",
    initials: "PN",
    role: "Regular Patient",
    rating: 5,
    comment: "I've been visiting PremiumClinic for 3 years. The level of care is consistently exceptional. Lab reports come quickly and the WhatsApp follow-ups are a fantastic touch.",
    date: "5 days ago",
    color: "bg-rose-600",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? '#FBBF24' : '#E2E8F0'}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const Reviews = () => {
  const [active, setActive] = useState(0);

  const next = () => setActive((p) => (p + 1) % reviews.length);
  const prev = () => setActive((p) => (p - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" className="section-padding bg-slate-50 overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="section-tag mb-4">Patient Stories</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-4">
              What Our Patients{' '}
              <span className="gradient-text">Are Saying</span>
            </h2>
          </div>

          {/* Google Rating Widget */}
          <div className="w-full md:w-auto shrink-0 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex items-center justify-between md:justify-start gap-6">
            <div className="text-center border-r border-slate-100 pr-6">
              <div className="text-4xl font-bold text-slate-900">4.9</div>
              <StarRating rating={5} />
              <div className="text-xs text-slate-400 mt-1">out of 5</div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-bold text-slate-800 text-sm">Google</span>
              </div>
              <div className="text-sm text-slate-500">Based on</div>
              <div className="font-bold text-slate-900">500+ reviews</div>
            </div>
          </div>
        </div>

        {/* Reviews Grid – Card Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Featured Review */}
          <div className="md:col-span-2 review-card p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className={`w-16 h-16 ${reviews[active].color} rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0`}>
                {reviews[active].initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{reviews[active].name}</h4>
                    <p className="text-slate-500 text-sm">{reviews[active].role} · {reviews[active].date}</p>
                  </div>
                  <StarRating rating={reviews[active].rating} />
                </div>
              </div>
            </div>
            <div className="mt-6 relative">
              <Quote className="absolute -top-2 -left-1 text-slate-100" size={40} fill="currentColor" />
              <p className="text-slate-700 text-lg leading-relaxed pl-6 italic">
                "{reviews[active].comment}"
              </p>
            </div>
          </div>

          {/* Other Reviews */}
          {reviews
            .filter((_, i) => i !== active)
            .slice(0, 2)
            .map((review, i) => (
              <div key={i} className="review-card p-6 shadow-sm cursor-pointer" onClick={() => setActive(reviews.indexOf(review))}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 ${review.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                    <div className="text-xs text-slate-400">{review.role}</div>
                  </div>
                  <div className="ml-auto">
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">"{review.comment}"</p>
              </div>
            ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/25"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-blue-600' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'}`}
              />
            ))}
          </div>

          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm"
          >
            View all on Google
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
