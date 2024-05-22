"use client";
import React, { ChangeEvent, useState, useEffect, useRef } from "react";
import "../styles/Components/AuthForm.scss";
import arrowdrop from "@/src/img/icon/arrow_dropdown.png";
import Image from "next/image";

interface AuthFormProps {
  title: any;
  type: any;
  value: string | boolean | number | null;
  onChange: (value: string | boolean | number) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  type,
  value,
  onChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    onChange(newValue);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const renderDropdownOptions = () => (
    <div className="AuthForm-short__dropdown-drop">
      <div
        className="AuthForm-short__dropdown-drop__item"
        onClick={(e) => {
          e.stopPropagation(); // остановка всплытия события
          selectOption("Мужской");
        }}
      >
        Мужской
      </div>
      <div
        className="AuthForm-short__dropdown-drop__item"
        onClick={(e) => {
          e.stopPropagation();
          selectOption("Женский");
        }}
      >
        Женский
      </div>
    </div>
  );

  return (
    <div
      className={`AuthForm ${
        ["Имя", "Фамилия", "Дата рождения", "Пол"].includes(title) ||
        type === "checkbox" ||
        type === "dropdown"
          ? "AuthForm-short"
          : ""
      }`}
    >
      {type === "dropdown" ? (
        <div
          className={`AuthForm-short__dropdown ${
            isDropdownOpen ? "dropdown-active" : ""
          }`}
          ref={dropdownRef}
          onClick={toggleDropdown}
        >
          <p>{selectedOption || "Выберите свой пол"}</p>
          <Image src={arrowdrop} alt="arrowdrop" />
          {isDropdownOpen && renderDropdownOptions()}
        </div>
      ) : (
        <input
          className={type === "checkbox" ? "checkbox" : "base"}
          type={type}
          placeholder={title}
          checked={type === "checkbox" ? (value as boolean) : undefined}
          value={type !== "checkbox" ? (value as string) : undefined}
          onChange={handleInputChange}
        />
      )}
      {type === "checkbox" && <p>{title}</p>}
    </div>
  );
};

export default AuthForm;
