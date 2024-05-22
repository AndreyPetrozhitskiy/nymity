"use client";
import React, { useRef, useEffect, useState } from "react";
import "@/src/styles/Components/Settings/GorizontalBar.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Page {
  url: string;
  title: string;
}

// Интерфейс для пропсов, который будет содержать массив страниц
interface Props {
  pages: Page[];
}

function GorizontalBar({ pages }: Props) {
  const url = usePathname();
  const [pageTitle, setPageTitle] = useState("");

  const sliderRef = useRef(null);

  const updatePageTitle = (currentUrl: string) => {
    const currentPage = pages.find((page) => page.url === currentUrl);
    setPageTitle(currentPage ? currentPage.title : "Страница не найдена");
  };

  useEffect(() => {
    updatePageTitle(url);
  }, [url]);

  useEffect(() => {
    const slider: any = sliderRef.current;
    let isDown = false;
    let startX: any;
    let scrollLeft: any;

    const handleMouseDown = (e: any) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      slider.classList.remove("active");
    };

    const handleMouseMove = (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Скорость прокрутки
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleWheel = (e: any) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY; // Прокрутка горизонтально при вертикальном движении колеса
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);
    slider.addEventListener("wheel", handleWheel);

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="GorizontalBar">
      <div className="GorizontalBar__header">
        <h1>{pageTitle}</h1>
      </div>
      <div className="GorizontalBar__menu">
        <div className="GorizontalBar__menu-slider" ref={sliderRef}>
          {pages.map((item, itemIndex) => (
            <Link
              href={item.url}
              className={`GorizontalBar__menu-slider__item${
                url === item.url ? "-active" : ""
              }`}
              key={itemIndex}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GorizontalBar;
