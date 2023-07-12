import React, { useState } from "react";
import { images_data } from "@/lib/image_data";

const RelatedCarousel = () => {
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(Math.min(images_data.length, 4));

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
        {images_data.slice(startIdx, endIdx).map((image, idx) => {
          return (
            <img
              key={idx}
              src={image.url}
              className="h-60 w-64 object-cover"
            ></img>
          );
        })}
      </div>
      <div className="flex overflow-scroll lg:hidden gap-2">
        {images_data.map((image, idx) => {
          return (
            <img
              key={idx}
              src={image.url}
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
