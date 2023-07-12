import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import CartProvider from "@/contexts/CartProvider";
import ProductsProvider from "@/contexts/ProductsProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductsProvider>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </ProductsProvider>
  );
}
