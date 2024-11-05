"use client";
import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { PiShoppingCartSimple } from "react-icons/pi";
import Login from "../Form/Login"; 
import { RxCross2 } from "react-icons/rx";
import { logout } from '@/redux/features/authFeature';
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/useDispatch";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BadgePlus,
  House,
  AlignJustify,
  LogOut,
  User,
  Settings,
  LifeBuoy,
  TicketPercent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { RootState } from "@/redux/store";

interface User {
  avatar: string;
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<User | null>(null);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    // Only set user state on client side
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUser(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    togglePopup();
  };

  const handleLogout = () => {
    dispatch(logout());
    setUser(null); // Reset user state on logout
  };

  const togglePopup = () => {
    if (!isPopupOpen) {
      setIsPopupOpen(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => {
        setIsPopupOpen(false);
      }, 300);
    }
  };

  const closePopup = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.id === "popup-overlay") {
      togglePopup();
    }
  };

  const toggleFormType = () => {
    setFormType((prevType) => (prevType === "login" ? "signup" : "login"));
  };

  return (
    <>
      <div className="font-Poppins sticky top-0 left-0 right-0 sm:mx-12 md:mx-20 lg:mx-24 sm:rounded-b-3xl bg-zinc-900/95 z-50">
        <header className="text-gray-100 py-3 sm:py-4 lg:py-5 px-3 sm:px-6 md:px-8 lg:px-12 flex justify-between items-center rounded-b-3xl">
          <Link href={'/'}>
            <h2 className="text-gray-100 text-xl lg:text-2xl font-semibold leading-tight">
              Kitchen<span className="text-orange-500">Conn</span>
            </h2>
          </Link>
          <nav className="space-x-6 text-sm flex items-center">
            <div className="space-x-6 hidden text-sm lg:flex items-center">
              <Link href="/" className="hover:text-orange-500">
                Menu
              </Link>
              <Link href="/offers" className="hover:text-orange-500">
                Offers
              </Link>
              <Link href="/whatsNew" className="hover:text-orange-500">
                What's New
              </Link>
              <Link href="/services" className="hover:text-orange-500 hidden  lg:block">
                Services
              </Link>
            </div>
            <a href="#" className="hover:text-orange-500 hidden xl:block">
              Search
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <IoMdNotificationsOutline className="text-gray-100" size={22} />
            <Link href={"/cart"}>
              <PiShoppingCartSimple className="text-gray-100" size={22} />
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center gap-2">
                    <img src={"/dp.webp"} alt="avatar" className="w-9 h-9 object-cover rounded-full" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel className="text-orange-500">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link className="flex items-center" href={"/profile/1234"}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span></Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-4 text-sm">
                <button onClick={() => {
                  setFormType("login");
                  togglePopup();
                }}>
                  Log in
                </button>
                <button onClick={() => {
                  setFormType("signup");
                  togglePopup();
                }}>
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
              <Link href="/" className="flex items-center gap-2 p-2 font-medium"><House/>Home</Link>
              <Link href="/offers"  className="flex items-center gap-2 p-2 font-medium"><TicketPercent/>Offers</Link>
              <Link href="/whatsNew" className="flex items-center gap-2 p-2 font-medium"><BadgePlus/>What's New</Link>
              <Link href="/services" className="flex items-center gap-2 p-2 font-medium"><LifeBuoy />Services</Link>
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

      {isPopupOpen && (
        <div
          id="popup-overlay"
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isAnimating ? "opacity-100" : "opacity-0"}`}
          onClick={closePopup}
        >
          <div
            className={`relative bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 ${isAnimating ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <RxCross2 className="absolute top-4 right-4 cursor-pointer" size={24} onClick={togglePopup} />
            <Login toggleFormType={toggleFormType} formType={formType} onLoginSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
