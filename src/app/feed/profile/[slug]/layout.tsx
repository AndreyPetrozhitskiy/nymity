import "@/src/styles/Profile/profile.scss";
import { getUsersId } from "@/src/Func/profile";

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
  return <div className="Profile">{children}</div>;
}
