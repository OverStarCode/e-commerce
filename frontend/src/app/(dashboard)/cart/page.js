"use client";
import React, { useContext, useEffect, useState } from "react";
import ProductDetailsCard from "@/components/prodcutDetailsCard";
import { CheckoutContext } from "@/context/contextProvider";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ArrowBigRightDash, Delete, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function Cart() {
  const [basketItems, setBasketItems] = useState(null); // Initially null to avoid hydration issues
  const [isHydrated, setIsHydrated] = useState(false); // To track hydration
  const [loading, setLoading] = useState(true); // Added loading state to handle async data fetch
  const [jwt, setJwt] = useState(""); // Added state to store JWT
  const router = useRouter();
  const { CheckOutDetails, setCheckOutDetails } = useContext(CheckoutContext);
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

  // Decode JWT and extract user information safely
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

  // Handle proceeding to checkout
  const handleProccedToCheckOutClick = () => {
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
      router.push("/checkout");
    }
  };

  // Fetch items in the user's basket

  // Handle deleting an item from the basket
  const handleDeleteItemFromBasket = async (product_id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    try {
      await axios
        .post(`http://localhost:3030/api/baskets/delete_from_basket`, {
          product_id,
          user_id: localStorage.getItem("user_id"),
        })
        .then(() => {
          getItemsUserHaveInThebasket();

          toast.success("Successfully deleted one element in the basket");
          // Refresh the basket after deletion
        })
        .catch((err) => {
          alert("Failed to delete item from basket");
        });
    } catch (err) {
      alert("Failed to delete item from basket");
    }
  };

  // Check user authentication and fetch items on component mount

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" />
      <h1
        className="mx-auto mt-5 px-4 w-fit"
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "50px",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Baskets
      </h1>
      <h3
        className="mx-auto px-1 w-fit"
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "22px",
          textAlign: "center",
        }}
      >
        home/cart
      </h3>

      <div className="mt-10 mx-auto w-fit min-w-72 mb-12">
        <ProductDetailsCard
          productName="Butter Sandwich"
          productResturant="SAR 300"
          prodcutPrice="SAR 300"
          handleClick={handleProccedToCheckOutClick}
          buttonText="PROCEED TO CHECKOUT"
        />
      </div>

      <div className="flex gap-6 justify-center items-center mt-10 flex-wrap shadow-sm border-2 border-solid border-gray-200 p-8 rounded-md mb-24">
        {basketItems && basketItems.length > 0 && !loading ? (
          basketItems.map((product) => (
            <div
              key={product.product_id}
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
                      textAlign: "left",
                    }}
                  >
                    {product.name}
                  </h3>
                  <Link
                    href={`/productdetails/${product.id}`}
                    style={{
                      fontFamily: "Cyntho Next",
                      fontSize: "20px",
                      textDecoration: "underline",
                      color: "#FFBB15",
                    }}
                  >
                    view details
                  </Link>
                </div>
                <Trash2
                  onClick={() => handleDeleteItemFromBasket(product.product_id)}
                  size={30}
                  className="cursor-pointer text-red-600"
                />
              </div>

              <div className="flex flex-col gap-2 w-fit justify-center items-start m-auto">
                <div className="flex gap-7">
                  <h2
                    className="flex-grow"
                    style={{
                      fontFamily: "Cyntho Next",
                      fontSize: "22px",
                      color: "#00000080",
                    }}
                  >
                    Price
                  </h2>
                  <p
                    className="flex-grow"
                    style={{ fontFamily: "Cyntho Next", fontSize: "22px" }}
                  >
                    :{" "}
                  </p>
                  <h3
                    className="flex-grow"
                    style={{
                      fontFamily: "Cyntho Next",
                      fontSize: "22px",
                      fontWeight: "500",
                      color: "#EC362B",
                    }}
                  >
                    {product.price}
                  </h3>
                </div>
                <div className="flex gap-7">
                  <h2
                    className="flex-grow"
                    style={{
                      fontFamily: "Cyntho Next",
                      fontSize: "22px",
                      color: "#00000080",
                    }}
                  >
                    Quantity
                  </h2>
                  <p
                    className="flex-grow"
                    style={{ fontFamily: "Cyntho Next", fontSize: "22px" }}
                  >
                    :
                  </p>
                  <h3
                    className="flex-grow"
                    style={{
                      fontFamily: "Cyntho Next",
                      fontSize: "22px",
                      fontWeight: "500",
                    }}
                  >
                    {product.quantity}
                  </h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center flex-col py-6 bg-gray-100 rounded-lg shadow-md text-xl font-semibold text-gray-600 space-y-4 min-w-72 my-10">
          <div>No items in basket</div>
          <button
            onClick={()=>{
              router.push('/')
            }}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all ease-in-out duration-300 transform hover:scale-105"
          >
            Go to Home
          </button>
        </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
