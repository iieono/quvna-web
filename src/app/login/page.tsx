"use client";
import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../features/authApi"; // Assuming you have the useLoginMutation hook from your authApi file
import { useRouter } from "next/navigation";
import { TextMorph } from "@/components/ui/text-morph";

function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [login, { isLoading, isError }] = useLoginMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/"); // Redirect if token exists
      return;
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove spaces before submitting
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, "");

    // Regex to validate Uzbek phone numbers
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
      console.log(data);
      if (data && data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("userId", data.users.id);
        router.push("/");
        alert("Login successful!");
      }
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  const handlePhoneNumberChange = (e) => {
    let input = e.target.value;

    // Remove any non-numeric characters except for the "+" sign
    input = input.replace(/\D/g, "");

    // Ensure the phone number starts with "998"
    if (!input.startsWith("998")) {
      input = "998" + input.replace("998", "");
    }

    // Limit the input to 12 digits (after +998)
    if (input.length > 12) {
      input = input.slice(0, 12);
    }

    // Format the phone number as +998 xx xxx xx xx
    let formattedInput = "+998 ";

    if (input.length > 3) {
      formattedInput += input.slice(3, 5) + " "; // Area code: +998 xx
    }
    if (input.length > 5) {
      formattedInput += input.slice(5, 8) + " "; // First part of the local number: xx xxx
    }
    if (input.length > 8) {
      formattedInput += input.slice(8, 10) + " "; // Second part: xx
    }
    if (input.length > 10) {
      formattedInput += input.slice(10, 12); // Final part: xx
    }

    setPhoneNumber(formattedInput.trim());
    setErrorMessage(""); // Clear error on change
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full login-bg rounded-3xl p-10 gap-5 h-full flex flex-col items-center ">
        <div className="h-1/5"></div>
        <div className="text-9xl font-clash-display font-bold text-white">
          Quvna
        </div>
        <div className="text-3xl">hello</div>
      </div>
      <div className="w-full h-full bg-white backdrop-blur-3xl p-6 flex items-center justify-center flex-col shadow-lg">
        <h2 className="text-start text-4xl font-bold text-primary-bg mb-4">
          Hello again!
        </h2>
        <p className="text-secondary-text w-2/3 mb-5">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
          aspernatur accusamus aut cupiditate explicabo
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center gap-2"
        >
          <div className="mb-4 w-2/3">
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
          <div className="mb-4 w-2/3">
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
          <button
            type="submit"
            className="w-2/3 p-3 bg-primary-bg text-white rounded-md"
            disabled={isLoading}
          >
            <TextMorph>{isLoading ? "Logging in..." : "Login"}</TextMorph>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
