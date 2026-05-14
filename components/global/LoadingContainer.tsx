import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Card, CardAction, CardContent } from "../ui/card";

const LoadingContainer = () => {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-24'>
      <LoadingFunction />
      <LoadingFunction />
      <LoadingFunction />
    </div>
  );
};

function LoadingFunction() {
  return (
    <Card>
      <CardContent>
        <Skeleton className='h-48' />
        <Skeleton className='h-4 w-3/4 mt-2' />
        <Skeleton className='h-4 w-1/4 mt-2' />
      </CardContent>
    </Card>
  );
}
export default LoadingContainer;
