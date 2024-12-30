import React, { useState } from "react";
import Image from "next/image";
import { TransitionPanel } from "./ui/transition-panel";
import {
  useGetFiftyAllMLQuery,
  useGetFiftyAllSteamQuery,
  useGetFiftyAllUcQuery,
} from "@/features/ratingApi";

interface RatingItem {
  image?: string;
  playName?: string;
  gameID?: string;
  ucAmount?: number;
  steamName?: string;
  steamAmount?: number;
  mobileLegendsName?: string;
  mlamount?: number;
}

interface RatingData {
  data: RatingItem[];
}

export function RatingsTransitionPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: ucData,
    isLoading: ucLoading,
    error: ucError,
  } = useGetFiftyAllUcQuery(undefined);
  const {
    data: steamData,
    isLoading: steamLoading,
    error: steamError,
  } = useGetFiftyAllSteamQuery(undefined);
  const {
    data: mlData,
    isLoading: mlLoading,
    error: mlError,
  } = useGetFiftyAllMLQuery(undefined);

  const renderContent = (
    data: RatingData | undefined,
    loading: boolean,
    error: any,
    type: "uc" | "steam" | "ml"
  ) => {
    if (loading) return "Loading...";
    if (error) return `Error: ${error.message}`;
    if (!data || !data.data) return "No data available";

    return data.data.map((item, index) => (
      <div key={index} className="flex items-center space-x-2 mb-4">
        <Image
          src={item.image || `/images/${type}-icon.png`}
          alt={`${type.toUpperCase()} Rating for ${
            item.playName || item.steamName || item.mobileLegendsName
          }`}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col">
            <p className="font-medium text-primary-text">
              {item.playName ||
                item.steamName ||
                item.mobileLegendsName ||
                "Not found"}
            </p>
            {type === "uc" && (
              <p className="text-xs text-secondary-text">
                UID: {item.gameID || "Not found"}
              </p>
            )}
          </div>
          <div className="flex items-center">
            <p className="text-base text-reward-yellow">
              {(
                (type === "uc"
                  ? item.ucAmount
                  : type === "steam"
                  ? item.steamAmount
                  : item.mlamount) || 0
              )
                .toLocaleString("en", { useGrouping: true })
                .replace(/,/g, " ")}
            </p>
            <Image
              src={`/images/${type}-icon.png`}
              alt={`${type} icon`}
              width={type === "uc" ? 40 : 20}
              height={type === "uc" ? 40 : 20}
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    ));
  };

  const ITEMS = [
    {
      image: "/images/pubg-icon.png",
      subtitle: "UC Ratings",
      content: renderContent(ucData, ucLoading, ucError, "uc"),
    },
    {
      image: "/images/steam-icon.png",
      subtitle: "Steam Ratings",
      content: renderContent(steamData, steamLoading, steamError, "steam"),
    },
    {
      image: "/images/ml-icon.png",
      subtitle: "ML Ratings",
      content: renderContent(mlData, mlLoading, mlError, "ml"),
    },
  ];

  return (
    <div className="bg-primary-bg overflow-hidden h-full rounded-3xl p-5">
      <div className="mb-4 flex space-x-2">
        {ITEMS.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              activeIndex === index ? "bg-white " : "bg-white/10 "
            }`}
          >
            <Image
              src={item.image}
              alt={`Icon for ${item.subtitle}`}
              width={32}
              height={32}
            />
          </button>
        ))}
      </div>
      <div className="overflow-scroll h-full pb-10 border-t border-zinc-200 dark:border-zinc-700">
        <TransitionPanel
          activeIndex={activeIndex}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          variants={{
            enter: { opacity: 0, y: -50, filter: "blur(4px)" },
            center: { opacity: 1, y: 0, filter: "blur(0px)" },
            exit: { opacity: 0, y: 50, filter: "blur(4px)" },
          }}
        >
          {ITEMS.map((item, index) => (
            <div key={index} className="py-2">
              <div className="space-y-4">{item.content}</div>
            </div>
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}

export default RatingsTransitionPage;
