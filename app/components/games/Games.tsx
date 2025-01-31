import { motion } from "framer-motion";
import React from "react";
import { games } from "../../constants/games";
import ArcadeMachineViewer from "../arcademachine/ArcadeMachineViewer";
import { jersey15 } from "../../fonts";
import "./games.css";
import { useWindowWidth } from "../../helpers/useWindowWidth";

export function Games() {
  const awardText = "AWARD";
  const winningText = "WINNING";
  const gamesText = "GAMES";
  const descriptionText =
    "I've created multiple nationally recognized games, including winners of the Congressional App Challenge and Games For Change Accessibility Challenge. My games have been displayed in the U.S. Capitol and used in classrooms at Community College of Philadelphia.";

  const width = useWindowWidth();
  const showArcadeMachine = width > 1500;
  const small = width < 920;
  return (
    <div
      className={`w-full ${small ? "px-[1vw]" : "px-4"} overflow-x-visible`}
      id="games"
    >
      <motion.div
        className={`relative bg-black ${
          small ? "mx-[2vw] mt-[3vw] m-[2vw]" : "mx-16 mt-24 m-16 h-[2100px]"
        } rounded-3xl flex flex-row`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className={`${showArcadeMachine ? "w-[120%]" : "w-full"} p-12`}>
          <div className="mb-8 p-8 mt-12 flex flex-col items-center">
            <span
              className={`font-bold mb-4 ${jersey15.className} z-10 flex flex-row items-center gap-4`}
              style={{
                lineHeight: "0",
                fontSize: small ? "12vw" : "6rem",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              <span className="text-red-600">{awardText}</span>{" "}
              <span className="text-yellow-600 sparkle">{winningText}</span>
            </span>
            <pre
              className={`whitespace-pre-wrap font-bold mb-4 ${jersey15.className}`}
              style={{
                fontSize: small ? "28vw" : "14rem",
                lineHeight: "1",
                color: "white",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {gamesText}
            </pre>
            <pre
              className="whitespace-pre-wrap"
              style={{
                fontSize: "1.2rem",
                lineHeight: "1.5",
                color: "#ffff00",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                width: small ? "74vw" : "unset",
              }}
            >
              {descriptionText}
            </pre>
          </div>
          <div className="flex flex-col gap-8">
            {games.map((game) => (
              <Game
                small={small}
                key={game.title}
                title={game.title}
                description={game.description}
                image={game.imageUrl}
                achievements={game.achievements || []}
                link={game.url}
              />
            ))}
          </div>
        </div>
        {showArcadeMachine && <ArcadeMachineViewer />}
      </motion.div>
    </div>
  );
}

function Game({
  small,
  title,
  description,
  image,
  achievements,
  link,
}: {
  small: boolean;
  title: string;
  description: string;
  image: string;
  achievements: string[];
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      className="grayscale hover:grayscale-0 flex flex-col items-center gap-4 text-white hover:bg-neutral-950 p-4 rounded-xl cursor-pointer transition-all duration-200"
    >
      <div
        className={`w-full grid ${
          small ? "grid-rows-[96px_1fr] gap-3" : "grid-cols-[96px_1fr] gap-4"
        } ${jersey15.className}`}
      >
        <div
          className={`transition-all duration-200 ${
            small ? "w-full h-full" : "w-24 h-full"
          } border-2 border-slate-300 rounded-lg flex-shrink-0`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="flex flex-col flex-grow">
          <h1
            style={{
              fontSize: "3rem",
              lineHeight: "2.5rem",
            }}
          >
            {title}
          </h1>
          <div className="flex flex-row items-center gap-1 text-yellow-500">
            {achievements.map((achievement, i) => (
              <div key={i} className="flex flex-row items-center gap-1">
                <p>{achievement}</p>
                {achievements[i + 1] && <p className="text-[#e50016]">•</p>}
              </div>
            ))}
          </div>
          <p className="leading-tight mt-2" style={{ fontSize: "1.2rem" }}>
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
