import React, { useEffect, useState } from "react";
import { images_data } from "@/lib/image_data";
import { Product } from "@/lib/product";
import { api } from "@/utils/axios";

const RelatedCarousel = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(4);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // `http://localhost:9001/product/search?search=${search}&page=${page}&category=${category}`;

    const fetchProducts = async () => {
      try {
        const data = (await api.get("/product/search?page=1")).data;
        const output = data.products;

        setProducts([...output]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const moveLeft = () => {
    if (startIdx === 0) {
      return;
    }
    setStartIdx(startIdx - 1);
    setEndIdx(endIdx - 1);
  };
  const moveRight = () => {
    if (endIdx === images_data.length - 1) {
      return;
    }
    setStartIdx(startIdx + 1);
    setEndIdx(endIdx + 1);
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        className="hidden lg:block text-4xl px-3 py-3 font-bold"
        onClick={moveLeft}
      >
        {"<"}
      </button>
      <div className="hidden lg:grid lg:grid-cols-4  gap-6">
        {/* {images_data.slice(startIdx, endIdx).map((image, idx) => {
          return (
            <img
              key={idx}
              src={image.url}
              className="h-60 w-64 object-cover"
            ></img>
          );
        })} */}
        {products.slice(startIdx, endIdx).map((product, idx) => {
          return (
            <img
              key={idx}
              src={product.images[0].url}
              className="h-60 w-64 object-cover"
            ></img>
          );
        })}
      </div>

      <button
        className="hidden lg:block text-4xl px-3 py-3 font-bold"
        onClick={moveRight}
      >
        {">"}
      </button>
    </div>
  );
};

export default RelatedCarousel;
