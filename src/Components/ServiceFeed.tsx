"use client";
import "@/src/styles/Components/Feed/ServiceFeed.scss";
import Cookies from "js-cookie";
import Link from "next/link";
import Image from "next/image";
import logo from "../img/logo.svg";
import friends from "../img/icon/friends.png";
import home from "../img/icon/home.png";
import message from "../img/icon/message.png";
import more from "../img/icon/More.png";
import notifications from "../img/icon/Notifications.png";
import profile from "../img/icon/profile.png";
import picture from "../img/picture.png";
import settings from "../img/icon/settings.png";
import enter from "../img/icon/enter.png";
import signup from "../img/icon/signup.png";

import { getUsersId } from "@/src/Func/profile";
import { useEffect, useState } from "react";
import { tokenCheck } from "@/src/Func/auth";
function ServiceFeed() {
  const login: any = Cookies.get("login");
  const jwt: any = Cookies.get("jwt");
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (jwt) {
      tokenCheck(jwt).then((response) => {
        if (response.status) {
          setAuth(true);
        }
      });
    }
  }, [jwt]);

  useEffect(() => {
    if (auth && login) {
      const fetchData = async () => {
        const result = await getUsersId(login);
        setUser(result);
      };
      fetchData();
    }
  }, [auth]);

  if (!auth) {
    return (
      <div className="ServiceFeed">
        <div className="ServiceFeed__container">
          <div
            className="ServiceFeed__container-menu"
            style={{ height: "200px" }}
          >
            <div className="ServiceFeed__container-menu__logo">
              <Link href="/">
                <Image src={logo} alt="logo" />
                <span>Nymity</span>
              </Link>
            </div>
            <div className="ServiceFeed__container-menu__buttons">
              <Link
                href="/auth"
                className="ServiceFeed__container-menu__buttons-item"
              >
                <Image src={enter} alt="Home" />
                <span>Войти</span>
              </Link>
              <Link
                href="/auth/registration"
                className="ServiceFeed__container-menu__buttons-item"
              >
                <Image src={signup} alt="Home" />
                <span>Зарегистрироваться</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!user && auth)
    return (
      <div className="ServiceFeed">
        <div className="ServiceFeed__container">
          <div className="ServiceFeed__container-menu">
            <div className="ServiceFeed__container-menu__logo">
              <Link href="/">
                <Image src={logo} alt="logo" />
                <span>Nymity</span>
              </Link>
            </div>

            <div className="ServiceFeed__container-menu__buttons">
              <div className="ServiceFeed__container-menu__buttons-loader"></div>

              <div className="ServiceFeed__container-menu__buttons-loader"></div>

              <div className="ServiceFeed__container-menu__buttons-loader"></div>

              <div className="ServiceFeed__container-menu__buttons-loader"></div>

              <div className="ServiceFeed__container-menu__buttons-loader"></div>

              <div className="ServiceFeed__container-menu__buttons-loader"></div>
            </div>
          </div>
          <div className="ServiceFeed__container-account">
            <div className="ServiceFeed__container-account-loader"></div>

            <Image src={settings} alt="settings" />
          </div>
        </div>
      </div>
    );

  if (user && auth) {
    return (
      <div className="ServiceFeed">
        <div className="ServiceFeed__container">
          <div className="ServiceFeed__container-menu">
            <div className="ServiceFeed__container-menu__logo">
              <Link href="/">
                <Image src={logo} alt="logo" />
                <span>Nymity</span>
              </Link>
            </div>

            <div className="ServiceFeed__container-menu__buttons">
              <Link
                href="/feed"
                className="ServiceFeed__container-menu__buttons-item"
              >
                <Image src={home} alt="Home" />
                <span>Лента</span>
              </Link>

              <Link
                // href="/messages"
                href="/"
                className="ServiceFeed__container-menu__buttons-item"
              >
                <Image src={message} alt="message" />
                <span>Сообщения</span>
              </Link>

              <Link
                // href="/notifications"
                href="/"
                className="ServiceFeed__container-menu__buttons-item"
              >
                <Image src={notifications} alt="notifications" />
                <span>Уведомления</span>
              </Link>

              <Link
                // href="/friends"
                href="/"
                className="ServiceFeed__container-menu__buttons-item"
              >
                <Image src={friends} alt="friends" />
                <span>Подписчики</span>
              </Link>

              <Link
                href={`/feed/profile/${login}`}
                className="ServiceFeed__container-menu__buttons-item"
              >
                <Image src={profile} alt="profile" />
                <span>Профиль</span>
              </Link>

              <div className="ServiceFeed__container-menu__buttons-item">
                <Image src={more} alt="more" />
                <span>ещё</span>
              </div>
            </div>
          </div>
          <div className="ServiceFeed__container-account">
            <Link
              href={`/feed/profile/${login}`}
              className="ServiceFeed__container-account__picture"
            >
              <Image src={picture} alt="picture" />
            </Link>

            <Link
              href={`/feed/profile/${login}`}
              className="ServiceFeed__container-account__text"
            >
              <span>Tomasz Gajda</span>
              <span>@{login}</span>
            </Link>

            <Image src={settings} alt="settings" />
          </div>
        </div>
      </div>
    );
  }
}

export default ServiceFeed;
