import Link from "next/link";
import Image from "next/image";
import logo from "../img/logo.svg";
import "@/src/styles/Home.scss";
export default function Home() {
  return (
    <div className="Home">
      <div className="Home__logo">
        <Image src={logo} alt="logo"></Image>
      </div>
      <div className="Home__text">
        <div className="Home__text-container">
          <div className="Home__text-container-h1">
            <h1>В тени событий</h1>
            <h2>Присоединяйтесь сегодня.</h2>
          </div>
          <div className="Home__text-container-link">
            <Link href="/auth">
              <button>Войти</button>
            </Link>
            <Link href="/auth/registration">
              <button>Зарегистрироваться</button>
            </Link>
            <p>
              Регистрируясь, вы соглашаетесь с Условиями предоставления услуг и
              Политикой конфиденциальности, а также с Политикой использования
              файлов cookie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
