"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const router = useRouter();

  useGSAP(() => {
    // Animate the background
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.delayedCall(1, () => {
          // Check if 'window' is defined (client-side environment)
          if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (!token) {
              router.push("/login");
            } else {
              router.push("/home");
            }
          }
        });
      },
    });

    timeline
      .to(".loading-bg", {
        y: "0%",
        duration: 1,
        ease: "cubic-bezier(0.19, 1, 0.22, 1)",
      })
      .to(
        ".loading-bg",
        {
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          duration: 1.5,
          ease: "cubic-bezier(0.94, 0.38, 0.92, 0.21)",
        },
        "<" // Sync with the previous animation
      )
      .fromTo(
        ".letter",
        { opacity: 1, y: 100, rotateX: 90 }, // Starting position and opacity
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          color: "white",
          duration: 1,
          ease: "power2.out",
          stagger: 0.15, // Delay between each letter
        },
        "-=1" // Start before the previous animation ends
      );
  }, [router]);

  const text = "Quvna";

  return (
    <div className="rounded-xl relative overflow-hidden h-full w-full flex flex-col bg-white text-white items-center justify-center p-8">
      <div className="loading-bg rounded-tl-[2000px]  rounded-tr-[2000px] translate-y-full h-full w-full bg-primary-bg absolute"></div>
      <div className="loading-text font-clash-display gap-1 absolute font-bold tracking-loose text-9xl text-white flex">
        {text.split("").map((letter, index) => (
          <span
            key={index}
            className="opacity-0 letter text-accent-blue origin-top"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
