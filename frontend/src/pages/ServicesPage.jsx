import React, { use } from "react";
import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import ServiceCard from "../components/ServiceCard";
import providers from "../data/providers";
import services from "../data/services";
import { useRef } from "react";
import Loading from "../components/Loading";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

function ServicesPage() {
  // const [heroHidden, setHeroHidden] = useState(false);
  // const scrollRef = useRef(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (scrollRef.current) {
  //       const scrollTop = scrollRef.current?.scrollTop||0;
  //       if (scrollTop > 40) {
  //         setHeroHidden(true);
  //       } else {
  //         setHeroHidden(false);
  //       }
  //     }
  //   };

  //     scrollRef.current?.addEventListener("scroll", handleScroll);

  //   return () => {
  //       scrollRef.current?.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const categories = [...new Set(services.map((service) => service.category))];

  const {search} = useLocation();
  const queryParams = new URLSearchParams(search);
  const selectedCategory = queryParams.get("category");
  const selectedService = queryParams.get("service");
  const servicesInCategory = selectedCategory ? services.filter((service)=> service.category==selectedCategory ) : services;
  console.log(servicesInCategory);

  const filteredServices = selectedService ? servicesInCategory.filter((service)=> service.name==selectedService) : servicesInCategory;
  console.log(filteredServices);

  const serviceNameById = Object.fromEntries(
    services.map((service) => [service.id, service.name]),
  );

  const providersInCategory = selectedCategory
    ? providers.filter((provider) => {
        const service = filteredServices.find((s) => s.id === provider.serviceId);
        return service?.category === selectedCategory;
      })
    : providers;

    console.log(providersInCategory);

  const providersWithServiceName = providersInCategory.map((provider) => ({
    ...provider,
    service: serviceNameById[provider.serviceId] ?? provider.serviceId,
  }));

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
        <nav className="min-w-[25vw] bg-white py-10 px-2">
          <h2 className=" text-lg font-semibold px-4 py-2">Categories</h2>
          <ul className="space-y-0">
            {categories.map((category) => (
              <Link
                to={`/services?category=${encodeURIComponent(category)}`} //spaces are problematic in urls, so we encode them
                key={category}
                className="flex items-center px-4"
              >
                <input
                  type="checkbox"
                  id={category}
                  className="h-4 w-4 shrink-0 cursor-pointer rounded border border-gray-300 transition-colors focus:outline-none "
                />
                <label
                  htmlFor={category}
                  className="block px-4 py-2 rounded-md cursor-pointer text-sm hover:text-[#1E4ED8]"
                >
                  {category}
                </label>
              </Link>
            ))}
          </ul>
          <h2 className=" text-lg font-semibold px-4 py-2">Services</h2>
          <ul className="space-y-0">
            {servicesInCategory.map((service) => {
              return (
                <Link
                  to={`/services?category=${encodeURIComponent(service.category)}&service=${encodeURIComponent(service.name)}`} //spaces are problematic in urls, so we encode them
                  key={service.name}
                  className="flex items-center px-4"
                >
                <input
                  type="checkbox"
                  id={service.name}
                  className="h-4 w-4 shrink-0 cursor-pointer rounded border border-gray-300 transition-colors focus:outline-none "
                />
                <label
                  htmlFor={service.name}
                  className="block px-4 py-2 rounded-md cursor-pointer text-sm hover:text-[#1E4ED8]"
                >
                  {service.name}
                </label>
              </Link>
)})}
          </ul>
        </nav>
        <div
          // ref={scrollRef}
          className="flex-1 px-10 py-8  bg-gray-50  scrollbar-hide"
        >
          <div className="mb-4 ml-4 mt-6">
            <h1 className="text-2xl font-semibold ">Results</h1>
            <p className=" text-sm text-gray-600">
              Check out our available services{" "}
            </p>
          </div>
          {providersWithServiceName.length === 0 ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-3  gap-4 my-3 ">
              {providersWithServiceName
                .filter((provider) => provider.status === "approved")
                .map((provider) => (
                  <ServiceCard key={provider.id} service={provider} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
