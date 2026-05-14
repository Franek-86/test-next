import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import test from "../utils/products.json";
console.log(test);

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});
let productsData: Prisma.ProductsCreateInput[] = test;
async function main() {
  // const products = await prisma.product.create({
  //   data: {
  //     name: "test",
  //   },
  // });

  for (const i of productsData) {
    console.log("test111", i);

    await prisma.products.create({
      data: i,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
