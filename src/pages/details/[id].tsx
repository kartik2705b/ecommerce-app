import InformationCard from "@/components/InformationCard";
import React, { useEffect, useState } from "react";
import RelatedCarousel from "@/components/RelatedCarousel";
import { useProductsContext } from "@/contexts/ProductsContext";
import { useRouter } from "next/router";
import { Product } from "@/lib/product";
import { useCartContext } from "@/contexts/CartContext";
import Carousel from "@/components/Carousel";
import useFetch from "@/hooks/useFetch";
import { useAuthContext } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

const DetailsPage = () => {
  const id = useRouter().query.id;
  const { fetchData, data, error, loading } = useFetch({
    url: `/product/${id}`,
    onRender: false,
  });
  // const { products } = useProductsContext();
  const { addProductToCart } = useCartContext();
  // const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [imageIdx, setImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { loggedIn } = useAuthContext();
  const router = useRouter();
  // const [image, setImage] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchData();
      // setProduct(data);
    }
    // fetchData();
    // console.log(router.query.id);
    // setProduct(data);
    console.log(data);
  }, [id]);

  useEffect(() => {
    setProduct(data);
  }, [data]);

  const addToCart = async () => {
    if (!loggedIn) {
      await router.push("/login");
      return;
    }
    addProductToCart(product, quantity);
    toast.success("Product added to cart!");
  };

  const changeImage = (idx) => {
    // setImage(img);
    setImageIdx(idx);
  };

  console.log(product);

  return (
    <div className="flex justify-center text-sm text-gray-800">
      <div className="w-full  lg:w-4/5">
        <div className="flex items-center justify-between">
          <div className="my-10 text-gray-700">
            <span className="mx-1">Home</span>/
            <span className="mx-1">{product?.category}</span>/
            <span className="mx-1 text-gray-500">{product?.name}</span>
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
              src={product?.images[imageIdx].url}
              alt=""
              className="h-2/3 lg:w-full object-cover"
            />
            <div className="flex my-4">
              {product?.images.map((img, idx) => {
                return (
                  <img
                    key={idx}
                    onClick={() => changeImage(idx)}
                    src={img.url}
                    alt=""
                    className="w-10 h-10 object-cover border-black border mx-2"
                  />
                );
              })}
            </div>
            <div className="text-justify">{product?.secondary_description}</div>
          </div>
          <div className="">
            <h1 className="text-4xl text-black font-medium mb-3">
              {product?.name}
            </h1>
            <p>SKU: {product?.sku_id}</p>
            <p className="text-orange-500 my-4">
              <span className="mr-2">${product?.price}</span>
            </p>
            <div className="my-4">
              <p className="mb-2">Color</p>
              <div className="flex gap-3">
                {product?.colors.map((color, idx) => {
                  return (
                    <div
                      key={idx}
                      className="rounded-full w-4 h-4 border"
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
            </div>

            <div className="my-4">
              <p className="mb-2">Size</p>
              <select className="w-full border bg-white px-2 py-1 focus:outline-none">
                {product?.sizes.map((size, idx) => {
                  return (
                    <option key={idx} value={size}>
                      {size}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="my-4">
              <p className="mb-2">Quantity</p>
              <input
                type="text"
                placeholder="1"
                className="border px-2 focus:outline-none py-1 bg-white w-10"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
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
            {/* <button className="bg-black mt-4 text-white px-4 py-2 block h-10 w-full">
              Buy Now
            </button> */}

            <div className="mt-4">
              {product?.extra_fields.map((info, idx) => {
                return (
                  <InformationCard key={idx} title={info.title}>
                    {info.description}
                  </InformationCard>
                );
              })}
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
