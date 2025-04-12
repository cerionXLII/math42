import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { create, all } from 'mathjs';

const math = create(all);

interface MathProblemProps {
  problem: string;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const MathProblem: React.FC<MathProblemProps> = ({ problem, onCorrect, onIncorrect }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [highlightInput, setHighlightInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear answer and focus input when problem changes
  useEffect(() => {
    setAnswer('');
    setFeedback('');
    setHighlightInput(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [problem]);

  // Auto-hide the highlight after 1.5 seconds
  useEffect(() => {
    if (highlightInput) {
      const timer = setTimeout(() => {
        setHighlightInput(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [highlightInput]);

  const handleSubmit = () => {
    if (!answer.trim()) {
      setHighlightInput(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return;
    }

    try {
      const correctAnswer = math.evaluate(problem);
      const userAnswer = math.evaluate(answer);
      
      if (math.equal(correctAnswer, userAnswer)) {
        setFeedback('Correct! 🎉');
        onCorrect();
      } else {
        setFeedback('Try again! 💪');
        onIncorrect();
      }
    } catch (error) {
      setFeedback('Please enter a valid expression');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    if (highlightInput && e.target.value.trim()) {
      setHighlightInput(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Solve the following:
      </Typography>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', my: 2 }}>
        {problem}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          inputRef={inputRef}
          label="Your answer"
          variant="outlined"
          value={answer}
          onChange={handleAnswerChange}
          onKeyPress={handleKeyPress}
          fullWidth
          autoFocus
          sx={{
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.3s ease-in-out',
              ...(highlightInput && {
                '& fieldset': {
                  borderColor: 'primary.main',
                  borderWidth: 2,
                  boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
                },
              }),
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
        {feedback && (
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: feedback.includes('Correct') ? 'success.main' : 'error.main',
            }}
          >
            {feedback}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default MathProblem; 