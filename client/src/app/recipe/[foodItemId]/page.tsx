"use client";
import React, { useState } from "react";
import { Audio } from 'react-loader-spinner'
import { useRouter, useParams } from "next/navigation";
import {
  Clock,
  ChefHat,
  Share2,
  ShoppingCart,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import RatingSection from "@/components/Sections/Recipe/RatingSection";
import Link from "next/link";
import { useGetSingleDishQuery } from "@/redux/Service/dish";
import AllDishes from "@/components/Sections/HomeSections/AllDishes";

const RecipePage = () => {
  const router = useRouter();
  const { foodItemId } = useParams();
  const { data, isLoading, error } = useGetSingleDishQuery(foodItemId as string);
  const [isAdding, setIsAdding] = useState(false);
  const recipe = data?.foodItem;

  if (isLoading) {
    return <div className="h-screen flex justify-center items-center">
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

  if (error) {
    return <div>Error loading dishes.</div>;
  }

  // Handle add to cart action
  const handleAddToCart = () => {
    setIsAdding(true);
    try {
      // Get existing cart items from localStorage
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
      
      // Check if item already exists in cart
      const existingItemIndex = existingCart.findIndex(
        (item: any) => item._id === recipe._id
      );

      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        existingCart[existingItemIndex].quantity += 1;
      } else {
        // If item doesn't exist, add new item
        existingCart.push({
          _id: recipe._id,
          name: recipe.name,
          price: recipe.price,
          quantity: 1,
          image: recipe.images[0] ? `http://localhost:5000${recipe.images[0]}` : "/placeholder_image.png",
          homemaker: recipe.homemaker
        });
      }

      // Save updated cart back to localStorage
      localStorage.setItem('cart', JSON.stringify(existingCart));
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="py-4 md:py-8 px-4 sm:px-24 md:px-12 lg:px-32 xl:px-52">
      <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 " />
        Back / {recipe.name}
      </Button>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="md:w-1/2">
          <Card className="mb-4 w-full  md:mb-0">
            <CardContent className="p-0 ">
              <Image
                src={recipe.images[0] ? `http://localhost:5000${recipe.images[0]}` : "/placeholder_image.png"}
                alt={recipe.name}
                className="w-full h-full aspect-square md:h-[400px] object-cover rounded-lg"
                width={500}
                height={500}
              />
            </CardContent>
            <div className="hidden md:block">
              <RatingSection foodItemId={recipe._id}/>
            </div>
          </Card>
        </div>

        <Card className="md:w-1/2">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

            <div className="flex justify-between items-center gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-4 ">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <ChefHat className="w-4 h-4" /> {recipe.veg ? "Veg" : "Non-Veg"}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" /> {recipe.timeToDeliver} min
                </div>
              </div>
              <Button onClick={handleAddToCart} disabled={isAdding}>
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>
            </div>

            <div className="flex items-center justify-between mb-6">
              <Link href={`/chef/${recipe.homemaker || "chef"}`} className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={recipe.author?.avatar || "/default-avatar.png"}
                  />
                  <AvatarFallback>
                    {recipe.author?.name[0]?.toUpperCase() || "A"}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">@{recipe.author?.username || `chef`} </span>
              </Link>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share Recipe</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Add to Shopping List</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Save Recipe</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <Separator className="my-4" />
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Description:</h2>
              <p className="text-gray-600">{recipe.description}</p>
              <Button variant="link" className="px-0">
                Read more
              </Button>
            </div>

            <h2 className="font-semibold mb-4">Ingredients:</h2>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex flex-col items-center text-center">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {ingredient}
                        </Badge>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{ingredient}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <Separator className="my-4" />
            <div className="md:hidden ">
              <RatingSection foodItemId={recipe?._id}/>
            </div>
            
          </CardContent>
        </Card>

      </div>
      <Separator className="my-4" />
            <div className="overflow-x-hidden">
              <h1 className="text-xl font-semibold pb-2">
                Explore Similar Recipes
              </h1>
              <AllDishes />
            </div>
    </div>
  );
};

export default RecipePage;
