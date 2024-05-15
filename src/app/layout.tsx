import type { Metadata } from "next";
import Matrix from "../Components/MatrixBackground";
import "../styles/global.scss";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import Cookies from "js-cookie";

export const metadata: Metadata = {
  title: "Nymity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" sizes="25x32" type="image/svg+xml" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" sizes="25x32" />
        <link
          rel="apple-touch-icon"
          href="/logo.svg"
          type="image/svg+xml"
          sizes="180x180"
        />
      </head>
      <body>
        <Matrix />
        <PrimeReactProvider value={{ unstyled: true }}>
          <main>{children}</main>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
