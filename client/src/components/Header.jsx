import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi";
import Login from './Login'; // Import the Login component
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // State to track animation
  const [formType, setFormType] = useState('login'); // State to track whether it's login or signup
  const user = null;

  // Function to toggle the login/signup popup
  const togglePopup = () => {
    if (!isPopupOpen) {
      setIsPopupOpen(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10); // A slight delay to trigger the animation after mount
    } else {
      setIsAnimating(false); // Trigger fade-out
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 300); // Match the duration of the animation
    }
  };

  // Function to close the popup when clicking outside the form
  const closePopup = (e) => {
    if (e.target.id === "popup-overlay") {
      togglePopup(); // Use the toggle function to close with animation
    }
  };

  // Function to toggle between login and signup forms
  const toggleFormType = () => {
    setFormType((prevType) => (prevType === 'login' ? 'signup' : 'login'));
  };

  return (
    <>
      <div className="font-Poppins sticky top-0 left-0 right-0 mx-24 rounded-b-3xl bg-zinc-900/95 z-50">
        {/* Header Section */}
        <header className="text-gray-100 py-5 px-12 flex justify-between items-center rounded-b-3xl">
          <div className="flex items-center gap-1 text-white-100">
            <div className="size-6">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-gray-100 text-2xl font-semibold leading-tight">
              Kitchen<span className="text-orange-500">Conn</span>
            </h2>
          </div>
          <nav className="space-x-6 text-sm ">
            <a href="#" className="hover:text-orange-500">Menu</a>
            <a href="#" className="hover:text-orange-500">Offers</a>
            <a href="#" className="hover:text-orange-500">What's New</a>
            <a href="#" className="hover:text-orange-500">Services</a>
            <a href="#" className="hover:text-orange-500">Search</a>
          </nav>
          <div className="flex items-center  space-x-4">
            <IoMdNotificationsOutline className="text-gray-100" size={22} />
            <PiShoppingCartSimple className="text-gray-100" size={22} />
            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src="https://img.freepik.com/free-photo/ai-generated-fall-leaves_23-2150648511.jpg"
                  alt="avatar"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <span className="text-gray-100 text-sm ">Lucky</span>
              </div>
            ) : (
              <div className="flex items-center gap-4 text-sm">
                <button className="hover:text-orange-500" onClick={() => { setFormType('login'); togglePopup(); }}>
                  Log in
                </button>
                <button className="hover:text-orange-500" onClick={() => { setFormType('signup'); togglePopup(); }}>
                  Sign up
                </button>
              </div>
            )}
          </div>
        </header>
      </div>

      {/* Login/Signup Form Popup */}
      {isPopupOpen && (
        <div
          id="popup-overlay"
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
            isAnimating ? "opacity-100" : "opacity-0"
          }`}
          onClick={closePopup} // Close when clicking outside
        >
          <div
            className={`relative bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 ${
              isAnimating ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent form clicks from closing the popup
          >
            <RxCross2
              className="absolute top-4 right-4 cursor-pointer"
              size={24}
              onClick={togglePopup} // Close with animation on click
            />
            <Login toggleFormType={toggleFormType} formType={formType} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
