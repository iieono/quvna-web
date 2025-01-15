"use client";
import GameTapbar from "@/components/GameTapbar";
import NavbarMain from "@/components/NavbarMain";
import NavbarSecondary from "@/components/NavbarSecondary";
import { store } from "@/store";
import React from "react";
import { Provider } from "react-redux";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className="h-full w-full min-h-screen">
        <NavbarMain />
        {/* <NavbarSecondary /> */}
        {children}
        <GameTapbar />
      </div>
    </Provider>
  );
}

export default layout;
