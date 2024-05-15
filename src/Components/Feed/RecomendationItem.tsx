import React from "react";
import Image from "next/image";
import confirmImg from "../../img/icon/confirm.png";
import vector from "../../img/icon/Vector.png";
import "@/src/styles/Components/Feed/RecomendationItem.scss";
interface Props {
  text: string;
  confirm: boolean;
  link: string;
  image: any;
  promoted: boolean;
}
function RecomendationItem({ text, confirm, link, image, promoted }: Props) {
  return (
    <div
      className={
        "AdsFeed__recommendations-item" + (promoted ? "__big" : "__base")
      }
    >
      <Image src={image} alt={image} />
      <div className="AdsFeed__recommendations-item__text">
        <h1>
          {text}

          {confirm && <Image src={confirmImg} alt="confirm" />}
        </h1>
        <span>{link}</span>
      </div>
      <button className="AdsFeed__recommendations-item__button">
        Subscribe
      </button>
      {promoted && (
        <div className="AdsFeed__recommendations-item__promoted">
          <Image src={vector} alt="vector" />
          <p>Promoted</p>
        </div>
      )}
    </div>
  );
}

export default RecomendationItem;
