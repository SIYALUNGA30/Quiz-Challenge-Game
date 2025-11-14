import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card.js';
import { Button } from './ui/Button.js';
import { Trophy } from './icons.js';

export const Leaderboard = ({ onBack }) => {
  const [scores, setScores] = useState([]);

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
    React.createElement("div", { className: "flex items-center justify-center min-h-[80vh]" },
        React.createElement(Card, { className: "p-6 md:p-8 max-w-2xl w-full mx-auto animate-scale-in" },
            React.createElement("div", { className: "flex items-center justify-center mb-6" },
                React.createElement(Trophy, { className: "h-10 w-10 text-yellow-400 mr-4" }),
                React.createElement("h1", { className: "text-3xl font-bold text-center" }, "Leaderboard")
            ),

            React.createElement("div", { className: "space-y-3 max-h-[60vh] overflow-y-auto pr-2" },
            scores.length > 0 ? (
                scores.map((entry, index) => (
                React.createElement("div", { key: index, className: "flex items-center justify-between p-4 rounded-lg bg-muted dark:bg-dark-muted hover:bg-muted/80 dark:hover:bg-dark-muted/80 transition-colors" },
                    React.createElement("div", { className: "flex items-center" },
                      React.createElement("span", { className: `w-8 text-lg font-bold ${index < 3 ? 'text-yellow-400' : 'text-muted-foreground dark:text-dark-muted-foreground'}` }, index + 1),
                      React.createElement("p", { className: "font-semibold text-lg" }, entry.name)
                    ),
                    React.createElement("div", { className: "text-right" },
                        React.createElement("p", { className: "text-xl font-bold text-primary" }, entry.score),
                        React.createElement("p", { className: "text-xs text-muted-foreground dark:text-dark-muted-foreground" }, entry.date)
                    )
                )
                ))
            ) : (
                React.createElement("div", { className: "text-center py-10" },
                    React.createElement("p", { className: "text-muted-foreground dark:text-dark-muted-foreground" }, "No scores yet."),
                    React.createElement("p", null, "Be the first to get on the leaderboard!")
                )
            )
            ),

            React.createElement("div", { className: "mt-8 text-center" },
                React.createElement(Button, { onClick: onBack, size: "lg" },
                    "Back to Main Menu"
                )
            )
        )
    )
  );
};