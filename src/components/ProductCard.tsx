"use client";

import { Product } from "@/utils/types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAdded(true);
  };

  return (
    <div className="border bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <button
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md text-gray-500 hover:text-red-500 transition-colors duration-300"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <AiFillHeart className="text-red-500 w-6 h-6" />
          ) : (
            <AiOutlineHeart className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
        <p className="text-gray-600">{product.category}</p>
        <p className="text-gray-900 font-bold mt-2">${product.price} USD</p>
        <p className="text-sm text-gray-600">Brand new</p>
        <div className="mt-2 flex items-center">
          <span className="mr-1 text-gray-800">{product.rating.rate} ⭐</span>
          <span className="text-sm text-gray-600">
            ({product.rating.count} reviews)
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg hover:bg-gray-600 transition-all"
        >
          {isAdded ? "Added" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
