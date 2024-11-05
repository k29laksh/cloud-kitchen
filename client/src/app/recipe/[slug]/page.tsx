"use client"
import React from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  ChefHat,
  Share2,
  ShoppingCart,
  Heart,
  ArrowLeft,
  Star,
  MessageCircle,
  ThumbsUp,
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
import Recommanded_dish1 from "@/components/Sections/Recipe/Recommanded_dish1";
import Link from "next/link";

// Recipe interface
interface Recipe {
  title: string;
  category: string;
  calories: number;
  duration: number;
  difficulty: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
  };
  description: string;
  tags: string[];
  nutrients: {
    carbs: number;
    protein: number;
    fats: number;
    fiber: number;
  };
  ingredients: Array<{
    name: string;
    amount: string;
    icon: string;
  }>;
  rating: {
    average: number;
    total: number;
    distribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
  reviews: Review[];
}

interface Review {
  id: number;
  user: {
    name: string;
    avatar?: string;
    username: string;
  };
  rating: number;
  date: string;
  comment: string;
  likes: number;
  images?: string[];
}
const RecipePage = () => {
  const router = useRouter();
  const recipe: Recipe = {
    title: "Shrimp Stir-Fry with Brown Rice",
    category: "Main dish",
    calories: 350,
    duration: 45,
    difficulty: "Medium",
    author: {
      avatar: "/dp.webp",
      name: "Alice Wood",
      username: "alicewood",
    },
    description:
      "A quick and healthy stir-fry featuring succulent shrimp sautéed to perfection, vibrant, crunchy vegetables, and a side of nutty brown rice. This dish is not only packed with...",
    tags: [
      "ComfortFood",
      "HealthyEats",
      "QuickRecipes",
      "ShrimpLover",
      "WholeGrainDelights",
    ],
    nutrients: {
      carbs: 45,
      protein: 8,
      fats: 10,
      fiber: 7,
    },
    ingredients: [
      { name: "Shrimp", amount: "60g", icon: "🍤" },
      { name: "Brown Rice", amount: "100g", icon: "🍚" },
      { name: "Garlic", amount: "1/2 piece", icon: "🧄" },
      { name: "Pea Pods", amount: "20g", icon: "🌱" },
      { name: "Soy Sauce", amount: "10ml", icon: "🍶" },
      { name: "Oil", amount: "1 tbsp", icon: "🛢️" },
      { name: "Garlic", amount: "2 cloves", icon: "🧄" },
    ],
    rating: {
      average: 4.7,
      total: 128,
      distribution: { 5: 85, 4: 28, 3: 10, 2: 3, 1: 2 },
    },
    reviews: [
      {
        id: 1,
        user: { name: "Sarah Johnson", username: "sarahj", avatar: "/dp.webp" },
        rating: 5,
        date: "2 days ago",
        comment: "Amazing recipe! Perfectly balanced flavors.",
        likes: 24,
        images: ["/recipe2.png"],
      },
      {
        id: 2,
        user: { name: "Mike Chen", username: "mikec", avatar: "/dp.webp" },
        rating: 4,
        date: "1 week ago",
        comment: "Good recipe, perfect taste with some adjustments.",
        likes: 16,
      },
    ],
  };

  return (
    <div className="py-4 md:py-8 px-4 sm:px-24 md:px-12 lg:px-32 xl:px-52">
      {/* Header */}
      <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 " />
        Back / {recipe.title}
      </Button>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Image Card */}
        <div className="md:w-1/2">
          <Card className="mb-4 w-full md:mb-0">
            <CardContent className="p-0 ">
              <Image
                src="/recipe2.png"
                alt="Shrimp Stir-Fry"
                className="w-full h-full md:h-[400px] object-cover rounded-lg"
                width={500}
                height={500}
              />
            </CardContent>

            <div className="py-4 flex gap-3 flex-wrap">
              <Image
                src="/recipe2.png"
                alt="Shrimp Stir-Fry"
                className="w-24 h-24 object-cover rounded-lg"
                width={500}
                height={500}
              />
              <Image
                src="/recipe2.png"
                alt="Shrimp Stir-Fry"
                className="w-24 h-24 object-cover rounded-lg"
                width={500}
                height={500}
              />
              <Image
                src="/recipe2.png"
                alt="Shrimp Stir-Fry"
                className="w-24 h-24 object-cover rounded-lg"
                width={500}
                height={500}
              />
            </div>

            <div className="hidden md:block">
              <RatingSection />
            </div>
          </Card>
        </div>

        {/* Recipe Details Card */}
        <Card className="md:w-1/2">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

            {/* Meta Information */}
            <div className="flex justify-between items-center gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-4 ">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <ChefHat className="w-4 h-4" /> {recipe.difficulty}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-sm ">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {recipe.calories}kcal
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>Calories per serving</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4" /> {recipe.duration}min
                </div>
              </div>

              <Button>Add to cart</Button>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between mb-6">
              <Link href={'/chef/ramu'} className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    className="object-cover"
                    src={recipe.author.avatar}
                  />
                  <AvatarFallback>
                    {recipe.author.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">@{recipe.author.username}</span>
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

            {/* Description */}
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Description:</h2>
              <p className="text-gray-600">{recipe.description}</p>
              <Button variant="link" className="px-0">
                Read more
              </Button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {recipe.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="hover:bg-secondary/80 cursor-pointer"
                >
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Nutrients */}
            <Card className="mb-6">
              <CardContent className="p-4 flex flex-wrap justify-between gap-4">
                <div className="text-center">
                  <div className="text-lg font-medium">
                    {recipe.nutrients.carbs}g
                  </div>
                  <div className="text-sm text-gray-500">Carbohydrates</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">
                    {recipe.nutrients.protein}g
                  </div>
                  <div className="text-sm text-gray-500">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">
                    {recipe.nutrients.fats}g
                  </div>
                  <div className="text-sm text-gray-500">Fats</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">
                    {recipe.nutrients.fiber}g
                  </div>
                  <div className="text-sm text-gray-500">Fiber</div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients */}
            <h2 className="font-semibold mb-4">Ingredients:</h2>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-1">
                          <span className="text-xl">{ingredient.icon}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {ingredient.amount}
                        </span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>{ingredient.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>

            <Separator className="my-4" />
            <div className="md:hidden ">
              <RatingSection />
            </div>
            {/* Recommaded recipes */}
            <Separator className="my-4" />
            <div className="overflow-x-hidden">
              <h1 className="text-xl font-semibold pb-2">
                Explore Similar Recipes
              </h1>
              <Recommanded_dish1 />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipePage;
