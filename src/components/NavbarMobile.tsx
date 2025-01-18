import { BellIcon, Menu } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

function NavbarMobile() {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <div className="fixed h-12 text-white backdrop-blur-lg w-screen z-40 border-b flex lg:hidden items-center justify-between border-white/20">
      <div
        className={`lg:hidden  fixed  flex flex-col gap-5 transition-all duration-1000 ease-[cubic-bezier(1,-0.4,0.35,0.95)] overflow-hidden top-12 w-full bg-white ${
          navOpen ? " max-h-screen p-5" : "max-h-0 p-0"
        }`}
      >
        <div className="flex flex-col font-bold text-black navbar-container justify-start items-start gap-3 text-3xl">
          <div>Store</div>
          <div>Shop</div>
          <div>Tournaments</div>
          <div>Leaderboard</div>
          <div>Cart</div>
          <div>Profile</div>
        </div>
        <div className="w-full flex justify-end gap-5 items-center text-lg">
          <div>
            <BellIcon className="text-black" />
          </div>
          <div className="text-primary-text px-4 py-1 bg-black rounded-full">
            Uz
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-2 w-full">
        <Link
          href="/interface"
          className="font-clash-display text-3xl lg:text-5xl font-bold"
        >
          Quvna
        </Link>
        <div
          className="lg:hidden relative"
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default NavbarMobile;
