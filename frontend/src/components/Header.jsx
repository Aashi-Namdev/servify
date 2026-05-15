import React from "react";
import { NavLink,Link, useLocation, useNavigate } from "react-router-dom";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import logo from "../assets/other/logo.png";
import { FiLogIn } from "react-icons/fi";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();


  if (location.pathname === "/auth") {
    return null; 
  }

  return (
      <div className="absolute top-0 left-0  z-20 px-15 py-5  w-full flex items-center justify-between">
        <Link className="brightness-150" to="/">
          <img src={logo} alt="Logo" className="w-44 cursor-auto" />
        </Link>

        <div className=" text-white">
          <ul className="flex gap-7 text-sm ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `font-semibold ${isActive ? "text-blue-600 font-bold" : "text-white"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `font-semibold ${isActive ? "text-blue-600 font-bold" : "text-white"}`
                }
              >
                Services
              </NavLink>

            </li>
            <li>
              <NavLink
                to="/provider"
                className={({ isActive }) =>
                  `font-semibold  ${isActive ? "text-blue-600 font-bold" : "text-white"}`
                }
              >
                Providers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `font-semibold  ${isActive ? "text-blue-600 font-bold" : "text-white"}`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `font-semibold ${isActive ? "text-blue-600 font-bold" : "text-white"}`
                }
              >
                Contact
              </NavLink>
            </li>

          </ul>
        </div>

        <div className="flex gap-4">
    
          <button
            onClick={() => {
              navigate("/auth", { state: { isFlipped: false } });
            }}
           className="text-white group hover:scale-105 duration-300  text-sm transition cursor-pointer flex items-center gap-2 font-bold px-3 py-1">
            <FiLogIn className="font-bold group-hover:scale-110 transition duration-300" />
            Login 
            </button>
          <PrimaryBtn
            btn="Sign Up"
            onclick={() => {
              navigate("/auth", { state: { isFlipped: true } });
            }}
          />
        </div>
      </div>
  );
}

export default Header;
