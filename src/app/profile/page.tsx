"use client";
import { BorderTrail } from "@/components/ui/border-trail";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; // Adjust the import path to match your setup
import { useDeleteUserAccountMutation } from "@/features/authApi";

function Page() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [deleteUserAccount] = useDeleteUserAccountMutation();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const logoutHandle = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.push("/");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID not found");

      await deleteUserAccount(userId).unwrap();
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      router.push("/");
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="page-container">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col w-2/3 rounded-3xl gap-3 p-3">
          <div className="rounded-xl gap-3 flex w-full justify-between">
            <div></div>
            <div className="flex gap-3">
              <Link
                href="https://t.me/Quvna_Support"
                className="px-5 py-2 font-semibold bg-white/10 rounded-lg text-secondary-text"
              >
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
            <div
              className="flex h-full gap-3 w-full relative rounded-xl"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px] rounded-3xl overflow-hidden relative">
                <Image
                  src={image || "/images/default-user.png"}
                  alt="User Icon"
                  width={120}
                  height={120}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <input
                id="profile-picture"
                name="profile-picture"
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload file"
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
              <label>Name</label>
              <input
                className="outline-none px-3 py-2 border rounded-lg bg-transparent text-secondary-text placeholder-secondary-text"
                placeholder="Name"
                type="text"
              />
            </div>
            <div className="flex gap-3 flex-col w-full rounded-xl p-3 bg-white/10">
              <label>Phone number</label>
              <input
                className="outline-none px-3 py-2 border rounded-lg bg-transparent text-secondary-text placeholder-secondary-text"
                placeholder="+998 90 123 45 67"
                type="text"
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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
