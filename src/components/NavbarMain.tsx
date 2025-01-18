"use client";
import { useGetUserProfileQuery } from "@/features/authApi";
import { ArrowDownToLine, BellIcon, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import LoginManager from "./LoginManager";
import RegisterManager from "./RegisterManager";
import { IoHelpCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

function NavbarMain() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

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
    <div className="fixed  backdrop-blur-lg w-full z-40 border-b hidden lg:flex items-center justify-center border-white/20">
      <div className="w-full lg:w-10/12 text-primary-text h-full gap-3 flex flex-col justify-between items-center p-3 pb-4 ">
        <div className="flex w-full justify-end gap-5 navbar-link-container  text-sm items-center px-1 text-secondary-text">
          <Link href="" className="relative">
            Discord
          </Link>
          <Link href="https://youtube.com/@dsd-group" className="relative">
            Youtube
          </Link>
          <Link
            href="https://www.instagram.com/quvna_game"
            className="relative"
          >
            Instagram
          </Link>
          <Link href="https://t.me/Quvnamarket" className="relative">
            Telegram
          </Link>
          <Link
            href="https://t.me/Quvnamarket"
            className="relative flex items-center  gap-1 text-primary-text"
          >
            <IoHelpCircleOutline className="text-xl -mb-0.5" />
            Support
          </Link>
        </div>
        <div className="hidden lg:flex  justify-between w-full  ">
          <Link
            href="/interface"
            className="font-clash-display text-3xl lg:text-5xl font-bold"
          >
            Quvna
          </Link>
          <div className="flex navbar-container items-center gap-6 text-lg">
            <Link
              href="/interface#items"
              className="group main-nav-item relative "
            >
              Store
              <div className="absolute rounded-3xl overflow-hidden p-0 group-hover:p-5 group-hover:text-primary-bg flex flex-col text-lg font-bold gap-2 bg-white/80 backdrop-blur-sm w-60 -right-4 -bottom-40 h-40 max-h-0 group-hover:max-h-40 duration-500 transition-all">
                <Link
                  href="/interface/pubg"
                  className="hover:text-primary-text px-2 py-1 hover:bg-primary-bg rounded-lg"
                >
                  Pubg
                </Link>
                <Link
                  href="/interface/steam"
                  className="hover:text-primary-text px-2 py-1 hover:bg-primary-bg rounded-lg"
                >
                  Steam
                </Link>
                <Link
                  href="/interface/ml"
                  className="hover:text-primary-text px-2 py-1 hover:bg-primary-bg rounded-lg"
                >
                  Mobile Legends
                </Link>
              </div>
            </Link>
            <Link className="main-nav-item" href="/interface/shop">
              Shop
            </Link>
            <Link className="main-nav-item" href="/interface/tournament">
              Tournament
            </Link>
            <Link className="main-nav-item" href="/interface/ratings">
              Ratings
            </Link>
            {data?.data?.id && !isLoading && (
              <Link className="main-nav-item" href="/interface/cart">
                Cart
              </Link>
            )}
            {data?.data?.id && !isLoading && (
              <Link className="main-nav-item" href="/interface/profile">
                Profile
              </Link>
            )}
            {!data?.data?.id && !isLoading && (
              <Dialog>
                <DialogTrigger asChild>
                  <div className="px-5 font-bold  rounded-xl border border-white/40 text-white pb-0.5  bg-main-blue transition-all cursor-pointer duration-300   flex items-center justify-center">
                    <p className="">Login</p>
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
              <div className="px-6 py-1 rounded-xl cursor-pointer text-primary-text bg-black flex gap-3 items-center justify-center">
                <p>Get App</p>
                <ArrowDownToLine size={17} className="text-main-blue " />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarMain;
