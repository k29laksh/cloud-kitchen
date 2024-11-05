"use client"
import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {  ChefHat, ChevronDown, Flame, Leaf} from 'lucide-react'

const cloudKitchens = [
  { id: 1, name: "Spice Haven", logo: "/profile1.avif", description: "Authentic Indian cuisine" },
  { id: 2, name: "Sushi Master", logo: "/profile2.avif", description: "Fresh Japanese delicacies" },
  { id: 3, name: "Taco Fiesta", logo: "/profile3.jpg", description: "Vibrant Mexican flavors" },
  { id: 1, name: "Spice Haven", logo: "/profile1.avif", description: "Authentic Indian cuisine" },
  { id: 2, name: "Sushi Master", logo: "/profile2.avif", description: "Fresh Japanese delicacies" },
  { id: 3, name: "Taco Fiesta", logo: "/profile3.jpg", description: "Vibrant Mexican flavors" },
]

const recipes = [
  { id: 1, name: "Avocado Toast", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
  { id: 2, name: "Quinoa Salad", image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf" },
  { id: 3, name: "Smoothie Bowl", image: "https://images.unsplash.com/photo-1592212263696-01fac0256736" },
];

export default function EnhancedFoodDiscoveryPage() {
  const [showAll, setShowAll] = useState(false);
  
  const displayedKitchens = showAll ? cloudKitchens : cloudKitchens.slice(0, 3);
  return (
    <div className="py-4 md:py-8 px-4 sm:px-24 md:px-12 lg:px-32 xl:px-52 min-h-screen bg-gradient-to-b from-orange-50 to-yellow-100">
      {/* Hero Section */}
      <section className="relative aspect-square sm:w-full sm:h-[55vh] bg-gradient-to-r rounded-lg from-[#DC2424] to-[#4A569D] flex items-center justify-center text-white overflow-hidden">
        {/* <Image
          src="https://ynvlvlxfgwsytgvvqcgc.supabase.co/storage/v1/object/public/images/hero-food-image.jpg"
          alt="Vibrant food background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        /> */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div> */}
        <div className="relative z-20 text-center space-y-6 p-4 max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold animate-fade-in-down">
            Discover the Latest Flavors & Freshest Additions!
          </h1>
          <p className=" md:text-xl animate-fade-in-up">
            Explore new cloud kitchens and unique recipes crafted for you.
          </p>
          <Button size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-transform duration-300 hover:scale-105"  asChild>
            <Link href="#new-items" className='flex items-center'>Explore Now <ChevronDown size={22}/></Link>
          </Button>
        </div>
      </section>

      {/* New Cloud Kitchens Section */}
      <section id="new-items" className="py-16 px-4 md:px-8 bg-white">
      <h2 className="text-4xl font-bold mb-12 text-center text-orange-500">
        New Cloud Kitchens
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {displayedKitchens.map((kitchen) => (
          <Card 
            key={kitchen.id} 
            className="transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <CardHeader>
              <div className="mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <img
                  src={kitchen.logo}
                  alt={kitchen.name}
                  width={90}
                  height={90}
                  className="object-cover rounded-full"
                />
              </div>
              <CardTitle className="text-2xl text-center">
                {kitchen.name}
              </CardTitle>
              <CardDescription className="text-center">
                {kitchen.description}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
              <Button 
               size="lg"
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-transform duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "See Less" : "See All"}
        </Button>
      </div>
    </section>

      {/* Unique Recipes Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-yellow-100 to-orange-100">
        <h2 className="text-4xl font-bold mb-12 text-center text-orange-500">Unique Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all hover:scale-105">
              <Image src={recipe.image} alt={recipe.name} width={400} height={300} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                <Button variant="secondary" className="bg-white text-orange-500 hover:bg-orange-500 hover:text-white">
                  See Recipe
                </Button>
              </div>
              <div className="absolute top-0 left-0 m-4 bg-white px-4 py-2 rounded-full text-orange-500 font-medium text-sm">
                {recipe.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Features Section */}

      
      <section className="py-16 px-4 md:px-8 bg-white">
        <h2 className="text-4xl font-bold mb-12 text-center text-orange-500">Enhanced Features</h2>
        
        {/* Highlight Exclusive Options */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold mb-8 text-center">Exclusive Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-green-100 to-green-200">
              <CardHeader>
                <Leaf className="w-12 h-12 mx-auto mb-4 text-green-600" />
                <CardTitle className="text-center text-green-700">Healthy Choices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-green-800">Discover nutritious and delicious meals for a balanced lifestyle.</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-100 to-purple-200">
              <CardHeader>
                <ChefHat className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <CardTitle className="text-center text-purple-700">Gourmet Experiences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-purple-800">Indulge in exquisite dishes crafted by world-class chefs.</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-100 to-red-200">
              <CardHeader>
                <Flame className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <CardTitle className="text-center text-red-700">Spicy Sensations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-red-800">Experience bold flavors and fiery dishes for thrill-seekers.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Components */}
        <div className='px-8'>
          <h3 className="text-3xl font-semibold mb-8 text-center">Featured Kitchens</h3>
          <Carousel className=" max-w-md sm:max-w-lg md:max-w-[100vw] mx-auto" opts={{
        align: "start",
      }}
      >
            <CarouselContent>
              {cloudKitchens.map((kitchen) => (
                <CarouselItem key={kitchen.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-gradient-to-br from-orange-100 to-yellow-100">
                    <CardHeader>
                    <div className="mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <img
                  src={kitchen.logo}
                  alt={kitchen.name}
                  width={90}
                  height={90}
                  className="object-cover rounded-full"
                />
              </div>
                      <CardTitle className="text-center text-orange-500">{kitchen.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-orange-700">{kitchen.description}</p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  )
}