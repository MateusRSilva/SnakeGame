// src/components/GameBoard.js
import React from 'react';
import './GameBoard.css';

const GameBoard = ({ snake, food }) => {
  const boardSize = 20;
  const board = [];

  for (let y = 0; y < boardSize; y++) {
    const row = [];
    for (let x = 0; x < boardSize; x++) {
      let className = 'cell';
      if (snake.some(segment => segment.x === x && segment.y === y)) {
        className = 'cell snake';
      } else if (food.x === x && food.y === y) {
        className = 'cell food';
      }
      row.push(<div key={`${x}-${y}`} className={className} />);
    }
    board.push(<div key={y} className="row">{row}</div>);
  }

  return (
    <div className="game-board">
      {board}
    </div>
  );
};

export default GameBoard;
