"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GoArrowRight } from "react-icons/go";
import { trendingDishes, newKitchens, MoreDishes } from "@/data/dishes";

interface Dish {
  name: string;
  image: string;
  veg?: boolean;
  price?: string;
  rating?: number;
}

const DishRow: React.FC = () => {
  const trendingRef = useRef<HTMLDivElement>(null);
  const newKitchensRef = useRef<HTMLDivElement>(null);
  const moreDishesRef = useRef<HTMLDivElement>(null);

  const [seeAllTrending, setSeeAllTrending] = useState(false);
  const [seeAllNewKitchens, setSeeAllNewKitchens] = useState(false);
  const [seeAllMoreDishes, setSeeAllMoreDishes] = useState(false);

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

  const renderSection = (
    title: string,
    dishes: Dish[],
    ref: React.RefObject<HTMLDivElement>,
    isTrending: boolean = false,
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
          <>
            <button
              className="absolute left-0 top-[40%] transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hidden md:block"
              onClick={() => scroll("left", ref)}
            >
              <FiChevronLeft size={24} />
            </button>
          </>
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
              className={`flex-shrink-0 ${
                isTrending ? "w-[150px] md:w-[170px]" : "w-[200px] md:w-[250px]"
              } ${isTrending && seeAll ? "w-[180px] md:w-[200px]" : ""}`}
            >
              <div
                className={`${
                  isTrending ? "w-[150px] h-[150px] md:w-[180px] md:h-[180px]" : "w-full aspect-square"
                } bg-center bg-no-repeat bg-cover ${
                  isTrending ? "rounded-full" : "rounded-xl"
                }`}
                style={{ backgroundImage: `url(${dish.image})` }}
              ></div>
              <div className={`mt-2`}>
                <div
                  className={`${
                    isTrending ? "" : "flex items-start space-x-1"
                  }`}
                >
                  {!isTrending ? (
                    dish?.veg ? (
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
                    )
                  ) : (
                    ""
                  )}
                  <p
                    className={`text-gray-800  ${
                      isTrending ? "text-center" : ""
                    } font-medium leading-normal text-sm md:text-base`}
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
                  {!isTrending && (
                    <p className="text-[#8a6960] font-normal text-sm md:text-base leading-normal">
                      {dish.price}
                    </p>
                  )}
                  {!isTrending && dish.rating && (
                    <div className="flex items-center text-sm text-gray-700">
                      <Image className="h-4 w-4" src="/rating_icon.png" alt="" width={16} height={16} />
                      {dish.rating}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!seeAll && (
          <>
            <button
              className="absolute right-0 top-[40%] transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hidden md:block"
              onClick={() => scroll("right", ref)}
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {renderSection(
        "Trending Dishes",
        trendingDishes,
        trendingRef,
        true,
        seeAllTrending,
        setSeeAllTrending
      )}
      {renderSection(
        "New Kitchens",
        newKitchens,
        newKitchensRef,
        false,
        seeAllNewKitchens,
        setSeeAllNewKitchens
      )}
      {renderSection(
        "More Dishes",
        MoreDishes,
        moreDishesRef,
        false,
        seeAllMoreDishes,
        setSeeAllMoreDishes
      )}
    </div>
  );
};

export default DishRow;
