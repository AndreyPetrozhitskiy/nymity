import { Roboto } from "next/font/google";
import type { AppProps } from "next/app";
import Layout from "./layout";
import Head from "next/head";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component className={roboto.className} {...pageProps} />
      </Layout>
    </>
  );
}
