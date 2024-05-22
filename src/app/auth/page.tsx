"use client";
import AuthForm from "../../Components/AuthForm";
import Cookies from "js-cookie";
import "../../styles/Auth.scss";
import Link from "next/link";
import logo from "../../img/logo.svg";
import Image from "next/image";
import { Login } from "../../Func/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface UserData {
  login: string;
  password: string;
  checkbox: boolean;
}
export default function Auth() {
  const { replace } = useRouter();
  const [userData, setUserData] = useState<UserData>({
    login: "",
    password: "",
    checkbox: false,
  });
  const saveToCookie = (key: any, value: any) => {
    Cookies.set(key, value, { expires: 3 }); // Устанавливаем срок хранения в 7 дней, можно изменить по необходимости
  };
  const updateUserData = (
    field: keyof UserData,
    value: string | boolean | number
  ) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };
  // Авторизация
  const authLogin = async () => {
    if (userData.login && userData.password) {
      await Login({ login: userData.login, password: userData.password })
        .then((response) => {
          if (response.status === true) {
            saveToCookie("jwt", response.token);
            saveToCookie("id", response.id);
            saveToCookie("login", response.login);
            window.location.replace('/feed');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  return (
    <div className="Auth">
      <div className="Auth__Container">
        <div className="Auth__flex">
          <div className="Auth__Container--logo">
            <Image src={logo} alt="logo" />
            <p>Nymity</p>
          </div>

          <span>Welcome!</span>
          <div className="Auth__Container--forms">
            <AuthForm
              title="Логин"
              type="text"
              value={userData.login}
              onChange={(value) => updateUserData("login", value)}
            />
            <AuthForm
              title="Пароль"
              type="password"
              value={userData.password}
              onChange={(value) => updateUserData("password", value)}
            />
            <div className="Auth__Container--forms-param">
              {/* <AuthForm
                title="Сохранить вход"
                type="checkbox"
                value={userData.checkbox}
                onChange={(value) => updateUserData("checkbox", value)}
              /> */}
              <Link href="/feed">Забыли пароль?</Link>
            </div>

            <button onClick={authLogin}>Войти</button>

            <div className="Auth__Container--forms-text">
              <p>Нет аккаунта?</p>
              <Link href={"/auth/registration"}>Регистрация!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
