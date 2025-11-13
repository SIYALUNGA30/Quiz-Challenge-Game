export type GameState = "landing" | "rules" | "flags_intro" | "flags" | "riddles_intro" | "riddles" | "emojis_intro" | "emojis" | "complete" | "leaderboard";

export interface FlagQuestion {
  countryName: string;
  countryCode: string;
  options: string[];
  correctAnswer: string;
}

export interface Riddle {
  riddle: string;
  answer: string;
}

export interface EmojiQuestion {
  emojis: string;
  options: string[];
  correctAnswer: string;
}

export interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}