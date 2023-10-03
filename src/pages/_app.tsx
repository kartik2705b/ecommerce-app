import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout";
import CartProvider from "@/contexts/CartProvider";
import ProductsProvider from "@/contexts/ProductsProvider";
import AuthProvider from "@/contexts/AuthProvider";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <AuthProvider>
        <ProductsProvider>
          <Layout>
            <Toaster></Toaster>
            <Component {...pageProps} />
          </Layout>
        </ProductsProvider>
      </AuthProvider>
    </CartProvider>
  );
}
