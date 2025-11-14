import React, { useState, useEffect, useCallback } from 'react';
import { generateRiddles } from '../services/geminiService.js';
import { Card } from './ui/Card.js';
import { Button } from './ui/Button.js';
import { Timer } from './Timer.js';
import { CheckCircle, XCircle } from './icons.js';

export const RiddlesSection = ({ onComplete, onScoreUpdate, questionCount, timeLimit }) => {
  const [riddles, setRiddles] = useState([]);
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [error, setError] = useState(null);

  const fetchRiddles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateRiddles(questionCount);
       if (data && data.length > 0) {
        setRiddles(data);
      } else {
        throw new Error("No riddles returned from API.");
      }
    } catch (err) {
      setError("Failed to load riddles. Using fallback data.");
      console.error(err);
      const fallbackData = await generateRiddles(questionCount);
      setRiddles(fallbackData);
    } finally {
      setLoading(false);
    }
  }, [questionCount]);

  useEffect(() => {
    fetchRiddles();
  }, [fetchRiddles]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAnswered) return;
    
    const currentRiddle = riddles[currentRiddleIndex];
    const correct = userAnswer.trim().toLowerCase() === currentRiddle.answer.toLowerCase();
    
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      const newScore = score + 1;
      setScore(newScore);
      onScoreUpdate(newScore);
    }
  };

  const handleNext = () => {
    if (currentRiddleIndex < riddles.length - 1) {
      setCurrentRiddleIndex(currentRiddleIndex + 1);
      setUserAnswer('');
      setIsAnswered(false);
      setIsCorrect(null);
    } else {
      onComplete(score);
    }
  };

  if (loading) {
    return (
        React.createElement("div", { className: "flex flex-col items-center justify-center text-center p-8 animate-scale-in" },
            React.createElement("div", { className: "w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent" }),
            React.createElement("h2", { className: "text-2xl font-semibold mt-4" }, "Crafting Clever Riddles..."),
            React.createElement("p", { className: "text-muted-foreground dark:text-dark-muted-foreground" }, "Our AI is thinking up some brain-teasers for you!")
        )
    );
  }

   if (error && riddles.length === 0) {
    return React.createElement("div", { className: "text-center text-red-500" }, error);
  }

  if (riddles.length === 0) return null;

  const currentRiddle = riddles[currentRiddleIndex];
  const progress = ((currentRiddleIndex + 1) / riddles.length) * 100;

  return (
    React.createElement("div", { className: "animate-scale-in" },
       React.createElement("div", { className: "mb-8" },
        React.createElement(Timer, { 
          totalSeconds: timeLimit, 
          onTimeUp: () => onComplete(score)
        })
      ),
      React.createElement(Card, { className: "p-6 md:p-8 max-w-3xl mx-auto" },
        React.createElement("div", { className: "mb-4" },
          React.createElement("div", { className: "flex justify-between mb-2" },
              React.createElement("h2", { className: "text-xl font-bold text-accent" }, "IT Riddle Time"),
              React.createElement("p", { className: "text-lg font-semibold" }, `${currentRiddleIndex + 1} / ${riddles.length}`)
          ),
          React.createElement("div", { className: "w-full bg-muted dark:bg-dark-muted rounded-full h-2.5" },
              React.createElement("div", { className: "bg-accent h-2.5 rounded-full", style: { width: `${progress}%` } })
          )
        ),

        React.createElement("div", { className: "text-center space-y-6 mt-6" },
          React.createElement("p", { className: "text-2xl font-medium leading-relaxed" }, `"${currentRiddle.riddle}"`),
          
          !isAnswered ? (
            React.createElement("form", { onSubmit: handleSubmit, className: "flex flex-col sm:flex-row gap-2" },
              React.createElement("input", {
                type: "text",
                value: userAnswer,
                onChange: (e) => setUserAnswer(e.target.value),
                placeholder: "Your answer...",
                className: "flex-grow w-full px-4 py-3 bg-muted dark:bg-dark-muted border border-muted-foreground/30 dark:border-dark-muted-foreground/30 rounded-md focus:ring-2 focus:ring-accent focus:outline-none",
                autoFocus: true
              }),
              React.createElement(Button, { type: "submit", className: "bg-accent text-accent-foreground hover:bg-accent/90", size: "lg" },
                "Submit"
              )
            )
          ) : (
            React.createElement("div", { className: "flex flex-col items-center space-y-4 p-4 rounded-lg bg-muted dark:bg-dark-muted" },
              React.createElement("div", { className: "flex items-center gap-2 text-xl" },
                isCorrect ? React.createElement(CheckCircle, { className: "h-8 w-8 text-green-500" }) : React.createElement(XCircle, { className: "h-8 w-8 text-red-500" }),
                React.createElement("span", null, isCorrect ? "Correct!" : "Not quite!")
              ),
              !isCorrect && React.createElement("p", null, "The correct answer was: ", React.createElement("strong", { className: "text-accent" }, currentRiddle.answer)),
              React.createElement(Button, { onClick: handleNext, className: "bg-primary hover:bg-primary/90 text-primary-foreground", size: "lg" },
                currentRiddleIndex < riddles.length - 1 ? 'Next Riddle' : 'Next Section'
              )
            )
          )
        )
      )
    )
  );
};
