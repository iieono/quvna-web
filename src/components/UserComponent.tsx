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
    <div className="flex flex-col relative h-full max-h-full w-[35%] gap-1">
      <div className="relative bg-primary-bg p-5 pt-3 rounded-3xl h-2/3 flex flex-col justify-start">
        <div>
          <Link
            href="/profile"
            className="rounded-tl-3xl rounded-br-3xl absolute -left-1 -top-1 border-4 border-white overflow-hidden"
          >
            <div className="relative w-[70px] h-[70px]">
              <Image
                src={imageBlobUrl}
                fill
                alt="User profile image"
                className={`object-cover transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onError={handleImageError}
                unoptimized
              />
            </div>
          </Link>
          <div className="flex flex-col gap-8">
            <div className="flex gap-5 items-center justify-between">
              <div className="ml-16 pl-2">
                <p className="font-medium text-xl">
                  {data?.data?.firstName || "User"}
                </p>
                <p className="text-sm text-secondary-text">
                  ID: {data?.data?.id.toString().padStart(8, "0")}
                </p>
              </div>
              <div className="rounded-lg flex font-medium gap-2 text-center items-center text-sm text-white px-5 py-1 bg-reward-yellow">
                <TextShimmer
                  className="font-mono text-base font-medium [--base-color:white] [--base-gradient-color:#2d3e50]"
                  duration={2}
                >
                  {`Rating ${data?.data?.rating?.id?.toString()} ★`}
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
                    src="/images/uc-icon.png"
                    alt="UC icon"
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized
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
                    src="/images/steam-icon.png"
                    alt="Steam icon"
                    width={24}
                    height={24}
                    className="rounded-full"
                    unoptimized
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
      </div>

      <div className="h-full w-full relative">
        <div className="flex absolute left-1/2 -translate-x-1/2 -translate-y-12 border-b-none gap-2 items-center justify-center mt-1">
          {/* Tabs and other UI elements */}
        </div>
        {activeIndex === 1 ? <RatingComponent /> : <CartComponent />}
      </div>
    </div>
  );
}

export default UserComponent;
