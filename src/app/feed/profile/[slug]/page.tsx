import React from "react";
import "@/src/styles/Profile/profile.scss";
import avatar from "@/src/img/avatar 2.png";
import arrow from "@/src/img/icon/arrow_left.svg";
import location from "@/src/img/icon/location.png";
import calendar from "@/src/img/icon/calendar.png";
import Image from "next/image";
import { getUsersId } from "@/src/Func/profile";
import Link from "next/link";
import { formatDateToRussianMonthYear } from "@/src/Func/Data";
import { cookies } from "next/headers";
import { tokenCheck } from "@/src/Func/auth";

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

async function Profile({ params: { slug } }: Props) {
  const sign = [
    { count: 4, name: "публикации" },
    { count: 14, name: "подписчики" },
    { count: 57, name: "подписки" },
  ];
  let changeme: boolean = false;
  let auth: boolean = false;
  const cookieStore = cookies().getAll();

  if (cookieStore.length > 0) {
    if (cookieStore[0].value) {
      await tokenCheck(cookieStore[0].value).then((response) => {
        if (response.status) {
          if (response.login === slug || response.id === slug) {
            changeme = true;
          }
          auth = true;
        }
      });
    }
  }

  const user = await getData(slug);

  return (
    <>
      <div className="Profile__header">
        {auth && (
          <Link href="/">
            <Image src={arrow} alt="arrow" />
          </Link>
        )}
        <p>{`${user.name} ${user.surname}`}</p>
        {changeme ? <p>My Profile</p> : <p>Profile</p>}
      </div>
      <div className="Profile__main">
        <div className="Profile__main-avatar">
          <div className="Profile__main-avatar__photo">
            {/* Avatar */}
            <Image src={avatar} alt="avatar" />
          </div>
          <div className="Profile__main-avatar__name">
            {/* Name и Surname */}
            <p>
              {user.name} {user.surname}
            </p>
            {/* Login */}
            <p>@{user.login}</p>
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
            <p>{user.Desc}</p>
          </div>
          <div className="Profile__main-description__location">
            <div className="Profile__main-description__location-item">
              <Image
                style={{ width: "14px", height: "16px" }}
                src={location}
                alt="location"
              />
              <p>Kraków, Polska</p>
            </div>
            <div className="Profile__main-description__location-item">
              <Image
                style={{ width: "15px", height: "16px" }}
                src={calendar}
                alt="calendar"
              />
              <p>
                Присоединился {"  "}
                <b>{formatDateToRussianMonthYear(user.createdAt)}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="Profile__main-buttons">
          {auth && changeme ? (
            <>
              <button>Редактировать профиль</button>
              <button>Поделиться профилем</button>
            </>
          ) : auth ? (
            <>
              <button>Подписаться</button>
              <button>Сообщение</button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Profile;
