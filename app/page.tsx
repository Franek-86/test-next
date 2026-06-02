import LoadingContainer from "@/components/global/LoadingContainer";
import SectionTitle from "@/components/global/SectionTitle";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";

import { Button } from "@/components/ui/button";

import React, { Suspense } from "react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
      {/* <LoadingContainer /> */}
    </div>
  );
};

export default HomePage;
