import React from "react";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section>
      <div className='grid grid-1 lg:grid-cols-2 gap-24 items-center'>
        <div className=''>
          <h1 className='text-4xl lg:text-6xl max-w-xl tracking-tighter bold'>
            Lorem ipsum dolor sit amet.
          </h1>
          <p className='text-lg mt-6 leading-8 text-muted-foreground'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
            beatae obcaecati repellat, sed autem labore nam! Ut odit deserunt
            optio!
          </p>
          <Button asChild className='mt-8 capitalize'>
            <Link href={"/products"}>all products</Link>
          </Button>
        </div>
        <HeroCarousel />
      </div>
    </section>
  );
};

export default Hero;
