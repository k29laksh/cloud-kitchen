"use client";
import React, { useState } from "react";
import { MdOutlineDeliveryDining, MdKeyboardArrowRight } from "react-icons/md";
import { IoFastFoodOutline, IoRestaurantOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import Image from "next/image";
import FilterModal from "./FilterModal";

const HeroSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="font-Poppins">
      {/* Hero Section */}
      <section className="py-10 md:py-20 px-4 sm:px-24 md:px-12 lg:px-32 xl:px-52 flex flex-col md:flex-row justify-between items-center md:items-start bg-white">
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
         <div className="flex justify-between items-center">
         <div className="pb-4 text-gray-900 flex items-center justify-center md:justify-start">
            <SlLocationPin size={18} />
            <div className="font-medium">Ambegaon, Pune</div>
          </div>
          <div className="md:hidden flex pb-4 items-center justify-center">
                <button
                  className="px-6 py-2 border border-gray-300 shadow-md text-gray-500 rounded-lg flex items-center justify-center gap-2"
                  onClick={openModal}
                >
                  <Image
                    src="/filter.svg"
                    alt="Filter"
                    width={20}
                    height={20}
                  />
                  Filter
                </button>

                <FilterModal isOpen={isOpen} closeModal={closeModal} />
              </div>
         </div>

          <div className="pb-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <input
                className="w-full sm:w-[400px] px-4 outline-none py-2 border border-gray-300 rounded-lg shadow-md mb-4 sm:mb-0"
                type="search"
                placeholder="Search for a dish or a kitchen"
              />
              <div className="hidden md:flex items-center justify-center">
                <button
                  className="px-6 py-2 border border-gray-300 shadow-md text-gray-500 rounded-lg flex items-center justify-center gap-2"
                  onClick={openModal}
                >
                  <Image
                    src="/filter.svg"
                    alt="Filter"
                    width={20}
                    height={20}
                  />
                  Filter
                </button>

                <FilterModal isOpen={isOpen} closeModal={closeModal} />
              </div>
            </div>
            <div className="p-1 text-gray-900 gap-1 flex items-center justify-center md:justify-start cursor-pointer mt-4 md:mt-0">
              <Image src="/ai-icon.png" alt="AI Icon" width={20} height={20} />
              <div className="font-medium bg-gradient-to-r to-blue-500 from-purple-700 bg-clip-text text-transparent">
                Filter cuisines with the help of AI
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-[1.05] text-center md:text-left">
            Discover
            <span className="text-orange-500"> Delicious</span> Meals{" "}
            <div>
              from Home <span className="text-orange-500"> Chefs</span>
            </div>
          </h1>
          <p className="text-gray-700 text-sm mt-4 text-center md:text-left">
            Enjoy authentic, home-cooked meals delivered to your doorstep,
            prepared by talented chefs in your neighborhood.{" "}
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <button className="rounded-lg text-white border bg-orange-500 flex items-center text-b py-2 px-4 md:py-3 md:px-5 hover:bg-orange-600">
              Order now
              <MdKeyboardArrowRight size={28} />
            </button>
          </div>
        </div>
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] xl:w-[450px] xl:h-[450px]">
            <Image
              src="/image2.png"
              alt="Girl with donut"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full border-[15%] border-orange-500 border-dashed"></div>
              <div
                className="w-full h-full rounded-full border-[15%] border-yellow-500 border-dashed"
                style={{ borderSpacing: "15%" }}
              ></div>
              <div
                className="w-full h-full rounded-full border-[15%] border-gray-500 border-dashed"
                style={{ borderSpacing: "15%" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-10 lg:px-32 py-10 flex flex-col md:flex-row justify-around items-center">
        {[
          {
            icon: <IoFastFoodOutline size={32} />,
            title: "Freshly Cooked Meals",
            description: "Delicious meals prepared on-demand, just for you.",
          },
          {
            icon: <MdOutlineDeliveryDining size={32} />,
            title: "Flexible Ordering",
            description: "Order anytime and schedule delivery at your convenience.",
          },
          {
            icon: <IoRestaurantOutline size={32} />,
            title: "Personalized Menus",
            description: "Menus tailored to your preferences from home kitchens nearby.",
          },
        ].map((feature, index) => (
          <div key={index} className="w-full md:w-1/3 text-center flex flex-col justify-center items-center py-4 mb-8 md:mb-0">
            <span className="py-4">{feature.icon}</span>
            <div className="text-gray-900 text-xl font-medium">{feature.title}</div>
            <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HeroSection;