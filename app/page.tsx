import Link from "next/link";
import { redirect } from "next/navigation";
export default function Home() {
  redirect("/auth");
  return null;
}
