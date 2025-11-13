import React, { useState, useEffect } from 'react';
import { ScoreEntry } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Trophy } from './icons';

interface LeaderboardProps {
  onBack: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onBack }) => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    try {
      const highScores = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
      setScores(highScores);
    } catch (error) {
      console.error("Failed to load scores:", error);
      setScores([]);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
        <Card className="p-6 md:p-8 max-w-2xl w-full mx-auto animate-scale-in">
            <div className="flex items-center justify-center mb-6">
                <Trophy className="h-10 w-10 text-yellow-400 mr-4" />
                <h1 className="text-3xl font-bold text-center">Leaderboard</h1>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
            {scores.length > 0 ? (
                scores.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted dark:bg-dark-muted hover:bg-muted/80 dark:hover:bg-dark-muted/80 transition-colors">
                    <div className="flex items-center">
                    <span className={`w-8 text-lg font-bold ${index < 3 ? 'text-yellow-400' : 'text-muted-foreground dark:text-dark-muted-foreground'}`}>{index + 1}</span>
                    <p className="font-semibold text-lg">{entry.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-primary">{entry.score}</p>
                        <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">{entry.date}</p>
                    </div>
                </div>
                ))
            ) : (
                <div className="text-center py-10">
                    <p className="text-muted-foreground dark:text-dark-muted-foreground">No scores yet.</p>
                    <p>Be the first to get on the leaderboard!</p>
                </div>
            )}
            </div>

            <div className="mt-8 text-center">
                <Button onClick={onBack} size="lg">
                    Back to Main Menu
                </Button>
            </div>
        </Card>
    </div>
  );
};