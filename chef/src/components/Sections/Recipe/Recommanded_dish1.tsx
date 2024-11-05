"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { newKitchens } from "@/data/dishes";

interface Dish {
  name: string;
  image: string;
  veg?: boolean;
  price?: string;
  rating?: number;
}

const Recommanded_dish1: React.FC = () => {
  return (
    <div className="flex overflow-x-auto gap-6">
      {newKitchens.map((dish) => (
        <div key={dish.name} className=" w-[100px] md:w-[150px]">
          <div
            className=" w-[120px] md:w-[150px] aspect-square bg-center bg-no-repeat bg-cover rounded-xl"
            style={{ backgroundImage: `url(${dish.image})` }}
          ></div>
          <div className="mt-2">
            <div className="flex items-start space-x-1">
              {dish.veg ? (
                <Image
                  className="w-4 h-4 mt-1"
                  src="/veg_icon.png"
                  alt="veg"
                  width={16}
                  height={16}
                />
              ) : (
                <Image
                  className="w-4 h-4 mt-1"
                  src="/nonveg_icon.png"
                  alt="non-veg"
                  width={16}
                  height={16}
                />
              )}
              <p
                className="text-gray-800 font-medium leading-normal text-xs sm:text-sm "
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                }}
              >
                {dish.name}
              </p>
            </div>
            <div className="flex justify-between items-center py-2">
              <p className="text-[#8a6960] font-normal text-xs sm:text-sm  leading-normal">
                {dish.price}
              </p>
              {dish.rating && (
                <div className="flex items-center text-xs sm:text-sm  text-gray-700">
                  <Image
                    className="h-3 w-3 sm:h-4 sm:w-4 "
                    src="/rating_icon.png"
                    alt=""
                    width={16}
                    height={16}
                  />
                  {dish.rating}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommanded_dish1;
