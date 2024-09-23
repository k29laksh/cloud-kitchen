import React, { useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { trendingDishes, newKitchens, MoreDishes } from '../data/dishes';
import { GoArrowRight } from "react-icons/go";



const DishRow = () => {
  const trendingRef = useRef(null);
  const newKitchensRef = useRef(null);
  const moreDishesRef = useRef(null);

  // State to manage whether "See All" is active for each section
  const [seeAllTrending, setSeeAllTrending] = useState(false);
  const [seeAllNewKitchens, setSeeAllNewKitchens] = useState(false);
  const [seeAllMoreDishes, setSeeAllMoreDishes] = useState(false);

  const scroll = (direction, ref) => {
    const scrollAmount = 400; // Adjust this value to control scroll distance
    if (ref.current) {
      const newScrollPosition = direction === 'left'
        ? ref.current.scrollLeft - scrollAmount
        : ref.current.scrollLeft + scrollAmount;
      
      ref.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const renderSection = (title, dishes, ref, isTrending = false, seeAll, setSeeAll) => (
    <div className="relative px-8 md:px-52 font-Poppins py-8">
      <h2 className="text-[#181211] text-3xl flex justify-between font-semibold leading-tight tracking-[-0.015em] pb-3 pt-5">
        {title}
        <div 
          className=' font-medium text-base flex items-center gap-2 text-orange-500 cursor-pointer'
          onClick={() => setSeeAll(!seeAll)}
        >
          {seeAll ? 'Show Less' : 'See All'} <GoArrowRight />
        </div>
      </h2>
      
      <div className="relative">
        {!seeAll && (
          <>
            <button
              className="absolute left-0 top-[43%] transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
              onClick={() => scroll('left', ref)}
            >
              <FiChevronLeft size={24} />
            </button>
          </>
        )}
        
        <div
          className={`${seeAll ? 'flex flex-col sm:flex-row sm:flex-wrap justify-center sm:justify-start' : 'flex overflow-x-auto scrollbar-hide'} flex gap-4 py-4`}
          ref={ref}
          style={seeAll ? {} : {
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {dishes.map((dish) => (
            <div key={dish.name} className={`flex-shrink-0 ${isTrending ? 'w-[190px]' : 'w-[230px]'} ${isTrending&&seeAll ? 'w-[200px]' : ''}`}>
              <div
                className={`${isTrending ? 'w-[180px] h-[180px]' : 'w-full aspect-square'} bg-center bg-no-repeat bg-cover ${isTrending ? 'rounded-full' : 'rounded-xl'}`}
                style={{ backgroundImage: `url(${dish.image})` }}
              ></div>
              <div className="mt-2">
                <p className={`text-[#181211]  ${isTrending ? 'text-center ' : ''} font-medium leading-normal`}>
                  {dish.name}
                </p>
                {!isTrending && (
                  <p className="text-[#8a6960]  font-normal leading-normal">
                    {dish.price}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {!seeAll && (
          <>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md"
              onClick={() => scroll('right', ref)}
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
      {renderSection("Trending Dishes", trendingDishes, trendingRef, true, seeAllTrending, setSeeAllTrending)}
      {renderSection("New Kitchens", newKitchens, newKitchensRef, false, seeAllNewKitchens, setSeeAllNewKitchens)}
      {renderSection("More Dishes", MoreDishes, moreDishesRef, false, seeAllMoreDishes, setSeeAllMoreDishes)}
    </div>
  );
};

export default DishRow;
