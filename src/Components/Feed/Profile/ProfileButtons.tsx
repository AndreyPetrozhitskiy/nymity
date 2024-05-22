"use client";
import {
  checkSubscribe,
  userSubscribe,
  userUnsubscribe,
} from "@/src/Func/profile";
import React, { useEffect, useState } from "react";

interface Props {
  token: any;
  userID: any;
}

// Проверка подписки
async function check({ token, userID }: Props) {
  const result = await checkSubscribe(token, userID);
  return result;
}
// Подписка
async function sub({ token, userID }: Props) {
  const result = userSubscribe(token, userID);
  return result;
}
// Отписка
async function unsub({ token, userID }: Props) {
  const result = await userUnsubscribe(token, userID);
  return result;
}

function ProfileButtons({ token, userID }: Props) {
  const [load, setLoad] = useState<boolean>(true);
  const [checkSub, setCheckSub] = useState<boolean>(false);

  useEffect(() => {
    if (token && userID) {
      check({ token, userID }).then((response) => {
        if (response?.status) {
          setLoad(false);
          if (response.info.subscribed) {
            setCheckSub(true);
          }
        }
      });
    }
  }, []);

  const subscribe = () => {
    if (!checkSub) {
      sub({ token, userID }).then((response) => {
        if (response?.status) {
          setCheckSub(true);
        }
      });
    }
  };

  const unsubscribe = () => {
    if (checkSub) {
      unsub({ token, userID }).then((response) => {
        if (response?.status) {
          setCheckSub(false);
        }
      });
    }
  };

  if (load) {
    return (
      <>
        <div className="Profile__main-buttons__load"></div>
        <div className="Profile__main-buttons__load"></div>
      </>
    );
  }
  return (
    <>
      {!checkSub ? (
        <button onClick={subscribe}>Подписаться</button>
      ) : (
        <button onClick={unsubscribe}>Отписаться</button>
      )}
      <button>Сообщение</button>
    </>
  );
}

export default ProfileButtons;
