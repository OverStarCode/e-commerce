"use client";
import ProductDetailsCard from "@/components/prodcutDetailsCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


function ProductDetails() {
  const router = useRouter();
  const productid = useParams().productid;

  const [product, setProduct] = useState({});


  const jwt = Cookies.get("jwtToken");
  if(jwt == undefined) {
    router.replace("/login")
  }

  const fetchProduct = () => {
    axios
      .get(`http://localhost:3030/get_product/${productid}`)
      .then(function (response) {
        console.log(response);
        setProduct(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToBasketClick = () => {
    // Send a POST request to add the product to the basket
    axios
      .post("http://localhost:3030/add_to_basket", {
        product_id: product.id,
        user_id: 1,
      })
      .then((response) => {
        console.log(response);
        router.push("/cart");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mx-auto mb-32">
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
        Prodcut Details
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
        home/prodcut Details
      </h3>

      {product?.name && (
        <div className="mt-10 mx-auto w-fit">
          <ProductDetailsCard
            productName={product.name}
            productResturant={product.resturant}
            prodcutPrice={product.price}
            handleClick={() => handleAddToBasketClick()}
            buttonText="ADD TO Basket"
          />
        </div>
      )}

      <p
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "28px",
          fontWeight: "600",
          lineHeight: "22px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          color: "#EC362B",
          marginTop: "30px",
          marginBottom: "20px",
        }}
      >
        Supplier
      </p>

      <div className="flex gap-2 ">
        <Image
          alt="Supplier"
          src="/images/products/product.png"
          width={300}
          height={200}
          className="rounded-r-full rounded-l-md"
        />

        <div className="flex gap-1 flex-col pt-3">
          <p className="flex items-center justify-center gap-1">
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
            <Star className="text-yellow-500" />
            <Star />
          </p>
          <h2
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "26px",
              fontWeight: "600",
              lineHeight: "31.21px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
            }}
          >
            {product.name}
          </h2>

          <h3
            style={{
              fontFamily: "Cyntho Next",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "24px",
              textAlign: "left",
              textUnderlinePosition: "from-font",
              textDecorationSkipInk: "none",
              color: "#EC362B80",
            }}
          >
            {product.resturant}
          </h3>
        </div>
      </div>

      <p
        style={{
          fontFamily: "Cyntho Next",
          fontSize: "28px",
          fontWeight: "600",
          lineHeight: "22px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
          color: "#EC362B",
          marginTop: "5M0px",
          marginBottom: "20px",
        }}
      >
        Description
      </p>

      <div>
        <p
          style={{
            fontFamily: "Cyntho Next",
            fontSize: "22px",
            fontWeight: "400",
            lineHeight: "22px",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            color: "gray",
          }}
        >
          {product.description}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
