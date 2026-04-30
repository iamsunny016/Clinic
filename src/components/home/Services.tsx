import { HeartPulse, Stethoscope, Microscope, Syringe, Activity, Brain, ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: "General Checkup",
    description: "Comprehensive head-to-toe health evaluation to detect potential issues early and keep you in peak condition.",
    icon: Stethoscope,
    color: "bg-blue-500",
    bg: "bg-blue-50",
    text: "text-blue-600",
    light: "bg-blue-100",
  },
  {
    title: "Cardiology",
    description: "Expert heart care with advanced ECG diagnostics, stress tests, echo, and personalized cardiac treatment plans.",
    icon: HeartPulse,
    color: "bg-rose-500",
    bg: "bg-rose-50",
    text: "text-rose-600",
    light: "bg-rose-100",
  },
  {
    title: "Lab Diagnostics",
    description: "State-of-the-art laboratory with same-day results for blood tests, urine analysis, and full panels.",
    icon: Microscope,
    color: "bg-purple-500",
    bg: "bg-purple-50",
    text: "text-purple-600",
    light: "bg-purple-100",
  },
  {
    title: "Vaccination",
    description: "Complete immunization services for all ages — from childhood vaccines to travel and flu shots.",
    icon: Syringe,
    color: "bg-emerald-500",
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    light: "bg-emerald-100",
  },
  {
    title: "Physiotherapy",
    description: "Specialized rehabilitation programs to restore movement, manage pain, and enhance physical function.",
    icon: Activity,
    color: "bg-orange-500",
    bg: "bg-orange-50",
    text: "text-orange-600",
    light: "bg-orange-100",
  },
  {
    title: "Neurology",
    description: "Comprehensive care for brain, spine, and nervous system conditions using cutting-edge diagnostics.",
    icon: Brain,
    color: "bg-cyan-500",
    bg: "bg-cyan-50",
    text: "text-cyan-600",
    light: "bg-cyan-100",
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag mb-4">What We Offer</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-4 mb-6">
            Comprehensive{' '}
            <span className="gradient-text">Medical Services</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            We offer a wide range of specialized medical services, combining the latest technology with evidence-based care.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="premium-card p-8 group cursor-pointer"
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${service.light} ${service.text} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={26} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{service.description}</p>

              {/* Link */}
              <div className={`flex items-center gap-1.5 ${service.text} font-semibold text-sm group-hover:gap-2.5 transition-all`}>
                Learn More
                <ArrowUpRight size={15} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 gradient-bg rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-2">Not sure which service you need?</h3>
            <p className="text-blue-100 text-sm max-w-md">Our friendly staff can guide you to the right specialist. Book a general consultation and we'll take care of the rest.</p>
          </div>
          <a
            href="#booking"
            className="shrink-0 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            Get Consultation
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
