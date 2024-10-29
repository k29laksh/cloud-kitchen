// Footer.js
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-sm flex flex-col justify-between md:flex-row gap-1 sm:gap-0 bg-zinc-900 text-white p-4 lg:py-5 sm:mx-12 md:mx-20 lg:mx-24 sm:rounded-t-3xl">
      <div className="container mx-auto pt-1 sm:pt-0 px-3 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-1 text-white-100">
         <div className="size-4 sm:size-5 lg:size-6">
        <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-gray-100 text-lg sm:text-xl lg:text-2xl font-semibold leading-tight">
          Kitchen<span className="text-orange-500">Conn</span>
          </h2>
        </div>{" "}
        <span className=" text-gray-100 text-center hidden md:block">
          © 2024{" "}
          <a href="/" className="hover:underline font-medium text-orange-500">
            KitchenConn{" "}
          </a>
          | All Rights Reserved
        </span>
        <div className="flex space-x-3 sm:space-x-4">
          <FaFacebookF className="w-5 h-5 md:h-8 md:w-8" />
          <FaTwitter className="w-5 h-5 md:h-8 md:w-8" />
          <FaInstagram className="w-5 h-5 md:h-8 md:w-8" />
          <FaYoutube className="w-5 h-5 md:h-8 md:w-8" />
        </div>
      </div>

      <div className="flex justify-center md:hidden">
      <span className=" text-gray-100 text-center">
          © 2024{" "}
          <a href="/" className="hover:underline font-medium text-orange-500">
            KitchenConn{" "}
          </a>
          | All Rights Reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
