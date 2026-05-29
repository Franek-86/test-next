"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <section className='grid md:grid-cols-2 gap-8 mt-4'>
      <ReviewLoadingCard />
      <ReviewLoadingCard />
    </section>
  );
};

const ReviewLoadingCard = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='w-16 h-16 rounded-full mb-2' />
        <Skeleton className='w-[150px] h-6 mb-2 rounded' />
        <Skeleton className='w-[100px] h-6 rounded' />
      </CardHeader>
    </Card>
  );
};

export default loading;
