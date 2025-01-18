"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetAdvertisementsQuery } from "@/features/extrasApi";

function MainAdvertisements() {
  const { data, error, isLoading } = useGetAdvertisementsQuery("HOME_PAGE");
  const [attachmentIds, setAttachmentIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data?.data?.length > 0) {
      const ids = data.data.map(
        (advertisement: { attachmentId: string }) => advertisement?.attachmentId
      );
      setAttachmentIds(ids);
    }
  }, [data]);

  useEffect(() => {
    if (attachmentIds.length > 0) {
      const intervalId = setInterval(() => {
        const newIndex =
          currentIndex === attachmentIds.length - 1 ? 0 : currentIndex + 1;
        setNextIndex(newIndex); // Prepare the next advertisement

        setTimeout(() => {
          setCurrentIndex(newIndex); // Update the current advertisement
          setNextIndex(null); // Reset the next advertisement
        }, 0); // Instantly switch after update
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [attachmentIds, currentIndex]);

  return (
    <div className="w-full h-60 lg:h-96 relative rounded-3xl overflow-hidden">
      {/* Current advertisement */}
      <Advertisement id={attachmentIds[currentIndex]} isActive />
      {/* Next advertisement appearing */}
      {nextIndex !== null && (
        <Advertisement id={attachmentIds[nextIndex]} isActive={false} />
      )}
    </div>
  );
}

function Advertisement({ id, isActive }: { id: string; isActive: boolean }) {
  const imageUrl = `https://quvna.dominantsoftdevelopment.uz/attachment/${id}?view=inline`;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => setImageLoaded(false);

  return (
    <div
      className={`absolute w-full h-60 lg:h-96 rounded-3xl bg-white/10 flex items-center justify-center overflow-hidden ${
        isActive ? "z-10 translate-y-0" : "z-20 translate-y-full"
      }`}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse bg-white/10"></div>
      )}
      <Image
        src={imageUrl}
        fill
        alt="Advertisement image"
        className={`object-cover transition-transform duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onError={handleImageError}
        onLoadingComplete={() => setImageLoaded(true)}
        unoptimized
      />
      <div className="absolute top-3 left-3 text-xl text-white bg-black/10 backdrop-blur-lg rounded-xl px-4 font-clash-display tracking-wider font-semibold">
        Discover
      </div>
    </div>
  );
}

export default MainAdvertisements;
