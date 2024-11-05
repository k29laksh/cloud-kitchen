import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { newKitchens } from '@/data/dishes';

interface Dish {
  name: string;
  image: string;
  veg?: boolean;
  price?: string;
  rating?: number;
}

export default function OfferPage() {
  return (
    <div className="py-4 md:pb-8 px-4 sm:px-24 md:px-12 lg:px-32 xl:px-52">
      {/* Hero Section */}
      <section className="rounded-lg aspect-square sm:w-full sm:h-[55vh] bg-gradient-to-r from-[hsl(207,90%,54%)] to-[#f44336] flex items-center justify-center text-white">
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Diwali Special Offer</h1>
          <p className="text-xl md:text-2xl">Get 20% off on all orders above 300₹</p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transition-transform duration-300 hover:scale-105"
          >
            Order Now
          </Button>
        </div>
      </section>

      {/* Recipes Section */}
      <div className="flex flex-wrap gap-6 py-6">
        {newKitchens.map((dish) => (
          <div key={dish.name} className="w-full sm:w-[250px]">
            <Link href={`/recipe/${dish.name}`}>
              <div
                className="w-full aspect-square bg-center bg-no-repeat bg-cover rounded-xl"
                style={{ backgroundImage: `url(${dish.image})` }}
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
                  className="text-gray-800 font-medium leading-normal text-sm"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                  }}
                >
                  {dish.name}
                </p>
              </div>
              <div className="flex justify-between items-center py-2">
                <p className="text-[#8a6960] font-normal text-sm leading-normal">
                  {dish.price}
                </p>
                {dish.rating && (
                  <div className="flex items-center text-sm text-gray-700">
                    <Image
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      src="/rating_icon.png"
                      alt="rating"
                      width={16}
                      height={16}
                    />
                    {dish.rating}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <section className=" py-12">
        <div className="container mx-auto text-center">
          
          <p className="mb-6 ">Experience the taste of homemade goodness this Diwali!</p>
          <Button size="lg" variant="default" className='hover:bg-orange-600 bg-orange-500 text-white py-4 px-4'>
            <Link href="/">View Full Menu</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
