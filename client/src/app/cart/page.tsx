import React from "react";
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

// Review interface
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

// Recipe Page Component
const RecipePage = () => {
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
    description: "A quick and healthy stir-fry with shrimp, veggies, and brown rice.",
    tags: ["ComfortFood", "HealthyEats", "QuickRecipes", "ShrimpLover"],
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

  const RatingSection = () => (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4">Rating & Reviews</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold">{recipe.rating.average}</div>
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(recipe.rating.average)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  Based on {recipe.rating.total} reviews
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {Object.entries(recipe.rating.distribution)
                .reverse()
                .map(([stars, count]) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="w-3">{stars}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${(count / recipe.rating.total) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-10">{count}</span>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex items-end justify-center md:border-l md:pl-8">
            <Button className="w-full md:w-auto">
              <MessageCircle className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="space-y-6">
          {recipe.reviews.map((review) => (
            <div key={review.id} className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={review.user.avatar} className="object-cover border border-gray-300 rounded-full" />
                    <AvatarFallback>
                      {review.user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{review.user.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span>•</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  {review.likes}
                </Button>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              {review.images && (
                <div className="flex gap-2 mt-3">
                  {review.images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Review image ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
              <Separator className="mt-6" />
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-6">
          Show More Reviews
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="py-4 md:py-8 px-4 sm:px-24 md:px-12 lg:px-32 xl:px-52">
      <Button variant="ghost" className="mb-4 gap-2">
        <ArrowLeft className="w-4 h-4 " />
        Back / {recipe.title}
      </Button>
      <div className="flex flex-col md:flex-row justify-between gap-10">
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
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <div className="flex justify-between items-center gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{recipe.category}</Badge>
                <Badge variant="outline">{recipe.difficulty}</Badge>
              </div>
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Heart className="w-4 h-4 " />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save Recipe</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share Recipe</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <Separator className="mb-4" />
            <div className="flex gap-4 items-center mb-6">
              <Clock className="w-5 h-5" />
              <span>{recipe.duration} mins</span>
              <ChefHat className="w-5 h-5 ml-4" />
              <span>{recipe.author.name}</span>
            </div>
            <p className="text-gray-700 mb-6">{recipe.description}</p>
            <Separator className="mb-6" />
            <RatingSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipePage;
