"use client";
import { useGetUserProfileQuery } from "@/features/authApi";
import { ArrowDownToLine, BellIcon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import LoginManager from "./LoginManager";
import RegisterManager from "./RegisterManager";

function NavbarMain() {
  const [userId, setUserId] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [loginManager, setLoginManager] = useState("login");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = window.localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  const { data, error, isLoading } = useGetUserProfileQuery(userId, {
    skip: !userId,
  });
  return (
    <div className="fixed  backdrop-blur-lg w-full z-40 border-b flex items-center justify-center border-white/20">
      <div
        className={`lg:hidden  fixed  flex flex-col gap-5 transition-all duration-1000 ease-[cubic-bezier(1,-0.4,0.35,0.95)] overflow-hidden top-14 translate-y-1 w-full bg-white ${
          navOpen ? " max-h-screen p-5" : "max-h-0 p-0"
        }`}
      >
        <div className="flex flex-col font-bold navbar-container justify-start items-start gap-3 text-3xl">
          <div>Store</div>
          <div>Shop</div>
          <div>Tournaments</div>
          <div>Leaderboard</div>
          <div>Cart</div>
          <div>Profile</div>
        </div>
        <div className="w-full flex justify-end gap-5 items-center text-lg">
          <div>
            <BellIcon />
          </div>
          <div className="text-primary-text px-4 py-1 bg-black rounded-full">
            Uz
          </div>
        </div>
      </div>
      <div className="w-full lg:w-10/12 text-primary-text h-full  flex justify-between items-center p-3 lg:p-5 ">
        <div className="font-clash-display text-3xl lg:text-5xl font-bold">
          Quvna
        </div>
        <div
          className="lg:hidden relative"
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <Menu />
        </div>
        <div className="hidden lg:flex flex-col gap-3">
          <div className="flex justify-end gap-5 navbar-link-container text-sm items-center text-secondary-text">
            <div className="relative">Discord</div>
            <div className="relative">Youtube</div>
            <div className="relative">Instagram</div>
            <div className="relative">Telegram</div>
            {!data?.data?.id && !isLoading && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="px-6 py-1 rounded-full text-primary-text hover:text-main-blue transition-all cursor-pointer duration-300 bg-black flex items-center justify-center">
                    <p>Login</p>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] p-0 flex items-center flex-col gap-0 pb-5">
                  {loginManager === "register" ? (
                    <RegisterManager />
                  ) : (
                    <LoginManager />
                  )}
                  {loginManager === "login" && (
                    <div className="text-primary-bg text-sm mt-10 lg:text-base">
                      Don't have an account yet?{" "}
                      <span
                        className="font-bold cursor-pointer"
                        onClick={() => setLoginManager("register")}
                      >
                        Sign Up.
                      </span>
                    </div>
                  )}
                  {loginManager === "register" && (
                    <div className="text-primary-bg text-sm mt-10 lg:text-base">
                      Already have an account{" "}
                      <span
                        className="font-bold cursor-pointer"
                        onClick={() => setLoginManager("login")}
                      >
                        Login.
                      </span>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            )}
            {data?.data?.id && !isLoading && (
              <div className="px-6 py-1 rounded-full text-primary-text bg-black flex gap-3 items-center justify-center">
                <p>Get App</p>
                <ArrowDownToLine size={17} className="text-main-blue " />
              </div>
            )}
          </div>
          <div className="flex navbar-container items-center gap-10 text-lg px-2">
            <Link href="/interface">Store</Link>
            <Link href="/interface/shop">Shop</Link>
            <Link href="/interface/torunament">Tournament</Link>
            <Link href="/interface/ratings">Ratings</Link>
            {data?.data?.id && !isLoading && (
              <Link href="/interface/cart">Cart</Link>
            )}
            {data?.data?.id && !isLoading && (
              <Link href="/interface/profile">Profile</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarMain;
