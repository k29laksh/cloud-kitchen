import React from "react";
import { useState } from "react";
import FilterModal from "./FilterModal";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";

import { IoRestaurantOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";

const HeroSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="font-Poppins">
      {/* Hero Section */}
      <section className="py-20 px-52  flex justify-between items-start bg-white">
        <div className="w-1/2">
          <div className="pb-4 text-gray-900 gap-1 flex items-center">
            <SlLocationPin size={26} />
            <div className="text-xl font-medium">Ambegaon, Pune</div>
          </div>
         
         <div className="pb-10">
         <div className=" flex items-start gap-8">
            <input
              className="w-[600px] px-4 outline-none text-xl py-4 border border-gray-300 rounded-lg shadow-md"
              type="search"
              placeholder="Search for a dish or a kitchen"
            />
            <div className="">
              <button
                className="px-6 py-4 border border-gray-300 shadow-md text-gray-500 text-xl rounded-lg flex items-center gap-2 "
                onClick={openModal}
              >
                <img src="/filter.svg" alt="" />
                Filter
              </button>

              <FilterModal isOpen={isOpen} closeModal={closeModal} />
            </div>
          </div>
          <div className="p-1 text-gray-900 gap-1 flex items-center cursor-pointer">
            <img src="/ai-icon.png" alt="" />{" "}
            <div className="text-xl font-medium bg-gradient-to-r to-blue-500 from-purple-700 bg-clip-text text-transparent">
              Filter cuisines with the help of Ai
            </div>
          </div>
         </div>
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
            Discover
            <span className="text-orange-500"> Delicious</span> Meals{" "}
            <div>
              from Home <span className="text-orange-500"> Chefs</span>
            </div>
          </h1>
          <p className="text-gray-700 text-lg mt-4">
            Enjoy authentic, home-cooked meals delivered to your doorstep,
            prepared by talented chefs in your neighborhood.{" "}
          </p>
          <div className="mt-8 flex gap-10">
            <button className=" rounded-lg text-white border bg-orange-500 flex items-center   py-4 px-6 text-xl hover:bg-orange-600 ">
              Order now
              <MdKeyboardArrowRight size={28} />
            </button>
          </div>
        </div>
        <div className="relative">
          {/* Image with custom circular border */}
          <div className="relative">
            {/* Image with circle */}
            <img
              src="/image2.png"
              alt="Girl with donut"
              className="w-[450px] rounded-full object-cover"
            />
            {/* Circle behind the image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[470px] h-[470px] rounded-full border-[15%] border-orange-500 border-dashed"></div>
              <div
                className="w-[470px] h-[470px] rounded-full border-[15%] border-yellow-500 border-dashed"
                style={{ borderSpacing: "15%" }}
              ></div>
              <div
                className="w-[470px] h-[470px] rounded-full border-[15%] border-gray-500 border-dashed"
                style={{ borderSpacing: "15%" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className=" px-32 justify-around flex">
        <div className="w-full md:w-1/3 text-center flex flex-col justify-center items-center pt-2 pb-10">
          <span className="py-4 ">
            {" "}
            <IoFastFoodOutline size={36} />
          </span>
          <div className="text-gray-900 text-2xl font-medium">
            Freshly Cooked Meals
          </div>
          <p className="text-gray-600 text-lg ">
            Delicious meals prepared on-demand, just for you.
          </p>
        </div>
        <div className="w-full md:w-1/3 text-center flex flex-col justify-center items-center py-2">
          <span className="py-4">
            {" "}
            <MdOutlineDeliveryDining size={36} />
          </span>
          <div className="text-gray-900 text-2xl font-medium">
            Flexible Ordering
          </div>
          <p className="text-gray-600 text-lg mt-2">
            Order anytime and schedule delivery at your convenience.
          </p>
        </div>
        <div className="w-full md:w-1/3 text-center flex flex-col justify-center items-center py-2">
          <span className="py-4">
            {" "}
            <IoRestaurantOutline size={36} />
          </span>
          <div className="text-gray-900 text-2xl font-medium">
            Personalized Menus
          </div>
          <p className="text-gray-600 text-lg mt-2">
            Menus tailored to your preferences from home kitchens nearby.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
