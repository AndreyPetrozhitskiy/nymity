import type { Metadata } from "next";
import "@/src/styles/Profile/profile.scss";
import { Manrope } from "next/font/google";
import { getUsersId } from "@/src/Func/profile";
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
type Props = {
  params: {
    slug: number | string;
  };
};

async function getData(slug: number | string) {
  const result = await getUsersId(slug);
  return result;
}

export async function generateMetadata({ params: { slug } }: Props) {
  const user = await getData(slug);
  if (user) {
    return {
      title: `${user.name} ${user.surname}`,
    };
  }
}
export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={`${manrope.className} ${"Profile"}`}>{children}</div>;
}
