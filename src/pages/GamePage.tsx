import React, { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import MathProblem from '../components/MathProblem';

const generateProblem = (): string => {
  const operations = ['+', '-', '*'];
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operation = operations[Math.floor(Math.random() * operations.length)];
  return `${num1} ${operation} ${num2}`;
};

const GamePage: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState(generateProblem());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleCorrect = () => {
    setScore(score + 10);
    setStreak(streak + 1);
    setProgress(progress + 10);
    setCurrentProblem(generateProblem());
  };

  const handleIncorrect = () => {
    setStreak(0);
    setProgress(Math.max(0, progress - 5));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Score: {score}</Typography>
        <Typography variant="h6">Streak: {streak} 🔥</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 10, borderRadius: 5, mb: 4 }}
      />
      <MathProblem
        problem={currentProblem}
        onCorrect={handleCorrect}
        onIncorrect={handleIncorrect}
      />
    </Box>
  );
};

export default GamePage; 