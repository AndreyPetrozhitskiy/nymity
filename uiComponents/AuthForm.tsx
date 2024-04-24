"use client";
import React, { ChangeEvent } from "react";
import "../styles/uiComponents/AuthForm.scss";
interface AuthFormProps {
  title: string;
  type: string;
  value: string | boolean | number;
  onChange: (value: string | boolean | number) => void;
}
function AuthForm({ title, type, value, onChange }: AuthFormProps) {
  let className: string = "AuthForm";
  let classNameInput: string = "base";
  if (
    title === "Name" ||
    title === "Surname" ||
    title === "Age" ||
    title === "Gender" ||
    title === "checkbox"
  )
    className = "AuthForm-short";

  if (title === "checkbox") classNameInput = "checkbox";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    onChange(newValue);
  };

  return (
    <div className={className}>
      <input
        className={classNameInput}
        type={type}
        placeholder={title}
        checked={type === "checkbox" ? (value as boolean) : undefined} // Используем value
        value={type !== "checkbox" ? (value as string) : undefined} // Используем value
        onChange={handleChange}
      />
      {type === "checkbox" ? <p>Remember me</p> : undefined}
    </div>
  );
}

export default AuthForm;
