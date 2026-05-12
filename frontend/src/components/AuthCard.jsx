import { useState } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/hero/bg.svg";
import { useForm } from "react-hook-form";

function AuthCard({ isFlipped, setIsFlipped }) {
  // const [isFlipped, setIsFlipped] = useState(false);
  const { register, handleSubmit } = useForm();

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute inset-0  h-full w-full overflow-hidden">
        <img
          src={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover blur-sm "
        />
        <div className="absolute inset-0 bg-black/60 "></div>
      </div>

      <div className="w-100 h-[480px]  relative z-10 perspective">
        <div
          className={`relative  w-full h-full duration-500 ease-in-out transform-style ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* LOGIN CARD */}
          <div className="absolute bg-white w-full h-full backface-hidden p-6 rounded-2xl shadow-2xl">
            <Link className="text-2xl font-bold text-left text-blue-600" to="/">
              Servify
            </Link>
            <p className="text-gray-500 text-sm  mb-3 text-left">
              Services in minutes
            </p>
            <h2 className="text-2xl font-semibold mb-4 text-left ">
              Welcome Back!
            </h2>

            <form
              action=""
              onSubmit={handleSubmit((data) => console.log(data))}
            >
              <div>
                <label htmlFor="email" className="text-sm font-semibold ">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="you@gmail.com"
                  className="w-full p-2 mb-3 border rounded mt-2 focus:outline-none  text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-semibold ">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full p-2 mb-2 border rounded mt-2 focus:outline-none   text-sm"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2 h-4 w-4 cursor-pointer rounded border border-gray-300 transition-colors  focus:border-[#1E4ED8] focus:outline-none "
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600 ">
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:underline cursor-pointer float-right"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <button className="w-full bg-blue-500 text-white mt-5 py-2 rounded cursor-pointer hover:bg-blue-600">
                Login
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => setIsFlipped(true)}
              >
                Sign up
              </span>
            </p>
          </div>

          {/* SIGNUP CARD */}
          <div className="absolute   backface-hidden bg-white p-6 overflow-hidden  rounded-2xl shadow-2xl rotate-y-180">
            <Link className="text-2xl font-bold text-left text-blue-600" to="/">
              Servify
            </Link>
            <p className="text-gray-500 text-sm  mb-3 text-left">
              Services in minutes
            </p>

            <form
              action=""
              onSubmit={handleSubmit((data) => console.log(data))}
            >
              <div>
                <label htmlFor="name" className="text-sm font-semibold ">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full p-2 mb-2 border rounded focus:outline-none  mt-1 text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-semibold ">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="you@gmail.com"
                  className="w-full p-2 mb-2 border rounded focus:outline-none  mt-1 text-sm "
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-semibold ">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full p-2 mb-2 border rounded focus:outline-none  mt-1 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full p-2 mb-6 border rounded focus:outline-none mt-1 text-sm"
                />
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer">
                Sign Up
              </button>
            </form>
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                  setIsFlipped(false);
                }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthCard;
