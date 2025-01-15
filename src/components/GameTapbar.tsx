import Image from "next/image";
import React from "react";

function GameTapbar() {
  return (
    <div className="fixed flex lg:hidden rounded-full items-center justify-between p-1 border border-white/20  gap-1 bg-white left-1/2 -translate-x-1/2 bottom-5 z-50">
      <div className="h-10 w-10 rounded-bull bg-black rounded-full flex relative items-center justify-center">
        <Image src="/images/pubg-icon.png" width={30} height={30} alt="pubg" />
      </div>
      <div className="h-10 w-10 rounded-bull bg-black/80 rounded-full flex relative items-center justify-center">
        <Image src="/images/steam-icon.png" width={30} height={30} alt="pubg" />
      </div>
      <div className="h-10 w-10 rounded-bull bg-black/80 rounded-full flex relative items-center justify-center">
        <Image src="/images/ml-icon.png" width={30} height={30} alt="pubg" />
      </div>
    </div>
  );
}

export default GameTapbar;
