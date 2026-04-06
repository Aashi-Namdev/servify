import React from "react";
import { Star } from "lucide-react";
import { User2,User } from "lucide-react";

function TestimonialCard({ testimonial }) {
  const { name, role, content, review } = testimonial;
  return (
    <div className="bg-[#0F2F66] rounded-lg p-5 w-96 text-gray-300 shadow-lg shrink-0 duration-300 snap-center">
      <div className="text-sm mb-3">{content}</div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-500 mr-3 flex items-center justify-center overflow-hidden">
            <User className=" object-cover text-gray-300 size-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-300">{name}</h3>
            <p className="text-sm text-gray-500">{role} </p>
          </div>
        </div>
        <div className="flex items-center border-gray-300 border rounded-full px-2 py-1">
          <Star className="w-5 h-5 text-amber-400 fill-current" />
          <Star className="w-5 h-5 text-amber-400 fill-current" />
          <Star className="w-5 h-5 text-amber-400 fill-current" />
          <Star className="w-5 h-5 text-amber-400 fill-current" />
          <Star className="w-5 h-5 text-amber-400 fill-current" />
        </div>

      </div>
    </div>
  );
}

export default TestimonialCard;
