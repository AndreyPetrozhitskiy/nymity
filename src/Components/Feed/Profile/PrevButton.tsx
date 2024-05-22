"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import arrow from "@/src/img/icon/arrow_left.svg";
import { useRouter } from "next/navigation";


function PrevButton() {
    const router = useRouter()
  return (
    <>
      {/* <Link href="/"> */}
        <Image src={arrow} alt="arrow" onClick={() => router.back()}/>
      {/* </Link> */}
    </>
  );
}

export default PrevButton;
