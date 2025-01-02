"use client";
import { useGetUserProfileQuery } from "@/features/authApi";
import {
  Bell,
  Globe,
  History,
  Settings,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TextShimmer } from "./ui/text-shimmer";
import Link from "next/link";
import RatingComponent from "./RatingComponent";
import CartComponent from "./CartComponent";
import { useGetAttachmentQuery } from "@/features/ratingApi";

function NavbarMain() {
  const [navOpen, setNavOpen] = useState(false);
  const text = "Quvna";
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

  useEffect(() => {
    if (attachmentImage) {
      // If there is an attachment image, create a blob URL
      const blobUrl = URL.createObjectURL(attachmentImage);
      setImageBlobUrl(blobUrl);
      setImageLoaded(true);

      // Cleanup the URL when the component unmounts
      return () => {
        if (blobUrl.startsWith("blob:")) {
          URL.revokeObjectURL(blobUrl);
        }
      };
    } else {
      // Fallback to the default image if there's no attachment
      setImageBlobUrl("/images/default-user.png");
      setImageLoaded(true);
    }
  }, [attachmentImage]);

  // Handle image loading errors
  const handleImageError = () => {
    setImageBlobUrl("/images/default-user.png");
    setImageLoaded(true);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse hidden lg:flex">
        <div className="w-[70px] h-[70px] bg-gray-200 rounded-tl-3xl rounded-br-3xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 hidden lg:flex">
        Error loading profile data
      </div>
    );
  }
  return (
    <div className="bg-white text-primary-bg items-center p-1 px-5 flex justify-between">
      <Link
        href="/home"
        className="text-5xl  text-accent-blue font-semibold font-clash-display"
      >
        Quvna
      </Link>
      <div className="flex items-center gap-5 text-xl">
        <div></div>
        <div className="px-5 py-2 rounded-3xl bg-primary-bg/10 hidden lg:flex">
          Uz
        </div>
        <Link href="/notifications" className="hidden lg:flex">
          <Bell />
        </Link>
        <div className="bg-primary-bg/10 hidden lg:flex gap-5 items-center rounded-3xl px-5 py-2">
          <Link href="/cart">
            <ShoppingCart />
          </Link>
          <Link href="/history">
            <History />
          </Link>
        </div>
        {/* <Link href="/profile" className="hidden lg:flex">
          {data?.data?.firstName || "User"}
        </Link> */}
        <Link
          href="profile"
          className="relative w-[30px] z-50 h-[30px] lg:w-[40px] lg:h-[40px] rounded-full"
        >
          <Image
            src={imageBlobUrl}
            fill
            alt="User profile image"
            className={`object-cover rounded-full transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onError={handleImageError}
            unoptimized
          />
        </Link>
        <div
          className="flex lg:hidden  gap-1 items-center z-50"
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <div className="flex flex-col gap-1">
            <div className="h-1 w-1 bg-primary-bg rounded-full"></div>
            <div className="h-1 w-1 bg-primary-bg rounded-full"></div>
            <div className="h-1 w-1 bg-primary-bg rounded-full"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-1 w-1 bg-primary-bg rounded-full"></div>
            <div className="h-1 w-1 bg-primary-bg rounded-full"></div>
            <div className="h-1 w-1 bg-primary-bg rounded-full"></div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-1 w-1 bg-primary-bg rounded-full"></div>
            <div className="h-1 w-1 bg-primary-bg rounded-full"></div>
            <div className="h-1 w-1 bg-primary-bg rounded-full"></div>
          </div>
        </div>
        {navOpen && (
          <div className="fixed w-full h-full flex flex-col  p-1 bg-white left-0 top-0 z-40">
            <div className="flex gap-2 items-center p-2">
              <div className="bg-primary-bg/10  gap-5 flex  items-center rounded-3xl px-5 py-2">
                <Link href="/cart">
                  <ShoppingCart />
                </Link>
                <Link href="/history">
                  <History />
                </Link>
              </div>
              <div className="bg-primary-bg/10  gap-5 flex  items-center rounded-3xl px-5 py-1.5">
                <Link href="/notifications" className="">
                  <Bell />
                </Link>
                <div className="rounded-3xl underline underline-offset-4 ">
                  Uz
                </div>
              </div>
            </div>
            <div className="h-full bg-primary-bg rounded-3xl flex text-white justify-end flex-col p-10 text-4xl gap-3 font-clash-display font-semibold">
              <Link href="/home">Home</Link>
              <Link href="/home">Shop</Link>
              <Link href="/home">Tournaments</Link>
              <Link href="/home">Gaming Zones</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavbarMain;
