import Image from 'next/image';
import { Award, GraduationCap, CheckCircle2, Star, Stethoscope } from 'lucide-react';

const credentials = [
  "Fellow of the American College of Cardiology",
  "Board Certified in Internal Medicine",
  "Published in 40+ Medical Journals",
  "Best Cardiologist Award 2023",
];

const specialties = ["Cardiology", "Internal Medicine", "Preventive Care", "Geriatrics"];

const DoctorProfile = () => {
  return (
    <section id="about" className="section-padding bg-slate-50 overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag mb-4">Our Expert</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mt-4">
            Meet Your{' '}
            <span className="gradient-text">Specialist</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left – Image */}
          <div className="relative mx-auto w-full max-w-md">
            {/* Decorative ring */}
            <div className="absolute inset-[-16px] rounded-[50px] border-2 border-dashed border-blue-200 opacity-60" />

            {/* Blue background blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[44px] translate-x-4 translate-y-4 opacity-20 blur-sm" />

            {/* Photo */}
            <div className="relative rounded-[44px] overflow-hidden aspect-square sm:aspect-[3/4] shadow-2xl shadow-blue-100">
              <Image
                src="/doctor-hero.png"
                alt="Dr. Ananya Sharma – Senior Cardiologist"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center gap-4 whitespace-nowrap">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm leading-tight opacity-90">Years of<br/>Excellence</div>
            </div>

            {/* Review badge */}
            <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
              <div className="font-bold text-slate-900 text-sm">Top Rated</div>
              <div className="text-xs text-slate-500">by 10,000+ patients</div>
            </div>
          </div>

          {/* Right – Content */}
          <div className="mt-8 lg:mt-0">
            {/* Name & title */}
            <div className="mb-6">
              <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm mb-2">MBBS, MD, DM (Cardiology)</p>
              <h3 className="text-4xl font-display font-bold text-slate-900 mb-2">Dr. Ananya Sharma</h3>
              <p className="text-slate-500 text-lg flex items-center gap-2">
                <Stethoscope size={18} className="text-blue-500" />
                Senior Cardiologist & Internal Medicine Specialist
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-600 leading-relaxed mb-8 text-base">
              With over 15 years of experience in cardiology and internal medicine, Dr. Ananya Sharma has been at the forefront of cardiac care in North India, having treated over 10,000 patients with exceptional outcomes. She combines the latest medical advancements with a deeply personal, patient-first approach.
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 mb-8">
              {specialties.map((s) => (
                <span key={s} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg border border-blue-100">
                  {s}
                </span>
              ))}
            </div>

            {/* Credentials */}
            <div className="space-y-3 mb-10">
              {credentials.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={13} className="text-green-600" />
                  </div>
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <GraduationCap size={22} className="text-blue-500 mb-2" />
                <div className="font-bold text-slate-900 text-sm">AIIMS, New Delhi</div>
                <div className="text-xs text-slate-500 mt-0.5">DM in Cardiology</div>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <Award size={22} className="text-amber-500 mb-2" />
                <div className="font-bold text-slate-900 text-sm">Best Cardiologist 2023</div>
                <div className="text-xs text-slate-500 mt-0.5">Indian Medical Association</div>
              </div>
            </div>

            <a href="#booking" className="btn-primary">
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
