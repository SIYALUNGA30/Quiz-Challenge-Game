import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/Button';
import { SunIcon, MoonIcon } from './icons';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className={`p-2 w-10 h-10 rounded-full ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </Button>
  );
};
