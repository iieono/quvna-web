"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, Globe } from "lucide-react";
import { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Provider } from "react-redux";
import { store } from "../store";
import UserComponent from "./UserComponent";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    // Check if 'window' is defined (client-side environment)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }
  }, [router]);
  const text = "Quvna";
  const pathname = usePathname();
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
        {!isLoginOrRegister && (
          <div className="brand-text text-4xl cursor-pointer bg-white rounded-br-3xl  text-black font-semibold font-clash-display top-1 left-1 px-5 pr-6 py-1 absolute ">
            {text.split("").map((letter, index) => (
              <span
                key={index}
                className="opacity-20 letter-main text-accent-blue"
              >
                {letter}
              </span>
            ))}

            <div className="h-10 w-10 bg-white absolute -bottom-10 left-0">
              <div className="absolute h-full w-full bg-primary-bg rounded-tl-3xl"></div>
            </div>
            <div className="h-10 w-10 bg-white absolute -right-10 top-0">
              <div className="absolute h-full w-full bg-primary-bg rounded-tl-3xl"></div>
            </div>
          </div>
        )}
        <div className="w-full rounded-3xl overflow-hidden">{children}</div>
        {!isMain && <UserComponent />}
      </body>
    </Provider>
  );
}
