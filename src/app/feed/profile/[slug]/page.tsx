import React from "react";
import "@/src/styles/Profile/profile.scss";
import avatar from "@/src/img/avatar 2.png";
import arrow from "@/src/img/icon/arrow_left.svg";
import Image from "next/image";
import Cookies from "js-cookie";
import { Metadata } from "next";
import { getUsers } from "@/src/api-func/profile";

type Props = {
  params: {
    slug: string;
    data: {
      test: string;
    };
  };
};

// export function generateMetadata({ params: { slug,data } }: Props):Promise<Metadata> {
//   return {
//     title: slug,
//   }
// }

// async function getData() {
//   const result = await getUsers();
//   return result;
// }

async function Profile({ params: { slug, data } }: Props) {
  const sign = [
    { count: 4, name: "публикации" },
    { count: 14, name: "подписчики" },
    { count: 57, name: "подписки" },
  ];
  // const test = await getData()
  // console.log(test);
  return (
    <div className="Profile">
      <div className="Profile__header">
        <Image src={arrow} alt="arrow" />
        <p>Andrey Adnrey</p>
        <p>Profile</p>
      </div>
      <div className="Profile__main">
        <div className="Profile__main-avatar">
          <div className="Profile__main-avatar__photo">
            {/* Avatar */}
            <Image src={avatar} alt="avatar" />
          </div>
          <div className="Profile__main-avatar__name">
            {/* Name и Surname */}
            <p>Tomasz Gajda</p>
            {/* Login */}
            <p>@nerooc</p>
          </div>
        </div>
        <div className="Profile__main-signer">
          {sign.map((item, index) => (
            <div className="Profile__main-signer__item" key={index}>
              <p>{item.count}</p>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
        <div className="Profile__main-description">
          <div className="Profile__main-description__text">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
