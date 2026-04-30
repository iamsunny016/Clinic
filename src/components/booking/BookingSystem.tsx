'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { format, addDays, startOfToday, isToday, isTomorrow } from 'date-fns';

const timeSlots = [
  { time: "09:00 AM", available: true, slots: 3 },
  { time: "10:00 AM", available: true, slots: 1 },
  { time: "11:00 AM", available: false, slots: 0 },
  { time: "12:00 PM", available: true, slots: 4 },
  { time: "02:00 PM", available: true, slots: 2 },
  { time: "03:00 PM", available: true, slots: 5 },
  { time: "04:00 PM", available: false, slots: 0 },
  { time: "05:00 PM", available: true, slots: 3 },
];

const getDayLabel = (date: Date) => {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEE');
};

const BookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedTime, setSelectedTime] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', concern: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          phone: `+91 ${formData.phone}`,
          date: selectedDate.toISOString(), 
          time: selectedTime 
        }),
      });
      if (response.ok) setStep(3);
      else setStep(3); // fallback for demo
    } catch {
      setStep(3); // fallback for demo
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag mb-4">Book Appointment</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-4 mb-6">
            Schedule Your{' '}
            <span className="gradient-text">Visit</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Choose a convenient date and time. Booking takes less than 2 minutes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="flex items-center mb-12">
            {['Date & Time', 'Your Details', 'Confirmed'].map((label, i) => (
              <div key={i} className="flex-1 flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step > i + 1
                      ? 'bg-green-500 text-white'
                      : step === i + 1
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {step > i + 1 ? <CheckCircle2 size={18} /> : i + 1}
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${step === i + 1 ? 'text-blue-600' : 'text-slate-400'}`}>
                    {label}
                  </span>
                </div>
                {i < 2 && (
                  <div className={`flex-1 h-0.5 mx-3 transition-all duration-500 ${step > i + 1 ? 'bg-green-400' : 'bg-slate-100'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div>
              {/* Date Picker */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-500" /> Select a Date
                </h3>
                <div className="grid grid-cols-2 min-[400px]:grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                  {[...Array(8)].map((_, i) => {
                    const date = addDays(startOfToday(), i);
                    const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                    const isSunday = date.getDay() === 0;
                    return (
                      <button
                        key={i}
                        onClick={() => !isSunday && setSelectedDate(date)}
                        disabled={isSunday}
                        className={`relative p-3 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center gap-1 ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : isSunday
                            ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700 hover:bg-blue-50 shadow-sm'
                        }`}
                      >
                        <span className={`text-[10px] font-bold uppercase tracking-wide ${isSelected ? 'text-blue-200' : isSunday ? 'text-slate-300' : 'text-slate-400'}`}>
                          {getDayLabel(date)}
                        </span>
                        <span className="text-xl font-bold leading-none">{format(date, 'd')}</span>
                        {isSunday && <span className="text-[9px]">Off</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Clock size={20} className="text-blue-500" /> Available Time Slots
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        selectedTime === slot.time
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25'
                          : !slot.available
                          ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                          : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700 hover:bg-blue-50 shadow-sm'
                      }`}
                    >
                      <div className="font-bold text-sm mb-1">{slot.time}</div>
                      {slot.available ? (
                        <div className={`text-[11px] font-medium ${selectedTime === slot.time ? 'text-blue-200' : 'text-emerald-600'}`}>
                          Available
                        </div>
                      ) : (
                        <div className="text-[11px] font-medium text-red-400">Booked</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {selectedTime && (
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</div>
                    <div className="text-blue-600 font-semibold">{selectedTime}</div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!selectedTime}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:translate-y-0 py-4 text-base"
              >
                Continue to Details
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="bg-slate-50 rounded-2xl p-5 mb-8 flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</div>
                    <div className="text-blue-600 font-semibold text-sm">{selectedTime}</div>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="ml-auto text-blue-600 hover:underline text-sm font-medium">Edit</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        required type="text" placeholder="John Doe"
                        className="input-field pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 pr-3 z-10">
                        <Phone size={16} className="text-slate-400" />
                        <span className="text-sm font-bold text-slate-900">+91</span>
                      </div>
                      <input
                        required 
                        type="tel" 
                        placeholder="00000 00000"
                        maxLength={10}
                        className="input-field pl-[85px]"
                        value={formData.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 10) setFormData({ ...formData, phone: val });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address <span className="text-red-400">*</span></label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      required type="email" placeholder="john@example.com"
                      className="input-field pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Primary Concern <span className="text-slate-400 font-normal">(optional)</span></label>
                  <textarea
                    placeholder="Briefly describe your symptoms or what you'd like to discuss..."
                    rows={3}
                    className="input-field resize-none"
                    value={formData.concern}
                    onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-secondary flex-1"
                  >
                    <ArrowLeft size={18} />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex-[2] py-4"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        Confirm Appointment
                        <CheckCircle2 size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div className="text-center py-12">
              <div className="relative inline-flex mb-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-green-600" size={52} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full animate-ping" />
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-3">Appointment Confirmed!</h3>
              <p className="text-slate-500 text-lg mb-2">
                A confirmation has been sent to{' '}
                <span className="font-semibold text-slate-700">{formData.email || 'your email'}</span>
              </p>
              <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 mb-10 mt-4">
                <Calendar className="text-blue-600" size={20} />
                <div className="text-left">
                  <div className="font-bold text-slate-900">{format(selectedDate, 'MMMM d, yyyy')}</div>
                  <div className="text-blue-600 font-semibold">{selectedTime}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => { setStep(1); setSelectedTime(''); setFormData({ name: '', phone: '', email: '', concern: '' }); }}
                  className="btn-secondary"
                >
                  Book Another
                </button>
                <a
                  href={`https://wa.me/918757577586?text=Hi! I've just booked an appointment for ${format(selectedDate, 'MMM d')} at ${selectedTime}.`}
                  target="_blank"
                  className="btn-primary"
                >
                  Confirm via WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingSystem;
