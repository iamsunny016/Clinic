'use client';

import { useState, useEffect } from 'react';
import { Clock, MapPin, Navigation, Phone, Globe, CheckCircle2 } from 'lucide-react';

const schedule = [
  { day: 'Monday', hours: '9:00 AM – 8:00 PM', opensHour: 9, closesHour: 20 },
  { day: 'Tuesday', hours: '9:00 AM – 8:00 PM', opensHour: 9, closesHour: 20 },
  { day: 'Wednesday', hours: '9:00 AM – 8:00 PM', opensHour: 9, closesHour: 20 },
  { day: 'Thursday', hours: '9:00 AM – 8:00 PM', opensHour: 9, closesHour: 20 },
  { day: 'Friday', hours: '9:00 AM – 8:00 PM', opensHour: 9, closesHour: 20 },
  { day: 'Saturday', hours: '10:00 AM – 5:00 PM', opensHour: 10, closesHour: 17 },
  { day: 'Sunday', hours: 'Closed', opensHour: -1, closesHour: -1, closed: true },
];

const ClinicInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [closingTime, setClosingTime] = useState('');
  const [today, setToday] = useState('');

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
      setToday(dayName);
      const daySchedule = schedule.find((s) => s.day === dayName);
      if (!daySchedule || daySchedule.closed || daySchedule.opensHour < 0) {
        setIsOpen(false);
        return;
      }
      const h = now.getHours() + now.getMinutes() / 60;
      const open = h >= daySchedule.opensHour && h < daySchedule.closesHour;
      setIsOpen(open);
      setClosingTime(daySchedule.closesHour === 20 ? '8:00 PM' : '5:00 PM');
    };
    check();
    const t = setInterval(check, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="contact" className="section-padding bg-slate-50">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag mb-4">Find Us</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-4 mb-6">
            Visit Our{' '}
            <span className="gradient-text">Clinic</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Conveniently located in the heart of the city. We're easy to reach by car or public transport.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left – Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            {/* Open Status */}
            <div className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${isOpen ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${isOpen ? 'bg-green-500' : 'bg-red-400'}`}>
                <div className={`absolute inset-0 rounded-xl animate-ping opacity-30 ${isOpen ? 'bg-green-400' : 'bg-red-300'}`} />
                <Clock size={20} className="text-white relative z-10" />
              </div>
              <div>
                <div className={`font-bold text-lg ${isOpen ? 'text-green-800' : 'text-red-800'}`}>
                  {isOpen ? 'Open Now' : 'Currently Closed'}
                </div>
                <div className="text-sm text-slate-500">
                  {isOpen ? `Closes today at ${closingTime}` : 'Check schedule below for hours'}
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 flex items-center gap-2">
                <Clock size={18} className="text-blue-500" />
                <h3 className="font-bold text-slate-900">Weekly Schedule</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {schedule.map((s) => {
                  const isToday = s.day === today;
                  return (
                    <div
                      key={s.day}
                      className={`flex items-center justify-between px-6 py-3.5 ${isToday ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex items-center gap-2">
                        {isToday && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                        <span className={`text-sm font-medium ${isToday ? 'text-blue-700 font-bold' : 'text-slate-600'}`}>
                          {s.day}
                        </span>
                      </div>
                      <span className={`text-sm font-semibold ${s.closed ? 'text-red-400' : isToday ? 'text-blue-700' : 'text-slate-800'}`}>
                        {s.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <MapPin size={18} />
                </div>
                <div className="font-bold text-slate-900 text-sm mb-1">Address</div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Medical Plaza, Sector 15, Gurgaon, Haryana, PIN 122001
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <Phone size={18} />
                </div>
                <div className="font-bold text-slate-900 text-sm mb-1">Call Us</div>
                <a href="tel:+918757577586" className="text-blue-600 text-xs font-semibold block mb-0.5 hover:underline">
                  +91 87575 77586
                </a>
                <a href="tel:+918757577586" className="text-blue-600 text-xs font-semibold hover:underline">
                  +91 87575 77586
                </a>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Free Parking Available',
                  'Wheelchair Accessible',
                  'Online Appointment',
                  'Home Visit on Request',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-slate-600 text-sm">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right – Map */}
          <div className="lg:col-span-7">
            <div className="relative h-full min-h-[500px] rounded-3xl overflow-hidden border border-slate-100 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.118933936688!2d77.2066124!3d28.6262423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5d34a4130f%3A0x868e7b95c6c0e48!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1714500000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="min-h-[500px]"
              />
              {/* Map Overlay CTA */}
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Premium Clinic</div>
                    <div className="text-slate-500 text-xs">Medical Plaza, Sector 15, Gurgaon</div>
                  </div>
                </div>
                <a
                  href="https://maps.app.goo.gl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2.5 px-5 text-sm w-full sm:w-auto"
                >
                  Directions
                  <Navigation size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicInfo;
