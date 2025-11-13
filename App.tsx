import React, { useState } from "react";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { FlagSection } from "./components/FlagSection";
import { RiddlesSection } from "./components/RiddlesSection";
import { EmojiSection } from "./components/EmojiSection";
import { GameComplete } from "./components/GameComplete";
import { Leaderboard } from "./components/Leaderboard";
import { GameRules } from "./components/GameRules";
import { SectionIntro } from "./components/SectionIntro";
import { ThemeToggle } from "./components/ThemeToggle";
import { Flag, Lightbulb, Trophy, LeaderboardIcon, EmojiIcon } from "./components/icons";
import { GameState } from "./types";

const TOTAL_TIME = 7 * 60; // 7 minutes in seconds
const QUESTIONS_PER_SECTION = 10;

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("landing");
  const [startTime, setStartTime] = useState<number>(0);
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

  const handleFlagsComplete = (score: number) => {
    setFlagsScore(score);
    setGameState("riddles_intro");
  };

  const handleRiddlesComplete = (score: number) => {
    setRiddlesScore(score);
    setGameState("emojis_intro");
  };
  
  const handleEmojisComplete = (score: number) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:from-dark-background dark:via-dark-background dark:to-dark-primary/5 p-4 sm:p-6">
      <ThemeToggle className="absolute top-4 right-4" />
      <div className="max-w-6xl mx-auto">
        {gameState === "landing" && (
          <div className="flex items-center justify-center min-h-[80vh]">
            <Card className="p-8 sm:p-12 max-w-3xl text-center space-y-8 animate-scale-in">
              <Trophy className="h-20 w-20 mx-auto text-primary" />
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Quiz Challenge
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground dark:text-dark-muted-foreground">
                  Test your knowledge of flags, IT riddles, and emojis!
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-6">
                <div className="p-6 bg-primary/10 dark:bg-dark-primary/10 rounded-lg border border-primary/20 dark:border-dark-primary/20">
                  <Flag className="h-12 w-12 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">Flag Guessing</h3>
                  <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
                    Identify {QUESTIONS_PER_SECTION} country flags
                  </p>
                </div>
                
                <div className="p-6 bg-accent/10 dark:bg-dark-accent/10 rounded-lg border border-accent/20 dark:border-dark-accent/20">
                  <Lightbulb className="h-12 w-12 mx-auto mb-3 text-accent" />
                  <h3 className="font-semibold text-lg mb-2">IT Riddles</h3>
                  <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
                    Solve {QUESTIONS_PER_SECTION} tech riddles
                  </p>
                </div>

                <div className="p-6 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <EmojiIcon className="h-12 w-12 mx-auto mb-3 text-yellow-500" />
                  <h3 className="font-semibold text-lg mb-2">Emoji Decoder</h3>
                  <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
                    Guess {QUESTIONS_PER_SECTION} emoji puzzles
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                  <Trophy className="h-5 w-5" />
                  <span>{TOTAL_TIME / 60} minute total time limit</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      onClick={showRules}
                      size="lg"
                      className="text-lg px-12 py-6 h-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground"
                    >
                      Start Challenge
                    </Button>
                     <Button 
                      onClick={() => setGameState('leaderboard')}
                      size="lg"
                      variant="outline"
                      className="text-lg px-12 py-6 h-auto"
                    >
                      <LeaderboardIcon className="w-5 h-5 mr-2" />
                      Leaderboard
                    </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {gameState === "rules" && <GameRules onConfirm={startGame} />}

        {gameState === "flags_intro" && (
          <SectionIntro
            title="Section 1: Flag Guessing"
            description="You'll be shown a flag. Guess the correct country from the four options provided. You have 2 minutes for this section."
            icon={<Flag className="h-16 w-16 text-primary" />}
            onStart={() => setGameState("flags")}
            accentColor="primary"
          />
        )}
        
        {gameState === "riddles_intro" && (
          <SectionIntro
            title="Section 2: IT Riddles"
            description="Read the brain-teaser and type the single-word answer. Spelling counts! You have 3 minutes for this section."
            icon={<Lightbulb className="h-16 w-16 text-accent" />}
            onStart={() => setGameState("riddles")}
            accentColor="accent"
          />
        )}
        
        {gameState === "emojis_intro" && (
          <SectionIntro
            title="Section 3: Emoji Decoder"
            description="Guess the word or phrase represented by the emojis. Choose the correct answer from the four options. You have 2 minutes for this section."
            icon={<EmojiIcon className="h-16 w-16 text-yellow-500" />}
            onStart={() => setGameState("emojis")}
            accentColor="yellow-500"
          />
        )}

        {gameState === "leaderboard" && (
            <Leaderboard onBack={() => setGameState("landing")} />
        )}

        {gameState === "flags" && (
          <FlagSection 
            onComplete={handleFlagsComplete} 
            onScoreUpdate={setFlagsScore} 
            questionCount={QUESTIONS_PER_SECTION}
            timeLimit={2 * 60} 
          />
        )}

        {gameState === "riddles" && (
          <RiddlesSection 
            onComplete={handleRiddlesComplete} 
            onScoreUpdate={setRiddlesScore} 
            questionCount={QUESTIONS_PER_SECTION} 
            timeLimit={3 * 60}
          />
        )}

        {gameState === "emojis" && (
          <EmojiSection 
            onComplete={handleEmojisComplete} 
            onScoreUpdate={setEmojisScore} 
            questionCount={QUESTIONS_PER_SECTION}
            timeLimit={2 * 60}
          />
        )}

        {gameState === "complete" && (
          <GameComplete
            flagsScore={flagsScore}
            riddlesScore={riddlesScore}
            emojisScore={emojisScore}
            totalTime={totalTime}
            onRestart={restartGame}
            totalQuestionsPerSection={QUESTIONS_PER_SECTION}
          />
        )}
      </div>
    </div>
  );
};

export default App;