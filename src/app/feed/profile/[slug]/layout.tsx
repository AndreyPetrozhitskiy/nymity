import type { Metadata } from "next";
import "@/src/styles/Profile/profile.scss";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: "normal",
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "latin",
    "latin-ext",
    "vietnamese",
  ],
});

export const metadata: Metadata = {
  title: "Profile",
};








export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={manrope.className}>{children}</div>;
}
