"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useRegisterMutation,
  useSendSmsMutation,
} from "../../features/authApi"; // your register mutation hook
import { TextShimmer } from "@/components/ui/text-shimmer";
import Image from "next/image";
import Link from "next/link";
import { useGetPrivacyPolicyQuery } from "@/features/extrasApi";

function RegisterPage() {
  const router = useRouter();

  const [sentCode, setSentCode] = useState(false);
  const [timerSet, setTimerSet] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // First name state
  const [lastName, setLastName] = useState(""); // Last name state
  const [errorMessage, setErrorMessage] = useState("");
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const [
    sendSms,
    { isLoading: smsLoading, isError: isSmsError, error: smsError },
  ] = useSendSmsMutation();
  const {
    data: privacyData,
    error: privacyError,
    isLoading: privacyLoading,
  } = useGetPrivacyPolicyQuery(undefined);
  console.log(privacyData?.data);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, "");
    const uzbekPhoneRegex = /^(\+998)(90|91|93|94|95|97|98|99|33|88)\d{7}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!uzbekPhoneRegex.test(phoneNumberWithoutSpaces)) {
      setErrorMessage("Please enter a valid Uzbek phone number.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const { data } = await register({
        phoneNumber: phoneNumberWithoutSpaces,
        email,
        password,
        firstName,
        lastName,
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
      console.error("Registration failed", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };
  const handleSms = async () => {
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, "");
    if (!phoneNumberWithoutSpaces) {
      alert("Please enter a phone number.");
      return;
    }

    try {
      // Trigger the mutation
      await sendSms({ phoneNumber: phoneNumberWithoutSpaces, isForgat: false }); // Send SMS
      setSentCode(true); // Show success message
      setTimerSet(30); // Show success message
    } catch (err) {
      console.error("Failed to send SMS:", err);
      alert("Failed to send SMS. Please try again.");
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
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (timerSet > 0) {
      interval = setInterval(() => {
        setTimerSet((prev) => prev - 1);
      }, 1000);
    } else if (timerSet === 0 && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timerSet]);

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

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-2"
        >
          {/* Phone Number */}
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
          </div>
          <div className="mb-4 w-full lg:w-2/3">
            <label className="block text-sm font-semibold text-secondary-text">
              Code
            </label>
            <div className="flex gap-3 ">
              <input
                type="text"
                className="w-full p-3 border text-primary-bg outline-none rounded-md text-sm mt-2"
                placeholder="1234"
                minLength={4}
                maxLength={4}
                required
              />
              <div
                className="rounded-md px-4 text-sm lg:text-base w-40 flex items-center justify-center mt-2 bg-primary-bg"
                onClick={handleSms}
              >
                {timerSet > 0 ? `Sent ${timerSet}` : "Send Code"}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-4 w-full lg:w-2/3">
            <label className="block text-sm font-semibold text-secondary-text">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border text-primary-bg outline-none rounded-md text-sm mt-2"
              placeholder="youremail@example.com"
              required
            />
          </div>

          {/* First Name */}
          <div className="mb-4 w-full lg:flex-col justify-between gap-2 lg:gap-5 lg:w-2/3 flex">
            <div className="w-full">
              <label className="block text-sm font-semibold text-secondary-text">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border text-primary-bg outline-none rounded-md text-sm mt-2"
                placeholder="John"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-semibold text-secondary-text">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border text-primary-bg outline-none rounded-md text-sm mt-2"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          {/* Last Name */}
          {/* <div className="mb-4 w-full lg:w-2/3"></div> */}

          {/* Password */}
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

          {errorMessage && (
            <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
          )}
          <p className="text-secondary-bg ">
            By signing up, you agree to our
            <span className="font-bold underline underline-offset-2">
              {" "}
              Privacy Policy
            </span>
          </p>

          <button
            type="submit"
            className={`w-full lg:w-2/3 p-3 rounded-md ${
              isLoading || !sentCode
                ? "bg-gray-400 text-gray-200 cursor-not-allowed opacity-50"
                : "bg-primary-bg text-white"
            }`}
            disabled={isLoading || !sentCode}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-primary-bg text-sm lg:text-base absolute bottom-5">
          Already have an account?{" "}
          <Link href="/login" className="font-bold">
            Log In.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
