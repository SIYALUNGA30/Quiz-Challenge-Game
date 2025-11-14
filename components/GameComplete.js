import React, { useState } from 'react';
import { Card } from './ui/Card.js';
import { Button } from './ui/Button.js';
import { Trophy, Flag, Lightbulb, EmojiIcon } from './icons.js';

export const GameComplete = ({ flagsScore, riddlesScore, emojisScore, totalTime, onRestart, totalQuestionsPerSection }) => {
  const [name, setName] = useState('');
  const [isScoreSaved, setIsScoreSaved] = useState(false);
  
  const totalScore = flagsScore + riddlesScore + emojisScore;
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;

  const handleSaveScore = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    const newScoreEntry = {
      name: name.trim(),
      score: totalScore,
      date: new Date().toLocaleDateString(),
    };

    try {
      const highScores = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
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
    React.createElement("div", { className: "flex items-center justify-center min-h-[80vh]" },
      React.createElement(Card, { className: "p-8 sm:p-12 max-w-2xl text-center space-y-8 animate-scale-in" },
        React.createElement(Trophy, { className: "h-20 w-20 mx-auto text-yellow-400" }),
        
        React.createElement("div", { className: "space-y-4" },
          React.createElement("h1", { className: "text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent" },
            "Challenge Complete!"
          ),
          React.createElement("p", { className: "text-lg sm:text-xl text-muted-foreground dark:text-dark-muted-foreground" },
            "Here are your results."
          )
        ),

        React.createElement("div", { className: "space-y-6 bg-muted dark:bg-dark-muted p-6 rounded-lg" },
            React.createElement("div", { className: "text-center" },
                React.createElement("p", { className: "text-muted-foreground dark:text-dark-muted-foreground text-sm" }, "TOTAL SCORE"),
                React.createElement("p", { className: "text-6xl font-bold" }, totalScore)
            ),
            React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left" },
                React.createElement("div", { className: "bg-background dark:bg-dark-background p-4 rounded-md" },
                    React.createElement("div", { className: "flex items-center gap-3 mb-2" },
                        React.createElement(Flag, { className: "h-6 w-6 text-primary" }),
                        React.createElement("h3", { className: "font-semibold" }, "Flags Score")
                    ),
                    React.createElement("p", { className: "text-3xl font-semibold" }, flagsScore, " ", React.createElement("span", { className: "text-base text-muted-foreground dark:text-dark-muted-foreground" }, `/ ${totalQuestionsPerSection}`))
                ),
                React.createElement("div", { className: "bg-background dark:bg-dark-background p-4 rounded-md" },
                     React.createElement("div", { className: "flex items-center gap-3 mb-2" },
                        React.createElement(Lightbulb, { className: "h-6 w-6 text-accent" }),
                        React.createElement("h3", { className: "font-semibold" }, "Riddles Score")
                    ),
                    React.createElement("p", { className: "text-3xl font-semibold" }, riddlesScore, " ", React.createElement("span", { className: "text-base text-muted-foreground dark:text-dark-muted-foreground" }, `/ ${totalQuestionsPerSection}`))
                ),
                 React.createElement("div", { className: "bg-background dark:bg-dark-background p-4 rounded-md col-span-1 sm:col-span-2 lg:col-span-1" },
                     React.createElement("div", { className: "flex items-center gap-3 mb-2" },
                        React.createElement(EmojiIcon, { className: "h-6 w-6 text-yellow-500" }),
                        React.createElement("h3", { className: "font-semibold" }, "Emojis Score")
                    ),
                    React.createElement("p", { className: "text-3xl font-semibold" }, emojisScore, " ", React.createElement("span", { className: "text-base text-muted-foreground dark:text-dark-muted-foreground" }, `/ ${totalQuestionsPerSection}`))
                )
            ),
             React.createElement("div", { className: "text-center pt-2" },
                React.createElement("p", { className: "text-muted-foreground dark:text-dark-muted-foreground text-sm" }, "TIME TAKEN"),
                React.createElement("p", { className: "text-2xl font-semibold" },
                `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
                )
            )
        ),
        
        !isScoreSaved ? (
           React.createElement("form", { onSubmit: handleSaveScore, className: "flex flex-col items-center gap-4" },
            React.createElement("input", {
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: "Enter your name to save score",
              className: "w-full max-w-sm px-4 py-3 bg-background dark:bg-dark-background border border-muted-foreground/30 dark:border-dark-muted-foreground/30 rounded-md focus:ring-2 focus:ring-primary focus:outline-none text-center"
            }),
            React.createElement(Button, { type: "submit", size: "lg", className: "bg-green-600 hover:bg-green-700 text-white" },
              "Save Score"
            )
          )
        ) : (
          React.createElement("p", { className: "text-green-400 font-semibold text-lg" }, "Your score has been saved!")
        ),

        React.createElement("div", { className: "flex flex-col sm:flex-row gap-4 justify-center" },
            React.createElement(Button, { 
              onClick: onRestart,
              size: "lg",
              className: "text-lg px-12 py-6 h-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-primary-foreground"
            },
              "Play Again"
            ),
            React.createElement(Button, { 
              onClick: onRestart,
              size: "lg",
              variant: "outline",
              className: "text-lg px-12 py-6 h-auto"
            },
              "Back to Home"
            )
        )
      )
    )
  );
};
