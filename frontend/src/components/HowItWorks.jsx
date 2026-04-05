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
      description: "Select a date and time.",
    },
    {
      icon: <User size={24} />,
      title: "Get it Done",
      description: " Ensure your service is completed to your satisfaction.",
    },
    {
      icon: <Star size={24} />,
      title: "Review & Feedback",
      description:
        "Share your experience and help others make informed decisions.",
    },
  ];

  return (
    <div className="px-10 mb-10  ">
      <h2 className="text-2xl font-bold text-black mb-2 ">How It Works</h2>
      <p className="text-sm text-gray-600 mb-10">
        Simple steps to book your service{" "}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <WorkingCard
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
