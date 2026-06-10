import { useEffect, useState } from "react";
import { FaCheckCircle, FaInfoCircle, FaStar } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import BookingCard from "../components/service/BookingCard";
import defaultSlots from "../constants/availableSlots";
import providers from "../data/providers";
import { useLocate } from "../hooks/useLocate";

import { CiCircleCheck } from "react-icons/ci";
import { FiMapPin } from "react-icons/fi";
import { IoIosArrowBack, IoIosTimer } from "react-icons/io";
import { MdElectricBolt, MdEventAvailable } from "react-icons/md";
import ProviderCard from "../components/service/providerCard";
import ReviewSection from "../components/service/reviewSection";
import guarantees from "../constants/guarantees";
import pricingNote from "../constants/pricingNote";
import SaveBtn from "../components/service/SaveBtn";

function ViewDetails() {
  const { id } = useParams();

  const location = useLocation();

  const { detect, nearbyProvidersList } = useLocate();

  useEffect(() => {
    detect();
  }, [detect]);

  const p =
    nearbyProvidersList.find((prov) => prov.id === id && prov.distance) || // provider with distance info from nearby providers list
    location.state?.providerWithDistance || // data from  state
    nearbyProvidersList.find((prov) => prov.id === id) || // provider without distance info from nearby providers list
    providers.find((prov) => prov.id === id); //  fallback

  // state for lightbox
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [openBooking, setOpenBooking] = useState(false);

  // if provider not found display message
  if (!p) {
    return (
      <div className="px-4 py-10 text-center text-gray-600">
        Service provider not found.
      </div>
    );
  }

  const galleryImages = p.galleryImages || [];
  const includes = p.includes || [];
  const reviews = p.reviews || [];
  const images = [p.coverImage, ...galleryImages].filter(Boolean);

  const slotGroups = [
    { key: "today", label: "Today", isAvailable: p.availableToday },
    { key: "tomorrow", label: "Tomorrow", isAvailable: p.availableTomorrow },
  ].map(({ label, isAvailable }) => {
    let slots = defaultSlots || [];
    return {
      label,
      isAvailable,
      slots,
    };
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-10">
      {/* back button */}
      <Link
        className="mb-6 inline-flex items-center gap-1.5 px-4 sm:px-10 md:px-20 text-sm font-bold text-gray-500 hover:text-blue-600"
        to="/services"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        <IoIosArrowBack />

        <span>Go Back</span>
      </Link>
      {/* provider name, title, location and distance */}
      <div className="px-4 sm:px-10 md:px-20">
        <h1 className="pb-2 text-2xl sm:text-3xl font-bold">
          {p.providerName}
        </h1>

        <h2 className="mb-5 flex flex-wrap items-center text-sm sm:text-lg font-semibold">
          <span className="font-semibold text-blue-600">{p.title}</span>

          <span className="px-2 text-gray-700">|</span>

          <FiMapPin className="mr-2 text-gray-700" size={16} />

          <span className="text-[13px] font-normal text-gray-700">
            {p.location}

            {p.distance ? ` • ${p.distance.toFixed(0)} km away` : ""}
          </span>
        </h2>
      </div>
      {/* main content with images, details, booking button and reviews */}
      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-4 gap-2 sm:gap-1 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-100">
          <div className="group relative col-span-2 row-span-2 h-40 sm:h-64 md:h-107.5 overflow-hidden rounded-l-xl">
            <img
              src={images[0]}
              alt={p.title}
              className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
              onClick={() => {
                setOpen(true);
                setIndex(0);
              }}
            />
          </div>

          <div className="absolute bottom-5 left-5 flex items-center gap-3">
            <div className="flex w-fit items-center rounded-full bg-gray-50/60 px-2 py-1 text-[13px] font-medium text-gray-700">
              <span className="mr-1">
                <IoIosTimer />
              </span>
              {p.estimatedDuration}
            </div>
          </div>

          <SaveBtn />

          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="group col-span-2 h-19 sm:h-30.5 md:h-52 overflow-hidden rounded-r-xl"
            >
              <img
                src={img}
                alt={`${p.title} gallery ${i + 1}`}
                loading="lazy"
                className="h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
                onClick={() => {
                  setIndex(i + 1);
                  setOpen(true);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* lightbox for image gallery */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((img) => ({
          src: img,
        }))}
        index={index}
      />

      {openBooking && (
        <BookingCard key={p.id} service={p} setOpenBooking={setOpenBooking} />
      )}

      {/* provider desc, booking info and reviews section */}
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <p className="py-2 text-[15px] uppercase leading-7 tracking-[0.3px] text-gray-700">
            {p.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex w-fit items-center rounded-lg bg-gray-200 px-4 py-2 text-[13px] font-medium">
              {p.rating}

              <FaStar className="ml-2 text-green-600" />

              <span className="mx-2">|</span>

              <span className="text-gray-500">{p.totalReviews}</span>
            </div>

            <div className="flex w-fit items-center rounded-lg bg-gray-200 px-4 py-2 text-[13px] font-medium">
              <span className="mr-2 text-green-600">
                <FaCheckCircle />
              </span>

              {p.bookingsCompleted}

              <span className="ml-2 text-gray-500">Bookings Completed</span>
            </div>
          </div>
          {/* price */}
          <h1 className="mt-5 text-4xl font-bold tracking-tight">
            ₹{p.price}
            <span className="ml-2 text-lg font-medium text-gray-500">
              / service
            </span>
          </h1>
          {/*guarantees */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-6">
              {guarantees.map(({ id, title, Icon }) => (
                <div
                  key={id}
                  className="flex items-center gap-3 rounded-xl py-1"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500">
                    <Icon />
                  </span>

                  <h3 className="text-sm font-semibold text-slate-600">
                    {title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-start gap-3  px-4 py-3 text-[13px] text-gray-700">
            <FaInfoCircle className="mt-0.5 shrink-0 text-yellow-600" />
            {/* price disclaimer */}
            <p className="leading-6">{pricingNote}</p>
          </div>

          <div className="mt-8 block lg:hidden sm:max-w-md sm:mx-auto">
            <ProviderCard provider={p} onBook={() => setOpenBooking(true)} />
          </div>
          {/* what's included and booking availability */}
          <div className="mt-10 border-y border-gray-300 py-5">
            <h1 className="text-lg font-bold tracking-wide">
              ABOUT THIS SERVICE
            </h1>

            <div className="mt-5 grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-base font-semibold text-gray-700">
                  What's Included?
                </h2>

                {includes.map((item, i) => (
                  <div key={i} className="mt-3 flex items-start gap-3">
                    <span className="mt-0.5 text-gray-600">
                      <CiCircleCheck />
                    </span>

                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-700">
                  Booking Availability
                </h2>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between  ">
                    <span className="flex items-center gap-3 text-sm text-gray-700">
                      <MdEventAvailable className="text-base" />
                      Available today?
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        p.availableToday
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {p.availableToday ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between ">
                    <span className="flex items-center gap-3 text-sm text-gray-700">
                      <MdElectricBolt className="text-base" />
                      Instant booking available?
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        p.instantBooking
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {p.instantBooking ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* available slots section */}
          <div className="border-b border-gray-300 py-5">
            <h1 className="text-lg font-bold tracking-wide">AVAILABLE SLOTS</h1>
            <div className="mt-4 space-y-4">
              {slotGroups.map(({ label, slots, isAvailable }) => (
                <div key={label}>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-600">
                    {label}
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {isAvailable ? (
                      slots.map((slot) => (
                        <span
                          key={`${label}-${slot}`}
                          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
                        >
                          {slot}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm font-medium text-red-500">
                        No Slots Available
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* reviews section */}
          <ReviewSection reviews={reviews} />
        </div>
        {/* sticky provider card with booking button for larger screens */}
        <aside className="hidden w-full lg:sticky lg:top-24 lg:block lg:w-95 lg:self-start">
          <ProviderCard provider={p} onBook={() => setOpenBooking(true)} />
        </aside>
      </div>
    </div>
  );
}

export default ViewDetails;
