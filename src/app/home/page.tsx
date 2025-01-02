import MainAdvertisements from "@/components/MainAdvertisements";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function pages() {
  return (
    <div className="w-full h-full bg-primary-bg flex flex-col gap-2 lg:gap-5 overflow-y-auto pb-20 text-primary-text p-3 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-2 lg:gap-5">
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
