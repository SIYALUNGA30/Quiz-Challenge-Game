import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Trophy } from './icons';

interface GameRulesProps {
  onConfirm: () => void;
}

export const GameRules: React.FC<GameRulesProps> = ({ onConfirm }) => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="p-8 sm:p-12 max-w-2xl text-center space-y-8 animate-scale-in">
        <Trophy className="h-20 w-20 mx-auto text-primary" />
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">Before You Start...</h1>
          <p className="text-lg text-muted-foreground dark:text-dark-muted-foreground">
            Please read the rules of the challenge.
          </p>
        </div>
        <div className="text-left space-y-4 bg-muted dark:bg-dark-muted p-6 rounded-lg">
          <p>The challenge consists of <strong className="text-primary">3 sections</strong>: Flags, Riddles, and Emojis.</p>
          <div>
            <p>You have a total of <strong className="text-primary">6 minutes</strong>, broken down as follows:</p>
            <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
              <li>Section 1 (Flags): <strong className="text-primary">2 minutes</strong></li>
              <li>Section 2 (Riddles): <strong className="text-primary">2 minutes</strong></li>
              <li>Section 3 (Emojis): <strong className="text-primary">2 minutes</strong></li>
            </ul>
          </div>
          <p>The game must be completed in <strong className="text-primary">one sitting</strong>. Progress will not be saved if you leave.</p>
          <p>You <strong className="text-primary">cannot skip</strong> any questions.</p>
        </div>
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">
                Are you ready to test your knowledge?
            </p>
            <Button
                onClick={onConfirm}
                size="lg"
                className="text-lg px-12 py-6 h-auto bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity text-white"
            >
                I Understand, Start the Game!
            </Button>
        </div>
      </Card>
    </div>
  );
};