"use client";
import { useGetUserProfileQuery } from "@/features/authApi";
import { Bell, Globe, Settings, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TextShimmer } from "./ui/text-shimmer";
import Link from "next/link";
import RatingComponent from "./RatingComponent";
import CartComponent from "./CartComponent";
import { useGetAttachmentQuery } from "@/features/ratingApi";

function UserComponent() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageBlobUrl, setImageBlobUrl] = useState<string>(
    "/images/default-user.png"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = window.localStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  const { data, error, isLoading } = useGetUserProfileQuery(userId, {
    skip: !userId,
  });

  const attachmentId = data?.data?.attachmentResponseDTO?.id;
  const { data: attachmentImage, isLoading: isLoadingImage } =
    useGetAttachmentQuery(attachmentId, {
      skip: !attachmentId,
    });

  // Handle inline image response
  useEffect(() => {
    if (attachmentImage) {
      // Create a blob URL directly from the attachment image
      const blobUrl = URL.createObjectURL(attachmentImage);
      setImageBlobUrl(blobUrl);
      setImageLoaded(true);

      // Cleanup the URL when the component unmounts
      return () => {
        if (blobUrl.startsWith("blob:")) {
          URL.revokeObjectURL(blobUrl);
        }
      };
    }
  }, [attachmentImage]);

  const handleImageError = () => {
    setImageBlobUrl("/images/default-user.png");
    setImageLoaded(true);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="w-[70px] h-[70px] bg-gray-200 rounded-tl-3xl rounded-br-3xl"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading profile data</div>;
  }

  return (
    <div className=" bg-white lg:hidden w-full flex flex-col  fixed left-0 top-0 z-40  h-full max-h-full gap-1">
      <div className="relative bg-primary-bg p-6 pt-16 h-full flex flex-col justify-start">
        <div className="flex flex-col gap-5">
          <Link
            href="/profile"
            className="rounded-xl flex items-center gap-4  left-5 -top-5 border-white overflow-hidden"
          >
            <div className="relative w-[80px] h-[80px]">
              <Image
                src={imageBlobUrl}
                fill
                alt="User profile image"
                className={`object-cover rounded-xl transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onError={handleImageError}
                unoptimized
              />
            </div>
            <div className="">
              <p className="font-medium text-xl">
                {data?.data?.firstName || "User"}
              </p>
              <p className="text-sm text-secondary-text">
                ID: {data?.data?.id.toString().padStart(8, "0")}
              </p>
            </div>
            <Link href="/notifications" className="  ml-auto flex  p-2">
              <Bell />
            </Link>
          </Link>
          <div className="flex flex-col gap-4">
            <div className="flex gap-5 items-center justify-between">
              <div className="rounded-lg flex font-medium gap-2 text-center items-center text-sm text-white px-5 py-1 bg-reward-yellow">
                <TextShimmer
                  className="font-mono text-sm font-medium [--base-color:white] [--base-gradient-color:#2d3e50]"
                  duration={2}
                >
                  {`Rating ${data?.data?.rating?.id?.toString()} ★`}
                </TextShimmer>
              </div>
              <div className="rounded-lg flex font-medium gap-2 text-center items-center text-sm text-white px-5 py-1 bg-white/10">
                History
              </div>
            </div>

            <div className="flex flex-col gap-2 text-sm tracking-wide">
              <div className="flex justify-between  gap-1 h-12 items-center bg-white/10 rounded-lg text-primary-bg p-2 pl-4">
                <div>
                  <p className="font-medium text-primary-text">
                    {data?.data?.playName}
                  </p>
                  <p className="text-xs tracking-widest text-secondary-text">
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
                    src="/images/uc-icon.png"
                    alt="UC icon"
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
              </div>
              <div className="flex justify-between gap-1 h-12 items-center bg-white/10 rounded-lg text-primary-bg p-2 px-4">
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
                    src="/images/steam-icon.png"
                    alt="Steam icon"
                    width={24}
                    height={24}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
              </div>
              <div className="flex justify-between gap-1 h-12 items-center bg-white/10 rounded-lg text-primary-bg p-2 px-4">
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
                    src="/images/ml-icon.png"
                    alt="ML icon"
                    width={24}
                    height={24}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full  w-full flex flex-col justify-end text-4xl font-clash-display font-semibold  gap-1 p-3">
          <Link href="/home">Home</Link>
          <Link href="/ratings">Ratings</Link>
          <Link href="/">Home</Link>
          <Link href="/">Home</Link>
        </div>
        <div className="flex absolute top-3 items-center pt-2 text-xs justify-center">
          <div className="flex gap-3">
            <Link
              href="https://www.instagram.com/quvna_game"
              className="rounded-full bg-white/10 p-1 px-3"
            >
              Instagram
            </Link>
            <Link
              href="https://t.me/Quvnamarket"
              className="rounded-full bg-white/10 p-1 px-3"
            >
              Telegram
            </Link>
            <Link
              href="https://youtube.com/@dsd-group"
              className="rounded-full bg-white/10 p-1 px-3"
            >
              Youtube
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserComponent;
