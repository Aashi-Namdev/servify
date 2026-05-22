import React, { useEffect, useState } from "react";
import BookingCard from "../components/service/BookingCard";
import { Link, useLocation, useParams } from "react-router-dom";
import providers from "../data/providers";
import defaultSlots from "../constants/availableSlots";
import { useLocate } from "../hooks/useLocate";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  FaStar,
  FaBookmark,
  FaRegBookmark,
  FaInfoCircle,
  FaCheckCircle,
  FaUserCheck,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";

import { FiMapPin } from "react-icons/fi";
import { IoIosArrowBack, IoIosTimer } from "react-icons/io";
import { TbUserCheck } from "react-icons/tb";
import { TiBriefcase } from "react-icons/ti";
import { CiCircleCheck } from "react-icons/ci";

import { MdEventAvailable, MdElectricBolt } from "react-icons/md";
import PrimaryBtn from "../components/ui/PrimaryBtn";

function ProviderCard({ provider, onBook }) {
  const expert = provider.provider || {};

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center gap-4">
        <div className="relative">
          {expert.image ? (
            <img
              src={expert.image}
              alt={expert.name}
              className="h-20 w-20 rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-[#1E4ED8]">
              <FaUserCheck className="text-3xl" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">{expert.name}</h2>

            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-sm font-semibold text-amber-600">
              <FaStar className="text-xs" />

              <span>{provider.rating}</span>
            </div>
          </div>

          <p className="mt-1 text-sm font-semibold text-gray-500">
            {provider.providerName}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
              <TiBriefcase />
              {expert.experience} Experience
            </span>

            <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
              <TbUserCheck />
              Verified
            </span>
          </div>
        </div>
      </div>

      <div className="my-4 border-t border-gray-100"></div>

      <p className="text-sm leading-7 text-gray-600">{expert.bio}</p>

      <PrimaryBtn
        btn="Book Now"
        onclick={onBook}
        className="mt-5 w-full py-3.5 text-base"
      />
    </div>
  );
}

function ViewDetails() {
  const { id } = useParams();

  const location = useLocation();

  const baseProvider =
    location.state?.providerWithDistance ||
    providers.find((provider) => provider.id === id);

  const { detect, nearbyProvidersList } = useLocate();

  useEffect(() => {
    detect();
  }, [detect]);

  const p =
    nearbyProvidersList.find((provider) => provider.id === id) || baseProvider;

  const [open, setOpen] = useState(false);

  const [index, setIndex] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);

  const handleBookmarkClick = () => {
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 1500);
  };

  if (!p) {
    return (
      <div className="px-4 py-10 text-center text-gray-600">
        Service provider not found.
      </div>
    );
  }

  const galleryImages = Array.isArray(p.galleryImages) ? p.galleryImages : [];
  const includes = Array.isArray(p.includes) ? p.includes : [];
  const reviews = Array.isArray(p.reviews) ? p.reviews : [];
  const images = [p.coverImage, ...galleryImages].filter(Boolean);

  const slotGroups = [
    { key: "today", label: "Today", isAvailable: p.availableToday },
    { key: "tomorrow", label: "Tomorrow", isAvailable: p.availableTomorrow },
  ].map(({ key, label, isAvailable }) => {
    let slots = p.availableSlots?.[key] || [];
    if (isAvailable && slots.length === 0) {
      slots = defaultSlots;
    }
    return {
      label,
      isAvailable,
      slots,
    };
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-10">
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

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-4 gap-2 sm:gap-1 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-gray-100">
          <div className="group relative col-span-2 row-span-2 h-40 sm:h-64 md:h-[430px] overflow-hidden rounded-l-xl">
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

          <div
            onClick={handleBookmarkClick}
            className="group absolute right-5 top-5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-600/50 bg-gray-800/50 text-gray-200 shadow-md backdrop-blur-sm transition-all duration-200 hover:bg-gray-800/70 hover:text-white"
          >
            <FaRegBookmark className="group-hover:scale-105 " />
            {/* <FaBookmark className="group-hover:scale-105" /> */}

            <span className="pointer-events-none absolute right-0 top-11 z-20 w-max rounded-md border border-gray-600 bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-100 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
              Save for later
            </span>
          </div>

          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="group col-span-2 h-[76px] sm:h-[122px] md:h-[208px] overflow-hidden rounded-r-xl"
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

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images.map((img) => ({
          src: img,
        }))}
        index={index}
      />

      {openBooking && (
        <BookingCard
          key={p.id}
          service={p}
          setOpenBooking={setOpenBooking}
        />
      )}

      {showToast && (
        <div className="absolute right-30 top-50 z-50 flex -translate-x-1/2 animate-bounce items-center gap-2 rounded-lg bg-gray-300 px-4 py-1 text-sm text-gray-500 shadow-lg">
          <FaBookmark className="text-gray-500" />

          <span>Saved</span>
        </div>
      )}

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

          <h1 className="mt-5 text-4xl font-bold tracking-tight">
            ₹{p.price}
            <span className="ml-2 text-lg font-medium text-gray-500">
              / service
            </span>
          </h1>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-6">
              <div className="flex items-center gap-3 rounded-xl py-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500">
                  <FaUserCheck />
                </span>

                <h3 className="text-sm font-semibold text-slate-600">
                  Verified Professionals
                </h3>
              </div>

              <div className="flex items-center gap-3 rounded-xl py-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500">
                  <FaCheckCircle />
                </span>

                <h3 className="text-sm font-semibold text-slate-600">
                  Transparent Pricing
                </h3>
              </div>

              <div className="flex items-center gap-3 rounded-xl py-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500">
                  <FaShieldAlt />
                </span>

                <h3 className="text-sm font-semibold text-slate-600">
                  Secure Booking Experience
                </h3>
              </div>

              <div className="flex items-center gap-3 rounded-xl py-1">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500">
                  <FaHeadset />
                </span>

                <h3 className="text-sm font-semibold text-slate-600">
                  Customer Support Available
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-start gap-3  px-4 py-3 text-[13px] text-gray-700">
            <FaInfoCircle className="mt-0.5 shrink-0 text-yellow-600" />

            <p className="leading-6">
              Final pricing and service duration may vary depending on service
              requirements.
            </p>
          </div>

          <div className="mt-8 block lg:hidden sm:max-w-md sm:mx-auto">
            <ProviderCard provider={p} onBook={() => setOpenBooking(true)} />
          </div>

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

          <div className="py-5">
            <h1 className="text-lg font-bold tracking-wide">
              {reviews.length > 0
                ? `CUSTOMER REVIEWS (${reviews.length})`
                : "CUSTOMER REVIEWS"}
            </h1>
            {reviews.length > 0 ? (
              <div className="mt-4 space-y-4 border-b border-gray-300 pt-4">
                {reviews.map((review, i) => (
                  <div key={i} className="p-4">
                    <div className="flex items-center gap-3 ">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                        {review.user[0]}
                      </span>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">
                          {review.user}
                        </h3>

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar
                              key={index}
                              className={`w-4 h-4 ${
                                index < review.rating
                                  ? "text-amber-500 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-gray-700">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm font-medium text-gray-500">
                No reviews yet.Book and be the first to share your experience!
              </p>
            )}
          </div>
        </div>

        <aside className="hidden w-full lg:sticky lg:top-24 lg:block lg:w-[380px] lg:self-start">
          <ProviderCard provider={p} onBook={() => setOpenBooking(true)} />
        </aside>
      </div>
    </div>
  );
}

export default ViewDetails;
