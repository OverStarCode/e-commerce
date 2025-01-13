"use client";
import ProductDetailsCard from "@/components/prodcutDetailsCard";
import { CheckoutContext } from "@/context/contextProvider";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ArrowBigRightDash, Link, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

function CheckOut() {
  const { CheckOutDetails, setCheckOutDetails } = useContext(CheckoutContext);
  const router = useRouter();
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [amount, setAmount] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  // Check if user has a valid JWT and return true/false
  useEffect(() => {
    // This ensures that cookies are read only on the client-side (after the initial render)
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
      const response = await axios.get(
        `http://localhost:3030/api/baskets/get_user_basket_items/${localStorage.getItem(
          "user_id"
        )}`
      );
      setBasketItems(response.data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false); // Set loading to false after data is fetched
  };

  const handlePlaceOrderClick = () => {
    if (basketItems && basketItems.length > 0) {
      const totalPrice = basketItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setAmount(totalPrice);
    }

    if (amount != null) {
      alert("Proceed to checkout");
    }
    if (amount > 0) {
      router.push("/checkoutform");
    }
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
  return (
    <div className="container mx-auto">
      <h1
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "50px",
          fontWeight: "600",
          lineHeight: "70px",
          textAlign: "center",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
        className="mx-auto mt-5 px-4 w-fit"
      >
        CheckOut
      </h1>
      <h3
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "22px",
          fontWeight: "400",
          lineHeight: "22px",
          textAlign: "center",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
        className="mx-auto px-1 w-fit"
      >
        Home/Basket
      </h3>

      <div className="mt-10 mx-auto w-fit min-w-72 mb-12">
        <ProductDetailsCard
          productName="Butter Sandwich"
          productResturant="SAR 300"
          prodcutPrice="SAR 300"
          handleClick={handlePlaceOrderClick}
          buttonText="Place Order"
        />
      </div>

      <div className="rounded-md border-2 border-gray-400 border-solid p-3 pt-6 pl-6">
        <h1
          style={{
            fontFamily: "Cyntho Next",
            fontSize: "28px",
            fontWeight: "600",
            lineHeight: "22px",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            color: "#EC362B",
          }}
        >
          Payment Method
        </h1>

        {/* Stripe payment form */}

        <div className="flex gap-2 p-10">
          <input
            className="scale-150"
            type="radio"
            name="payment"
            id="payment"
          />
          <label
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "24px",
              fontWeight: "500",
              lineHeight: "34px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",

              color: "#20202080",
            }}
            htmlFor="payment"
          >
            pay with cridet card
          </label>
        </div>
      </div>
      <h1
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "28px",
          fontWeight: "600",
          lineHeight: "22px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          color: "#EC362B",
          marginTop: "50px",
          marginBottom: "3px",
        }}
      >
        Order Items
      </h1>

      {loading ? (
        <div>Loading...</div> // Loading state while data is being fetched
      ) : basketItems.length > 0 ? (
        <div className="flex gap-6 justify-center items-center mt-10 flex-wrap shadow-sm border-2 border-solid border-gray-200 p-8 rounded-md mb-24">
          {basketItems.map((product) => (
            <div
              key={product.id} // Use a unique key for each item
              className="shadow-sm border-2 lg:basis-[45%] max-md:basis-[80%] border-solid border-gray-200 p-5 rounded-md"
            >
              <div className="flex gap-3">
                <Image
                  alt="sandwich"
                  src="/images/products/product.png"
                  height={100}
                  width={140}
                  className="rounded-full"
                />

                <div className="pt-2 mr-10 flex flex-col gap-2">
                  <div className="flex gap-1">
                    <Star fill="orange" color="orange" />
                    <Star fill="orange" color="orange" />
                    <Star fill="orange" color="orange" />
                    <Star fill="orange" color="orange" />
                    <Star />
                  </div>
                  <h3
                    style={{
                      fontFamily: "Cyntho Next",
                      fontSize: "26px",
                      fontWeight: "600",
                      lineHeight: "31.21px",
                      textWrap: "nowrap",
                      textAlign: "left",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                    }}
                  >
                    {product.name}
                  </h3>

                  <a
                    href={`/productdetails/${product.id}`}
                    style={{
                      fontFamily: "Cyntho Next",
                      fontSize: "20px",
                      fontWeight: "500",
                      lineHeight: "24px",
                      textAlign: "left",
                      textDecorationLine: "underline",
                      textDecorationStyle: "solid",
                      textUnderlinePosition: "from-font",
                      textDecorationSkipInk: "none",
                      color: "#FFBB15",
                    }}
                  >
                    view details
                  </a>
                </div>

                <Trash2
                  onClick={() => {
                    // Handle item delete here
                  }}
                  size={30}
                  className="cursor-pointer text-red-600"
                />
              </div>

              {/* Other product details */}
              <div className="flex gap-3 justify-evenly items-center mt-2">
                <p
                  style={{
                    fontFamily: "Cyntho Next",
                    fontSize: "24px",
                    fontWeight: "400",
                    lineHeight: "28.8px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}
                >
                  Quantity: {product.quantity}
                </p>
                <p
                  style={{
                    fontFamily: "Cyntho Next",
                    fontSize: "24px",
                    fontWeight: "400",
                    lineHeight: "28.8px",
                    textAlign: "left",
                    textUnderlinePosition: "from-font",
                    textDecorationSkipInk: "none",
                  }}
                >
                  Price: {product.price} SAR
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-10 justify-center items-center mt-10">
          <h2
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "22px",
              fontWeight: "600",
              lineHeight: "26.4px",
              textAlign: "center",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "#00000080",
            }}
          >
            Your cart is empty
          </h2>
          <a
            href={`/`}
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "24px",
              textAlign: "center",
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "#FFBB15",
            }}
          >
            Start shopping
            <ArrowBigRightDash size={30} />
          </a>
        </div>
      )}

      {basketItems.length > 0 && (
        <div className="w-[500px] mx-auto  p-7 flex flex-col gap-4 rounded-md border-2 border-gray-200 border-solid mb-8">
          <h1
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "35px",
              fontWeight: "600",
              lineHeight: "45px",
              textAlign: "center",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            Product Summary
          </h1>

          <hr className="bg-black h-[1px]" />
          {/* Product summary details */}

          {/* Total price */}
          <div className="flex justify-between items-center py-4">
            <p className="text-lg font-semibold text-gray-800">Total Price:</p>
            <p className="text-lg font-semibold text-gray-800">{amount}$</p>
          </div>

          {/* Checkout Button */}
          <div className="mt-6">
            <button
              onClick={handlePlaceOrderClick}
              className="w-full md:w-48 h-12 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all ease-in-out"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
