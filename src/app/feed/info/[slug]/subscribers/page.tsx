import React from "react";
import "@/src/styles/info/global-info.scss";
import BlockCardInfo from "@/src/Components/info/blockCard";
export async function generateMetadata({ params: { slug } }: Props) {
  // const user = await getData(slug);
  // if (user) {
  //   return {
  //     title: `${user.name} ${user.surname}`,
  //   };
  // }
}
type Props = Readonly<{
  params: {
    slug: number;
  };
}>;

function Subscribers({ params: { slug } }: Props) {
  return (
    <div className="Info__main__container">
      <BlockCardInfo slug={slug} type={"subscribers"} />
    </div>
  );
}

export default Subscribers;
