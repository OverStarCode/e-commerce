'use client'
import { Star } from 'lucide-react';
import React from 'react';

const ProductDetailsCard = ({productResturant,productName,prodcutPrice,handleClick,buttonText}) => {
    console.log(productResturant,productName)
  return (
    <div className="max-w-sm rounded-lg border border-gray-300 shadow-md p-4 bg-white">
      <div className="flex justify-between items-center my-3">
        <span className="flex gap-1 text-orange-500" >
          <Star fill='orange'/>
          <Star fill='orange'/>
          <Star fill='orange'/>
          <Star fill='orange'/>
          <Star />
        </span>
        <span className="text-gray-400 ml-2">{productResturant}</span>
      </div>
      <h2 className="text-lg font-bold mb-2">{productName}</h2>
      <div className="flex justify-between mb-4">
        <span className="text-xl font-semibold">{prodcutPrice}$</span>
        <span className="text-gray-400 line-through">SAR 89</span>
      </div>
      <button onClick={handleClick} className="w-full py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600">
        {buttonText}
      </button>
    </div>
  );
};

export default ProductDetailsCard;