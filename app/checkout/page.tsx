"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
);
const CheckoutPage = async () => {
  const params = useSearchParams();
  const cartId = params.get("cartId");
  const orderId = params.get("orderId");
  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post("temp/payment", {
      cartId,
      orderId,
    });

    return response.data.clientSecret;
  }, []);
  const options = { fetchClientSecret };
  return (
    <div id='checkout'>
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutPage;
