import React from "react";
import { FiMapPin } from "react-icons/fi";
import { useState } from "react";
import AddressCard from "./AddressCard";
import { HiOutlineXMark } from "react-icons/hi2";

function getSavedAddress() {
  try {
    return JSON.parse(localStorage.getItem("userAddress")) || {};
  } catch {
    return {};
  }
}

function BookingCard({ service = {}, setOpenBooking }) {
  const { providerName, service: serviceName, title, distance, location } =
    service;

  const [addressOpen, setAddressOpen] = useState(false);
  const savedAddress = getSavedAddress();
  const addressText = [
    savedAddress.flat,
    savedAddress.street,
    savedAddress.city,
    savedAddress.state,
    savedAddress.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white relative rounded-lg p-6 w-full max-w-md mx-4">
          <div
            onClick={() => setOpenBooking(false)}
            className=" absolute -top-10  right-0 bg-white flex items-center justify-center  rounded-full h-8 w-8 cursor-pointer "
          >
            <HiOutlineXMark className="" size={20} />
          </div>
          <div className="">
            <h1 className=" text-2xl font-bold mb-1">
              {serviceName || title}
            </h1>

            <h2 className="mb-5 flex items-center text-base  font-semibold">
              <span className="font-semibold text-blue-600">
                {providerName}
              </span>

              <span className="px-2 text-gray-700">|</span>

              <FiMapPin className="mr-1 text-gray-700" size={16} />

              <span className="text-sm font-normal text-gray-700">
                {location}

                {distance ? ` • ${distance.toFixed(0)} km away` : ""}
              </span>
            </h2>
          </div>

          <div>
            <h1 className="text-base font-semibold mb-2">
              Where do you need the service?
            </h1>
            <h2 className="text-[13px] border px-3 py-1 rounded-lg text-gray-700 border-gray-500">
              {addressText || "No saved address yet"}
            </h2>

            <div>
              <button
                type="button"
                onClick={() => setAddressOpen(true)}
                className="ml-2 cursor-pointer bg-transparent p-0 text-[13px] font-semibold text-blue-600 hover:underline"
              >
                Change Address
              </button>
              {addressOpen && (
                <AddressCard
                  addressOpen={addressOpen}
                  setAddressOpen={setAddressOpen}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
