import MainAdvertisements from "@/components/MainAdvertisements";
import MainGames from "@/components/MainGames/MainGames";
import Image from "next/image";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

function page() {
  return (
    <div className="bg-primary-bg min-h-screen flex  justify-center w-full">
      <div className="rounded-full aspect-square bg-main-blue w-2/3 lg:w-1/2 -top-20 animate-spin-custom lg:-top-1/3 flex blur-xl lg:blur-3xl items-center justify-start absolute">
        <div className="rounded-full bg-primary-bg w-10/12 aspect-square"></div>
      </div>
      <div className="w-full lg:w-10/12 z-10">
        <div className="h-[60vh] lg:h-[73vh] w-full flex flex-col gap-10 lg:gap-20 items-center pt-20 p-3 lg:p-0 lg:pt-48 ">
          <div className="text-primary-text lg:w-2/3 flex flex-col gap-5 mt-10 lg:mt-20 lg:gap-5 text-center font-clash-display text-5xl lg:text-7xl">
            <div className="text-balance">
              Unlock the gear you need to dominate the game
            </div>
            <div className="text-sm lg:text-xl font-satoshi text-secondary-text">
              Explore our collection of must-have gaming items!
            </div>
          </div>
          {/* <div className="w-20 h-20 blur-xl rounded-full bg-main-blue"></div> */}
        </div>
        <div className="w-full mb-40 p-2 ">
          <div className="w-full grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5">
            <div className="lg:col-span-2">
              <MainAdvertisements />
            </div>
            <div className="relative border border-white/20 rounded-3xl w-full h-full text-6xl font-satoshi text-white">
              <Image
                src="/images/shop-bg-demo.jpg"
                fill
                alt="shop"
                className="rounded-3xl object-cover"
              />
              <div className="absolute top-3 left-3 text-xl text-white bg-black/10 backdrop-blur-lg rounded-xl px-4 font-clash-display tracking-wider font-semibold">
                Shop
              </div>
              <FiArrowUpRight className="absolute -right-2 -top-2 lg:-right-5 lg:-top-5 text-8xl lg:text-[10rem] text-main-blue stroke-main-blue" />
              <div className="absolute  w-full bottom-0 left-0 bg-black/40 backdrop-blur-sm p-2 lg:p-5">
                <div className="h-5 absolute -top-2.5 blur-sm left-0 bg-white/40 w-full"></div>
                <p className="text-4xl font-bold tracking-wide font-clash-display">
                  Upgrade Your Tech.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-10 mb-40">
          <div className="text-6xl font-bold font-clash-display text-white tracking-wide">
            Live Streams
          </div>
          <div className="grid grid-cols-4 gap-5">
            <div className="w-full h-60 border border-white/20 rounded-2xl"></div>
            <div className="w-full h-60 border border-white/20 rounded-2xl"></div>
            <div className="w-full h-60 border border-white/20 rounded-2xl"></div>
            <div className="w-full h-60 border border-white/20 rounded-2xl"></div>
          </div>
        </div>
        <MainGames />
      </div>
    </div>
  );
}

export default page;
