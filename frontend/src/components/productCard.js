"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";

function ProductCard({ product, handleAddToBasketClick }) {
  return (
    <div className="flex flex-col gap-2 items-center  rounded-md  min-w-[200px] shadow-md hover:shadow-2xl">
     <Toaster position="top-center"/>
      <Image
        className="rounded-b-full"
        alt={product.name}
        src="/images/products/product.png"
        width={300}
        height={150}
      />

      <span className="flex gap-1 text-orange-500">
        <Star fill="orange" />
        <Star fill="orange" />
        <Star fill="orange" />
        <Star fill="orange" />
        <Star />
      </span>

      <h2 className="text-gray-900 text-xl font-bold">{product.name}</h2>
      <p style={{"fontFamily":"Cyntho Next","fontSize":"20px","fontWeight":"500","lineHeight":"24px","textAlign":"left","textUnderlinePosition":"from-font","textDecorationSkipInk":"none",
      color: "#00000080"
      }} className="text-gray-700 text-sm"> {product.restaurant}</p>
      <p
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
        className="text-gray-700 text-sm mb-3"
      >
        restaurant
      </p>

      <div className="flex gap-2 items-center mb-5 mx-4">
        {product.addItemStatus ? (
          <Link href={`/cart`}>
            <button
              onClick={handleAddToBasketClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add to Cart
            </button>
          </Link>
        ) : (
          <button
            onClick={handleAddToBasketClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add to Cart
          </button>
        )}

        <Link href={`/productdetails/${product.id}`}>
          <button className="bg-gray-400 text-white px-4 py-2 rounded-md">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
