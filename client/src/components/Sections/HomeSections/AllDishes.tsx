"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
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

const AllDishes: React.FC = () => {
  // Fetch dishes using RTK query
  const router = useRouter();

  const { data:dishes, isLoading, isError } = useGetAllDishesQuery();

  console.log(dishes);
  
  if (isLoading) {
    return <div className=" flex justify-center items-center">
        <Audio
  height="80"
  width="80"
  radius="9"
  color="orange"
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
    <div className="flex gap-6 flex-wrap py-4 md:pb-8  flex-col">
     
      <div className='flex justify-center sm:flex-wrap sm:justify-start sm:gap-6'>
      {dishes?.map((dish) => (
        <div key={dish.name} className="w-[200px] md:w-[250px] ">
          <Link href={`/recipe/${dish?._id}`}>
          <div
            className="w-[200px] md:w-[250px] aspect-square bg-center bg-no-repeat bg-cover rounded-xl"
            style={{
              backgroundImage: `url(${dish.images[0] ? `http://localhost:5000${dish.images[0]}` : "/placeholder_image.png"})`, // Use a placeholder if no image
            }}
          ></div>
          </Link>
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

export default AllDishes;