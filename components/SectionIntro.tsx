import React from 'react';
import { Card } from './ui/Card.js';
import { Button } from './ui/Button.js';

export const SectionIntro = ({ title, description, icon, onStart, accentColor }) => {
  const colorVariants = {
    primary: 'bg-primary hover:bg-primary/90',
    accent: 'bg-accent hover:bg-accent/90',
    'yellow-500': 'bg-yellow-500 hover:bg-yellow-500/90',
  };

  return (
    React.createElement("div", { className: "flex items-center justify-center min-h-[80vh]" },
      React.createElement(Card, { className: "p-8 sm:p-12 max-w-2xl text-center space-y-8 animate-scale-in" },
        React.createElement("div", { className: "mx-auto w-fit" },
            icon
        ),
        React.createElement("div", { className: "space-y-4" },
          React.createElement("h1", { className: "text-4xl sm:text-5xl font-bold" }, title),
          React.createElement("p", { className: "text-lg text-muted-foreground dark:text-dark-muted-foreground max-w-md mx-auto" },
            description
          )
        ),
        React.createElement(Button, {
            onClick: onStart,
            size: "lg",
            className: `text-lg px-12 py-6 h-auto transition-opacity text-white ${colorVariants[accentColor]}`
        },
            "Start Section"
        )
      )
    )
  );
};