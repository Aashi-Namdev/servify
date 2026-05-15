import React, { useState } from "react";
import PageHero from "../components/PageHero";
import ServiceCard from "../components/ServiceCard";
import providers from "../data/providers";
import services from "../data/services";
import Loading from "../components/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoChevronBack, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import PrimaryBtn from "../components/PrimaryBtn";
import { MdOutlineStarPurple500 } from "react-icons/md";

function ServicesPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [isServiceExpanded, setIsServiceExpanded] = useState(false);

  const categories = [...new Set(services.map((service) => service.category))];

  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const selectedCategory = queryParams.get("category");
  const selectedServices = queryParams.getAll("service");
  const selectedPrice = queryParams.get("price");
  const selectedRating = queryParams.get("rating");
  const instantBookingEnabled = queryParams.get("instantBooking") === "true"; //because it returns string and we want boolean
  const availableTodayEnabled = queryParams.get("availableToday") === "true";

  const maxPrice = providers.reduce(
    (acc, cv) => (acc > cv.price ? acc : cv.price),
    0,
  );
  const minPrice = providers.reduce((acc, cv) =>
    acc < cv.price ? acc : cv.price,
  );

  const servicesInCategory = selectedCategory
    ? services.filter((service) => service.category === selectedCategory)
    : services;

  const filteredServices =
    selectedServices.length > 0
      ? servicesInCategory.filter((service) =>
          selectedServices.includes(service.name),
        )
      : servicesInCategory;

  const serviceNameById = Object.fromEntries(
    services.map((service) => [service.id, service.name]),
  );

  const providersInCategory =
    selectedServices.length > 0
      ? providers.filter((provider) => {
          const service = filteredServices.find(
            (s) => s.id === provider.serviceId,
          );
          return selectedServices.includes(service?.name);
        })
      : selectedCategory
        ? providers.filter((provider) => {
            const service = servicesInCategory.find(
              (s) => s.id === provider.serviceId,
            );
            return service?.category === selectedCategory;
          })
        : providers;

  const providersWithServiceName = providersInCategory.map((provider) => ({
    ...provider,
    service: serviceNameById[provider.serviceId] ?? provider.serviceId,
  }));

  const finalProviders = providersWithServiceName.filter((provider) => {
    if (instantBookingEnabled && provider.instantBooking !== true) {
      return false;
    }
    if (availableTodayEnabled && provider.availableToday !== true) {
      return false;
    }
    if (selectedPrice && provider.price > parseInt(selectedPrice)) {
      return false;
    }
    if (selectedRating && provider.rating < parseFloat(selectedRating)) {
      return false;
    }
    return true;
  });

  return (
    <div>
      {
        <PageHero
          img="https://plus.unsplash.com/premium_photo-1661963478928-2d2d3e9b1e25?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          title="Our Services"
          subtitle="Services"
          position="100%"
        />
      }
      <div className="min-h-screen flex">
        {/* sidebar */}
        <nav className="w-[25vw] bg-white py-10 px-2 border-r border-gray-100">
          <div className="flex flex-col px-4 py-2 border-b border-gray-100">
            <h2 className="text-sm font-bold mb-2 uppercase text-gray-800">
              Location
            </h2>
          </div>
          <div className="flex flex-col px-4 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold mb-2 uppercase text-gray-800">
              Price
            </h2>
            <h2 className="text-[13px] font-medium py-1.5">
              ₹{minPrice}-₹{selectedPrice ? selectedPrice : maxPrice}
            </h2>
            <input
              type="range"
              className="cursor-pointer appearance-none range py-1"
              max={maxPrice}
              min={minPrice}
              value={selectedPrice || maxPrice}
              onChange={(e) => {
                const params = new URLSearchParams(search);
                params.set("price", e.target.value);
                navigate(`/services?${params.toString()}`);
              }}
            />
          </div>
          <div className="flex flex-col px-4 py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold mb-2 uppercase text-gray-800">
              Availability
            </h2>
            <ul className="space-y-2">
              <div
                onClick={() => {
                  const params = new URLSearchParams(search);

                  if (instantBookingEnabled) {
                    params.delete("instantBooking");
                  } else {
                    params.set("instantBooking", "true");
                  }

                  navigate(`/services?${params.toString()}`);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={instantBookingEnabled}
                  readOnly
                  id="instant"
                  className="cursor-pointer"
                />
                <label
                  htmlFor="instant"
                  className="text-[13px] cursor-pointer font-medium text-gray-700 hover:text-[#1E4ED8] "
                >
                  <span>Instant Booking</span>
                </label>
              </div>

              <div
                onClick={() => {
                  const params = new URLSearchParams(search);

                  if (availableTodayEnabled) {
                    params.delete("availableToday");
                  } else {
                    params.set("availableToday", "true");
                  }

                  navigate(`/services?${params.toString()}`);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="available"
                  className="cursor-pointer"
                  checked={availableTodayEnabled}
                  readOnly
                />
                <label
                  htmlFor="available"
                  className="text-[13px] cursor-pointer font-medium text-gray-700 hover:text-[#1E4ED8] "
                >
                  <span>Available Today</span>
                </label>
              </div>
            </ul>
          </div>
          <div className="flex flex-col px-4 py-4">
            <h2 className="text-sm font-bold mb-2 uppercase text-gray-800">
              Ratings
            </h2>
            <ul className="space-y-2">
              <div
                onClick={() => {
                  const parse = new URLSearchParams(search);
                  if (selectedRating === "4.5") {
                    parse.delete("rating");
                  } else {
                    parse.set("rating", "4.5");
                  }
                  navigate(`/services?${parse.toString()}`);
                }}
                className="flex items-center gap-2 "
              >
                <input
                  type="checkbox"
                  id="4.5&above"
                  className="cursor-pointer"
                  checked={selectedRating === "4.5"}
                  readOnly
                />
                <label
                  htmlFor="4.5&above"
                  className="text-[13px]  cursor-pointer font-medium text-gray-700 hover:text-[#1E4ED8] flex items-center gap-1"
                >
                  4.5{" "}
                  <span>
                    <MdOutlineStarPurple500 />
                  </span>{" "}
                  & above
                </label>
              </div>
              <div
                onClick={() => {
                  const parse = new URLSearchParams(search);
                  if (selectedRating === "4") {
                    parse.delete("rating");
                  } else {
                    parse.set("rating", "4");
                  }
                  navigate(`/services?${parse.toString()}`);
                }}
                className="flex items-center gap-2 "
              >
                <input
                  type="checkbox"
                  id="4&above"
                  className="cursor-pointer"
                  checked={selectedRating === "4"}
                  readOnly
                />
                <label
                  htmlFor="4&above"
                  className="text-[13px]  cursor-pointer font-medium text-gray-700 hover:text-[#1E4ED8] flex items-center gap-1"
                >
                  4{" "}
                  <span>
                    <MdOutlineStarPurple500 />
                  </span>{" "}
                  & above
                </label>
              </div>
            </ul>
          </div>

          <div
            className="flex items-center justify-between px-4 py-3 border-t border-gray-100 cursor-pointer"
            onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
          >
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Categories
            </h2>
            <div className="flex items-center gap-2">
              {selectedCategory && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const params = new URLSearchParams(search);
                    params.delete("category");
                    params.delete("service");
                    navigate(`/services?${params.toString()}`);
                  }}
                  className="text-[13px] font-medium text-[#1E4ED8] hover:underline flex items-center gap-1"
                >
                  <span>Clear</span>
                </button>
              )}
              {isCategoryExpanded ? (
                <IoChevronUp className="text-gray-500" />
              ) : (
                <IoChevronDown className="text-gray-500" />
              )}
            </div>
          </div>
          {isCategoryExpanded && (
            <div className="flex flex-wrap gap-2 mx-4 mb-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category;

                return (
                  <button
                    key={category}
                    onClick={() => {
                      const params = new URLSearchParams(search);
                      params.set("category", category);
                      params.delete("service");
                      navigate(`/services?${params.toString()}`);
                    }}
                    className={`
                      px-2 py-1 rounded-lg border text-[13px] transition-all duration-200 w-fit
                      ${
                        isSelected
                          ? "border-2 border-[#1E4ED8] text-[#1E4ED8] font-semibold"
                          : "bg-white text-gray-700 border-gray-300 hover:border-[#1E4ED8] hover:text-[#1E4ED8]"
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          )}

          <div
            className="flex items-center justify-between px-4 py-3 border-t border-gray-100 cursor-pointer"
            onClick={() => setIsServiceExpanded(!isServiceExpanded)}
          >
            <h2 className="text-sm font-bold uppercase text-gray-800">
              Services
            </h2>
            <div className="flex items-center gap-2">
              {selectedServices.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const params = new URLSearchParams(search);
                    params.delete("service");
                    navigate(`/services?${params.toString()}`);
                  }}
                  className="text-[13px] font-medium text-[#1E4ED8] hover:underline flex items-center gap-1"
                >
                  <span>Clear</span>
                </button>
              )}
              {isServiceExpanded ? (
                <IoChevronUp className="text-gray-500" />
              ) : (
                <IoChevronDown className="text-gray-500" />
              )}
            </div>
          </div>
          {isServiceExpanded && (
            <ul className="text-gray-700 mb-4 max-h-[300px] overflow-y-auto">
              {servicesInCategory.map((service) => {
                const isSelected = selectedServices.includes(service.name);

                const updatedSelectedServices = isSelected
                  ? selectedServices.filter((s) => s !== service.name)
                  : [...selectedServices, service.name];

                return (
                  <div
                    key={service.id}
                    onClick={() => {
                      const params = new URLSearchParams(search);
                      params.delete("service");
                      if (selectedCategory) {
                        params.set("category", selectedCategory);
                      }
                      updatedSelectedServices.forEach((s) =>
                        params.append("service", s),
                      );
                      navigate(`/services?${params.toString()}`);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] transition-all duration-200 cursor-pointer`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className=" text-[13px] cursor-pointer border-gray-300"
                    />
                    <label
                      htmlFor={`service-${service.id}`}
                      className="cursor-pointer leading-tight text-[13px] hover:text-[#1E4ED8]"
                    >
                      {" "}
                      {service.name}{" "}
                    </label>
                  </div>
                );
              })}
            </ul>
          )}
        </nav>

        {/* main content */}
        <div className="flex-1  py-8 px-10  bg-gray-50  scrollbar-hide">
          <div className="mb-4 ">
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div className="max-w-lg mb-5 text-gray-700 py-3   relative">
                <input
                  {...register("service", {
                    required: "Please enter a service",
                  })}
                  type="text"
                  spellCheck="false"
                  className="w-full border border-gray-300 px-6 backdrop-blur-sm focus:outline-none focus:border-2 focus:border-blue-400 transition hover:border-gray-400 py-2 placeholder:text-sm text:gray-400 text-sm rounded-full"
                  placeholder="Search for services(e.g., plumbing, cleaning)"
                />

                <PrimaryBtn
                  btn={<Search size={18} />}
                  className="absolute right-0 top-2 translate-y-1 px-6 py-2.5 rounded-r-full! "
                />
              </div>
            </form>
            <h1 className="text-2xl font-semibold ">Results</h1>
            <p className=" text-sm text-gray-600">
              Check out our available services{" "}
            </p>
          </div>
          {finalProviders.length === 0 && (
            <span className="text-2xl font-medium text-red-700">
              No services found
            </span>
          )}
          <div className="grid grid-cols-3  gap-8 my-3 ">
            {finalProviders
              .filter((provider) => provider.status === "approved")
              .map((provider) => (
                <ServiceCard key={provider.id} service={provider} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
