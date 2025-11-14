import React, { useState, useEffect, useCallback } from 'react';
import { generateEmojiQuestions } from '../services/geminiService.js';
import { Card } from './ui/Card.js';
import { Button } from './ui/Button.js';
import { Timer } from './Timer.js';
import { CheckCircle, XCircle } from './icons.js';

export const EmojiSection = ({ onComplete, onScoreUpdate, questionCount, timeLimit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await generateEmojiQuestions(questionCount);
       if (data && data.length > 0) {
        setQuestions(data);
      } else {
        throw new Error("No emoji puzzles returned from API.");
      }
    } catch (err) {
      setError("Failed to load emoji puzzles. Using fallback data.");
      console.error(err);
      const fallbackData = await generateEmojiQuestions(questionCount);
      setQuestions(fallbackData);
    } finally {
      setLoading(false);
    }
  }, [questionCount]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);
  
  const handleAnswer = (answer) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
        const newScore = score + 1;
        setScore(newScore);
        onScoreUpdate(newScore);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  };

  if (loading) {
    return (
        React.createElement("div", { className: "flex flex-col items-center justify-center text-center p-8 animate-scale-in" },
            React.createElement("div", { className: "w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500" }),
            React.createElement("h2", { className: "text-2xl font-semibold mt-4" }, "Decoding Emojis..."),
            React.createElement("p", { className: "text-muted-foreground dark:text-dark-muted-foreground" }, "The AI is creating pictographic puzzles for you!")
        )
    );
  }

   if (error && questions.length === 0) {
    return React.createElement("div", { className: "text-center text-red-500" }, error);
  }

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

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
              React.createElement("h2", { className: "text-xl font-bold text-yellow-500" }, "Emoji Decoder"),
              React.createElement("p", { className: "text-lg font-semibold" }, `${currentQuestionIndex + 1} / ${questions.length}`)
          ),
          React.createElement("div", { className: "w-full bg-muted dark:bg-dark-muted rounded-full h-2.5" },
              React.createElement("div", { className: "bg-yellow-500 h-2.5 rounded-full", style: { width: `${progress}%` } })
          )
        ),

        React.createElement("div", { className: "text-center space-y-6 mt-6" },
          React.createElement("p", { className: "text-6xl font-medium leading-relaxed tracking-widest" }, currentQuestion.emojis),
          
          React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" },
            currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.correctAnswer;
              const isSelected = option === selectedAnswer;

              let buttonClass = "bg-muted dark:bg-dark-muted hover:bg-muted/80 dark:hover:bg-dark-muted/80";
              if (isAnswered) {
                  if (isCorrect) {
                      buttonClass = "bg-green-500/80 ring-2 ring-green-400 text-white";
                  } else if (isSelected) {
                      buttonClass = "bg-red-500/80 text-white";
                  }
              }

              return (
                  React.createElement(Button, {
                    key: option,
                    onClick: () => handleAnswer(option),
                    disabled: isAnswered,
                    className: `w-full justify-between items-center text-lg p-6 h-auto transition-all duration-300 ${buttonClass}`
                  },
                    React.createElement("span", null, option),
                    isAnswered && (isCorrect || isSelected) && (
                      isCorrect ? React.createElement(CheckCircle, { className: "h-6 w-6 text-white" }) : React.createElement(XCircle, { className: "h-6 w-6 text-white" })
                    )
                  )
              );
            })
          ),
          isAnswered && (
            React.createElement("div", { className: "flex flex-col items-center" },
              React.createElement("p", { className: "text-lg mb-4" },
                  selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : `Sorry, the correct answer was ${currentQuestion.correctAnswer}.`
              ),
              React.createElement(Button, { onClick: handleNext, className: "bg-primary hover:bg-primary/90 text-primary-foreground", size: "lg" },
                currentQuestionIndex < questions.length - 1 ? 'Next Puzzle' : 'Finish Challenge'
              )
            )
          )
        )
      )
    )
  );
};
