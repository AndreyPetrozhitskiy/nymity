'use client'
import Link from "next/link";
import "../../styles/Feed/Feed.scss"
export default function Home() {
  function cons(){
    console.log("jjkjkaksd")
  }
  return <>
    <div className="test" onClick={()=>cons()}>
  
    </div>
  </>;
}
