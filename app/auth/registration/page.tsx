"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../../../styles/Registration.scss";
import logo from "../../../img/logo.svg";
import Image from "next/image";
import AuthForm from "@/uiComponents/AuthForm";
import Interests from "@/uiComponents/Interests";
import { useRouter } from "next/navigation";

interface UserData {
  login: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  age: number;
  gender: string;
  interests: string[];
  agreedToTerms: boolean;
}
function Registration() {
  const { replace } = useRouter();
  // Этап регистрации
  const [activeStage, setActiveStage] = useState<number>(1);
  // Количество этапов регистрации
  const stages = [1, 2, 3];
  // Согласие на политику конфцид..
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [repeatedPassword, setRepeatedPassword] = useState<any>("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  // Объект с данными для регистрации
  const [userData, setUserData] = useState<UserData>({
    login: "",
    email: "",
    name: "",
    surname: "",
    password: "",
    age: 0,
    gender: "",
    interests: [],
    agreedToTerms: false,
  });
  const updateUserData = (
    field: keyof UserData,
    value: string | number | boolean | string[]
  ) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleRepeatedPasswordChange = (value: any) => {
    setRepeatedPassword(value);
    if (value === userData.password) {
      // Проверяем совпадение
      setUserData((prevData) => ({ ...prevData, password: value })); // Обновляем UserData
    }
    setPasswordsMatch(value === userData.password);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  const handleStageClick = (State: boolean, Num: any) => {
    if (State) {
      return setActiveStage(activeStage + 1);
    }
    if (!State) {
      if (activeStage > 1 && Num === activeStage - 1)
        return setActiveStage(activeStage - 1);
    }
  };

  //  переход после авторизации
  // useEffect(() => {

  //     replace("/feed");

  // },);

  return (
    <div className="Registration">
      <div className="Registration__Container">
        <div className="Registration__flex">
          <div className="Registration__Container--logo">
            <Image src={logo} alt="logo" />
            <p>Nymity</p>
          </div>

          <div className="Registration__Container--forms">
            <div className="Registration__Container--forms-progres_bar">
              {stages.map((stage: number, index: number) => (
                <div
                  className={`stage ${activeStage === stage ? "active" : ""}`}
                  key={stage}
                >
                  {index > 0 && <div className="line"></div>}

                  <div
                    className="circle"
                    onClick={() => handleStageClick(false, stage)}
                  >
                    {stage}
                  </div>
                </div>
              ))}
            </div>

            {activeStage === 1 && (
              <div className="Registration__Container--forms-progres_bar__input-block">
                <p>Create an account</p>
                <AuthForm
                  title="Login"
                  type="text"
                  value={userData.login}
                  onChange={(value) => updateUserData("login", value)}
                />
                <AuthForm
                  title="E-mail"
                  type="email"
                  value={userData.email}
                  onChange={(value) => updateUserData("email", value)}
                />
                <div className="Registration__Container--forms-progres_bar__input-block__two">
                  <AuthForm
                    title="Name"
                    type="text"
                    value={userData.name}
                    onChange={(value) => updateUserData("name", value)}
                  />
                  <AuthForm
                    title="Surname"
                    type="text"
                    value={userData.surname}
                    onChange={(value) => updateUserData("surname", value)}
                  />
                </div>
                <AuthForm
                  title="Password"
                  type="password"
                  value={userData.password} // Используем значение из userData для отображения
                  onChange={(value) => updateUserData("password", value)} // Обновляем только для отображения
                />
                <AuthForm
                  title="Password repeat"
                  type="password"
                  value={repeatedPassword}
                  onChange={(value) => handleRepeatedPasswordChange(value)}
                />
                <div className="Registration__Container--forms-progres_bar__input-block__two">
                  <AuthForm
                    title="Age"
                    type="text"
                    value={userData.age}
                    onChange={(value) => updateUserData("age", value)}
                  />
                  <AuthForm
                    title="Gender"
                    type="text"
                    value={userData.gender}
                    onChange={(value) => updateUserData("gender", value)}
                  />
                </div>
                <button onClick={() => handleStageClick(true, false)}>
                  Continue
                </button>
                <div className="Registration__Container--forms-progres_bar__input-block-text">
                  <p>Already have an account?</p>
                  <Link href="/auth">Authorization!</Link>
                </div>
              </div>
            )}
            {activeStage === 2 && (
              <div className="Registration__Container--forms-progres_bar__input-block">
                <p>Interests</p>
                <Interests
                  interests={[
                    { id: 1, name: "Категория 1" },
                    { id: 2, name: "Категория 2" },
                    { id: 3, name: "Категория 3" },
                    { id: 4, name: "Категория 4" },
                    { id: 5, name: "Категория 5" },
                    { id: 6, name: "Категория 6" },
                    { id: 7, name: "Категория 7" },
                    { id: 8, name: "Категория 8" },
                    { id: 9, name: "Категория 9" },
                    { id: 10, name: "Категория 10" },
                    { id: 11, name: "Категория 11" },
                    { id: 12, name: "Категория 12" },
                    { id: 13, name: "Категория 13" },
                    { id: 14, name: "Категория 14" },
                    { id: 15, name: "Категория 15" },
                    { id: 16, name: "Категория 16" },
                    { id: 17, name: "Категория 17" },
                    { id: 18, name: "Категория 18" },
                    { id: 19, name: "Категория 19" },
                    { id: 20, name: "Категория 20" },
                    { id: 21, name: "Категория 21" },
                    { id: 22, name: "Категория 22" },
                    { id: 23, name: "Категория 23" },
                    { id: 24, name: "Категория 24" },
                    { id: 25, name: "Категория 25" },
                    { id: 26, name: "Категория 26" },
                    { id: 27, name: "Категория 27" },
                    { id: 28, name: "Категория 28" },
                    { id: 29, name: "Категория 29" },
                    { id: 30, name: "Категория 30" },
                  ]}
                  selectedInterests={userData.interests}
                  onInterestChange={(interests) =>
                    updateUserData("interests", interests)
                  }
                />
                <button onClick={() => handleStageClick(true, false)}>
                  Continue
                </button>
                <div className="Registration__Container--forms-progres_bar__input-block-text">
                  <p>Already have an account?</p>
                  <Link href="/auth">Authorization!</Link>
                </div>
              </div>
            )}
            {activeStage === 3 && (
              <div className="Registration__Container--forms-progres_bar__input-block">
                <p>License agreement</p>
                <div className="Registration__Container--forms-progres_bar__input-block-license">
                  <h1>End-User License Agreement for the Use of Nymity</h1>
                  <h2>Last Updated: 09.04.2024</h2>
                  <p>
                    Please carefully read the following terms before using our
                    social network. By using our platform, you agree to these
                    terms.
                  </p>
                  <h3>1. License</h3>
                  <p>
                    1.1. Grant of Access. We grant you a license to use our
                    social network in accordance with this agreement.
                  </p>
                  <p>
                    1.2. Limitations. You are prohibited from using our social
                    network:
                  </p>
                  <ul>
                    <li>For illegal purposes.</li>
                    <li>To violate the rights of other users.</li>
                    <li>To post malicious content.</li>
                  </ul>
                  <h3>2. Rights and Obligations</h3>
                  <p>
                    2.1. Rights. We reserve the right to make changes to the
                    functionality of our social network and/or the terms of this
                    agreement at any time.
                  </p>
                  <p>
                    2.2. Obligations. You agree to comply with all applicable
                    laws and regulations while using our platform. You also
                    agree not to infringe upon the rights of other users.
                  </p>
                  <h3>3. Confidentiality</h3>
                  <p>
                    3.1. Data Collection. We may collect and store certain
                    information about you in accordance with our privacy policy.
                  </p>
                  <p>
                    3.2. Data Usage. We use your data solely for the purpose of
                    providing you with our social network services and do not
                    disclose it to third parties without your consent.
                  </p>
                  <h3>4. Liability</h3>
                  <p>
                    4.1. Disclaimer. We are not liable for any damages incurred
                    by you as a result of using our social network.
                  </p>
                  <p>
                    4.2. Intellectual Property. All intellectual property
                    associated with our social network belongs to us or our
                    partners.
                  </p>
                  <h3>5. Termination of License</h3>
                  <p>
                    5.1. Termination. We reserve the right to revoke your
                    license to use our social network at any time if you violate
                    the terms of this agreement.
                  </p>
                  <p>
                    5.2. Consequences. In the event of license termination, you
                    agree to cease using our social network and delete all
                    associated data.
                  </p>
                  <h3>6. Miscellaneous</h3>
                  <p>
                    6.1. Applicable Law. This agreement is governed by the laws
                    of USA.
                  </p>
                  <p>
                    6.2. Amendments. We reserve the right to amend this
                    agreement at any time.
                  </p>
                  <p>
                    6.3. Contact. If you have any questions or concerns
                    regarding this agreement, you may contact us at
                    support@nymity.com.
                  </p>
                  <p>Signature:</p>
                  <h1>Administration of the Nymity</h1>
                </div>
                <div className="Registration__Container--forms-progres_bar__input-block-license-check">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="check-form"
                  />
                  <label>
                    By clicking, you confirm that you have read and agree to the
                    license agreement
                  </label>
                </div>
                <Link href="/feed">
                  <button
                    disabled={!isChecked}
                    // onClick={}
                  >
                    Finish
                  </button>
                </Link>
                <div className="Registration__Container--forms-progres_bar__input-block-text">
                  <p>Already have an account?</p>
                  <Link href="/auth">Authorization!</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
