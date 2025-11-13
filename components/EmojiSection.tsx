import React, { useState, useEffect, useCallback } from 'react';
import { generateEmojiQuestions } from '../services/geminiService';
import { EmojiQuestion } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Timer } from './Timer';
import { CheckCircle, XCircle } from './icons';

interface EmojiSectionProps {
  onComplete: (score: number) => void;
  onScoreUpdate: (score: number) => void;
  questionCount: number;
  timeLimit: number;
}

export const EmojiSection: React.FC<EmojiSectionProps> = ({ onComplete, onScoreUpdate, questionCount, timeLimit }) => {
  const [questions, setQuestions] = useState<EmojiQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  
  const handleAnswer = (answer: string) => {
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
        <div className="flex flex-col items-center justify-center text-center p-8 animate-scale-in">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500"></div>
            <h2 className="text-2xl font-semibold mt-4">Decoding Emojis...</h2>
            <p className="text-muted-foreground dark:text-dark-muted-foreground">The AI is creating pictographic puzzles for you!</p>
        </div>
    );
  }

   if (error && questions.length === 0) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="animate-scale-in">
      <div className="mb-8">
        <Timer 
          totalSeconds={timeLimit} 
          onTimeUp={() => onComplete(score)}
        />
      </div>
      <Card className="p-6 md:p-8 max-w-3xl mx-auto">
        <div className="mb-4">
          <div className="flex justify-between mb-2">
              <h2 className="text-xl font-bold text-yellow-500">Emoji Decoder</h2>
              <p className="text-lg font-semibold">{currentQuestionIndex + 1} / {questions.length}</p>
          </div>
          <div className="w-full bg-muted dark:bg-dark-muted rounded-full h-2.5">
              <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="text-center space-y-6 mt-6">
          <p className="text-6xl font-medium leading-relaxed tracking-widest">{currentQuestion.emojis}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
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
                  <Button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  className={`w-full justify-between items-center text-lg p-6 h-auto transition-all duration-300 ${buttonClass}`}
                  >
                  <span>{option}</span>
                  {isAnswered && (isCorrect || isSelected) && (
                      isCorrect ? <CheckCircle className="h-6 w-6 text-white"/> : <XCircle className="h-6 w-6 text-white"/>
                  )}
                  </Button>
              );
            })}
          </div>
          {isAnswered && (
            <div className="flex flex-col items-center">
              <p className="text-lg mb-4">
                  {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : `Sorry, the correct answer was ${currentQuestion.correctAnswer}.`}
              </p>
              <Button onClick={handleNext} className="bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                {currentQuestionIndex < questions.length - 1 ? 'Next Puzzle' : 'Finish Challenge'}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};