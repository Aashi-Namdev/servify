
import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";


export default function ServiceCard({ service }) {
  const { providerName, service: serviceName, rating, location, price, image, tag, description } = service;

    const handleBookNow = () => { 
      const id =Math.floor(Math.random()*10+1);
      console.log(id);
    }

  return (
    <div className="group h-full w-full bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 overflow-hidden">
      <div className="relative">
        {image && (
          <img
            loading="lazy"
            src={image}
            alt={providerName}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {tag && (
          <span className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur px-3 py-1 text-xs text-white rounded-full">
            {tag}
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        {/* Provider Name + Rating */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {providerName}
          </h3>

          <span className="flex items-center gap-1 text-sm font-medium text-yellow-500">
            ⭐ <span className="text-gray-700">{rating}</span>
          </span>
        </div>

        {/* Service Name */}
        <p className="text-sm text-blue-600 font-medium">{serviceName}</p>

        <p className="text-sm text-gray-500">
          {description}
        </p>

        {/* Location + Price */}
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-gray-600"><MapPin className="inline-block mr-1 w-4 h-4  " /> {location}</span>
          <span className="text-blue-600 font-semibold">₹{price}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          <div className="w-1/2">
          <Link
              to={`/services/${service.id}`}
            >
              <SecondaryBtn
              btn="View"
              className="w-full text-blue-700! active:bg-[#1E4ED8]! border-[#1E4ED8]!  hover:text-white! transition-colors duration-400 hover:bg-[#1E4ED8]! hover:border-[#1E4ED8]!"
            />
          </Link>
          </div>
          <div className="w-1/2">
            <PrimaryBtn btn="Book Now" className="w-full" onclick={()=>handleBookNow()} />
          </div>
        </div>
      </div>
    </div>
  );
}
