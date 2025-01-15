"use client";
import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../features/authApi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { TextShimmer } from "@/components/ui/text-shimmer";

function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { isLoading, isError }] = useLoginMutation();

  useEffect(() => {
    // Ensure that this is only executed on the client side
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (token) {
        router.push("/"); // Redirect if token exists
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, "");
    const uzbekPhoneRegex = /^(\+998)(90|91|93|94|95|97|98|99|33|88)\d{7}$/;

    if (!uzbekPhoneRegex.test(phoneNumberWithoutSpaces)) {
      setErrorMessage("Please enter a valid Uzbek phone number.");
      return;
    }

    try {
      const { data } = await login({
        phoneNumber: phoneNumberWithoutSpaces,
        password,
      }).unwrap();
      if (data && data.accessToken) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("token", data.accessToken);
          window.localStorage.setItem("userId", data.users.id);
        }
        router.push("/");
        // alert("Login successful!");
        setErrorMessage(""); // Clear error message on successful login
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const handlePhoneNumberChange = (e: any) => {
    let input = e.target.value;
    input = input.replace(/\D/g, "");
    if (!input.startsWith("998")) {
      input = "998" + input.replace("998", "");
    }
    if (input.length > 12) {
      input = input.slice(0, 12);
    }

    let formattedInput = "+998 ";
    if (input.length > 3) {
      formattedInput += input.slice(3, 5) + " ";
    }
    if (input.length > 5) {
      formattedInput += input.slice(5, 8) + " ";
    }
    if (input.length > 8) {
      formattedInput += input.slice(8, 10) + " ";
    }
    if (input.length > 10) {
      formattedInput += input.slice(10, 12);
    }

    setPhoneNumber(formattedInput.trim());
    setErrorMessage(""); // Clear error message on input change
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center">
      <div className="w-full hidden login-bg rounded-3xl p-10 gap-5 h-full lg:flex flex-col items-center">
        <div className="h-1/5"></div>
        <div className="text-9xl font-clash-display font-bold text-white">
          Quvna
        </div>
        <div className="text-2xl text-center w-4/5 text-secondary-text">
          Unlock the gear you need to dominate the game—explore our collection
          of must-have gaming items!
        </div>
        <div className="absolute bottom-10 items-center flex gap-3">
          <Link
            href="https://www.instagram.com/quvna_game"
            className="rounded-full bg-white/20 p-1"
          >
            <Image
              src={`/images/instagram-icon.png`}
              alt="icon"
              width={40}
              height={40}
            />
          </Link>
          <Link
            href="https://t.me/Quvnamarket"
            className="rounded-full bg-white/20 p-1"
          >
            <Image
              src={`/images/telegram-icon.png`}
              alt="icon"
              width={40}
              height={40}
            />
          </Link>
          <Link
            href="https://youtube.com/@dsd-group"
            className="rounded-full bg-white/20 p-1"
          >
            <Image
              src={`/images/youtube-icon.png`}
              alt="icon"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
      <div className="w-full h-full bg-white backdrop-blur-3xl p-6 flex items-center justify-center flex-col shadow-lg">
        <div className="text-6xl lg:hidden absolute top-5 font-clash-display font-bold text-primary-bg">
          <TextShimmer
            className=" [--base-color:#2d3e50] [--base-gradient-color:#00a8ff]"
            duration={3}
            spread={6}
          >
            Quvna
          </TextShimmer>
        </div>
        {/* <h2 className="text-start w-full lg:w-2/3 text-4xl font-bold text-primary-bg mb-4">
          Hello again!
        </h2>
        <p className="text-secondary-text w-full lg:w-2/3 mb-5">
          Log in to access your account and continue where you left off.
        </p> */}

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-2"
        >
          <div className="mb-4 w-full lg:w-2/3">
            <label className="block text-sm font-semibold text-secondary-text">
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              className="w-full p-3 border text-primary-bg outline-none rounded-md text-sm mt-2"
              placeholder="+998 90 123 4567"
              required
            />
            {errorMessage && (
              <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
            )}
          </div>
          <div className="mb-4 w-full lg:w-2/3">
            <label className="block text-sm font-semibold text-secondary-text">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border text-primary-bg outline-none rounded-md text-sm mt-2"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="w-full font-semibold lg:w-2/3 mb-3 text-secondary-bg text-sm flex itemc-center justify-end">
            Forgot your password?
          </div>
          <button
            type="submit"
            className="w-full lg:w-2/3 p-3 bg-primary-bg text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Login"}
          </button>
        </form>
        <div className="text-primary-bg text-sm lg:text-base absolute bottom-5">
          Don't have an account yet?{" "}
          <Link href="/register" className="font-bold">
            Sign Up.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
