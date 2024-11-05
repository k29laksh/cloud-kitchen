'use client'

import { FC, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Mail, Phone, Home, Building, MapIcon, Edit, LogOut, FileText, Star, Clock, Utensils, Instagram, Twitter } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ChefProfileProps {
  chef: {
    username: string;
    email: string;
    name: string;
    city: string;
    state: string;
    phoneno: string;
    address: string;
    imageUrl: string;
    bio: string;
    rating: number;
    speciality: string;
    experience: number;
    instagram: string;
    twitter: string;
  };
  kitchenImages: string[];
  dishes: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
  }[];
}

const tempChef: ChefProfileProps = {
  chef: {
    username: "masterchef",
    email: "chef@example.com",
    name: "Gordon Ramsay",
    city: "London",
    state: "England",
    phoneno: "+44 20 1234 5678",
    address: "123 Culinary Street",
    imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1377&q=80",
    bio: "World-renowned chef with multiple Michelin stars, known for my fiery temper and exquisite culinary creations.",
    rating: 4.8,
    speciality: "French and British cuisine",
    experience: 30,
    instagram: "@gordonramsayofficial",
    twitter: "@GordonRamsay",
  },
  kitchenImages: [
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1588515724527-074a7a56616c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  ],
  dishes: [
    {
      id: 1,
      name: "Beef Wellington",
      description: "A classic British dish with tender beef wrapped in puff pastry.",
      imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      price: 45,
    },
    {
      id: 2,
      name: "Lobster Ravioli",
      description: "Delicate pasta filled with succulent lobster in a creamy sauce.",
      imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80",
      price: 38,
    },
    {
      id: 3,
      name: "Sticky Toffee Pudding",
      description: "A rich, moist sponge cake covered in a warm toffee sauce.",
      imageUrl: "https://images.unsplash.com/photo-1586040140378-b5634cb4c8fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      price: 12,
    },
  ],
};

const ChefProfile: FC<ChefProfileProps> = ({ chef, kitchenImages, dishes }) => {
  const [activeTab, setActiveTab] = useState("info")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <Card className="w-full overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-32 sm:h-36 md:h-48 bg-gradient-to-r from-orange-400 to-red-500">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -bottom-16 left-6"
            >
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage className="object-cover" src={chef.imageUrl} alt={chef.name} />
                <AvatarFallback>{chef.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="pt-20 pb-6 px-6">
          <div className="flex justify-between items-start">
            <div>
              <motion.h2
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl font-bold"
              >
                {chef.name}
              </motion.h2>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-muted-foreground"
              >
                @{chef.username}
              </motion.p>
            </div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center space-x-2"
            >
              <Badge variant="secondary" className="text-sm font-medium rounded bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                Top Chef
              </Badge>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="font-medium">{chef.rating}</span>
              </div>
            </motion.div>
          </div>

          <Separator className="my-6" />

          <Tabs defaultValue="info" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
              <TabsTrigger value="dishes">Dishes</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <TabsContent value="info" className="mt-6">
                <motion.div
                  key="info"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="col-span-2">
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-muted-foreground">{chef.bio}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Utensils className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Speciality</p>
                      <p className="text-sm text-muted-foreground">{chef.speciality}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-muted-foreground">{chef.experience} years</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{chef.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{chef.phoneno}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{chef.city}, {chef.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Instagram className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Instagram</p>
                      <p className="text-sm text-muted-foreground">{chef.instagram}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Twitter className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Twitter</p>
                      <p className="text-sm text-muted-foreground">{chef.twitter}</p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="kitchen" className="mt-6">
                <motion.div
                  key="kitchen"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4">Kitchen Gallery</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {kitchenImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      >
                        <Image
                          src={image}
                          alt={`Kitchen image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 hover:scale-110"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="dishes" className="mt-6">
                <motion.div
                  key="dishes"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold mb-4">Featured Dishes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dishes.map((dish, index) => (
                      <motion.div
                        key={dish.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden">
                          <CardHeader className="p-0">
                            <div className="relative aspect-video">
                              <Image
                                src={dish.imageUrl}
                                alt={dish.name}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 hover:scale-110"
                              />
                            </div>
                          </CardHeader>
                          <CardContent className="p-4">
                            <CardTitle className="text-lg">{dish.name}</CardTitle>
                            <CardDescription>{dish.description}</CardDescription>
                            <p className="mt-2 font-semibold text-sm">₹{dish.price.toFixed(2)}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="default" className="w-full mr-2">
            <Edit className="w-4 h-4 mr-2" />
            Contact Chef
          </Button>
          <Button variant="outline" className="w-full ml-2">
            <FileText className="w-4 h-4 mr-2" />
            View Menu
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Kitchen Image</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-video">
              <Image
                src={selectedImage}
                alt="Kitchen image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function ChefProfilePage() {
  return <ChefProfile {...tempChef} />;
}