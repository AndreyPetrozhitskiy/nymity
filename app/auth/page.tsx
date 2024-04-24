"use client";
import AuthForm from "@/uiComponents/AuthForm";
import Cookies from "js-cookie";
import "@/styles/Auth.scss";
import Link from "next/link";
import logo from "../../img/logo.svg";
import Image from "next/image";
import { Login } from "@/api-func/auth";
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
      await Login(userData.login, userData.password)
        .then((response) => {
          console.log("auth:", response);
          if (response.status === true) {
            saveToCookie("jwt", response.token);

            replace("/feed");
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
              title="Login"
              type="text"
              value={userData.login}
              onChange={(value) => updateUserData("login", value)}
            />
            <AuthForm
              title="Password"
              type="password"
              value={userData.password}
              onChange={(value) => updateUserData("password", value)}
            />
            <div className="Auth__Container--forms-param">
              <AuthForm
                title="checkbox"
                type="checkbox"
                value={userData.checkbox}
                onChange={(value) => updateUserData("checkbox", value)}
              />
              <Link href="/feed">Forgot your password?</Link>
            </div>

            <button onClick={authLogin}>Login</button>

            <div className="Auth__Container--forms-text">
              <p>No account?</p>
              <Link href={"/auth/registration"}>Registration!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
