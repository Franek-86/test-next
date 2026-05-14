"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";
import hero4 from "@/public/images/hero4.jpg";

const HeroCarousel = () => {
  const pics = [hero1, hero2, hero3, hero4];
  return (
    <div className='hidden lg:block'>
      <Carousel>
        <CarouselContent className='p-2'>
          {pics.map((pic, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent>
                    <Image
                      src={pic}
                      alt='hero'
                      className='w-full h-[24rem] object-fit rounded-md'
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
