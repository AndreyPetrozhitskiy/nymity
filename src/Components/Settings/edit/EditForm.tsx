"uce client";
import React, { useEffect, useRef, useState } from "react";
import "@/src/styles/Components/Settings/edit/EditForm.scss";
interface Props {
  label: string;
  propsType: string;
  placeholder: any;
  onChange: (value: string) => void;
}
const selectType = [
  {
    propsType: "Desc",
    type: "textarea",
  },
  {
    propsType: "age",
    type: "date",
  },
  {
    propsType: "gender",
    type: "dropdown",
  },
  {
    propsType: "email",
    type: "email",
  },
];
const formatISODate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date
      .getDate()
      .toString()
      .padStart(2, "0")}T00:00:00+00:00`;
  };
//
// Desc: textarea
// age: date
// email: email
// gender: dropdown
// login: text
// name: text
// phone: text
// surname: text

function EditForm({ label, propsType,placeholder,onChange }: Props) {
   
    const [type, setType] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);
  
    useEffect(() => {
      const found = selectType.find((item) => item.propsType === propsType);
      if (found) {
       
        setType(found.type);
      } else {
        setType("text");
      }
    }, [propsType]);
  
    useEffect(() => {
      setValue(""); // Устанавливаем value в пустую строку при изменении initialValue
    }, [placeholder]);
  
    const handleFocus = () => {
      if (inputRef.current && inputRef.current.type === "text") {
        inputRef.current.type = "date";
        inputRef.current.focus();
      }
    };
  
    const handleBlur = () => {
      if (inputRef.current && !inputRef.current.value) {
        inputRef.current.type = "text";
      }
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
  
      if (propsType === "age") {
        onChange(formatISODate(newValue));
      } else {
        onChange(newValue);
      }
    };
  
    const dropdown = () => (
      <div className="EditForm__dropdown">
        <select value={value} onChange={handleChange}>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
      </div>
    );
  
    const textarea = () => (
      <div className="EditForm__textarea">
        <textarea maxLength={150}  spellCheck={true} value={value} onChange={handleChange} placeholder={placeholder}></textarea>
      </div>
    );
  
    const text = () => (
      <div className="EditForm__input">
        <input
          type={type === "date" && !value ? "text" : type}
          ref={type === "date" ? inputRef : null}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
      </div>
    );
  
    const selectForm = () => {
      if (type === "textarea") {
        return textarea();
      }
      if (type === "dropdown") {
        return dropdown();
      }
      if (type === "text" || type === "email" || type === "date") {
        return text();
      }
    };
  return (
    <div className="EditForm">
      <div className="EditForm__label">
        <p>{label}</p>
      </div>
      {selectForm()}
    </div>
  );
}

export default EditForm;
