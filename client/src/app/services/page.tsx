'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Search, Utensils, Clock, Heart, Apple, ChevronDown } from 'lucide-react'

const services = [
  {
    title: "Search & Discover",
    description: "Explore by cuisine, dietary preferences, and kitchen type. Filter by delivery time, price, and ratings.",
    icon: Search,
    color: "bg-purple-500",
    features: ["Advanced filters", "Cuisine categories", "Dietary options"]
  },
  {
    title: "Personalized Recommendations",
    description: "AI-powered suggestions based on order history and preferences. Highlight trending dishes, popular kitchens, and new openings.",
    icon: Utensils,
    color: "bg-blue-500",
    features: ["AI-powered suggestions", "Trending dishes", "New kitchen alerts"]
  },
  {
    title: "Order Tracking",
    description: "Real-time updates from preparation to delivery, with notifications.",
    icon: Clock,
    color: "bg-green-500",
    features: ["Real-time tracking", "Push notifications", "Estimated delivery time"]
  },
  {
    title: "Community & Social Engagement",
    description: "Follow favorite kitchens, join live cooking classes, and chat with chefs.",
    icon: Heart,
    color: "bg-red-500",
    features: ["Live cooking classes", "Chef chat", "Kitchen following"]
  },
  {
    title: "Health & Dietary Support",
    description: "Nutritional info, allergen indicators, and health-conscious options.",
    icon: Apple,
    color: "bg-yellow-500",
    features: ["Nutritional information", "Allergen alerts", "Calorie tracking"]
  }
]

export default function CompletedServicePage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedTab, setSelectedTab] = useState("all")

  return (
    <div className=" min-h-screen  py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Discover a world of culinary delights at your fingertips
          </p>
        </motion.div>

       
        
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence>
            {services
              .filter(service => 
                selectedTab === "all" || 
                service.title.toLowerCase().includes(selectedTab.toLowerCase())
              )
              .map((service, index) => (
              <motion.div
                key={service.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  className="h-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl bg-gradient-to-b from-orange-50 to-yellow-100bg-opacity-60 backdrop-filter backdrop-blur-lg overflow-hidden"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CardHeader>
                    <div className={`w-20 h-20 ${service.color} rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 mb-4">{service.description}</CardDescription>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          className="flex items-center justify-center text-sm text-gray-700"
                        >
                          <ChevronDown className="w-4 h-4 mr-2 text-green-500" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Experience Our Services?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Join our community of food lovers and cloud kitchen enthusiasts. Discover, order, and enjoy amazing cuisines today!</p>
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 rounded-full shadow-lg">
            Get Started Now
          </Button>
        </motion.div>
      </div>
    </div>
  )
}