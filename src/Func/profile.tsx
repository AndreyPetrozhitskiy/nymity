"use server";
const baseUrl: string = `${process.env.BACK_AUTH_PROTOCOL}://${process.env.BACK_AUTH_HOST}:${process.env.BACK_AUTH_PORT}`;
export const getUsers = async () => {
  const url = `${baseUrl}/profile/getUsers`;
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
};
export const getUsersId = async (slug: number | string) => {
  if (slug) {
    const url = `${baseUrl}/profile/getUsers/${slug}`;
    try {
      const response = await fetch(url, { next: { revalidate: false } });
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
