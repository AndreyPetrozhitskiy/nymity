import "@/src/styles/uiComponents/Feed/ServiceFeed.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../img/logo.svg";
import friends from "../img/icon/friends.png";
import home from "../img/icon/home.png";
import message from "../img/icon/message.png";
import more from "../img/icon/More.png";
import notifications from "../img/icon/Notifications.png";
import profile from "../img/icon/profile.png";
import picture from "../img/picture.png"
import settings from "../img/icon/settings.png"
function ServiceFeed() {
  return (
    <div className="ServiceFeed">
      <div className="ServiceFeed__container">
        <div className="ServiceFeed__container-menu">
          <div className="ServiceFeed__container-menu__logo">
            <Link href="/">
              <Image src={logo} alt="logo" />
              <span>Nymity</span>
            </Link>
          </div>

          <div className="ServiceFeed__container-menu__buttons">
            <div className="ServiceFeed__container-menu__buttons-item">
              <Image src={home} alt="Home" />
              <span>Home</span>
            </div>
            <div className="ServiceFeed__container-menu__buttons-item">
              <Image src={message} alt="message" />
              <span>Messages</span>
            </div>
            <div className="ServiceFeed__container-menu__buttons-item">
              <Image src={notifications} alt="notifications" />
              <span>Notifications</span>
            </div>
            <div className="ServiceFeed__container-menu__buttons-item">
              <Image src={friends} alt="friends" />
              <span>Friends</span>
            </div>
            <div className="ServiceFeed__container-menu__buttons-item">
              <Image src={profile} alt="profile" />
              <span>Profile</span>
            </div>
            <div className="ServiceFeed__container-menu__buttons-item">
              <Image src={more} alt="more" />
              <span>More</span>
            </div>
          </div>
        </div>
        <div className="ServiceFeed__container-account">
            <div className="ServiceFeed__container-account__picture">
                <Image src={picture} alt="picture" />
            </div>
            <div className="ServiceFeed__container-account__text">
                <span>Tomasz Gajda</span>
                <span>@nerooc</span>
            </div>
            <Image src={settings} alt="settings" />
        </div>
      </div>
    </div>
  );
}

export default ServiceFeed;
