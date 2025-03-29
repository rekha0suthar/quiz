import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('start');
  const [finalScore, setFinalScore] = useState(null);

  const handleQuizComplete = (score) => {
    setFinalScore(score);
    setGameState('completed');
  };

  const startNewGame = () => {
    setGameState('playing');
    setFinalScore(null);
  };

  return (
    <div className="app">
      <h1>Quiz Master</h1>

      {gameState === 'start' && (
        <div className="start-screen">
          <h2>Welcome to Quiz Master!</h2>
          <p>Test your knowledge and compete for the highest score!</p>
          <button onClick={startNewGame}>Start Quiz</button>
        </div>
      )}

      {gameState === 'playing' && <Quiz onComplete={handleQuizComplete} />}

      {gameState === 'completed' && (
        <div className="completion-screen">
          <h2>Quiz Completed!</h2>
          <p>Your Final Score: {finalScore}</p>
          <button onClick={startNewGame}>Play Again</button>
          <Leaderboard currentScore={finalScore} />
        </div>
      )}
    </div>
  );
}

export default App;
