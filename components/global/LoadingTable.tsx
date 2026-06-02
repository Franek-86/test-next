import React from "react";
import { Skeleton } from "../ui/skeleton";

const LoadingTable = ({ rows = 5 }: { rows?: number }) => {
  const rowsArray = Array.from({ length: rows }, (_, index) => {
    return (
      <div className='mb-4' key={index}>
        <Skeleton className='h-8 rounded w-full' />
      </div>
    );
  });

  return <div>{rowsArray}</div>;
};

export default LoadingTable;
