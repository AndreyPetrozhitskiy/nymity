import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Nymity | Registration",
};

export default function RegistrationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
