import React from 'react';
import "@/src/styles/info/global-info.scss";
import BlockCardInfo from '@/src/Components/info/blockCard';
type Props = Readonly<{
    params: {
      slug: number;
    };
  }>;
export async function generateMetadata({ params: { slug } }: Props) {
    // const user = await getData(slug);
    // if (user) {
    //   return {
    //     title: `${user.name} ${user.surname}`,
    //   };
    // }
  }
function Recomendations({ params: { slug } }: Props) {
  return (
    <div className="Info__main__container">  
        <BlockCardInfo slug={slug} type={"recommendations"} />
    </div>
  );
}

export default Recomendations;