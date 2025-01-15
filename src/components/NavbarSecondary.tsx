"use client";
import { useGetUserProfileQuery } from "@/features/authApi";
import { ArrowDownToLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function NavbarSecondary() {
  const [userId, setUserId] = useState<string | null>(null);
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
    <div className="fixed backdrop-blur-lg w-full z-40 border-b flex items-center justify-center border-white/20">
      <div className="w-full lg:w-10/12 text-primary-text h-full  flex justify-between items-center p-5">
        {/* chnage here, make it grid so child items are same width but not changing the the style of child element */}
        <div className="grid grid-cols-3 justify-between w-full gap-3">
          <div className="flex justify-start gap-5 navbar-link-container  items-center text-secondary-text">
            <div className="relative">Discord</div>
            <div className="relative">Youtube</div>
            <div className="relative">Instagram</div>
            <div className="relative">Telegram</div>
          </div>
          <Link
            href="/interface"
            className="font-clash-display text-5xl font-bold flex items-center justify-center"
          >
            <p>Quvna</p>
          </Link>
          <div className="h-full w-full flex items-center justify-end">
            {!data?.data?.id && (
              <div className="px-6 py-2 rounded-full text-primary-text hover:text-main-blue transition-all cursor-pointer duration-300 bg-black flex items-center justify-center">
                <p>Login</p>
              </div>
            )}
            {data?.data?.id && (
              <div className="px-6 py-2 cursor-pointer rounded-full text-primary-text bg-black flex gap-3 items-center justify-center">
                <p>Get App</p>
                <ArrowDownToLine size={17} className="text-main-blue " />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center font-bold bg-white/40 backdrop-blur-lg absolute -bottom-10 translate-y-3 navbar-container items-center gap-14 text-lg p-3">
        <div>Store</div>
        <div>Shop</div>
        <div>Tournaments</div>
        <div>Leaderboard</div>
        <div>Cart</div>
        <div>Profile</div>
      </div>
    </div>
  );
}

export default NavbarSecondary;
