"use server";
import { Search } from "lucide-react";
import { ActionType } from "./types";
import { prisma } from "./db";
import { redirect } from "next/navigation";
import testImage from "@public/images/test.jpg";
import { currentUser } from "@clerk/nextjs/server";
import { imageSchema, productsSchema } from "./schemas";
import { error, log } from "console";
import z, { ZodError } from "zod";
import { checkSchema, checkUser } from "./functions";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

export const fetchFeaturedProducts = async () => {
  const products = await prisma.products.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};
export const fetchAllProducts = async ({ search }: { search: string }) => {
  return await prisma.products.findMany({
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

export const test = async (prevData: any, formData: FormData) => {
  "use server";
  const user = await checkUser();

  try {
    let test = Object.fromEntries(formData.entries());
    let imageFile = formData.get("image") as File;

    const validateImage = checkSchema(imageSchema, { image: imageFile });
    console.log("this is the validate image", validateImage);

    const image = await uploadImage(validateImage.image);

    const test1 = checkSchema(productsSchema, test);
    let test2 = {
      ...test1,
      clerkId: user.id,
      image: image,
    };
    // const test3 = productsSchema.parse(test2);

    await prisma.products.create({
      data: test2,
    });
    return {
      message: "item successfully added",
    };
  } catch (error: any) {
    if (error instanceof ZodError) {
      let test4 = error.issues
        .map((i) => {
          return i.message;
        })
        .join(",");

      return {
        message: test4,
      };
    } else if (error instanceof Error) {
      return {
        message: "error",
      };
    } else {
      return {
        message: "generic error",
      };
    }
  }
};

export const getUser = async () => {
  const user = await currentUser();
  if (user) {
    return user;
  } else {
    // return redirect("/");
    throw new Error("user not authenticated");
  }
};

const isAdmin = async () => {
  const user = await getUser();
  if (user?.id !== process.env.ID_USER_ADMIN) redirect("/");
  return user;
};

export const fetchAdminProducts = async () => {
  let products = await prisma.products.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products;
};

export const deleteProduct = async (prevState: { productId: string }) => {
  "use server";
  await isAdmin();
  const { productId } = prevState;
  try {
    const product = await prisma.products.delete({
      where: {
        id: productId,
      },
    });
    await deleteImage(product.image);
    revalidatePath("/admin/products");
    return { message: "product deleted" };
  } catch (error: unknown) {
    return { message: "error form delete" };
  }
};
export const fetchAdminProductDetails = async ({
  productId,
}: {
  productId: string;
}) => {
  "use server";
  await isAdmin();

  const product = await prisma.products.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    // throw new Error("product not found");
    return redirect("/admin/products");
  }
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData,
) => {
  await isAdmin();

  try {
    const productId = formData.get("id") as string;
    const defaultValues = Object.fromEntries(formData);
    let dataValues = checkSchema(productsSchema, defaultValues);
    await prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        ...dataValues,
      },
    });
    revalidatePath(`/admin/${productId}/edit`);
  } catch (error) {
    console.log("error from product update", error);

    return { message: "error da product update" };
  }

  return { message: "product updated" };
};
export const updateProductImageAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const id = formData.get("id") as string;
    const url = formData.get("url") as string;
    const image = formData.get("image") as File;
    console.log("check this before schema", image);

    const validateImage = checkSchema(imageSchema, { image });
    console.log("aaaaaaaaa", validateImage);

    const productImage = await uploadImage(validateImage.image);
    await deleteImage(url);
    await prisma.products.update({
      where: {
        id: id,
      },
      data: {
        image: productImage,
      },
    });
    revalidatePath(`/admin/products/${id}/edit`);
    return { message: "product image updated" };
  } catch (error) {
    console.log(error);
    return { message: "error updating image" };
  }
};

export const checkFavoriteProduct = async ({
  productId,
}: {
  productId: string;
}) => {
  const user = await getUser();
  const favorite = await prisma.favorite.findFirst({
    where: {
      productId,
      clerkId: user?.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const actionFavoriteProduct = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathName: string;
}) => {
  const { productId, favoriteId, pathName } = prevState;
  try {
    const user = await getUser();
    if (favoriteId) {
      const test = await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
      console.log("this is the test", test);
    } else {
      await prisma.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }
    revalidatePath(pathName);
    return { message: `${favoriteId ? "removed from" : "added to"} faves` };
  } catch (error) {
    console.log("this is it", error);

    throw new Error("error from faves");
  }
};

export const fetchUserFavorites = async () => {
  const user = await getUser();
  const favorites = await prisma.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};
