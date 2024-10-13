"use client";
import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi";
import Login from "../Form/Login"; // Import the Login component
import { RxCross2 } from "react-icons/rx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BadgePlus,
  House,
  AlignJustify,
  TicketPercent,
  Search,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";

// Define the User interface
interface User {
  avatar: string;
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // State to track animation
  const [formType, setFormType] = useState<"login" | "signup">("login"); // State to track whether it's login or signup
  // const [user, setUser] = useState<User | null>(null); // User state

  const user = {
    avatar: "/dp.webp",
    name: "Lucky",
    email: "lucky@gmail.com",
  };
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
  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === "popup-overlay") {
      togglePopup(); // Use the toggle function to close with animation
    }
  };

  // Function to toggle between login and signup forms
  const toggleFormType = () => {
    setFormType((prevType) => (prevType === "login" ? "signup" : "login"));
  };

  return (
    <>
      <div className="font-Poppins sticky top-0 left-0 right-0 sm:mx-12 md:mx-20 lg:mx-24 sm:rounded-b-3xl bg-zinc-900/95 z-50">
        {/* Header Section */}
        <header className="text-gray-100 py-3 sm:py-4 lg:py-5 px-3 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center rounded-b-3xl">
          <div className="flex items-center gap-1 text-white-100">
            <div className="size-[20px] sm:size-5 lg:size-6">
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
            <h2 className="text-gray-100 text-xl  lg:text-2xl font-semibold leading-tight">
              Kitchen<span className="text-orange-500">Conn</span>
            </h2>
          </div>
          <nav className="space-x-6 text-sm flex items-center">
            <div className="space-x-6 hidden text-sm lg:flex items-center">
              <a href="#" className="hover:text-orange-500">
                Menu
              </a>
              <a href="#" className="hover:text-orange-500">
                Offers
              </a>
              <a href="#" className="hover:text-orange-500">
                What's New
              </a>
              <a href="#" className="hover:text-orange-500 hidden  lg:block">
                Services
              </a>
            </div>
            <a href="#" className="hover:text-orange-500 hidden xl:block">
              Search
            </a>
          </nav>
          <div className="flex items-center  space-x-4">
            <a href="#" className="hover:text-orange-500 xl:hidden ">
              <Search size={20} />
            </a>
            <IoMdNotificationsOutline className="text-gray-100" size={22} />
            <PiShoppingCartSimple className="text-gray-100" size={22} />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-9 h-9 object-cover rounded-full"
                    />
                    {/* <span className="text-gray-100 text-sm">{user.name}</span> */}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="text-orange-500">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="hover:cursor-pointer">
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      <span>Support</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="hover:cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4 text-sm">
                <button
                  className="hover:text-orange-500"
                  onClick={() => {
                    setFormType("login");
                    togglePopup();
                  }}
                >
                  Log in
                </button>
                <button
                  className="hover:text-orange-500"
                  onClick={() => {
                    setFormType("signup");
                    togglePopup();
                  }}
                >
                  Sign up
                </button>
              </div>
            )}
            <Sheet >
            <SheetTrigger asChild className="">
              <button  className="rounded-full bg-transparent lg:hidden ">
                {" "}
                <AlignJustify className="text-white h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent className="flex flex-col justify-between">
             
              <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2 p-2 font-medium"><House/>Home</div>
              <div className="flex items-center gap-2 p-2 font-medium"><TicketPercent/>Offers</div>
              <div className="flex items-center gap-2 p-2 font-medium"><BadgePlus/>What's New</div>
              <div className="flex items-center gap-2 p-2 font-medium"><LifeBuoy />Support</div>
              <div className="flex items-center gap-2 p-2 font-medium"><Settings />Settings</div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" className=" flex gap-1"><LogOut size={20}/>Logout</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
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
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
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
