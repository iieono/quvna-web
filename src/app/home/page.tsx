"use client";
import MainAdvertisements from "@/components/MainAdvertisements";
import { useGetUserProfileQuery } from "@/features/authApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function pages() {
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
    <div className="w-full h-full bg-primary-bg flex flex-col gap-2 lg:gap-5 overflow-y-auto pb-20 text-primary-text p-3 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 justify-between gap-2 lg:gap-5">
        <MainAdvertisements />
        <Link
          href="/shop"
          className="w-full h-40 lg:h-96 relative rounded-3xl bg-white/10"
        >
          <Image
            src="/images/shop-bg.jpg"
            fill
            className="object-cover object-center rounded-3xl "
            alt="User profile image"
          />
          shop
        </Link>
        <div className="w-full h-full lg:h-96 p-3 lg:p-5 relative rounded-3xl lg:bg-white/10">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-1 h-16 items-center bg-white/10 rounded-lg text-primary-bg p-2 pl-4">
              <div>
                <p className="font-medium text-primary-text">
                  {data?.data?.playName}
                </p>
                <p className="text-sm text-secondary-text">
                  {data?.data?.gameID}
                </p>
              </div>
              <div className="flex items-center">
                <p className="font-medium text-reward-yellow">
                  {data?.data?.rating?.ucAmount
                    .toLocaleString("en", { useGrouping: true })
                    .replace(/,/g, " ") || 0}
                </p>
                <Image
                  src="/images/uc-icon.png"
                  alt="UC icon"
                  width={40}
                  height={40}
                  className="rounded-full"
                  unoptimized
                />
              </div>
            </div>
            <div className="flex justify-between gap-1 h-16 items-center bg-white/10 rounded-lg text-primary-bg p-2 px-4">
              <div>
                <p className="font-medium text-primary-text">
                  {data?.data?.steamName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-reward-yellow">
                  {data?.data?.rating?.steamAmount
                    .toLocaleString("en", { useGrouping: true })
                    .replace(/,/g, " ") || 0}
                </p>
                <Image
                  src="/images/steam-icon.png"
                  alt="Steam icon"
                  width={24}
                  height={24}
                  className="rounded-full"
                  unoptimized
                />
              </div>
            </div>
            <div className="flex justify-between gap-1 h-16 items-center bg-white/10 rounded-lg text-primary-bg p-2 px-4">
              <div>
                <p className="font-medium text-primary-text">
                  {data?.data?.mobileLegendsName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-reward-yellow">
                  {data?.data?.rating?.mlamount
                    .toLocaleString("en", { useGrouping: true })
                    .replace(/,/g, " ") || 0}
                </p>
                <Image
                  src="/images/ml-icon.png"
                  alt="ML icon"
                  width={24}
                  height={24}
                  className="rounded-full"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 justify-between gap-2 lg:gap-5">
        <Link
          href="/pubg"
          className="h-40 lg:h-80 w-full rounded-3xl relative bg-white/10"
        >
          <Image
            src="/images/pubg-bg.jpg"
            fill
            className="object-cover object-center rounded-3xl "
            alt="User profile image"
          />
          pubg
        </Link>
        <Link
          href="steam"
          className="h-40 lg:h-80 w-full relative rounded-3xl bg-white/10"
        >
          <Image
            src="/images/steam-bg.png"
            fill
            className="object-cover object-center rounded-3xl "
            alt="User profile image"
          />
          steam
        </Link>
        <Link
          href="ml"
          className="h-40 lg:h-80 w-full relative col-span-2 lg:col-span-1 rounded-3xl bg-white/10"
        >
          <Image
            src="/images/ml-bg.jpg"
            fill
            className="object-cover object-center rounded-3xl "
            alt="User profile image"
          />
          mobile legends
        </Link>
        <Link
          href="/tournament"
          className=" h-40 lg:h-80 rounded-3xl col-span-2 lg:col-span-1 bg-white/10 relative"
        >
          <Image
            src="/images/tournament.jpg"
            fill
            className="object-cover object-center rounded-3xl "
            alt="User profile image"
          />
          turnir
        </Link>
        <Link
          href="/gaming-zone"
          className="h-40 lg:h-80 rounded-3xl col-span-2 lg:col-span-1 bg-white/10 relative"
        >
          <Image
            src="/images/gaming-zone.jpg"
            fill
            className="object-cover object-center rounded-3xl "
            alt="User profile image"
          />
          gaming zone
        </Link>
      </div>
      {/* <div className="grid grid-cols-2 justify-between gap-2 lg:gap-5"></div> */}
    </div>
  );
}

export default pages;
