import React, { useState } from "react";
import Image from "next/image"; // Import the Image component
import { TransitionPanel } from "./ui/transition-panel"; // Make sure this is imported
import {
  useGetFiftyAllMLQuery,
  useGetFiftyAllSteamQuery,
  useGetFiftyAllUcQuery,
} from "@/features/ratingApi";
import { Spotlight } from "./ui/spotlight";

export function RatingsTransitionPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: ucData,
    isLoading: ucLoading,
    error: ucError,
  } = useGetFiftyAllUcQuery();
  const {
    data: steamData,
    isLoading: steamLoading,
    error: steamError,
  } = useGetFiftyAllSteamQuery();
  const {
    data: mlData,
    isLoading: mlLoading,
    error: mlError,
  } = useGetFiftyAllMLQuery();
  //   console.log(ucData?.data);
  //   console.log(steamData?.data);
  //   console.log(mlData?.data);

  const ITEMS = [
    {
      image: "/images/pubg-icon.png", // Image for UC Ratings
      subtitle: "UC Ratings",
      content: ucLoading
        ? "Loading..."
        : ucError
        ? `Error: ${ucError.message}`
        : ucData
        ? ucData.data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-4">
              <Image
                src={item.image || "/images/pubg-icon.png"} // Use user image or fallback image
                alt={`UC Rating for ${item.playName}`} // Descriptive alt text
                width={40} // Set the width of the image
                height={40} // Set the height of the image
                className="rounded-full"
              />
              <div className="flex justify-between items-start w-full">
                <div className="flex flex-col">
                  <p className="font-medium text text-primary-text">
                    {item.playName || "Not found"}
                  </p>
                  <p className="text-xs text-secondary-text ">
                    UID: {item.gameID || "Not found"}
                  </p>
                </div>
                <div className="flex  items-center">
                  <p className="text-base text-reward-yellow">
                    {item.ucAmount
                      .toLocaleString("en", { useGrouping: true })
                      .replace(/,/g, " ") || 0}
                  </p>
                  <Image
                    src="/images/uc-icon.png" // Use user image or fallback image
                    alt="uc icon" // Descriptive alt text
                    width={40} // Set the width of the image
                    height={40} // Set the height of the image
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          ))
        : "No data available",
    },
    {
      image: "/images/steam-icon.png", // Image for Steam Ratings
      subtitle: "Steam Ratings",
      content: steamLoading
        ? "Loading..."
        : steamError
        ? `Error: ${steamError.message}`
        : steamData
        ? steamData.data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-4">
              <Image
                src={item.image || "/images/steam-icon.png"} // Use user image or fallback image
                alt={`Steam Rating for ${item.steamName}`} // Descriptive alt text
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="font-medium text-primary-text">
                    {item.steamName || "Not found"}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-base -mb-1 text-reward-yellow">
                    {item.steamAmount
                      .toLocaleString("en", { useGrouping: true })
                      .replace(/,/g, " ") || 0}
                  </p>
                  <Image
                    src={"/images/steam-icon.png"} // Use user image or fallback image
                    alt={`Steam Rating for ${item.name}`} // Descriptive alt text
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          ))
        : "No data available",
    },
    {
      image: "/images/diamond-icon.png", // Image for ML Ratings
      subtitle: "ML Ratings",
      content: mlLoading
        ? "Loading..."
        : mlError
        ? `Error: ${mlError.message}`
        : mlData
        ? mlData.data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-4">
              <Image
                src={item.image || "/images/diamond-icon.png"} // Use user image or fallback image
                alt={`ML Rating for ${item.mobileLegendsName}`} // Descriptive alt text
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex w-full items-center justify-between">
                <div>
                  <p className="font-medium text-primary-text">
                    {item.mobileLegendsName || "Not found"}
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-base text-reward-yellow">
                    {item.mlamount
                      .toLocaleString("en", { useGrouping: true })
                      .replace(/,/g, " ") || 0}
                  </p>
                  <Image
                    src={"/images/diamond-icon.png"} // Use user image or fallback image
                    alt={`ML Rating for ${item.mobileLegendsName}`} // Descriptive alt text
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          ))
        : "No data available",
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
              alt={`Icon for ${item.subtitle}`} // Descriptive alt text for the icon
              width={32} // Width of the icon
              height={32} // Height of the icon
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
