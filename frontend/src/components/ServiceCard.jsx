import React from "react";
import PrimaryBtn from "./PrimaryBtn";

export default function ServiceCard({
  title,
  image,
  rating,
  location,
  price,
  tag,
}) {
  return (
    <div className="group w-72 shrink-0 snap-start bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden">
      
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {tag && (
          <span className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur px-3 py-1 text-xs text-white rounded-full">
            {tag}
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>

          <span className="flex items-center gap-1 text-sm font-medium text-yellow-500">
            ⭐ <span className="text-gray-700">{rating}</span>
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Professional service by verified experts near you.
        </p>

  
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-600">📍 {location}</span>
          <span className="text-blue-600 font-semibold">{price}</span>
        </div>

        <PrimaryBtn btn="Book Now" className="w-full mt-3" />
      </div>
    </div>
  );
}
