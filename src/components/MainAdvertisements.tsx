"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useGetAdvertisementsQuery } from "@/features/extrasApi";
import { useGetAttachmentQuery } from "@/features/ratingApi";

function MainAdvertisements() {
  const { data, error, isLoading } = useGetAdvertisementsQuery("HOME_PAGE");
  const [attachmentIds, setAttachmentIds] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        setCurrentIndex((prevIndex) =>
          prevIndex === attachmentIds.length - 1 ? 0 : prevIndex + 1
        );
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(intervalId); // Cleanup on component unmount
    }
  }, [attachmentIds]);

  return (
    <div className="w-full h-40 lg:h-96 relative rounded-3xl overflow-hidden">
      {isLoading ? (
        <p>Loading advertisements...</p>
      ) : error ? (
        <p>Error loading advertisements.</p>
      ) : (
        attachmentIds?.length > 0 && (
          <Advertisement id={attachmentIds[currentIndex]} />
        )
      )}
    </div>
  );
}

function Advertisement({ id }: { id: any }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageBlobUrl, setImageBlobUrl] = useState<string>(
    "/images/default-user.png"
  );

  const { data: attachmentImage, error, isLoading } = useGetAttachmentQuery(id);

  useEffect(() => {
    if (attachmentImage) {
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
    <div className="w-full h-60 lg:h-96 rounded-3xl bg-white/10 flex items-center justify-center overflow-hidden">
      <Image
        src={imageBlobUrl}
        fill
        alt="Advertisement image"
        className={`object-cover transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onError={handleImageError}
        unoptimized
      />
    </div>
  );
}

export default MainAdvertisements;
