import { prisma } from "@/lib/prisma";
import { type NextRequest } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const { orderId, cartId } = await req.json();
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });
  if (!cart || !order) {
    return Response.json(null, { status: 404, statusText: "not found" });
  }
  // enum Tax {
  //   exclusive = "exclusive",
  //   inclusive = "inclusive",
  // }
  const line_items = cart.cartItems.map((item) => {
    return {
      shipping_cost: 100,
      quantity: item.amount,
      price_data: {
        currency: "eur",
        unit_amount: item.product.price * 100,
        // tax_behavior: Tax.exclusive,
        product_data: {
          name: item.product.name,
          images: [item.product.image],
        },
      },
    };
  });
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded_page",
    metadata: { cartId, orderId },
    line_items: line_items,
    mode: "payment",
    return_url: `${origin}/temp/confirmation?session_id={CHECKOUT_SESSION_ID}`,
  });

  try {
    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log("this is the error from catch", error);
    Response.json(null, {
      status: 500,
      statusText: "generic error",
    });
  }
};
