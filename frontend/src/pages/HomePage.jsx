import React from "react";
import ServiceSection from "../components/Home/ServiceSection";
import HowItWorks from "../components/Home/HowItWorks";
import HeroSection from "../components/Home/HeroSection";
import ProviderSection from "../components/Home/ProviderSection";
import TestimonialSection from "../components/Home/TestimonialSection";

function HomePage() {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 flex flex-col gap-8 sm:gap-10 overflow-x-hidden">
      <HeroSection />
      <ServiceSection />
      <HowItWorks />
      <ProviderSection />
      <TestimonialSection />
    </div>
  );
}

export default HomePage;
