import React, { useState } from "react";
import { Button } from "./components/ui/Button.js";
import { Card } from "./components/ui/Card.js";
import { FlagSection } from "./components/FlagSection.js";
import { RiddlesSection } from "./components/RiddlesSection.js";
import { EmojiSection } from "./components/EmojiSection.js";
import { GameComplete } from "./components/GameComplete.js";
import { Leaderboard } from "./components/Leaderboard.js";
import { GameRules } from "./components/GameRules.js";
import { SectionIntro } from "./components/SectionIntro.js";
import { ThemeToggle } from "./components/ThemeToggle.js";
import { Flag, Lightbulb, Trophy, LeaderboardIcon, EmojiIcon } from "./components/icons.js";

const TOTAL_TIME = 7 * 60; // 7 minutes in seconds
const QUESTIONS_PER_SECTION = 10;

const App = () => {
  const [gameState, setGameState] = useState("landing");
  const [startTime, setStartTime] = useState(0);
  const [flagsScore, setFlagsScore] = useState(0);
  const [riddlesScore, setRiddlesScore] = useState(0);
  const [emojisScore, setEmojisScore] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const showRules = () => {
    setGameState("rules");
  };

  const startGame = () => {
    setStartTime(Date.now());
    setGameState("flags_intro");
  };

  const handleFlagsComplete = (score) => {
    setFlagsScore(score);
    setGameState("riddles_intro");
  };

  const handleRiddlesComplete = (score) => {
    setRiddlesScore(score);
    setGameState("emojis_intro");
  };
  
  const handleEmojisComplete = (score) => {
    setEmojisScore(score);
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    setTotalTime(elapsedTime);
    setGameState("complete");
  };

  const restartGame = () => {
    setGameState("landing");
    setFlagsScore(0);
    setRiddlesScore(0);
    setEmojisScore(0);
    setTotalTime(0);
    setStartTime(0);
  };

  const renderContent = () => {
    switch (gameState) {
      case "landing":
        return React.createElement("div", { className: "flex items-center justify-center min-h-[80vh]" },
          React.createElement(Card, { className: "p-8 sm:p-12 max-w-3xl text-center space-y-8 animate-scale-in" },
            React.createElement(Trophy, { className: "h-20 w-20 mx-auto text-primary" }),
            React.createElement("div", { className: "space-y-4" },
              React.createElement("h1", { className: "text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" }, "Quiz Challenge"),
              React.createElement("p", { className: "text-lg sm:text-xl text-muted-foreground dark:text-dark-muted-foreground" }, "Test your knowledge of flags, IT riddles, and emojis!")
            ),
            React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6 py-6" },
              React.createElement("div", { className: "p-6 bg-primary/10 dark:bg-dark-primary/10 rounded-lg border border-primary/20 dark:border-dark-primary/20" },
                React.createElement(Flag, { className: "h-12 w-12 mx-auto mb-3 text-primary" }),
                React.createElement("h3", { className: "font-semibold text-lg mb-2" }, "Flag Guessing"),
                React.createElement("p", { className: "text-sm text-muted-foreground dark:text-dark-muted-foreground" }, `Identify ${QUESTIONS_PER_SECTION} country flags`)
              ),
              React.createElement("div", { className: "p-6 bg-accent/10 dark:bg-dark-accent/10 rounded-lg border border-accent/20 dark:border-dark-accent/20" },
                React.createElement(Lightbulb, { className: "h-12 w-12 mx-auto mb-3 text-accent" }),
                React.createElement("h3", { className: "font-semibold text-lg mb-2" }, "IT Riddles"),
                React.createElement("p", { className: "text-sm text-muted-foreground dark:text-dark-muted-foreground" }, `Solve ${QUESTIONS_PER_SECTION} tech riddles`)
              ),
              React.createElement("div", { className: "p-6 bg-yellow-500/10 rounded-lg border border-yellow-500/20" },
                React.createElement(EmojiIcon, { className: "h-12 w-12 mx-auto mb-3 text-yellow-500" }),
                React.createElement("h3", { className: "font-semibold text-lg mb-2" }, "Emoji Decoder"),
                React.createElement("p", { className: "text-sm text-muted-foreground dark:text-dark-muted-foreground" }, `Guess ${QUESTIONS_PER_SECTION} emoji puzzles`)
              )
            ),
            React.createElement("div", { className: "space-y-4" },
              React.createElement("div", { className: "flex items-center justify-center gap-2 text-green-600 font-semibold" },
                React.createElement(Trophy, { className: "h-5 w-5" }),
                React.createElement("span", null, `${TOTAL_TIME / 60} minute total time limit`)
              ),
              React.createElement("div", { className: "flex flex-col sm:flex-row gap-4 justify-center" },
                React.createElement(Button, { onClick: showRules, size: "lg", className: "text-lg px-12 py-6 h-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground" }, "Start Challenge"),
                React.createElement(Button, { onClick: () => setGameState('leaderboard'), size: "lg", variant: "outline", className: "text-lg px-12 py-6 h-auto" },
                  React.createElement(LeaderboardIcon, { className: "w-5 h-5 mr-2" }), "Leaderboard"
                )
              )
            )
          )
        );
      case "rules":
        return React.createElement(GameRules, { onConfirm: startGame });
      case "flags_intro":
        return React.createElement(SectionIntro, { title: "Section 1: Flag Guessing", description: "You'll be shown a flag. Guess the correct country from the four options provided. You have 2 minutes for this section.", icon: React.createElement(Flag, { className: "h-16 w-16 text-primary" }), onStart: () => setGameState("flags"), accentColor: "primary" });
      case "riddles_intro":
        return React.createElement(SectionIntro, { title: "Section 2: IT Riddles", description: "Read the brain-teaser and type the single-word answer. Spelling counts! You have 3 minutes for this section.", icon: React.createElement(Lightbulb, { className: "h-16 w-16 text-accent" }), onStart: () => setGameState("riddles"), accentColor: "accent" });
      case "emojis_intro":
        return React.createElement(SectionIntro, { title: "Section 3: Emoji Decoder", description: "Guess the word or phrase represented by the emojis. Choose the correct answer from the four options. You have 2 minutes for this section.", icon: React.createElement(EmojiIcon, { className: "h-16 w-16 text-yellow-500" }), onStart: () => setGameState("emojis"), accentColor: "yellow-500" });
      case "leaderboard":
        return React.createElement(Leaderboard, { onBack: () => setGameState("landing") });
      case "flags":
        return React.createElement(FlagSection, { onComplete: handleFlagsComplete, onScoreUpdate: setFlagsScore, questionCount: QUESTIONS_PER_SECTION, timeLimit: 2 * 60 });
      case "riddles":
        return React.createElement(RiddlesSection, { onComplete: handleRiddlesComplete, onScoreUpdate: setRiddlesScore, questionCount: QUESTIONS_PER_SECTION, timeLimit: 3 * 60 });
      case "emojis":
        return React.createElement(EmojiSection, { onComplete: handleEmojisComplete, onScoreUpdate: setEmojisScore, questionCount: QUESTIONS_PER_SECTION, timeLimit: 2 * 60 });
      case "complete":
        return React.createElement(GameComplete, { flagsScore: flagsScore, riddlesScore: riddlesScore, emojisScore: emojisScore, totalTime: totalTime, onRestart: restartGame, totalQuestionsPerSection: QUESTIONS_PER_SECTION });
      default:
        return null;
    }
  };

  return (
    React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:from-dark-background dark:via-dark-background dark:to-dark-primary/5 p-4 sm:p-6" },
      React.createElement(ThemeToggle, { className: "absolute top-4 right-4" }),
      React.createElement("div", { className: "max-w-6xl mx-auto" },
        renderContent()
      )
    )
  );
};

export default App;