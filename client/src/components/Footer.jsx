// Footer.js
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-lg bg-zinc-900 text-white py-8 mx-24 rounded-t-3xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 text-white-100">
          <div className="size-8">
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
          <h2 className="text-gray-100 text-3xl  font-semibold leading-tight ">
            Kitchen<span className="text-orange-500">Conn</span>
          </h2>
        </div>{" "}
        <span className=" text-gray-100 text-center">
          © 2024{" "}
          <a href="/" className="hover:underline font-medium text-orange-500">
            KitchenConn{" "}
          </a>
          | All Rights Reserved
        </span>
        <div className="flex space-x-6">
          <FaFacebookF size={30} />
          <FaTwitter size={30} />
          <FaInstagram size={30} />
          <FaYoutube size={30} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
