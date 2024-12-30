import { useGetUserProfileQuery } from "@/features/authApi";
import { Bell, Globe, Settings, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { TextShimmer } from "./ui/text-shimmer";
import Link from "next/link";
import RatingComponent from "./RatingComponent";
import CartComponent from "./CartComponent";

function UserComponent() {
  const [activeIndex, setActiveIndex] = useState(1);
  const userId = localStorage.getItem("userId"); // Assuming the user ID is stored in localStorage
  const { data, error, isLoading } = useGetUserProfileQuery(userId);
  const contentUrl = data?.data?.attachmentResponseDTO?.contentUrl;
  const imageUrl = contentUrl
    ? `https://quvna.dominantsoftdevelopment.uz/${contentUrl}`
    : "/images/default-user.png";

  console.log(data);
  return (
    <div className="flex flex-col relative h-full max-h-full w-[35%] gap-1">
      <div className=" relative bg-primary-bg p-5 pt-3 rounded-3xl h-2/3 flex flex-col justify-start">
        {/* <div className="absolute -right-1 -top-0 flex text-2xl items-center self-end text-accent-blue rounded-bl-3xl bg-white gap-2 p-3 ">
          <div className="bg-accent-blue flex items-center justify-center rounded-full h-8 w-8">
            <Bell strokeWidth={1.5} className="text-white" />
          </div>
          <div className="bg-accent-blue flex items-center justify-center rounded-full h-8 w-8">
            <Globe strokeWidth={1.5} className="text-white" />
          </div>
        </div> */}
        <div>
          <Link
            href="/profile"
            className="rounded-tl-3xl rounded-br-3xl absolute -left-1 -top-1 border-4 border-white overflow-hidden"
          >
            <Image src={imageUrl} width={70} height={70} alt="Image" />
          </Link>
          {/* <div className="absolute left-5 top-20 pt-2">
            <Settings size={28} />
          </div> */}
          <div className="flex flex-col gap-8">
            <div className=" flex gap-5 items-center justify-between">
              <div className="ml-16 pl-2">
                <p className="font-medium text-xl">
                  {data?.data?.firstName || "User"}
                </p>
                <p className="text-sm text-secondary-text">
                  ID: {data?.data?.id.toString().padStart(8, "0")}
                </p>
              </div>
              <div className="rounded-lg flex font-medium gap-2 text-center items-center  text-sm text-white px-5 py-1 bg-reward-yellow">
                <TextShimmer
                  className="font-mono text-base font-medium [--base-color:white] [--base-gradient-color:#2d3e50]"
                  duration={2}
                >
                  Rating 2 ★
                </TextShimmer>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-1 h-16 items-center bg-white/10 rounded-lg text-primary-bg p-2 pl-4">
                <div>
                  <p className="font-medium text-primary-text">
                    {data?.data?.playName}
                  </p>
                  <p className="text-sm text-secondary-text">
                    {data?.data?.gameID}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="font-medium text-reward-yellow">
                    {data?.data?.rating?.ucAmount
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
              <div className="flex justify-between gap-1 h-16 items-center bg-white/10 rounded-lg text-primary-bg p-2 px-4">
                <div>
                  <p className="font-medium text-primary-text">
                    {data?.data?.steamName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-reward-yellow">
                    {data?.data?.rating?.steamAmount
                      .toLocaleString("en", { useGrouping: true })
                      .replace(/,/g, " ") || 0}
                  </p>
                  <Image
                    src="/images/steam-icon.png" // Use user image or fallback image
                    alt="uc icon" // Descriptive alt text
                    width={24} // Set the width of the image
                    height={24} // Set the height of the image
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-1 h-16 items-center bg-white/10 rounded-lg text-primary-bg p-2 px-4">
                <div>
                  <p className="font-medium text-primary-text">
                    {data?.data?.mobileLegendsName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-reward-yellow">
                    {data?.data?.rating?.mlamount
                      .toLocaleString("en", { useGrouping: true })
                      .replace(/,/g, " ") || 0}
                  </p>
                  <Image
                    src="/images/ml-icon.png" // Use user image or fallback image
                    alt="uc icon" // Descriptive alt text
                    width={24} // Set the width of the image
                    height={24} // Set the height of the image
                    className="rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full w-full relative ">
        <div className="flex absolute left-1/2  -translate-x-1/2 -translate-y-12 border-b-none  gap-2 items-center justify-center mt-1">
          <div
            className={` rounded-t-3xl flex justify-center items-center gap-1 transition-all duration-300 w-32 py-2 px-6 text-center font-medium cursor-pointer ${
              activeIndex == 1
                ? "bg-primary-bg border-4 border-b-0 text-primary-text"
                : "bg-white border-4 border-b-0 border-white text-primary-bg"
            }`}
            onClick={() => setActiveIndex(1)}
          >
            <Star size={16} className="transition-all duration-100" />
            <p className="transition-all duration-100">Rating</p>
          </div>
          <div
            className={` rounded-t-3xl flex justify-center items-center gap-1 w-32 transition-all duration-300 py-2 px-6 text-center font-medium cursor-pointer ${
              activeIndex == 0
                ? "bg-primary-bg border-4 border-b-0 text-primary-text"
                : "bg-white border-4 border-b-0 border-white text-primary-bg"
            }`}
            onClick={() => setActiveIndex(0)}
          >
            <ShoppingCart size={16} className="transition-all duration-100" />
            <p className="transition-all duration-100">Cart</p>
          </div>
        </div>
        {activeIndex === 1 ? <RatingComponent /> : <CartComponent />}
      </div>
    </div>
  );
}

export default UserComponent;
