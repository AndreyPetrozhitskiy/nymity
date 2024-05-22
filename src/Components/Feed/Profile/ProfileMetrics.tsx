"use client";
import { getSubscribers, getSubscriptions } from "@/src/Func/profile";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface Props {
  userID: any;
}
// подписки
async function GetSubscriptions(slug: any, customization: any) {
  const result = await getSubscriptions(slug, customization);
  return result;
}

// подписчики
async function GetSubscribers(slug: any, customization: any) {
  const result = await getSubscribers(slug, customization);
  return result;
}

function ProfileMetrics({ userID }: Props) {
  const [load, setLoad] = useState<boolean>(true);
  const [subscriptions, setSubscriptions] = useState(0);
  const [subscribers, setSubscribers] = useState(0);
  const customization = "number";

  useEffect(() => {
    if (userID) {
      // Получение подписок
      GetSubscriptions(userID, customization)
        .then((response) => {
          console.log(response)
          if (response?.status) {
            if (response.users) {
              setSubscriptions(response.users);
            }
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении подписок:", error);
        });

      // Получение подписчиков
      GetSubscribers(userID, customization)
        .then((response) => {
          console.log(response)
          if (response?.status) {
            setLoad(false);

            if (response.users) {
              setSubscribers(response.users);
            }
          }
        })
        .catch((error) => {
          console.error("Ошибка при получении подписчиков:", error);
        });
    }
  }, []);

  if (load) {
    return <div className="Profile__main-signer__load"></div>;
  }
  return (
    <div className="Profile__main-signer">
      <div className="Profile__main-signer__item">
        <p>4</p>
        <p>публикации</p>
      </div>

      <div className="Profile__main-signer__item">
        <Link href={`/feed/info/${userID}/subscribers`}>{subscribers}</Link>
        <Link href={`/feed/info/${userID}/subscribers`}>подписчики</Link>
      </div>

      <div className="Profile__main-signer__item">
        <Link href={`/feed/info/${userID}/subscriptions`}>{subscriptions}</Link>
        <Link href={`/feed/info/${userID}/subscriptions`}>подписки</Link>
      </div>
    </div>
  );
}

export default ProfileMetrics;
