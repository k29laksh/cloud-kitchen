"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { FiPlus, FiMinus } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
  discount?: number;
}

const CartPage = () => {
  // Sample items in the cart
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Classic Burger",
      quantity: 1,
      price: 8.99,
      image:
        "https://cdn.usegalileo.ai/stability/2583cc55-a443-464c-81cf-4b5896855d20.png",
    },
    {
      id: 2,
      name: "Loaded Fries",
      quantity: 2,
      price: 4.99,
      image:
        "https://cdn.usegalileo.ai/stability/339b23f0-4810-4cd0-899d-5c9d3ce4e79a.png",
    },
  ]);

  const [promoCode, setPromoCode] = useState<string>("");
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [recommendedItem, setRecommendedItem] = useState([
    {
      name: "Cola Drink",
      price: 1.99,
      discount: 10,
      image: "/cola.jpg",
    },
    {
      name: "French Fries",
      price: 2.59,
      discount: 5,
      image: "/fries.avif",
    },
  ]);

  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setPromoDiscount(10);
    } else {
      alert("Invalid promo code");
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharge = 2.99;
  const discountAmount = (total * promoDiscount) / 100;
  const finalTotal = total + deliveryCharge - discountAmount;

  return (
    <div className="container mx-auto my-6 px-4 sm:px-24 md:px-12 lg:px-32 xl:px-52">
      <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4 " />
        Back / Cart
      </Button>

      {/* Cart Items */}
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between">
        <div className="w-full md:w-[60%] lg:w-1/2">
          <div className="space-y-4 ">
            {cartItems.map((item) => (
              <Card
                key={item.id}
                className="flex items-center justify-between p-2 sm:p-4 "
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-full shadow-lg"
                />

                <CardContent className="flex flex-col  sm:ml-4">
                  <h3 className="text-sm sm:text-lg font-medium sm:font-semibold">
                    {item.name}
                  </h3>
                  <div className="text-sm sm:text-lg font-semibold text-orange-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </CardContent>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className=""
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <FiMinus className="text-[13px]" />
                  </Button>
                  <span className="mx-2 text-sm sm:text-base">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    className=""
                    size="sm"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <FiPlus className="text-[13px]" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Separator */}
          <Separator className="my-6" />

          {/* Promo Code Section */}
          <div className="flex items-center gap-4 w-full lg:w-[80%]">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e: any) => setPromoCode(e.target.value)}
            />
            <Button onClick={applyPromoCode}>Apply</Button>
          </div>
          {promoDiscount > 0 && (
            <Badge variant="secondary" className="mt-2 text-orange-500">
              Promo applied! {promoDiscount}% off 🎉🎉
            </Badge>
          )}

          {/* Recommended Item Section */}
          <Card className="mt-6 p-4  rounded-lg">
            <h4 className="font-semibold text-lg mb-2 pb-4">You might like:</h4>
            <div className="space-y-4 ">
              {recommendedItem?.map((item) => (
                <div className=" flex justify-between">
                  <div className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-full shadow-lg w-14 h-14"
                    />
                    <div className="ml-4">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Add it to your meal for a {item.discount}% discount!
                      </p>
                    </div>
                  </div>
                  <Button variant={"outline"} className="mt-2 font-medium">
                    Add for ${item.price}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Summary Section */}
        <Card className=" p-4 text-sm md:text-base h-fit w-full sm:w-[35%] lg:w-[30%]">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Delivery Charge</p>
            <p>${deliveryCharge.toFixed(2)}</p>
          </div>
          {promoDiscount > 0 && (
            <div className="flex justify-between">
              <p>Promo Discount</p>
              <p>-${discountAmount.toFixed(2)}</p>
            </div>
          )}
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <p>Total</p>
            <p>${finalTotal.toFixed(2)}</p>
          </div>
          <Button className="w-full mt-4">Proceed to Checkout</Button>
        </Card>
      </div>
    </div>
  );
};

export default CartPage;
