"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "../../features/authApi"; // your register mutation hook
import { TextShimmer } from "@/components/ui/text-shimmer";
import Image from "next/image";
import Link from "next/link";

function RegisterPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState(""); // First name state
  const [lastName, setLastName] = useState(""); // Last name state
  const [errorMessage, setErrorMessage] = useState("");
  const [register, { isLoading, isError, error }] = useRegisterMutation();

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
      if (data) {
        // Redirect after successful registration
        router.push("/login");
        setErrorMessage(""); // Clear error message on successful registration
      }
    } catch (error) {
      console.error("Registration failed", error);
      setErrorMessage("Registration failed. Please try again.");
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
      <div className="w-full hidden login-bg rounded-3xl p-10 gap-2 h-full lg:flex flex-col items-center">
        <div className="h-1/5"></div>
        <div className="text-9xl font-clash-display font-bold text-white">
          Quvna
        </div>
        <div className="text-2xl text-center w-4/5 text-secondary-text">
          Unlock the gear you need to dominate the game—explore our collection
          of must-have gaming items!
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
          <div className="mb-4 w-full lg:w-2/3">
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

          {/* Last Name */}
          <div className="mb-4 w-full lg:w-2/3">
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

          <button
            type="submit"
            className="w-full lg:w-2/3 p-3 bg-primary-bg text-white rounded-md"
            disabled={isLoading}
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
