import React, { useState, useEffect } from 'react';

interface TimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
}

export const Timer: React.FC<TimerProps> = ({ totalSeconds, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, onTimeUp]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const progress = (secondsLeft / totalSeconds) * 100;
  let progressBarColor = 'bg-green-500';
  if (progress < 50) progressBarColor = 'bg-yellow-500';
  if (progress < 20) progressBarColor = 'bg-red-500';

  const isUrgent = secondsLeft <= 120; // 2 minutes

  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-lg bg-card dark:bg-dark-card border border-muted-foreground/20 dark:border-dark-muted-foreground/20 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <span className={`text-lg font-semibold transition-colors ${isUrgent ? 'text-red-500' : ''}`}>Time Remaining</span>
        <span className={`text-2xl font-bold tabular-nums transition-colors ${isUrgent ? 'text-red-500' : ''}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
      </div>
      <div className="w-full bg-muted dark:bg-dark-muted rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${progressBarColor}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};