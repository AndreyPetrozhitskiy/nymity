import { getUsers } from "@/src/Func/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

async function getData() {
  const result = await getUsers();
  return result;
}


export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
