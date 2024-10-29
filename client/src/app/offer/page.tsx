import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for recipes
const recipes = [
  { id: 1, name: "Butter Chicken", description: "Creamy tomato-based curry with tender chicken pieces", price: 12.99, image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=500&h=500&fit=crop" },
  { id: 2, name: "Palak Paneer", description: "Spinach curry with soft paneer cheese cubes", price: 10.99, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=500&fit=crop" },
  { id: 3, name: "Vegetable Biryani", description: "Fragrant rice dish with mixed vegetables and aromatic spices", price: 11.99, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&h=500&fit=crop" },
  { id: 4, name: "Masala Dosa", description: "Crispy rice crepe filled with spiced potato mixture", price: 8.99, image: "https://images.unsplash.com/photo-1630383249896-569b61a5c7dd?w=500&h=500&fit=crop" },
]

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-orange-600 to-yellow-500 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Diwali Special Offer</h1>
          <p className="text-xl md:text-2xl">Get 20% off on all orders above $30</p>
          <Button size="lg" variant="secondary">Order Now</Button>
        </div>
      </section>

      {/* Recipes Section */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Festive Specials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-48">
                  <Image 
                    src={recipe.image} 
                    alt={recipe.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle>{recipe.name}</CardTitle>
                <CardDescription>{recipe.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4">
                <span className="text-lg font-bold">${recipe.price.toFixed(2)}</span>
                <Button variant="outline">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="mb-6">Experience the taste of homemade goodness this Diwali!</p>
          <Button size="lg" variant="secondary">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}