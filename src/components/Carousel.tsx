import React, { useEffect, useState } from "react";
import { images_data } from "@/lib/image_data";
import Image from "next/image";
import { Product } from "@/lib/product";
import { api } from "@/utils/axios";
import { useRouter } from "next/router";

const Carousel = () => {
  let scrollLeft = 0;

  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

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
    const box = document.getElementById("box");
    const width = box?.clientWidth || 0;

    const boxWidth = document.getElementsByClassName("data")[0].clientWidth;
    const scrollWidth = box?.scrollWidth ?? boxWidth;

    // console.log(box?.scrollWidth);
    if (box && scrollLeft + width <= box.scrollWidth) {
      scrollLeft += width;
      box.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };
  const moveRight = () => {
    const box = document.getElementById("box");
    const width = box?.clientWidth || 0;

    if (box && scrollLeft - width >= 0) {
      scrollLeft -= width;
      box.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <button
        className="hidden lg:block text-4xl px-3 py-3 font-bold"
        onClick={moveRight}
      >
        {"<"}
      </button>
      <div
        id="box"
        className="no-scrollbar flex gap-6 overflow-x-scroll overflow-y-hidden"
      >
        {/* {images_data.map((image, idx) => {
          return (
            <Image
              key={idx}
              src={image.url}
              className="data"
              alt="a"
              width={160}
              height={100}
            ></Image>
          );
        })} */}
        {products.map((product, idx) => {
          return (
            <Image
              key={product?._id}
              src={product.images[0].url}
              className="data"
              alt="a"
              width={160}
              height={100}
              onClick={() => router.push(`/details/${product?._id}`)}
            ></Image>
          );
        })}
      </div>

      <button
        className="hidden lg:block text-4xl px-3 py-3 font-bold"
        onClick={moveLeft}
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
