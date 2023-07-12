import InformationCard from "@/components/InformationCard";
import React, { useEffect, useState } from "react";
import RelatedCarousel from "@/components/RelatedCarousel";
import { useProductsContext } from "@/contexts/ProductsContext";
import { useRouter } from "next/router";
import { Product } from "@/lib/product";
import { useCartContext } from "@/contexts/CartContext";
import Carousel from "@/components/Carousel";

const DetailsPage = () => {
  const { products } = useProductsContext();
  const { addProductToCart } = useCartContext();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const id = Number(router.query.id);
    console.log(id);
    setProduct(products[id]);
  }, [router.query.id, products]);

  const addToCart = () => {
    addProductToCart(product);
  };

  return (
    <div className="flex justify-center text-sm text-gray-800">
      <div className="w-full  lg:w-4/5">
        <div className="flex items-center justify-between">
          <div className="my-10 text-gray-700">
            <span className="mx-1">Home</span>/
            <span className="mx-1">Women</span>/
            <span className="mx-1 text-gray-500">{product?.product_name}</span>
          </div>
          <div className="" style={{ wordSpacing: "10px" }}>
            <span className="mx-1">{"<"}</span>
            Prev | Next
            <span className="mx-1">{">"}</span>
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="">
            <img
              src={product?.url || ""}
              alt=""
              className="h-auto lg:w-full object-cover"
            />
            <div className="flex my-4">
              <img
                src="https://assets.ajio.com/medias/sys_master/root/ajio/catalog/5eff26aff997dd433b487123/-473Wx593H-410223788-navy-MODEL.jpg"
                alt=""
                className="w-10 h-10 object-cover border border-black mx-2"
              />
              <img
                src="https://assets.ajio.com/medias/sys_master/root/ajio/catalog/5eff26aff997dd433b487123/-473Wx593H-410223788-navy-MODEL.jpg"
                alt=""
                className="w-10 h-10 object-cover border border-black mx-2"
              />
              <img
                src="https://assets.ajio.com/medias/sys_master/root/ajio/catalog/5eff26aff997dd433b487123/-473Wx593H-410223788-navy-MODEL.jpg"
                alt=""
                className="w-10 h-10 object-cover border border-black mx-2"
              />
              <img
                src="https://assets.ajio.com/medias/sys_master/root/ajio/catalog/5eff26aff997dd433b487123/-473Wx593H-410223788-navy-MODEL.jpg"
                alt=""
                className="w-10 h-10 object-cover border border-black mx-2"
              />
            </div>
            <div className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex ipsum
              maiores ea illo ducimus fugit cupiditate minima est ab aut
              mollitia nesciunt repellat debitis animi libero soluta eos, nobis
              voluptatem.
            </div>
          </div>
          <div className="">
            <h1 className="text-4xl text-black font-medium mb-3">
              {product?.product_name}
            </h1>
            <p>SKU: 0011</p>
            <p className="text-orange-500 my-4">
              <span className="line-through mr-2">$42</span>
              <span>$39.90</span>
            </p>
            <div className="my-4">
              <p className="mb-2">Color</p>
              <div className="flex gap-3">
                <div className="rounded-full bg-red-600 w-4 h-4 border"></div>
                <div className="rounded-full bg-white w-4 h-4 border"></div>
              </div>
            </div>

            <div className="my-4">
              <p className="mb-2">Size</p>
              <select className="w-full border bg-white px-2 py-1 focus:outline-none">
                <option value="volvo">Small</option>
                <option value="saab">Large</option>
                <option value="mercedes">Xl</option>
                <option value="audi">XXL</option>
              </select>
            </div>

            <div className="my-4">
              <p className="mb-2">Quantity</p>
              <input
                type="text"
                placeholder="1"
                className="border px-2 focus:outline-none py-1 bg-white w-10"
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                className="bg-orange-500 text-white px-4 py-2 block h-10 w-full"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <button className="px-1 py-1 border border-orange-500 text-orange-500 h-10 w-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                  className="text-orange-500"
                >
                  <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                </svg>
              </button>
            </div>
            <button className="bg-black mt-4 text-white px-4 py-2 block h-10 w-full">
              Buy Now
            </button>

            <div className="mt-4">
              <InformationCard title="PRODUCT INFO">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus odio doloribus voluptates. Ab tempore sunt illo ut!
                Dolores, nobis expedita officiis nesciunt vero totam incidunt,
                sint et at animi iste!
              </InformationCard>
              <InformationCard title="RETURN AND REFUND POLICY">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus odio doloribus voluptates. Ab tempore sunt illo ut!
                Dolores, nobis expedita officiis nesciunt vero totam incidunt,
                sint et at animi iste!
              </InformationCard>
              <InformationCard title="SHIPPING INFO">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus odio doloribus voluptates. Ab tempore sunt illo ut!
                Dolores, nobis expedita officiis nesciunt vero totam incidunt,
                sint et at animi iste!
              </InformationCard>
            </div>
          </div>
        </section>

        <div className="mt-10">
          <h1 className="text-4xl text-center text-black font-medium">
            Related Products
          </h1>

          {/* <RelatedCarousel></RelatedCarousel> */}
          <Carousel></Carousel>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
