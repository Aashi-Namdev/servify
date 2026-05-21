import React, { useRef, useState, useEffect } from "react";
import TestimonialCard from "../ui/TestimonialCard";
import testimonials from "../../data/testimonial";

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
    const id = requestAnimationFrame(handleScroll);
    return () => cancelAnimationFrame(id);
  }, []);


  return (
    <div id="testimonials" className="w-full overflow-hidden mb-10">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-1 mt-8 sm:mt-10">
        What Our Users Say!
      </h1>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-5 sm:gap-10 overflow-x-auto px-4 sm:px-6 md:px-10 py-8 sm:py-10 snap-x snap-mandatory scroll-smooth scrollbar-hide items-center"
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
