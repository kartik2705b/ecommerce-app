import { Product } from "@/lib/product";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  product: Product;
  id: number;
}

const ProductCard: React.FC<Props> = ({ product, id }) => {
  return (
    <Link href={`/details/${id}`} className="">
      {/* <img
        src={product["product-image-url"]}
        className="w-full h-72 object-top object-cover bg-top bg-gray-300"
      ></img> */}
      <div className="relative z-0">
        <Image
          src={product.url}
          alt=""
          width={200}
          height={400}
          className="w-full z-0"
        ></Image>
        {product.bestseller && (
          <div className="absolute top-0 left-0 bg-orange-500 px-2 py-1 text-white">
            Bestseller
          </div>
        )}
        <div className="font-medium text-sm text-gray-600">
          {product.product_name}
        </div>
        <div className="text-orange-400 font-medium text-sm">
          ${product.price}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
