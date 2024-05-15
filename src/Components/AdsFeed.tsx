"use client";
import React, { useState, useEffect, useRef } from "react";
import "@/src/styles/Components/Feed/AdsFeed.scss";
import Image from "next/image";
import search from "../img/icon/Search.png";
import Incredibles from "../img/Users/incredibles.png";
import AGH from "../img/Users/AGH.png";
import confirm from "../img/icon/confirm.png";
import vector from "../img/icon/Vector.png";
import RecomendationItem from "./Feed/RecomendationItem";
import Cookies from "js-cookie";
import { getUsersId } from "@/src/Func/profile";
import { tokenCheck } from "@/src/Func/auth";

interface ADS {
  text: string;
  confirm: boolean;
  link: string;
  image: any;
  promoted: boolean;
}

function AdsFeed() {
  const jwt: any = Cookies.get("jwt");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (jwt) {
      tokenCheck(jwt).then((response) => {
        if (response.status) {
          setAuth(true);
        }
      });
    }
  }, [jwt]);

  const [isSearchFormOpen, setIsSearchFormOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const ADS: ADS[] = [
    {
      text: "The Incredibles",
      confirm: true,
      link: "@d-incrdbles",
      image: Incredibles,
      promoted: true,
    },
    {
      text: "AGH Racing",
      confirm: false,
      link: "@agh-racing",
      image: AGH,
      promoted: false,
    },
    {
      text: "Test",
      confirm: true,
      link: "@test",
      image: Incredibles,
      promoted: false,
    },
  ];
  const toggleSearchForm = () => {
    setIsSearchFormOpen(!isSearchFormOpen);
    if (isSearchFormOpen) {
      setSearchQuery("");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleInputBlur = () => {
    if (searchQuery === "") {
      setIsSearchFormOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchFormOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchFormOpen]);

  return (
    <div className="AdsFeed">
      <div className="AdsFeed__search" onClick={toggleSearchForm}>
        <Image src={search} alt="search" />
        <div className="AdsFeed__search-input">
          <span className={isSearchFormOpen ? "small" : ""}>
            Поиск <b>Nymity</b>
          </span>
          {isSearchFormOpen && (
            <input
              type="text"
              ref={searchInputRef}
              autoFocus
              onBlur={handleInputBlur}
              onChange={handleInputChange}
              value={searchQuery}
            />
          )}
        </div>
      </div>

      {searchQuery && isSearchFormOpen && (
        <div className="AdsFeed__search-input__modal"></div>
      )}
    {auth && (
      <div className="AdsFeed__recommendations">
        <h1>Recommendations for you</h1>
        {ADS.map((item, index) => (
          <RecomendationItem
            key={index}
            text={item.text}
            confirm={item.confirm}
            link={item.link}
            image={item.image}
            promoted={item.promoted}
          />
        ))}
        <div className="AdsFeed__recommendations-show">Show more</div>
      </div>
    )}
      
      <div className="AdsFeed__advertisement"></div>
    </div>
  );
}

export default AdsFeed;
