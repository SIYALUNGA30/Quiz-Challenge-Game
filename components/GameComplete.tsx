import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Trophy, Flag, Lightbulb, EmojiIcon } from './icons';
import { ScoreEntry } from '../types';

interface GameCompleteProps {
  flagsScore: number;
  riddlesScore: number;
  emojisScore: number;
  totalTime: number;
  onRestart: () => void;
  totalQuestionsPerSection: number;
}

export const GameComplete: React.FC<GameCompleteProps> = ({ flagsScore, riddlesScore, emojisScore, totalTime, onRestart, totalQuestionsPerSection }) => {
  const [name, setName] = useState('');
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  
  const totalScore = flagsScore + riddlesScore + emojisScore;
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  const handleSaveScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const newScoreEntry: ScoreEntry = {
      name: name.trim(),
      score: totalScore,
      date: new Date().toLocaleDateString(),
    };

    try {
      const highScores: ScoreEntry[] = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
      highScores.push(newScoreEntry);
      highScores.sort((a, b) => b.score - a.score);
      const trimmedScores = highScores.slice(0, 100); 
      localStorage.setItem('quizLeaderboard', JSON.stringify(trimmedScores));
      setIsScoreSaved(true);
    } catch (error) {
      console.error("Failed to save score:", error);
      alert("There was an error saving your score.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="p-8 sm:p-12 max-w-2xl text-center space-y-8 animate-scale-in">
        <Trophy className="h-20 w-20 mx-auto text-yellow-400" />
        
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Challenge Complete!
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground dark:text-dark-muted-foreground">
            Here are your results.
          </p>
        </div>

        <div className="space-y-6 bg-muted dark:bg-dark-muted p-6 rounded-lg">
            <div className="text-center">
                <p className="text-muted-foreground dark:text-dark-muted-foreground text-sm">TOTAL SCORE</p>
                <p className="text-6xl font-bold">{totalScore}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                <div className="bg-background dark:bg-dark-background p-4 rounded-md">
                    <div className="flex items-center gap-3 mb-2">
                        <Flag className="h-6 w-6 text-primary"/>
                        <h3 className="font-semibold">Flags Score</h3>
                    </div>
                    <p className="text-3xl font-semibold">{flagsScore} <span className="text-base text-muted-foreground dark:text-dark-muted-foreground">/ {totalQuestionsPerSection}</span></p>
                </div>
                <div className="bg-background dark:bg-dark-background p-4 rounded-md">
                     <div className="flex items-center gap-3 mb-2">
                        <Lightbulb className="h-6 w-6 text-accent"/>
                        <h3 className="font-semibold">Riddles Score</h3>
                    </div>
                    <p className="text-3xl font-semibold">{riddlesScore} <span className="text-base text-muted-foreground dark:text-dark-muted-foreground">/ {totalQuestionsPerSection}</span></p>
                </div>
                 <div className="bg-background dark:bg-dark-background p-4 rounded-md col-span-1 sm:col-span-2 lg:col-span-1">
                     <div className="flex items-center gap-3 mb-2">
                        <EmojiIcon className="h-6 w-6 text-yellow-500"/>
                        <h3 className="font-semibold">Emojis Score</h3>
                    </div>
                    <p className="text-3xl font-semibold">{emojisScore} <span className="text-base text-muted-foreground dark:text-dark-muted-foreground">/ {totalQuestionsPerSection}</span></p>
                </div>
            </div>
             <div className="text-center pt-2">
                <p className="text-muted-foreground dark:text-dark-muted-foreground text-sm">TIME TAKEN</p>
                <p className="text-2xl font-semibold">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </p>
            </div>
        </div>
        
        {!isScoreSaved ? (
           <form onSubmit={handleSaveScore} className="flex flex-col items-center gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name to save score"
              className="w-full max-w-sm px-4 py-3 bg-background dark:bg-dark-background border border-muted-foreground/30 dark:border-dark-muted-foreground/30 rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-center"
            />
            <Button type="submit" size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Save Score
            </Button>
          </form>
        ) : (
          <p className="text-green-400 font-semibold text-lg">Your score has been saved!</p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onRestart}
              size="lg"
              className="text-lg px-12 py-6 h-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground"
            >
              Play Again
            </Button>
            <Button 
              onClick={onRestart}
              size="lg"
              variant="outline"
              className="text-lg px-12 py-6 h-auto"
            >
              Back to Home
            </Button>
        </div>
      </Card>
    </div>
  );
};