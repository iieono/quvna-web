import React from "react";

function Footer() {
  return (
    <div className="w-full  pb-6 bg-primary-bg flex  text-white justify-center relative">
      <div className="w-2/3  h-20 bg-main-blue/60 blur-3xl rotate-6 left-0 top-1/3 absolute"></div>
      <div className="w-2/3  h-20 bg-white/40 blur-3xl rotate-6 left-0 top-0 absolute"></div>
      <div className="w-full lg:w-10/12 flex flex-col gap-5">
        <div className="flex flex-col lg:flex-row px-2 gap-10 justify-between py-5">
          <div className="flex flex-col gap-2 font-bold">
            <div className="text-6xl font-clash-display tracking-wider">
              Quvna
            </div>
            <div className="text-secondary-text opacity-60">C Quvna, 2025</div>
            <div className=" text-secondary-text mt-2">Support</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="font-bold text-xl text-secondary-text">
              Follow us on socials:
            </div>
            <div className="flex gap-2">
              <div className="h-16 w-16  bg-white"></div>
              <div className="h-16 w-16  bg-white"></div>
              <div className="h-16 w-16  bg-white"></div>
              <div className="h-16 w-16  bg-white"></div>
            </div>
          </div>
        </div>
        <div className="w-full bg-white/10 h-[1px]"></div>
        <div className="w-full flex justify-between flex-col lg:flex-row gap-3 px-2">
          <div className="text-secondary-text opacity-60">
            Tashkent, Uzbekistan
          </div>
          <div>links</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
