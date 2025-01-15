import MainAdvertisements from "@/components/MainAdvertisements";
import React from "react";

function page() {
  return (
    <div className="bg-primary-bg min-h-screen flex  justify-center w-full">
      <div className="w-full lg:w-10/12">
        <div className="min-h-screen w-full flex flex-col gap-10 lg:gap-20 items-center pt-20 p-3 lg:p-0 lg:pt-48 ">
          <div className="text-primary-text lg:w-2/3 flex flex-col gap-2 lg:gap-5 text-center font-clash-display text-5xl lg:text-7xl">
            <div className="">
              <span className="">Unlock the gear you need</span> <br />
              to dominate the game
            </div>
            <div className="text-sm lg:text-xl font-satoshi text-secondary-text">
              Explore our collection of must-have gaming items!
            </div>
          </div>
          {/* <div className="w-20 h-20 blur-xl rounded-full bg-main-blue"></div> */}
          <div className="w-full grid  grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2">
              <MainAdvertisements />
            </div>
            <div className="border border-white/20 rounded-3xl w-full h-full text-6xl font-satoshi text-white">
              {" "}
              shop
            </div>
          </div>
        </div>
        <div className="h-screen w-full  text-6xl flex items-center justify-center">
          Shop
        </div>
      </div>
    </div>
  );
}

export default page;
