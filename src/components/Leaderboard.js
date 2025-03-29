import React from 'react';
import { mockLeaderboard } from '../data/quizData';
import './Leaderboard.css';

const Leaderboard = ({ currentScore }) => {
  const allScores = [...mockLeaderboard];

  if (currentScore) {
    allScores.push({ name: 'You', score: currentScore, time: 0 });
  }

  const sortedScores = allScores.sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>Name</span>
          <span>Score</span>
        </div>
        {sortedScores.map((entry, index) => (
          <div
            key={index}
            className={`leaderboard-row ${
              entry.name === 'You' ? 'current-player' : ''
            }`}
          >
            <span>{index + 1}</span>
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
