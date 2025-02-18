"use client"
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect } from "react";
import PanelPro from "./_components/panelPro/PanelPro";

export default function Home() {

  const {user}=useKindeBrowserClient();

  useEffect(()=>{
    console.log("--",user)
  },[user])
  return (
    <div>
      <Header/>
      <Hero/>
      {/* <PanelPro/> */}
    </div>
  );
}
