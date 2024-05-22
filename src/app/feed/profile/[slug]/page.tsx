import React from "react";
import "@/src/styles/Profile/profile.scss";
import avatar from "@/src/img/avatar 2.png";
import location from "@/src/img/icon/location.png";
import calendar from "@/src/img/icon/calendar.png";
import Image from "next/image";
import { getUsersId } from "@/src/Func/profile";
import Link from "next/link";
import { formatDateToRussianMonthYear } from "@/src/Func/Data";
import { cookies } from "next/headers";
import { tokenCheck } from "@/src/Func/auth";
import ProfileButtons from "@/src/Components/Feed/Profile/ProfileButtons";
import ProfileMetrics from "@/src/Components/Feed/Profile/ProfileMetrics";
import PrevButton from "@/src/Components/Feed/Profile/PrevButton";

type Props = {
  params: {
    slug: number | string;
  };
};
// Важный момент
export const revalidate = 10;
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
  let changeme: boolean = false;
  let auth: boolean = false;
  const cookieStore = cookies().getAll();
  if (cookieStore.length > 0) {
    const objToken = cookieStore.find((item) => item.name === "jwt");
    if (objToken?.value) {
      await tokenCheck(objToken.value).then((response) => {
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
  
  const objToken = cookieStore.find((item) => item.name === "jwt");

  return (
    <>
      <div className="Profile__header">
        {auth && (
          <PrevButton />
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

        <ProfileMetrics userID={user.userId} />

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
              <Link href="/feed/settings/edit">Редактировать профиль</Link>
              <button>Поделиться профилем</button>
            </>
          ) : auth ? (
            // отдельный клиентский компонент
            <ProfileButtons token={objToken?.value} userID={user.userId} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Profile;
