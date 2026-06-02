import Stripe from "stripe";
import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export const GET = async (req: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const cartId = session?.metadata?.cartId;
    const orderId = session?.metadata?.orderId;
    if (session.status === "complete") {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          isPaid: true,
        },
      });
      await prisma.cart.delete({
        where: {
          id: cartId,
        },
      });
    }
  } catch (error) {
    console.log("this is the error from catch", error);
    return Response.json(null, { status: 500, statusText: "generic error" });
  }
  return redirect("/orders");
};
