import React from "react";

const EmptyList = ({
  text = "there are no featured products to display",
}: {
  text?: string;
}) => {
  return <div>{text}</div>;
};

export default EmptyList;
