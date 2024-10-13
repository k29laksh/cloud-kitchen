"use client";
import React, { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

interface FilterModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, closeModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed font-Poppins inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg max-w-full w-[90%] lg:w-[750px] p-4"
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-900"
        >
          <RxCross2 size={30} />
        </button>

        <div className="p-2 border-b">
          <h2 className="text-2xl font-medium py-3 px-2">Filters</h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 border-b lg:border-b-0 lg:border-r p-4">
            <div className="pb-2">Filter By Food or Kitchens</div>
            <input
              className="px-2 w-full outline-none py-3 border border-gray-400 rounded-lg"
              type="search"
              placeholder="Search"
            />
          </div>

          <div className="lg:w-2/3 p-4">
            <div className="mt-2 flex gap-8">
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="food-type"
                  className="mr-2 w-4 h-4"
                  defaultChecked
                />
                All
              </label>
              <label className="flex items-center mb-2">
                <input type="radio" name="food-type" className="mr-2 w-4 h-4" />
                Veg
              </label>
              <label className="flex items-center mb-2">
                <input type="radio" name="food-type" className="mr-2 w-4 h-4" />
                Non-Veg
              </label>
            </div>
            <h3 className="text-2xl font-semibold">Sort by</h3>
            <div className="mt-4 flex flex-col gap-2">
              {["Popularity", "Rating: High to Low", "Delivery Time", "Cost: Low to High", "Cost: High to Low"].map((option, index) => (
                <label key={option} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="sort"
                    className="mr-2 w-4 h-4"
                    defaultChecked={index === 0}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4 border-t">
          <button className="text-gray-500 hover:text-gray-800">
            Clear all
          </button>
          <button
            className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            onClick={closeModal}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
