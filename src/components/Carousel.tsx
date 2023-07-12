import React, { useState } from "react";
import { images_data } from "@/lib/image_data";
import Image from "next/image";

const Carousel = () => {
  let scrollLeft = 0;

  const moveLeft = () => {
    const box = document.getElementById("box");
    const width = box?.clientWidth || 0;
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
        {images_data.map((image, idx) => {
          return (
            <Image
              key={idx}
              src={image.url}
              className=""
              alt="a"
              width={160}
              height={100}
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
