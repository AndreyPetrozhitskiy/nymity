"use client";
import React from "react";
import "@/src/styles/Profile/profile.scss";
export async function generateMetadata() {
  return {
    title: "Ошибка",
  };
}
function Error() {
  return (
    <div className="Profile">
      <p>Такой страницы не существует</p>
    </div>
  );
}

export default Error;
