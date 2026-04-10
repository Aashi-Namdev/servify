
import React from "react";
import WorkingCard from "./WorkingCard";
import { Search, User, Calendar, Star } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <Search size={24} />,
      title: "Search Service",
      description: "Find the service you need near you quickly and easily.",
    },
    {
      icon: <Calendar size={24} />,
      title: "Schedule Appointment",
      description: "Select a convenient date and time.",
    },
    {
      icon: <User size={24} />,
      title: "Get it Done",
      description: "Sit back while professionals complete your service.",
    },
    {
      icon: <Star size={24} />,
      title: "Review & Feedback",
      description: "Share your experience and help others decide.",
    },
  ];

  return (
    <div className="px-4 md:px-10 py-5">
      
 
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          How It Works
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Simple steps to book your service
        </p>
      </div>

  
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {steps.map((step, index) => (
          <WorkingCard
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
            step={index + 1}
          />
        ))}

      </div>
    </div>
  );
}

export default HowItWorks;