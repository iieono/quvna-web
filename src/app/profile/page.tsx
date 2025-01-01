"use client";
import {
  useEditUserProfileMutation,
  useGetUserProfileQuery,
} from "@/features/authApi"; // Assume you have the mutation for updating user profile
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDeleteUserAccountMutation } from "@/features/authApi";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { CircleHelp, FileClock } from "lucide-react";
import Link from "next/link";
import {
  useGetAttachmentQuery,
  useUploadAttachmentMutation,
} from "@/features/ratingApi";

function Page() {
  const [uploadImage] = useUploadAttachmentMutation();
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageBlobUrl, setImageBlobUrl] = useState<string>(
    "/images/default-user.png"
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const [updateUserProfile] = useEditUserProfileMutation(); // Mutation to update user profile

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [pubgUid, setPubgUid] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [steamName, setSteamName] = useState<string>("");
  const [lolMobileName, setLolMobileName] = useState<string>("");

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
      const blobUrl = URL.createObjectURL(attachmentImage);
      setImageBlobUrl(blobUrl);
      setImageLoaded(true);

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
  useEffect(() => {
    // Set state from fetched data if available
    if (data?.data) {
      setName(data.data.firstName || "");
      setLastName(data.data.lastName || "");
      setPubgUid(data.data.gameID || "");
      setPlayerName(data.data.playName || "");
      setSteamName(data.data.steamName || "");
      setLolMobileName(data.data.mobileLegendsName || "");
    }
  }, [data]);

  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");

      await deleteUserAccount(userId).unwrap();
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Set the blob URL for the preview image
      const blobUrl = URL.createObjectURL(file);
      setImageBlobUrl(blobUrl);

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", file);

      // Upload the file using your uploadImage mutation
      uploadImage(formData) // Pass FormData directly
        .then((response) => {
          const uploadedImageId = response?.data?.id;
          // You can now save this uploaded image ID to the user's profile
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const handleSave = async () => {
    try {
      if (!userId) return;

      let imageId: string | null = null;

      // If there's a new image to upload, fetch the image and upload it
      if (imageBlobUrl && imageBlobUrl !== "/images/default-user.png") {
        const file = await fetch(imageBlobUrl)
          .then((response) => response.blob())
          .catch((error) => {
            console.error("Error fetching image:", error);
            throw new Error("Failed to fetch image");
          });

        const uploadResponse = await uploadImage(file); // Pass the file directly to your upload API
        imageId = uploadResponse?.data?.data?.id || null; // Get the ID of the uploaded image or set null if no ID
      }

      const updatedUserData = {
        firstName: name,
        lastName: lastName,
        gameID: pubgUid,
        playName: playerName,
        steamName: steamName,
        mobileLegendsName: lolMobileName,
        attachmentId: imageId, // Ensure the image ID is attached
      };

      // Send the updated user profile with the new image ID
      await updateUserProfile({
        userId,
        ...updatedUserData, // Spread the updatedUserData directly into the mutation
      }).unwrap();

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const logoutHandle = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.push("/");
    }
  };

  if (isLoading) {
    return <div className="page-container">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading profile data</div>;
  }

  return (
    <div className="page-container">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col w-2/3 rounded-3xl gap-3 p-3">
          <div className="rounded-xl gap-3 flex w-full justify-between">
            <div className="flex">
              <Link
                href="/history"
                className="px-5 py-2 flex gap-2 font-semibold bg-white/10 rounded-lg text-secondary-text"
              >
                <FileClock />
                Orders
              </Link>
            </div>
            <div className="flex gap-3">
              <Link
                href="https://t.me/Quvna_Support"
                className="px-5 py-2 flex gap-2 font-semibold bg-white/10 rounded-lg text-secondary-text"
              >
                <CircleHelp />
                Help
              </Link>
              <div
                className="cursor-pointer px-5 py-2 font-semibold bg-white/10 rounded-lg text-primary-text"
                onClick={logoutHandle}
              >
                Logout
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-xl p-3 bg-white/10">
            <div className="flex h-full gap-3 w-full relative rounded-xl">
              <div className=" min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] rounded-3xl overflow-hidden relative">
                <Image
                  src={imageBlobUrl}
                  alt="User Icon"
                  width={120}
                  height={120}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                  className={`object-cover transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onError={handleImageError}
                  unoptimized
                />
              </div>
              <input
                id="profile-picture"
                name="profile-picture"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                htmlFor="profile-picture"
                className="relative cursor-pointer inset-0 p-[2.9rem] h-full w-full border rounded-xl border-dashed flex items-center justify-center text-primary-text"
              >
                <span>Upload a file</span>
              </label>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <div className="flex gap-3 flex-col w-full rounded-xl p-3 bg-white/10">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="outline-none px-3 py-2 border rounded-lg bg-transparent text-secondary-text placeholder-secondary-text"
                placeholder="John"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex gap-3 flex-col w-full rounded-xl p-3 bg-white/10">
              <label htmlFor="phone">Last Name</label>
              <input
                id="phone"
                className="outline-none px-3 py-2 border rounded-lg bg-transparent text-secondary-text placeholder-secondary-text"
                placeholder="Doe"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between gap-3 bg-white/10 rounded-xl ">
            <div className="flex gap-3 flex-col w-full rounded-xl p-3 ">
              <label htmlFor="pubg-uid">PUBG UID</label>
              <input
                id="pubg-uid"
                className="outline-none px-3 py-2 border rounded-lg bg-transparent text-secondary-text placeholder-secondary-text"
                placeholder="PUBG UID"
                type="text"
                value={pubgUid}
                onChange={(e) => setPubgUid(e.target.value)}
              />
            </div>
            <div className="flex gap-3 flex-col w-full rounded-xl p-3 ">
              <label htmlFor="player-name">Player name</label>
              <input
                id="player-name"
                className="outline-none px-3 py-2 border rounded-lg bg-transparent text-secondary-text placeholder-secondary-text"
                placeholder="Player Name"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="flex gap-3 flex-col w-full rounded-xl p-3 bg-white/10">
              <label htmlFor="steam-name">STEAM name</label>
              <input
                id="steam-name"
                className="outline-none px-3 py-2 border rounded-lg bg-transparent text-secondary-text placeholder-secondary-text"
                placeholder="STEAM name"
                type="text"
                value={steamName}
                onChange={(e) => setSteamName(e.target.value)}
              />
            </div>
            <div className="flex gap-3 flex-col w-full rounded-xl p-3 bg-white/10">
              <label htmlFor="lol-mobile-name">
                League of Legends Mobile name
              </label>
              <input
                id="lol-mobile-name"
                className="outline-none px-3 py-2 border rounded-lg bg-transparent text-secondary-text placeholder-secondary-text"
                placeholder="LOL Mobile name"
                type="text"
                value={lolMobileName}
                onChange={(e) => setLolMobileName(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-xl gap-3 flex w-full justify-between">
            <div className="flex gap-3">
              <div className="px-5 py-2 font-semibold bg-white/10 rounded-lg text-secondary-text">
                Change Password
              </div>
              <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <AlertDialogTrigger asChild>
                  <div className="px-5 py-2 font-semibold bg-white rounded-lg text-red-500 cursor-pointer">
                    Delete Account
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader className="text-red-500 font-bold text-lg">
                    Confirm Deletion
                  </AlertDialogHeader>
                  <p className="text-secondary-bg">
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </p>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="text-secondary-bg">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div>
              <div
                className="px-5 py-2 font-semibold bg-white/10 rounded-lg text-primary-text"
                onClick={handleSave}
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
