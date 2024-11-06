"use client";
import React, { useState, useEffect } from "react";
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
  _id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  homemaker: string;
}

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
console.log(cartItems)
  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  
  const increaseQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setPromoDiscount(10);
    } else {
      alert("Invalid promo code");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharge = 2.99;
  const discountAmount = (subtotal * promoDiscount) / 100;
  const finalTotal = subtotal + deliveryCharge - discountAmount;

  return (
    <div className="container min-h-screen mx-auto my-6 px-4 sm:px-24 md:px-12 lg:px-32 xl:px-52">
      <Button
        variant="ghost"
        className="mb-4 gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4" />
        Back / Cart
      </Button>

      {/* Cart Items */}
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between">
        <div className="w-full md:w-[60%] lg:w-1/2">
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
                <Button 
                  className="mt-4"
                  onClick={() => router.push('/')}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              cartItems.map((item) => (
                <Card
                  key={item._id}
                  className="flex items-center justify-between p-2 sm:p-4"
                >
                  <div className="">
                  <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-full shadow-lg w-[70px] h-[70px] overflow-hidden"
                />
                  </div>

                  <CardContent className="flex flex-col sm:ml-4">
                    <h3 className="text-sm sm:text-lg font-medium sm:font-semibold">
                      {item.name}
                    </h3>
                    <div className="text-sm sm:text-lg font-semibold text-orange-600">
                    ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </CardContent>

                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      <FiMinus className="text-[13px]" />
                    </Button>
                    <span className="mx-2 text-sm sm:text-base">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      <FiPlus className="text-[13px]" />
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              <Separator className="my-6" />
              
              {/* Promo Code Section */}
              <div className="flex items-center gap-4 w-full lg:w-[80%]">
                <Input
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button onClick={applyPromoCode}>Apply</Button>
              </div>
              {promoDiscount > 0 && (
                <Badge variant="secondary" className="mt-2 text-orange-500">
                  Promo applied! {promoDiscount}% off 🎉
                </Badge>
              )}
            </>
          )}
        </div>

        {/* Summary Section */}
        {cartItems.length > 0 && (
          <Card className="p-4 text-sm md:text-base h-fit w-full sm:w-[35%] lg:w-[30%]">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Charge</p>
              <p>₹{deliveryCharge.toFixed(2)}</p>
            </div>
            {promoDiscount > 0 && (
              <div className="flex justify-between">
                <p>Promo Discount</p>
                <p>-₹{discountAmount.toFixed(2)}</p>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>₹{finalTotal.toFixed(2)}</p>
            </div>
            <Button className="w-full mt-4">Proceed to Checkout</Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CartPage;