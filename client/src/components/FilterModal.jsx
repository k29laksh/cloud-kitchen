import { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";

const FilterModal = ({ isOpen, closeModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal(); // Close the modal if clicked outside
      }
    };

    // Add event listener when modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up event listener when modal is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  return (
    <>
      {isOpen && (
        <div className="fixed font-Poppins inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={modalRef}
            className="relative bg-white rounded-lg shadow-lg w-[750px]"
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-900"
            >
              <RxCross2 size={30} />
            </button>

            {/* Header */}
            <div className="p-2 border-b">
              <h2 className="text-2xl font-medium py-3 px-2">Filters</h2>
            </div>

            {/* Sidebar and Options */}
            <div className="flex">
              {/* Sidebar */}
              <div className="w-1/2 border-r p-4">
                <div className=" pb-2">Filter By Food or Kitchens</div>
                <input
                  className="px-2 w-full outline-none  py-3 border border-gray-400 rounded-lg"
                  type="search"
                  placeholder="Search"
                />
              </div>

              {/* Options */}
              <div className="w-2/3 p-4">
                <div className="mt-2 flex gap-8">
                  <label className="flex items-center  mb-2">
                    <input
                      type="radio"
                      name="sort"
                      className="mr-2 w-4 h-4"
                      defaultChecked
                    />
                    All
                  </label>
                  <label className="flex items-center  mb-2">
                    <input type="radio" name="sort" className="mr-2 w-4 h-4" />
                    Veg
                  </label>
                  <label className="flex items-center  mb-2">
                    <input type="radio" name="sort" className="mr-2 w-4 h-4" />
                    Non-Veg
                  </label>
                </div>
                <h3 className="text-2xl font-semibold">Sort by</h3>
                <div className="mt-4 flex flex-col gap-2">
                  <label className="flex items-center  mb-2">
                    <input
                      type="radio"
                      name="sort"
                      className="mr-2 w-4 h-4"
                      defaultChecked
                    />
                    Popularity
                  </label>
                  <label className="flex items-center  mb-2">
                    <input type="radio" name="sort" className="mr-2 w-4 h-4" />
                    Rating: High to Low
                  </label>
                  <label className="flex items-center  mb-2">
                    <input type="radio" name="sort" className="mr-2 w-4 h-4" />
                    Delivery Time
                  </label>
                  <label className="flex items-center  mb-2">
                    <input type="radio" name="sort" className="mr-2 w-4 h-4" />
                    Cost: Low to High
                  </label>
                  <label className="flex items-center  mb-2">
                    <input type="radio" name="sort" className="mr-2 w-4 h-4" />
                    Cost: High to Low
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between p-4 border-t">
              <button className="text-gray-500  hover:text-gray-800">
                Clear all
              </button>
              <button
                className="px-6 py-2 bg-orange-500  text-white rounded hover:bg-orange-600"
                onClick={closeModal}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
