import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="text-white bg-black flex lg:flex-row flex-col items-start px-10 py-10 lg:px-0 lg:py-0 lg:items-center lg:justify-center lg:h-64 lg:gap-20 gap-5 text-base font-extralight mt-20">
        <ul>
          <li className="my-3">About</li>
          <li className="my-3">Contact</li>
          <li className="my-3">Stockists</li>
          <li className="my-3">Shop All</li>
        </ul>
        <ul>
          <li className="my-3">FAQ</li>
          <li className="my-3">Shipping and Return</li>
          <li className="my-3">Store Policy</li>
          <li className="my-3">Payment Methods</li>
        </ul>
        <ul>
          <li className="my-3">Instagram</li>
          <li className="my-3">Pintrest</li>
          <li className="my-3">Facebook</li>
          <li className="my-3">Twitter</li>
        </ul>
        <div>
          <p className="font-medium">Join our mailing list</p>
          <p className="mb-4">and get 10% off</p>
          <input
            type="text"
            placeholder="Enter your email here*"
            className="text-white bg-black border-2  text-sm  focus:outline-none border-white px-4 py-1 placeholder:text-white placeholder:font-medium"
          />
          <br />
          <button className="bg-orange-500 px-4 py-1 block w-full mt-2">
            Subscribe Now
          </button>
        </div>
      </footer>
      <p className="my-2 text-sm text-gray-400">
        © by NOUS. Powered and secured by wix
      </p>
    </>
  );
};

export default Footer;
