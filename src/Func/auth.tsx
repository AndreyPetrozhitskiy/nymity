"use server";
import axios, { AxiosResponse } from "axios";

const baseUrl: string = `${process.env.BACK_AUTH_PROTOCOL}://${process.env.BACK_AUTH_HOST}:${process.env.BACK_AUTH_PORT}`;
interface UserReg {
  login: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  age: string;
  gender: string;
  interests: string[];
}

interface UserAuth {
  login: string;
  password: string;
}

const sendRequest = async (url: string, data: any): Promise<any> => {
  try {
    const response: AxiosResponse = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const Login = async ({ login, password }: UserAuth): Promise<any> => {
  if (login && password) {
    const url: string = `${baseUrl}/auth/login`;
    return sendRequest(url, { login, password });
  }
};

export const registration = async ({
  login,
  email,
  name,
  surname,
  password,
  age,
  gender,
  interests = [],
}: UserReg): Promise<any> => {
  if (login && email && name && surname && password && age && gender) {
    const url: string = `${baseUrl}/auth/registration`;
    const data: UserReg = {
      login,
      email,
      name,
      surname,
      password,
      age,
      gender,
      interests,
    };
    return sendRequest(url, data);
  }
};
export const tokenCheck = async (token: string) => {
  if (token) {
    const url = `${baseUrl}/auth/check`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error during token check:", error);
    }
  }
};
