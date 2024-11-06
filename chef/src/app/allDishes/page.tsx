"use client";
import React from "react";
import Image from "next/image";
import { useGetAllDishesQuery } from "@/redux/Service/dish";
import { Audio } from 'react-loader-spinner'
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
interface Dish {
  name: string;
  description: string;
  ingredients: string[];
  timeToDeliver: string;
  veg: boolean;
  price: string;
  images: string[]; // Array of image URLs or base64 strings
  rating?: number;
}

const Recommanded_dish1: React.FC = () => {
  // Fetch dishes using RTK query
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllDishesQuery();

  const dishes=data?.foodItems
  console.log(dishes);
  
  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">
        <Audio
  height="80"
  width="80"
  radius="9"
  color="green"
  ariaLabel="loading"
  wrapperStyle
  wrapperClass
/>
    </div>;
  }

  if (isError) {
    return <div>Error loading dishes.</div>;
  }

  return (
    <div className="h-screen flex gap-6 flex-wrap py-4 md:pb-8 px-4 sm:px-24 md:px-12 lg:px-32 xl:px-52 flex-col">
     <div>
     <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 " />
        Back / You Dishes
      </Button>
     </div>
      <div className='flex justify-center sm:flex-wrap sm:justify-start sm:gap-6'>
      {dishes?.map((dish) => (
        <div key={dish.name} className="w-[200px] md:w-[250px] mb-6">
          <div
            className="w-[200px] md:w-[250px] aspect-square bg-center bg-no-repeat bg-cover rounded-xl"
            style={{
              backgroundImage: `url(${dish.images[0] ? `http://localhost:5000${dish.images[0]}` : "/placeholder_image.png"})`, // Use a placeholder if no image
            }}
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
                className="text-gray-800 font-medium leading-normal text-xs sm:text-sm"
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
              <p className="text-[#8a6960] font-normal text-xs sm:text-sm leading-normal">
                ₹{dish.price}
              </p>
              <div className="flex items-center text-xs sm:text-sm text-gray-700">
                <Image
                  className="h-3 w-3 sm:h-4 sm:w-4"
                  src="/rating_icon.png"
                  alt="Rating"
                  width={16}
                  height={16}
                />
                {dish.rating ?? "N/A"}
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Recommanded_dish1;
