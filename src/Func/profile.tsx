"use server";

import { isEmptyObject } from "./Data";

const baseUrl: string = `${process.env.BACK_AUTH_PROTOCOL}://${process.env.BACK_AUTH_HOST}:${process.env.BACK_AUTH_PORT}`;
export const getUsers = async (token: string) => {
  const url = `${baseUrl}/profile/getUsers`;
  try {
    const response = await fetch(url, {
      method: "GET", // Используем метод POST для отправки данных
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Указываем тип контента
      },
    });
    const data = await response.json();
    if (data.status) {
      return {
        status: true,
        users: data.userData,
      };
    } else if (!data.status || undefined) {
      return null;
    }
  } catch (error) {
    console.error("Error during token check:", error);
  }
};
export const getUsersId = async (slug: number | string) => {
  if (slug) {
    const url = `${baseUrl}/profile/getUsers/${slug}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status) {
        return data.userData;
      } else if (!data.status || undefined) {
        return null;
      }
    } catch (error) {
      console.error("Error during token check:", error);
    }
  }
};

export const updateUserToken = async (obj: object, token: string) => {
  if (obj && token) {
    const url = `${baseUrl}/profile/editUsersInfo`;
    try {
      const response = await fetch(url, {
        method: "PUT", // Используем метод POST для отправки данных
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Указываем тип контента
        },
        body: JSON.stringify(obj), // Преобразуем объект в JSON
      });
      const data = await response.json();
      if (isEmptyObject(data.result)) {
        console.log();
        return {
          status: true,
          info: data.result,
        };
      } else if (!data.result) {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.error("Error during token check:", error);
    }
  }
};
// Проверка подписки
export const checkSubscribe = async (token: any, userID: any) => {
  if (userID && token) {
    const url = `${baseUrl}/profile/checkSubscribe`;
    try {
      const response = await fetch(url, {
        method: "POST", // Используем метод POST для отправки данных
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Указываем тип контента
        },
        body: JSON.stringify({ userID }), // Преобразуем объект в JSON
      });
      const data = await response.json();
      if (isEmptyObject(data.status)) {
        return {
          status: true,
          info: data,
        };
      } else if (!data.status) {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.error("Error during token check:", error);
    }
  }
};
// Подписаться
export const userSubscribe = async (token: any, userID: any) => {
  if (userID && token) {
    const url = `${baseUrl}/profile/subscribeUser`;
    try {
      const response = await fetch(url, {
        method: "POST", // Используем метод POST для отправки данных
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Указываем тип контента
        },
        body: JSON.stringify({ userID }), // Преобразуем объект в JSON
      });
      const data = await response.json();
      if (isEmptyObject(data.status)) {
        return {
          status: true,
        };
      } else if (!data.status) {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.error("Error during token check:", error);
    }
  }
};
// Отписаться
export const userUnsubscribe = async (token: any, userID: any) => {
  if (userID && token) {
    const url = `${baseUrl}/profile/unsubscribeUser`;
    try {
      const response = await fetch(url, {
        method: "POST", // Используем метод POST для отправки данных
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Указываем тип контента
        },
        body: JSON.stringify({ userID }), // Преобразуем объект в JSON
      });
      const data = await response.json();
      if (isEmptyObject(data.status)) {
        return {
          status: true,
        };
      } else if (!data.status) {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.error("Error during token check:", error);
    }
  }
};

// number или users

// Получение подписок
export const getSubscriptions = async (slug: any, customization: any) => {
  if (slug && customization) {
    const url = `${baseUrl}/profile/getSubscriptions`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, customization }),
        next: { revalidate: 5 },
      });
      const data = await response.json();
      if (data.status) {
        if (customization === "users") {
          return {
            status: true,
            users: data.subscribers,
          };
        }
        if (customization === "number") {
          return {
            status: true,
            users: data.count,
          };
        }
      } else if (!data.status) {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.error("Error during token check:", error);
    }
  }
};

// Полученеи подписчиков
export const getSubscribers = async (slug: any, customization: any) => {
  if (slug && customization) {
    const url = `${baseUrl}/profile/getSubscribers`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug, customization }),
      });
      const data = await response.json();
      if (data.status) {
        if (customization === "users") {
          return {
            status: true,
            users: data.subscribers,
          };
        }
        if (customization === "number") {
          return {
            status: true,
            users: data.count,
          };
        }
      } else if (!data.status) {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.error("Error during token check:", error);
    }
  }
};
