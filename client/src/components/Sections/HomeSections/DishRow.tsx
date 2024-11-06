"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { trendingDishes } from "@/data/dishes";
import Link from "next/link";
import AllDishes from "./AllDishes";

interface Dish {
  name: string;
  image: string;
  veg?: boolean;
  price?: string;
  rating?: number;
}

const DishRow: React.FC = () => {
  const trendingRef = useRef<HTMLDivElement>(null);
  const [seeAllTrending, setSeeAllTrending] = useState(false);

  const scroll = (direction: "left" | "right", ref: React.RefObject<HTMLDivElement>) => {
    const scrollAmount = 400;
    if (ref.current) {
      const newScrollPosition =
        direction === "left"
          ? ref.current.scrollLeft - scrollAmount
          : ref.current.scrollLeft + scrollAmount;

      ref.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const renderTrendingSection = (
    title: string,
    dishes: Dish[],
    ref: React.RefObject<HTMLDivElement>,
    seeAll: boolean,
    setSeeAll: React.Dispatch<React.SetStateAction<boolean>>
  ) => (
    <div className="relative px-4 md:px-52 font-Poppins py-8">
      <h2 className="text-[#181211] text-xl md:text-3xl flex justify-between font-semibold leading-tight tracking-[-0.015em] pb-3 pt-5">
        {title}
        <div
          className="font-medium text-sm md:text-base flex items-center gap-2 text-orange-500 cursor-pointer"
          onClick={() => setSeeAll(!seeAll)}
        >
          {seeAll ? "Show Less" : "See All"} <GoArrowRight />
        </div>
      </h2>

      <div className="relative">
        {!seeAll && (
          <button
            className="absolute left-0 top-[40%] transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hidden md:block"
            onClick={() => scroll("left", ref)}
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        <div
          className={`${
            seeAll
              ? "flex flex-wrap  sm:justify-start"
              : "flex overflow-x-auto scrollbar-hide"
          } flex gap-5 md:gap-7 py-4`}
          ref={ref}
          style={
            seeAll
              ? {}
              : {
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }
          }
        >
          {dishes.map((dish) => (
            <div
              key={dish.name}
              className="flex-shrink-0 w-[150px] md:w-[170px]"
            >
              <Link href={`/recipe/${dish?.name}`}>
                <div
                  className="w-[150px] h-[150px] md:w-[180px] md:h-[180px] bg-center bg-no-repeat bg-cover rounded-full"
                  style={{ backgroundImage: `url(${dish.image})` }}
                ></div>
              </Link>
              <div className="mt-2 text-center">
                <p
                  className="text-gray-800 font-medium leading-normal text-sm md:text-base"
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
            </div>
          ))}
        </div>

        {!seeAll && (
          <button
            className="absolute right-0 top-[40%] transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hidden md:block"
            onClick={() => scroll("right", ref)}
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>
      <h2 className="text-[#181211] text-xl md:text-3xl flex justify-between font-semibold leading-tight tracking-[-0.015em] pb-3 pt-5">Our Menu</h2>
      <AllDishes/>
    </div>
  );

  return (
    <div>
      {renderTrendingSection(
        "Trending Dishes",
        trendingDishes,
        trendingRef,
        seeAllTrending,
        setSeeAllTrending
      )}
    </div>
  );
};

export default DishRow;
