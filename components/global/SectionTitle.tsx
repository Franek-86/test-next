import { cn } from "@/lib/utils";
import React from "react";

const SectionTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div>
      <h2 className={cn("text-3xl capitalize", className)}>{title}</h2>
    </div>
  );
};

export default SectionTitle;
