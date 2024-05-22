"use client";
import React, { useEffect, useState } from "react";
import "@/src/styles/info/global-info.scss";
import Cookies from "js-cookie";
import { getSubscribers, getSubscriptions, getUsers } from "@/src/Func/profile";
import Image from "next/image";
import avatar from "@/src/img/avatar 2.png";
import Link from "next/link";
import ProfileButtons from "../Feed/Profile/ProfileButtons";
import { tokenCheck } from "@/src/Func/auth";
interface UserData {
  Desc: string | null;
  age: string | null;
  createdAt: string | null;
  email: string | null;
  gender: string | null;
  id: number | null;
  login: string | null;
  name: string | null;
  phone: string | null;
  surname: string | null;
  updatedAt: string | null;
  userId: number | null;
}

interface Props {
  slug: number | string;
  type: string;
}

// Получение списка пользователей
async function GetUsers(token: string) {
  const result = await getUsers(token);
  return result;
}
async function GetSubscriptions(slug: any, customization: any) {
  const result = await getSubscriptions(slug, customization);
  return result;
}
async function GetSubscribers(slug: any, customization: any) {
  const result = await getSubscribers(slug, customization);
  return result;
}

async function chechChangeMe(token: string) {
  const result = await tokenCheck(token);
  return result;
}

function BlockCardInfo({ slug, type }: Props) {
  const jwt: any = Cookies.get("jwt");
  const [data, setData] = useState<UserData[]>([]);
  const [load, setLoad] = useState<boolean>(true);
  const [changeme, setChangeme] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const customization = "users";
  useEffect(() => {
    if (jwt) {
      chechChangeMe(jwt).then((response) => {
        if (response.status) {
          if (response.login === slug || response.id === Number(slug)) {
            setChangeme(true);
          }
        }
      });
    }

    if (type === "recommendations" && jwt) {
      setText("Рекомендации не найдены");
      GetUsers(jwt)
        .then((response) => {
          if (response?.status) {
            if (response.users) {
              setData(response.users);
              setLoad(false);
            }
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении списка пользователей:", error);
        });
    }
    if (type === "subscriptions") {
      setText("Подписчики не найдены");
      GetSubscriptions(slug, customization)
        .then((response) => {
          if (response?.status) {
            if (response.users) {
              setData(response.users);
              setLoad(false);
            }
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении списка пользователей:", error);
        });
    }
    if (type === "subscribers") {
      setText("Подписки не найдены");
      GetSubscribers(slug, customization)
        .then((response) => {
          if (response?.status) {
            if (response.users) {
              setData(response.users);
              setLoad(false);
            }
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении списка пользователей:", error);
        });
    }
  }, []);

  if (load) {
    return <div className="Info__main__load"></div>;
  }
  if (!load && data.length === 0) {
    return <div>{text}</div>;
  }
  if (!load && data) {
    return (
      <>
        {data.map((item, itemIndex) => (
          <div className="Info__main__container-item" key={itemIndex}>
            <div className="Info__main__container-item__image">
              <Image src={avatar} alt="avatar" />
            </div>
            <div className="Info__main__container-item__text">
              <Link href={`/feed/profile/${item.login}`}>@{item.login}</Link>
              <Link href={`/feed/profile/${item.login}`}>
                {item.name} {item.surname}
              </Link>
              <p>{item.gender}</p>
            </div>
            {changeme && (
              <div className="Info__main__container-item__buttons">
                <ProfileButtons token={jwt} userID={item.id} />
              </div>
            )}
          </div>
        ))}
      </>
    );
  }
}

export default BlockCardInfo;
