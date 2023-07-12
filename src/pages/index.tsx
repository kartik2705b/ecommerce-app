import Image from "next/image";
import { Inter } from "next/font/google";
import product_data from "@/lib/product_data";
import ProductCard from "@/components/ProductCard";
import useFetch from "@/hooks/useFetch";
import { useProductsContext } from "@/contexts/ProductsContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { products } = useProductsContext();

  return (
    <>
      <div className="bg-orange-500  px-5 py-5 flex gap-3 text-white items-center justify-center flex-col">
        <p className="text-4xl font-medium">FREE SHIPPING</p>
        <p className="text-2xl font-normal text-center">
          ON ORDERS OVER $50 - USE COUPON CODE OVER50
        </p>
        <div className="flex gap-1 lg:gap-10 mt-3 flex-col lg:flex-row">
          <div className="border-white border-2 px-8 py-1 hover:bg-orange-600">
            Shop Women
          </div>
          <div className="border-white border-2 px-8 py-1 hover:bg-orange-600">
            Shop Men
          </div>
          <div className="border-white border-2 px-8 py-1 hover:bg-orange-600">
            Shop Sale
          </div>
        </div>
      </div>
      <div className="relative ">
        <div className="z-0 w-full mt-3 mb-14 bg-gray-200 flex flex-wrap overflow-hidden">
          <div className="w-full sm:w-1/2 lg:w-3/12 overflow-hidden  h-80">
            <Image
              src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/d/9/tr:w-960,/d9456aaNYKF_GLOOT00000238_1.jpg?rnd=20200526195200"
              alt=""
              className="h-full object-cover object-top"
              width={600}
              height={200}
            ></Image>
          </div>
          <div className="w-full sm:w-1/2 lg:w-3/12 overflow-hidden h-80">
            <Image
              src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/4/tr:w-960,/647c231P-53923701_1.jpg?rnd=20200526195200"
              alt=""
              className="h-full object-cover object-top"
              width={600}
              height={200}
            ></Image>
          </div>
          <div className="w-full lg:w-6/12 overflow-hidden  h-80">
            <Image
              src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/2/tr:w-960,/829baf8KL_THECB00013476_1.jpg?rnd=20200526195200"
              alt=""
              className="h-full object-cover object-top"
              width={1200}
              height={200}
            ></Image>
          </div>
          {/* <div className="col-span-1 sm:col-span-2 flex">
            <img
              src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/6/4/tr:w-960,/647c231P-53923701_1.jpg?rnd=20200526195200"
              alt=""
              className="flex-1 object-cover mx-3 overflow-hidden"
            />
          </div>
          <div className="col-span-1 sm:col-span-3  flex">
            <img
              src="https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/8/2/tr:w-960,/829baf8KL_THECB00013476_1.jpg?rnd=20200526195200"
              alt=""
              className=" object-cover overflow-hidden z-0 flex-1 relative"
              // className="flex-1"
            ></img>
          </div> */}
        </div>
        <button className="lg:absolute mt-0 lg:-right-16 text-sm font-light lg:top-1/2 z-10 bg-black text-white px-8 py-1">
          Let&apos;s Chat
        </button>
      </div>

      <div className="mt-20">
        <div className="flex flex-col justify-center items-center">
          <div className="bg-orange-600 w-80 h-2 relative">
            <h1 className="absolute left-7 -top-7 text-center font-bold text-4xl text-black ">
              NEW ARRIVALS
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 mt-16">
          {products.map((product, idx) => {
            return (
              <ProductCard key={idx} product={product} id={idx}></ProductCard>
            );
          })}
          {/* {product_data.map((product, idx) => {
            return <ProductCard key={idx} product={product}></ProductCard>;
          })} */}
        </div>
        <div className="flex mt-20 mb-10 items-center justify-center">
          <div className="border-4 border-orange-500 text-orange-500 px-6 py-1 h-10">
            Shop All
          </div>
          <div className="h-10 w-10 flex items-center justify-center text-white ml-1 bg-orange-500">
            {">"}
          </div>
        </div>
      </div>
    </>
  );
}
