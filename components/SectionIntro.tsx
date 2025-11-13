import React from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface SectionIntroProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onStart: () => void;
  accentColor: string;
}

export const SectionIntro: React.FC<SectionIntroProps> = ({ title, description, icon, onStart, accentColor }) => {
  const colorVariants: { [key: string]: string } = {
    primary: 'bg-primary hover:bg-primary/90',
    accent: 'bg-accent hover:bg-accent/90',
    'yellow-500': 'bg-yellow-500 hover:bg-yellow-500/90',
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="p-8 sm:p-12 max-w-2xl text-center space-y-8 animate-scale-in">
        <div className="mx-auto w-fit">
            {icon}
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">{title}</h1>
          <p className="text-lg text-muted-foreground dark:text-dark-muted-foreground max-w-md mx-auto">
            {description}
          </p>
        </div>
        <Button
            onClick={onStart}
            size="lg"
            className={`text-lg px-12 py-6 h-auto transition-opacity text-white ${colorVariants[accentColor]}`}
        >
            Start Section
        </Button>
      </Card>
    </div>
  );
};