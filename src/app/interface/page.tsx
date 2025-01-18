import MainAdvertisements from "@/components/MainAdvertisements";
import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="bg-primary-bg min-h-screen flex  justify-center w-full">
      <div className="rounded-full aspect-square bg-main-blue w-2/3 lg:w-1/2 -top-20 animate-spin-custom lg:-top-1/3 flex blur-xl lg:blur-3xl items-center justify-start absolute">
        <div className="rounded-full bg-primary-bg w-10/12 aspect-square"></div>
      </div>
      <div className="w-full lg:w-10/12 z-10">
        <div className="h-[73vh] w-full flex flex-col gap-10 lg:gap-20 items-center pt-20 p-3 lg:p-0 lg:pt-48 ">
          <div className="text-primary-text lg:w-2/3 flex flex-col gap-2 lg:gap-5 text-center font-clash-display text-5xl lg:text-7xl">
            <div className="text-balance">
              Unlock the gear you need to dominate the game
            </div>
            <div className="text-sm lg:text-xl font-satoshi text-secondary-text">
              Explore our collection of must-have gaming items!
            </div>
          </div>
          {/* <div className="w-20 h-20 blur-xl rounded-full bg-main-blue"></div> */}
        </div>
        <div className="w-full mb-20">
          <div className="w-full grid grid-rows-2 lg:grid-rows-1 grid-cols-1 lg:grid-cols-3 gap-5">
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
              <div className="absolute  w-full bottom-0 left-0 bg-black/40 backdrop-blur-sm p-5">
                <div className="h-5 absolute -top-2.5 blur-sm left-0 bg-white/40 w-full"></div>
                <p className="text-4xl font-bold font-clash-display">
                  Upgrade Your Tech
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-40 w-full bg-white">streams</div>
        <div
          id="items"
          className="h-screen w-full text-6xl flex items-center relative justify-center"
        >
          <div className="w-full h-1/2 text-primary-text p-2 grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-2">
            <div className="w-full h-full rounded-3xl border border-white/20 p-3">
              pubg
            </div>
            <div className="w-full h-full rounded-3xl border border-white/20 p-3">
              steam
            </div>
            <div className="w-full h-full rounded-3xl border border-white/20 p-3">
              Mobile legends
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
