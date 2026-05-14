import { Search } from "lucide-react";
import { prisma } from "./db";
import { redirect } from "next/navigation";

export const fetchFeaturedProducts = async () => {
  const products = await prisma.products.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};
export const fetchAllProducts = ({ search }: { search: string }) => {
  return prisma.products.findMany({
    where: {
      OR: [
        { name: { startsWith: search, mode: "insensitive" } },
        { company: { startsWith: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const fetchSingleProduct = async ({
  productId,
}: {
  productId: string;
}) => {
  const product = prisma.products.findUnique({
    where: { id: productId },
  });
  if (!product) redirect("/products");
  return product;
};
