import React from 'react';
import { useTheme } from '../contexts/ThemeContext.js';
import { Button } from './ui/Button.js';
import { SunIcon, MoonIcon } from './icons.js';

export const ThemeToggle = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    React.createElement(Button, {
      onClick: toggleTheme,
      variant: "outline",
      size: "sm",
      className: `p-2 w-10 h-10 rounded-full ${className}`,
      "aria-label": "Toggle theme"
    },
      theme === 'dark' ? 
        React.createElement(SunIcon, { className: "h-5 w-5" }) : 
        React.createElement(MoonIcon, { className: "h-5 w-5" })
    )
  );
};