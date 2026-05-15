import React from "react";
import bg from "../assets/hero/bg.svg";
import Trust from "./Trust";
import PrimaryBtn from "./PrimaryBtn";
import { Search, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";

function HeroSection() {
  const { register, handleSubmit , formState: { errors } ,reset} = useForm();

  return (
    <div className=" w-full relative mb-20">
      <div className="relative h-[90vh] w-full overflow-hidden">
        <img
          src={bg}
          alt="Hero background"
          loading="lazy"
          className="absolute h-full w-full object-cover inset-0 brightness-75 contrast-110"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30"></div>

        <div className="relative z-10 flex  items-center justify-start h-full px-10">
          <div className="text-white max-w-md">
            <h1 className="text-5xl font-bold">
              Book Trusted Home <span className="text-[#1E4ED8]">Service</span>{" "}
              Experts in Minutes
            </h1>
            <p className="my-5 mb-10">
              From daily chores to urgent repairs, find trusted professionals
              near you. Book in minutes and enjoy reliable, hassle-free service
              at your doorstep.
            </p>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <div className="w-full px-4 py-3 rounded-full  relative">
                <input 
                {...register("service")}
                type="text"
                spellCheck="false"
                className="w-full border border-white/20 px-4 backdrop-blur-sm focus:outline-none transition-all focus:border-2 focus:border-blue-400 hover:border-white/40 py-3 placeholder:text-sm text:gray-400 text-sm rounded-full"
                placeholder="What service do you need today?"
                 />
                  <PrimaryBtn
                  btn={<Search size={26} />}
                  className="absolute right-4 top-3 px-6 py-2.5 rounded-full! rounded-l-none!"/>
                 
              </div>
            </form>
          </div>
        </div>
      </div>

      <Trust />
    </div>
  );
}

export default HeroSection;
