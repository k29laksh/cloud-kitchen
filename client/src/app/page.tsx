import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/Sections/HomeSections/HeroSection";
import DishRow from "@/components/Sections/HomeSections/DishRow";
import AllDishes from "@/components/Sections/HomeSections/AllDishes";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DishRow/>
    </>
  );
}
