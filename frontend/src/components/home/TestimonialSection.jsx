import testimonials from "../../data/testimonial";
import TestimonialCard from "../ui/TestimonialCard";

function TestimonialSection() {
  return (
    <div
      id="testimonials"
      className="w-full overflow-hidden px-4 sm:px-6 md:px-10 mb-10"
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8 mt-8 sm:mt-10">
        What Our Users Say!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            testimonial={testimonial}
            isActive={true}
          />
        ))}
      </div>
    </div>
  );
}

export default TestimonialSection;
