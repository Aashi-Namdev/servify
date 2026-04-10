import React, { useRef, useState, useEffect } from "react";
import TestimonialCard from "./TestimonialCard";
function TestimonialSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const clientWidth = scrollRef.current.clientWidth;
      const center = scrollLeft + clientWidth / 2;

      const children = Array.from(scrollRef.current.children);
      let minDistance = Infinity;
      let index = 0;

      children.forEach((child, i) => {
        const childCenter =
          child.offsetLeft +
          child.clientWidth / 2 -
          scrollRef.current.offsetLeft;
        const distance = Math.abs(childCenter - center);
        if (distance < minDistance) {
          minDistance = distance;
          index = i;
        }
      });
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "Verified Customer",
      content:
        "The service was amazing! Highly recommended.the technician was professional and efficient.",
      review: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Verified Customer",
      content:
        "The service was great! I will definitely use it again.The cost was reasonable and the quality of work was excellent.",
      review: 4,
    },
    {
      id: 3,
      name: "Alice Johnson",
      role: "Professional Cleaner",
      content:
        "The customer was so satisfied with the service.But the scheduling process was a bit confusing.",
      review: 5,
    },
    {
      id: 4,
      name: "Bob Williams",
      role: "Professional Plumber",
      content:
        "The service was prompt and professional.but the customer support could be improved.",
      review: 4,
    },

  
  ];

  return (
    <div id="testimonials" className="w-full overflow-hidden mb-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-1 mt-10">
        What Our Users Say!
      </h1>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-10 overflow-x-auto px-10 py-10 snap-x snap-mandatory scroll-smooth scrollbar-hide items-center"
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialSection;
