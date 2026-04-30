import Hero from '@/components/home/Hero';
import DoctorProfile from '@/components/home/DoctorProfile';
import Services from '@/components/home/Services';
import Reviews from '@/components/home/Reviews';
import BookingSystem from '@/components/booking/BookingSystem';
import ClinicInfo from '@/components/home/ClinicInfo';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <DoctorProfile />
      <Services />
      <Reviews />
      <BookingSystem />
      <ClinicInfo />
    </div>
  );
}
