import { motion } from "framer-motion";
import React from "react";
import { games } from "../constants/games";

export function Games() {
  return (
    <motion.div
      className="w-full max-w-4xl px-4 mt-16 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Games
      </motion.h2>

      <div className="space-y-8">
        {games.map((game, index) => (
          <motion.div
            key={game.title}
            className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-colors"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 * index, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <a href={game.url} target="_blank" rel="noopener noreferrer">
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-64 object-cover rounded-lg image-rendering-smooth"
                    style={{ imageRendering: "auto" }}
                  />
                </a>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {game.title}
                </h3>
                <p className="text-gray-700">{game.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
