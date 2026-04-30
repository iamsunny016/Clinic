'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);
  const phoneNumber = "918757577586";
  const message = "Hello! I'd like to inquire about an appointment at PremiumClinic.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      {/* Label */}
      <div
        className={`bg-white text-slate-800 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-slate-100 transition-all duration-300 ${
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
        }`}
      >
        Chat with us!
      </div>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-25" />
        <div className="relative w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 transition-all duration-300 hover:scale-110 active:scale-95 group">
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.658 1.438 5.162L2 22l4.975-.97C8.384 21.946 10.13 22.5 12 22.5 17.523 22.5 22 18.023 22 12.5S17.523 2 12 2z" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
