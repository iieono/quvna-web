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

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
  return (
    <Provider store={store}>
      <body className="min-h-screen h-screen flex justify-between bg-white p-1 text-primary-text gap-1">
        {!isMain && (
          <Link
            href="/home"
            className="brand-text text-4xl cursor-pointer bg-white rounded-br-3xl  text-black font-semibold font-clash-display top-1 left-1 px-7 pr-6 py-1 absolute "
          >
            {text.split("").map((letter, index) => (
              <span
                key={index}
                className="opacity-20 letter-main text-accent-blue"
              >
                {letter}
              </span>
            ))}
            {/* <div className=" links-to-social absolute top-3 group gap-0 hover:gap-2 transition-all duration-300 flex flex-col  -right-12 z-20 text-white">
              <div
                className={`overflow-hidden ${
                  language != "uz" ? "max-h-0" : ""
                } group-hover:max-h-60 flex  transition-all duration-1000 ease-in-out`}
                onClick={() => setLanguage("uz")}
              >
                <Image
                  src="/images/uzbekistan-icon.png"
                  alt="uzb icon"
                  width={30}
                  height={30}
                />
              </div>
              <div
                className={`overflow-hidden ${
                  language != "ru" ? "max-h-0" : ""
                } group-hover:max-h-60 transition-all duration-1000 ease-in-out`}
                onClick={() => setLanguage("ru")}
              >
                <Image
                  src="/images/russia-icon.png"
                  alt="ru icon"
                  width={30}
                  height={30}
                />
              </div>
            </div> */}

            <div className="h-10 w-10 bg-white absolute -bottom-10 left-0">
              <div className="absolute h-full w-full bg-primary-bg rounded-tl-3xl"></div>
            </div>
            <div className="h-10 w-10 bg-white absolute -right-10 top-0">
              <div className="absolute h-full w-full bg-primary-bg rounded-tl-3xl"></div>
            </div>
          </Link>
        )}
        {!isLoginOrRegister && (
          <div className="brand-text text-base cursor-pointer bg-white rounded-tr-3xl  text-black font-semibold font-clash-display bottom-1 left-1 px-3 pl-4 py-2 absolute ">
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
            <div className="h-10 w-10 bg-white absolute -right-10 bottom-0">
              <div className="absolute h-full w-full bg-primary-bg rounded-bl-3xl"></div>
            </div>
          </div>
        )}
        <div className="w-full rounded-3xl overflow-hidden">{children}</div>
        {!isMain && <UserComponent />}
        <Toaster />
      </body>
    </Provider>
  );
}
