import type { Metadata } from "next";
import "../../../styles/Profile/profile.scss"
export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="Profile">{children}</div>;
}
