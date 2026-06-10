import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineXMark } from "react-icons/hi2";
import AddressCard from "./AddressCard";
import { FiCalendar } from "react-icons/fi";
import { useEffect } from "react";

//  get saved address from localStorage
function getSavedAddress() {
  try {
    return JSON.parse(localStorage.getItem("userAddress")) || {};
  } catch {
    return {};
  }
}

// Set date limits
const today = new Date();
const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 6); // Set max date to 6 days from today

function BookingCard({ service, setOpenBooking }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { providerName, title, distance, location } = service;

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
  // Update the "where" field whenever the address changes
  useEffect(() => {
    setValue("where", addressText || "No address added");
  }, [addressText, setValue]);

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
            <h1 className=" text-2xl font-bold mb-1">{title}</h1>

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

          <div className="space-y-5">
            {/* Address Section  */}
            <div className="space-y-2">
              <label
                htmlFor="where"
                className="text-base text-gray-800 font-semibold "
              >
                Where do you need the service?
              </label>
              <div className="relative">
                <input
                  {...register("where", { required: "Address is required" })}
                  id="where"
                  type="text"
                  defaultValue={addressText || "No address added"}
                  readOnly
                  className="text-[13px] border px-3 mt-1 py-2 rounded-lg outline-none w-full text-gray-800 bg-gray-50 border-gray-300"
                />
              </div>
              {errors.where && (
                <p className="text-red-600 text-sm -mt-1">
                  {errors.where.message}
                </p>
              )}

              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setAddressOpen(true)}
                  className="cursor-pointer bg-transparent p-0 text-[13px] font-semibold text-blue-600 hover:underline"
                >
                  {addressText ? "Change Address" : "Add Address"}
                </button>
              </div>

              {addressOpen && (
                <AddressCard
                  addressOpen={addressOpen}
                  setAddressOpen={setAddressOpen}
                />
              )}
            </div>
            {/* Date Picker Section * */}
            <div className="">
              <label
                htmlFor="date"
                className="text-base text-gray-800 font-semibold"
              >
                When do you need the service?
              </label>
              <div className="relative w-full flex items-center mt-1 ">
                <FiCalendar
                  className="absolute z-10  right-3 text-gray-400"
                  size={16}
                />
                <DatePicker
                  {...register("date", { required: "Date is required" })}
                  id="date"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={today}
                  maxDate={maxDate}
                  placeholderText="Select date"
                  wrapperClassName="w-full"
                  className="text-[13px]  border px-3 py-2 rounded-lg outline-none w-full text-gray-800 bg-gray-50 border-gray-300"
                />
              </div>
              {errors.date && (
                <p className="text-red-600 text-sm -mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>
            {/*Slot selection section  */}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
