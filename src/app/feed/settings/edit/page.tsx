"use client";
import "@/src/styles/Settings/edit/edit.scss";
import Image from "next/image";
import avatar from "@/src/img/picture.png";
import { getUsersId, updateUserToken } from "@/src/Func/profile";
import { tokenCheck } from "@/src/Func/auth";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import EditForm from "@/src/Components/Settings/edit/EditForm";
import { isEmptyObject } from "@/src/Func/Data";

interface TokenData {
  id: number;
  login: string;
  status: boolean;
}

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

async function getData(slug: number | string) {
  const result = await getUsersId(slug);
  return result;
}
const formatDateForPlaceholder = (isoDateString: any) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // месяцы начинаются с 0
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export default function SettingsEdit() {
  // Куки
  const [cookies, setCookie, removeCookie] = useCookies(["jwt", "id", "login"]);
  //   Инфа о юзере изначал
  const [userData, setUserData] = useState<UserData | null>(null);
  //   Инфа из форм
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const cookieValue = cookies.jwt;
    if (cookieValue) {
      tokenCheck(cookieValue).then((response) => {
        if (response.status) {
          getData(response.login).then((user) => {
            setUserData(user);
          });
        }
      });
    }
  }, [cookies]);

  //  Выход из аккаунта
  const handleLogout = () => {
    const options = { path: "/" }; // Указываем путь для удаления куки
    removeCookie("id", options);
    removeCookie("jwt", options);
    removeCookie("login", options);
    window.location.reload(); // Обновление страницы
  };
  // Сохранение инфы из форм
  const handleFormChange = useCallback(
    (field: string) => (value: string) => {
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    },
    []
  );

  //   Изменение инфы о юзере

  const handleUpdate = async () => {
    if (isEmptyObject(formData) && cookies.jwt) {
      setIsUpdating(true); // Отключаем кнопку
      try {
        const response = await updateUserToken(formData, cookies.jwt);
        if (response && response.status) {
          if (response.info.login.updateLogin) {
            const options = { path: "/" };
            removeCookie("jwt", options);
            removeCookie("login", options);
            setCookie("login", response.info.login.login, options);
            setCookie("jwt", response.info.login.token, options);
          }
        } else {
          console.log("Обновление не удалось");
        }
      } catch (error) {
        console.error("Ошибка при обновлении:", error);
      } finally {
        // Перезагрузка страницы всегда
        window.location.reload();
      }
    } else {
      console.log("Пустой объект или отсутствует токен");
    }
  };




  return (
    <div className="Edit">
      {/* Edit__Preview */}
      {userData ? (
        <div className="Edit__Preview">
          <Image src={avatar} alt="avatar" />
          <div className="Edit__Preview-text">
            <h1>{userData.login}</h1>
            <p>{userData.name}</p>
          </div>
          <div className="Edit__Preview-button">
            <button onClick={handleLogout}>Выйти из аккаунта</button>
          </div>
        </div>
      ) : (
        <div className="Edit__Preview load"></div>
      )}
      {/* Начало Edit__change */}
      {userData ? (
        <div className="Edit__change">
          <div className="Edit__change-item">
            <EditForm
              label="О себе"
              propsType="Desc"
              placeholder={userData.Desc}
              onChange={handleFormChange("description")}
            />
          </div>

          <div className="Edit__change-item">
            <EditForm
              label="Имя"
              propsType="Name"
              placeholder={userData.name}
              onChange={handleFormChange("name")}
            />
            <EditForm
              label="Фамилия"
              propsType="text"
              placeholder={userData.surname}
              onChange={handleFormChange("surname")}
            />
          </div>

          <div className="Edit__change-item">
            <EditForm
              label="Логин"
              propsType="text"
              placeholder={userData.login}
              onChange={handleFormChange("login")}
            />
          </div>

          <div className="Edit__change-item">
            <EditForm
              label="Дата рождения"
              propsType="age"
              placeholder={formatDateForPlaceholder(userData.age)}
              onChange={handleFormChange("age")}
            />
          </div>
          <div className="Edit__change-item">
            <EditForm
              label="Пол"
              propsType="gender"
              placeholder={userData.gender}
              onChange={handleFormChange("gender")}
            />
          </div>
          <div className="Edit__change-button">
            <button onClick={handleUpdate} disabled={isUpdating}>
              Сохранить
            </button>
          </div>
        </div>
      ) : (
        <div className="Edit__change load"></div>
      )}
      {/* Конец Edit__change */}
    </div>
  );
}
