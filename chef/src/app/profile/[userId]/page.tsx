'use client'

import { FC, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Mail, Phone, Home, Building, MapIcon, Edit, LogOut, FileText } from "lucide-react"

interface ProfileProps {
  user: {
    username: string;
    email: string;
  };
  prof: {
    name: string;
    city: string;
    state: string;
    phoneno: string;
    address: string;
    imageUrl: string;
  };
}

const tempUser: ProfileProps = {
  user: {
    username: "testuser",
    email: "testuser@example.com",
  },
  prof: {
    name: "Test User",
    city: "Test City",
    state: "Test State",
    phoneno: "123-456-7890",
    address: "123 Test Street",
    imageUrl: "/dp.webp",
  },
};

const Profile: FC<ProfileProps> = ({ user, prof }) => {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <Card className="w-full overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative h-32 sm:h-36 md:h-48 bg-gradient-to-r from-blue-400 to-purple-500">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute -bottom-16 left-6"
            >
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage className="object-cover" src={prof.imageUrl} alt={prof.name} />
                <AvatarFallback>{prof.name.charAt(0)}</AvatarFallback>
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
                {prof.name}
              </motion.h2>
              <motion.p
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-muted-foreground"
              >
                @{user.username}
              </motion.p>
            </div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Badge variant="secondary" className="text-sm font-medium
              rounded bg-gradient-to-r from-orange-500 to-red-500 text-white">
                Pro Member
              </Badge>
            </motion.div>
          </div>

          <Separator className="my-6" />

          <Tabs defaultValue="personal" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="mt-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{prof.phoneno}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Home className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{prof.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Building className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">City</p>
                    <p className="text-sm text-muted-foreground">{prof.city}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapIcon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">State</p>
                    <p className="text-sm text-muted-foreground">{prof.state}</p>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            <TabsContent value="activity" className="mt-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-muted-foreground">Recent activity will be displayed here.</p>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="default" className="w-full mr-2">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline" className="w-full ml-2">
            <FileText className="w-4 h-4 mr-2" />
            Your Orders
          </Button>
        </CardFooter>
      </Card>
      
    </div>
  )
}

export default function ProfilePage() {
  return <Profile {...tempUser} />;
}