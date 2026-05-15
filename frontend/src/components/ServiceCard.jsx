
import React from "react";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { MdElectricBolt } from "react-icons/md";

export default function ServiceCard({ service }) {
  const { providerName, service: serviceName, rating, location, price, image,instantBooking } = service;

    const handleBookNow = () => { 
      const id =Math.floor(Math.random()*10+1);
      console.log(id);
    }

  return (
    <div className="group h-full w-full  bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
      <div className="relative ">
        <div className="absolute inset-0 bg-gradient-to-top from-black/20 to-transparent" />
        {image && (
          <img
            loading="lazy"
            src={image}
            alt={providerName}
            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

      {instantBooking && (
        <span
          className="
            absolute top-4 right-4
            inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-amber-900/20 ring-1 ring-white/15  transition-all duration-200 "
        >
          <MdElectricBolt className="text-[11px]" />
          Instant Booking
        </span>
      )}
      </div>

      <div className="p-4 space-y-1">
        {/* Provider Name + Rating */}
        <div className="flex justify-between items-center">
          <h3 className="text-medium font-semibold text-gray-800">
            {providerName}
          </h3>

          <span className="flex items-center gap-1 text-sm font-medium text-yellow-500">
            ⭐ <span className="text-gray-700">{rating}</span>
          </span>
        </div>

        {/* Service Name */}
        <p className="text-[13px] text-blue-600 font-medium mb-5">{serviceName}</p>

        {/* Location + Price */}
        <div className="flex justify-between items-center text-[13px] mt-2">
          <span className="text-gray-600"><MapPin className="inline-block  w-4 h-4  " /> {location} <span className="text-gray-500 px-2">•</span> </span>
          <span className="text-blue-600 font-semibold">₹{price}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 items-center mt-2">
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
