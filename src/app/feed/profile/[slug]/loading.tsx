"use client";
import React from "react";
import "@/src/styles/Profile/Loader.scss"; // Добавьте стили для лоадера
import Matrix from "@/src/Components/MatrixBackground";

const Loading: React.FC = () => {
  return (
    <div className="Loader__container">
      <span className="Loader__container-loader"></span>
    </div>
  )
};

export default Loading;
