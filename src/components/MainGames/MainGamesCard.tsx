import Image from "next/image";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

// Define prop types
interface MainGamesCardProps {
  imageSrc: string; // URL for the image
  label: string; // Text for the label
  title: string; // Title for the game
}

const MainGamesCard: React.FC<MainGamesCardProps> = ({
  imageSrc,
  label,
  title,
}) => {
  return (
    <div className="w-full cursor-pointer h-full min-h-60 rounded-3xl border border-white/20 p-3 relative overflow-hidden">
      <Image
        src={imageSrc}
        fill
        alt={title}
        className="rounded-3xl object-cover"
      />
      <div className="absolute top-3 left-3 text-xl text-white bg-white/20 backdrop-blur-sm rounded-xl px-4 font-clash-display tracking-wider font-semibold">
        {label}
      </div>
      <FiArrowUpRight className="absolute -right-2 -top-2 lg:-right-2 lg:-top-2 text-8xl lg:text-9 text-white" />
      <div className="absolute w-full bottom-0 left-0 bg-black/40 backdrop-blur-sm p-2 lg:p-5">
        <div className="h-5 absolute -top-2.5 blur-sm left-0 bg-white/40 w-full"></div>
        <p className="text-4xl font-bold tracking-wide font-clash-display">
          {title}
        </p>
      </div>
    </div>
  );
};

export default MainGamesCard;
