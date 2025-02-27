interface Game {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  oneLiner?: string;
  achievements?: string[];
}

const games: Game[] = [
  {
    title: "Ball Combine",
    description:
      "A Suika inspired physics game built with HTML/JS/CSS, Rapier.js, and FireBase. Spread through my highschool, filling the casual and ranked leaderboards with hundreds of attempts.",
    imageUrl: "/ballCombine.png",
    url: "https://ballcombine.vercel.app",
    oneLiner:
      "A Suika inspired physics game built with HTML/JS/CSS, Rapier.js, and FireBase.",
    achievements: [
      "500+ attempts on the leaderboard",
      "500,000+ balls dropped",
    ],
  },
  {
    title: "Collaborative Blackout Poem",
    description:
      "A tool made during COVID to help teachers create blackout poems with their students, powered by Socket.io. Used in Community College of Philadelphia classrooms.",
    imageUrl: "/blackOutPoem.png",
    url: "https://blackoutpoem.glitch.me/",
    oneLiner:
      "A multiplayer blackout poem creator built with React, Node, and Socket.io.",
    achievements: ["Used in classrooms at Community College of Philadelphia"],
  },
  {
    title: "Guitar Chess",
    description:
      "Chess that you play with a guitar - I made it to practice learning notes while playing chess.",
    imageUrl: "/guitarChess.png",
    url: "https://beasleydog.github.io/guitarchess/",
    oneLiner: "A guitar-controlled chess game built with HTML/JS/CSS.",
    achievements: ["Used in classrooms at Upper Dublin High School"],
  },
  {
    title: "Planscape",
    description:
      "A web-based puzzle game designed to promote resilience and problem-solving. Winner of the 2022 Congressional App Challenge.",
    imageUrl: "/planscape.png",
    url: "https://beasleydog.github.io/planscape/",
    oneLiner:
      "A physics puzzle game designed to promote resilience and problem-solving.",
    achievements: [
      "Winner of the 2022 Congressional App Challenge",
      "Displayed in the U.S. Capitol",
    ],
  },
  {
    title: "Scrambled",
    description:
      "A word scramble game designed to raise awareness about climate change, with built-in accessibility features. National winner of the 2023 Games For Change Accessibility Challenge.",
    imageUrl: "/scrambled.png",
    url: "https://beasleydog.github.io/tiletalk/build/",
    oneLiner:
      "A word scramble game designed to raise awareness about climate change.",
    achievements: [
      "National winner of the 2023 Games For Change Accessibility Challenge",
    ],
  },
  {
    title: "Seeking Connection",
    description:
      "A strategy game inspired by Connect 4 and COVID. Winner of multiple awards including the 2022 Games For Change Accessibility Challenge.",
    imageUrl: "/seekingConnection.png",
    url: "https://beasleydog.github.io/seekingconnection/",
    oneLiner:
      "A strategy game inspired by Connect 4 designed to promote connection during COVID.",
    achievements: [
      "Winner of the 2022 Games For Change Accessibility Challenge",
      "Finalist in Gee Learning Game Awards 2022",
    ],
  },
  {
    title: "Collaborative Crossword",
    description:
      "A collaborative crossword generator built using Google Apps Script.",
    imageUrl: "/collaborativeCrossword.png",
    url: "https://beasleydog.github.io/collaborativecrossword",
    oneLiner:
      "A multiplayer crossword generator built with Google Apps Scripts",
    achievements: ["Used in classrooms at Community College of Philadelphia"],
  },
];

export { games };
