"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image"; // Importing the next/image component
import { useGetAdvertisementsQuery } from "@/features/extrasApi";
import { useGetAttachmentQuery } from "@/features/ratingApi";

function MainAdvertisements() {
  const { data, error, isLoading } = useGetAdvertisementsQuery("HOME_PAGE");
  const [imageBlobUrls, setImageBlobUrls] = useState<string[]>([]);
  const [attachmentIds, setAttachmentIds] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data?.length > 0) {
      // Extract all attachment IDs from advertisements data
      const ids = data.data.map(
        (advertisement: { attachmentId: string }) => advertisement?.attachmentId
      );
      console.log(ids);
      setAttachmentIds(ids);
    }
  }, [data]);
  //   useEffect(() => {
  //     if (!attachmentIds) return;
  //     for (let id in attachmentIds) {
  //       const { data: attachmentData } = useGetAttachmentQuery(id);
  //       setAttachments([...attachments, attachmentData]);
  //       console.log(attachments);
  //     }
  //   }, [attachmentIds]);

  return (
    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isLoading ? (
        <p>Loading advertisements...</p>
      ) : error ? (
        <p>Error loading advertisements.</p>
      ) : (
        imageBlobUrls.map((url, index) => (
          <div
            key={index}
            className="w-full h-60 lg:h-96 rounded-3xl bg-white/10 flex items-center justify-center overflow-hidden"
          >
            <Image
              src={url}
              alt={`Advertisement ${index + 1}`}
              className="w-full h-full object-cover"
              width={800} // You can specify the desired width
              height={400} // You can specify the desired height
              onError={() => {
                // Fallback to default image on error
                setImageBlobUrls((prev) =>
                  prev.map(() => "/images/default-ad.png")
                );
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default MainAdvertisements;
