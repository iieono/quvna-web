"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Globe, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Provider } from "react-redux";
import { store } from "../store";
import UserComponent from "./UserComponent";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "./ui/toaster";
import Navbar from "./Navbar";
import NavbarMain from "./NavbarMain";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  const [language, setLanguage] = useState("uz");
  const router = useRouter();
  const text = "Quvna";
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/" && pathname !== "/register") {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        }
      }
    }
  }, [router]);
  let isLoginOrRegister = pathname === "/login" || pathname === "/register";
  let isMain =
    pathname === "/login" || pathname === "/register" || pathname === "/";
  useEffect(() => {
    isLoginOrRegister = pathname === "/login" || pathname === "/register";
    isMain =
      pathname === "/login" || pathname === "/register" || pathname === "/";
  }, [pathname]);

  useGSAP(() => {
    gsap.to(".letter-main", {
      opacity: 1,
      rotateX: 0,
      y: 0,
      color: "#00a8ff",
      duration: 1,
      ease: "power2.out",
      stagger: 0.15, // Delay between each letter
    });
  }, [pathname]);
  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);
  return (
    <Provider store={store}>
      <body className="min-h-screen h-screen flex flex-col bg-white p-1 text-primary-text lg:gap-1">
        {/* <div
          className="absolute flex lg:hidden flex-col top-2 right-6 justify-between items-end py-3 gap-1 z-50"
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <div className="w-8 bg-white h-2 rounded-full"></div>
          <div className="w-5 bg-white h-1.5 rounded-full"></div>
          <div className="w-6 bg-white h-1 rounded-full"></div>
        </div> */}
        {navOpen && <Navbar />}

        {!isMain && <NavbarMain />}
        <div className="w-full h-full rounded-3xl overflow-hidden">
          {children}
          {!isMain && (
            <div className="hidden lg:flex brand-text text-base cursor-pointer bg-white rounded-tr-3xl  text-black font-semibold font-clash-display bottom-3 left-1 px-3 pl-4 py-2 absolute ">
              <div className="flex gap-3">
                <Link
                  href="https://www.instagram.com/quvna_game"
                  className="rounded-full bg-primary-bg/20 p-1 px-3"
                >
                  Instagram
                </Link>
                <Link
                  href="https://t.me/Quvnamarket"
                  className="rounded-full bg-primary-bg/20 p-1 px-3"
                >
                  Telegram
                </Link>
                <Link
                  href="https://youtube.com/@dsd-group"
                  className="rounded-full bg-primary-bg/20 p-1 px-3"
                >
                  Youtube
                </Link>
              </div>
              <div className="h-10 w-10 bg-white absolute -top-10 left-0">
                <div className="absolute h-full w-full bg-primary-bg rounded-bl-3xl"></div>
              </div>
              {/* <div className="h-10 w-10 bg-white absolute -right-10 bottom-0">
                <div className="absolute h-full w-full bg-primary-bg rounded-bl-3xl"></div>
              </div> */}
            </div>
          )}
        </div>
        {/* {!isMain && <UserComponent />} */}
        <Toaster />
      </body>
    </Provider>
  );
}
