import React from 'react';
import { Card } from './ui/Card.js';
import { Button } from './ui/Button.js';
import { Trophy } from './icons.js';

export const GameRules = ({ onConfirm }) => {
  return (
    React.createElement("div", { className: "flex items-center justify-center min-h-[80vh]" },
      React.createElement(Card, { className: "p-8 sm:p-12 max-w-2xl text-center space-y-8 animate-scale-in" },
        React.createElement(Trophy, { className: "h-20 w-20 mx-auto text-primary" }),
        React.createElement("div", { className: "space-y-4" },
          React.createElement("h1", { className: "text-4xl sm:text-5xl font-bold" }, "Before You Start..."),
          React.createElement("p", { className: "text-lg text-muted-foreground dark:text-dark-muted-foreground" },
            "Please read the rules of the challenge."
          )
        ),
        React.createElement("div", { className: "text-left space-y-4 bg-muted dark:bg-dark-muted p-6 rounded-lg" },
          React.createElement("p", null, "The challenge consists of ", React.createElement("strong", { className: "text-primary" }, "3 sections"), ": Flags, Riddles, and Emojis."),
          React.createElement("div", null,
            React.createElement("p", null, "You have a total of ", React.createElement("strong", { className: "text-primary" }, "7 minutes"), ", broken down as follows:"),
            React.createElement("ul", { className: "list-disc list-inside pl-4 mt-2 space-y-1" },
              React.createElement("li", null, "Section 1 (Flags): ", React.createElement("strong", { className: "text-primary" }, "2 minutes")),
              React.createElement("li", null, "Section 2 (Riddles): ", React.createElement("strong", { className: "text-primary" }, "3 minutes")),
              React.createElement("li", null, "Section 3 (Emojis): ", React.createElement("strong", { className: "text-primary" }, "2 minutes"))
            )
          ),
          React.createElement("p", null, "The game must be completed in ", React.createElement("strong", { className: "text-primary" }, "one sitting"), ". Progress will not be saved if you leave."),
          React.createElement("p", null, "You ", React.createElement("strong", { className: "text-primary" }, "cannot skip"), " any questions.")
        ),
        React.createElement("div", { className: "space-y-4" },
            React.createElement("p", { className: "text-sm text-muted-foreground dark:text-dark-muted-foreground" },
                "Are you ready to test your knowledge?"
            ),
            React.createElement(Button, {
                onClick: onConfirm,
                size: "lg",
                className: "text-lg px-12 py-6 h-auto bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 transition-opacity text-white"
            },
                "I Understand, Start the Game!"
            )
        )
      )
    )
  );
};
