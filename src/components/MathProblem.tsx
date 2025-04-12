import React, { useState } from 'react';
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

  const handleSubmit = () => {
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
          label="Your answer"
          variant="outlined"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          fullWidth
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