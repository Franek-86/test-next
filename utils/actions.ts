"use server";
import { Search } from "lucide-react";
import { ActionType } from "./types";
import { prisma } from "../lib/prisma";
import { redirect } from "next/navigation";
import testImage from "@public/images/test.jpg";
import { auth, currentUser, getAuth } from "@clerk/nextjs/server";
import { imageSchema, productsSchema, reviewsSchema } from "./schemas";
import { error, log } from "console";
import { Cart } from "@/app/generated/prisma/client";
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
export const getAuthUser = async () => {
  const user = await currentUser();
  if (user) {
    return user;
  } else {
    return redirect("/");
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

export const createReviewAction = async (
  prevState: any,
  formData: FormData,
) => {
  try {
    const user = await getAuthUser();
    const data = Object.fromEntries(formData);
    const validatedData = checkSchema(reviewsSchema, data);
    await prisma.reviews.create({
      data: {
        ...validatedData,
        clerkId: user.id,
      },
    });
    revalidatePath(`/products/${validatedData.productId}`);
    return { message: "review created successfully" };
  } catch (error) {
    console.log("error", error);

    return { message: "error from create review" };
  }
};
export const fetchProductReviews = async ({
  productId,
}: {
  productId: string;
}) => {
  // try {
  const reviews = await prisma.reviews.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
  // } catch (error) {
  //   return { message: "error while fetching reviews" };
  // }
};
export const fetchRatings = async ({ productId }: { productId: string }) => {
  const reviews = await prisma.reviews.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });
  return {
    value: reviews[0]?._avg?.rating?.toFixed(1) || 0,
    amount: reviews[0]?._count?.rating || 0,
  };
};

export const fetchProductReviewsByUser = async () => {
  const user = await getUser();
  const reviews = await prisma.reviews.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return reviews;
};
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const user = await getUser();
  const { reviewId } = prevState;
  try {
    await prisma.reviews.delete({
      where: {
        clerkId: user.id,
        id: reviewId,
      },
    });
    revalidatePath("/reviews");
    return { message: "review deleted successfully" };
  } catch (error) {
    return { message: "error deleting review" };
  }
};

export const fetchExistingReview = async (
  userId: string,
  productId: string,
) => {
  return await prisma.reviews.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });
};

export const fetchCartItems = async () => {
  console.log(prisma);

  const { userId } = await auth();
  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });
  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  const product = await prisma.products.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new Error("there is no product with such id");
  }
};
const includeOptions = {
  cartItems: {
    include: {
      product: true,
    },
  },
};
export const fetchOrCreateCart = async ({
  userId,
  errorFlag = false,
}: {
  userId: string;
  errorFlag?: boolean;
}) => {
  let cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeOptions,
  });

  if (!cart && errorFlag) {
    throw new Error("There should be a cart");
  }
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeOptions,
    });
  }
  return cart;
};
const createOrUpdateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });

  if (cartItem) {
    await prisma.cartItem.updateMany({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    console.log("ee14 cart item creation", cartItem, "amount", amount);
    await prisma.cartItem.create({
      data: {
        cartId,
        productId,
        amount,
      },
    });
  }
};
export const updateCart = async (cart: Cart) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let numItemsInCart = 0;
  let totalItemsInCart = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    totalItemsInCart += item.amount * item.product.price;
  }
  console.log("zxcv", cart.shipping, cart.taxRate, totalItemsInCart);

  const tax = totalItemsInCart * cart.taxRate;
  const shipping = numItemsInCart ? cart.shipping : 0;
  // const shipping = cart.shipping;
  const orderTotal = totalItemsInCart + shipping + tax;
  let temp = await prisma.cart.update({
    where: {
      id: cart.id,
    },

    data: {
      tax,
      numItemsInCart,
      orderTotal,
      cartTotal: totalItemsInCart,
    },
  });
  return { temp, cartItems };
};
export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getUser();
  console.log("e11 user id", user.id);

  try {
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await createOrUpdateCartItem({ productId, cartId: cart.id, amount });
    await updateCart(cart);
  } catch (error) {
    console.log("error from update cart", error);

    throw new Error("error from add to cart");
  }
  redirect("/cart");
  return { message: "item successfully added" };
};

export const removeCartItem = async (prevState: any, formData: FormData) => {
  const user = await getUser();
  try {
    const cartId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({ userId: user.id, errorFlag: true });
    await prisma.cartItem.delete({
      where: {
        id: cartId,
        cartId: cart.id,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "item successfully removed" };
  } catch (error) {
    return { message: "error removing cart item" };
  }
};

export const updateCartItem = async ({
  id,
  amount,
}: {
  id: string;
  amount: number;
}) => {
  console.log("this is the amount I'm passing in:", amount);

  const user = await getUser();
  try {
    const cart = await fetchOrCreateCart({ userId: user.id, errorFlag: true });
    await prisma.cartItem.update({
      where: {
        id: id,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });
    await updateCart(cart);
    revalidatePath("cart");
    return { message: "item successfully updated" };
  } catch (error) {
    return { message: "error updating cart item" };
  }
};

export const createOrder = async () => {
  const user = await getUser();
  let cartId: null | string = null;
  let orderId: null | string = null;
  try {
    const cart = await fetchOrCreateCart({ userId: user.id, errorFlag: true });
    cartId = cart.id;
    await prisma.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });
    const order = await prisma.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        tax: cart.tax,
        shipping: cart.shipping,
        totalOrder: cart.orderTotal,
        email: user.emailAddresses[0].emailAddress,
        isPaid: true,
      },
    });
    orderId = order.id;
  } catch (error) {
    return { message: "error placing order" };
  }

  redirect(`/checkout?cartId=${cartId}&orderId=${orderId}`);
};

export const fetchUserOrders = async () => {
  const user = await getUser();

  const orders = await prisma.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
  });
  // revalidatePath("/orders");
  return orders;
};

export const fetchAdminOrders = async () => {
  await isAdmin();

  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
  });
  return orders;
};
