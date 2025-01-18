import React from "react";
import MainGamesCard from "./MainGamesCard";

interface GameData {
  imageSrc: string;
  label: string;
  title: string;
}

const MainGames: React.FC = () => {
  const games: GameData[] = [
    {
      imageSrc: "/images/pubg-bg.jpg",
      label: "UC",
      title: "PUBG",
    },
    {
      imageSrc: "/images/steam-bg.png",
      label: "UC",
      title: "Steam",
    },
    {
      imageSrc: "/images/ml-bg.jpg",
      label: "UC",
      title: "Mobile Legends",
    },
  ];

  return (
    <div
      id="items"
      className="mb-40 w-full text-6xl flex flex-col relative gap-10"
    >
      <div className="text-6xl font-bold font-clash-display text-white tracking-wide">
        Buy In-game Currency
      </div>
      <div>
        <div className="w-full h-max min-h-80 text-primary-text p-2 grid grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1 gap-5">
          {games.map((game, index) => (
            <MainGamesCard
              key={index}
              imageSrc={game.imageSrc}
              label={game.label}
              title={game.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainGames;
