"use client"
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeatureSection';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';
import DemoCTA from '@/components/landing/DemoCta';
import HowItWorks from '@/components/landing/HowItWorks';

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero/>
        <FeaturesSection />
        <HowItWorks/>
        <Testimonials />
        <DemoCTA/>
      </main>
      <Footer />
    </div>
  );
}