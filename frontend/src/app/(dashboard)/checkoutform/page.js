"use client";

import CheckoutPage from "@/components/CheckoutPage";
import { CheckoutContext } from "@/context/contextProvider";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const [amount, setAmount] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [basketItems, setBasketItems] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("jwtToken");

    if (token) {
      setJwtToken(token);

      try {
        // Decode the JWT token
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);

        getItemsUserHaveInThebasket();
      } catch (error) {
        console.error("Failed to decode JWT", error);
      }
    }
  }, []);

  const getItemsUserHaveInThebasket = async () => {
    try {
      await axios
        .get(
          `http://localhost:3030/api/baskets/get_user_basket_items/${localStorage.getItem(
            "user_id"
          )}`
        )
        .then((response) => {
          setBasketItems(response.data);
          console.log(response.data);

          if (basketItems && basketItems.length > 0) {
            const totalPrice = basketItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            setAmount(totalPrice);
          }
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });

      
    } catch (err) {
      console.log(err);
    }

    setLoading(false);

  };
  useEffect(() => {
    if (basketItems && basketItems.length > 0) {
      const totalPrice = basketItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setAmount(totalPrice);
    }
  }, [basketItems]);

  if (loading || amount < 0 || amount == null) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Buzzer</h1>
        <h2 className="text-2xl">
          Request to pay
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount,100),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={amount} />
        </Elements>
    </main>
  );
}
