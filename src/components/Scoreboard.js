// src/components/ScoreBoard.js
import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ score, level }) => {
  return (
    <div className="score-board">
      <div>Score: {score}</div>
      <div>Level: {level}</div>
    </div>
  );
};

export default ScoreBoard;
