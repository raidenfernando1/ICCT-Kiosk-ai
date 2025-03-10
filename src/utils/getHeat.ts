import Fuse from "fuse.js";

const HeatWords = [
  // High weight words (question starters) - weight 3
  { word: "who", weight: 3 },
  { word: "how", weight: 3 },
  { word: "when", weight: 3 },
  { word: "what", weight: 3 },
  { word: "where", weight: 3 },
  { word: "why", weight: 3 },
  { word: "which", weight: 3 },

  // Medium weight words - weight 2
  { word: "explain", weight: 2 },
  { word: "tell", weight: 2 },
  { word: "define", weight: 2 },
  { word: "describe", weight: 2 },
  { word: "difference", weight: 2 },
  { word: "between", weight: 2 },

  // Lower weight words - weight 1
  { word: "information", weight: 1 },
  { word: "about", weight: 1 },
  { word: "details", weight: 1 },
  { word: "example", weight: 1 },
];

const fuse = new Fuse(HeatWords, {
  keys: ["word"],
  includeScore: true,
  threshold: 0.3,
});

const HeatIndex = (userInput: string) => {
  console.log("hello from getheat");
  if (!userInput || typeof userInput !== "string") return false;
  const preprocessedWords = userInput.toLowerCase().split(/\s+/);
  let heatScore = 0;

  for (const word of preprocessedWords) {
    const exactMatch = HeatWords.find((item) => item.word === word);
    if (exactMatch) {
      heatScore += exactMatch.weight;
      continue;
    }

    if (word.length >= 3) {
      const results = fuse.search(word);
      if (
        results.length > 0 &&
        results[0]?.score !== undefined &&
        results[0].score < 0.3
      ) {
        heatScore += results[0].item.weight;
      }
    }
  }

  return heatScore >= 3;
};

export default HeatIndex;
