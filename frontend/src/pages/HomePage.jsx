import React from 'react'
import ServiceSection from '../components/ServiceSection'
import HowItWorks from '../components/HowItWorks'
import HeroSection from '../components/HeroSection'
import ProviderSection from '../components/ProviderSection'
import TestimonialSection from '../components/TestimonialSection'

function HomePage() {
  return (
    <div className='bg-gradient-to-b from-white to-blue-50 flex flex-col gap-10'>
        <HeroSection/>
        <ServiceSection/>
        <HowItWorks/>
        <ProviderSection/>
        <TestimonialSection/>
    </div>
  )
}

export default HomePage