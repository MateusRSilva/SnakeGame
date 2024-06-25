// src/SnakeGame.js
import React, { useState, useEffect } from 'react';
import GameBoard from './components/Gameboard';
import ScoreBoard from './components/Scoreboard';
import ControlPanel from './components/Controlpanel';
import './App.css'

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isStarted, setIsStarted] = useState(false); // New state for start screen

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isStarted || isPaused) return;
      switch (e.key) {
        case 'ArrowUp':
          setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, isPaused]);

  useEffect(() => {
    if (isGameOver || isPaused || !isStarted) return;

    const interval = setInterval(() => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        if (
          head.x < 0 || head.x >= 20 ||
          head.y < 0 || head.y >= 20 ||
          newSnake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
          setScore(score + 1);
          if ((score + 1) % 5 === 0) {
            setLevel(level + 1);
          }
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200 - level * 10);

    return () => clearInterval(interval);
  }, [direction, food, isGameOver, score, level, isStarted, isPaused]);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setFood({ x: 15, y: 15 });
    setIsGameOver(false);
    setScore(0);
    setLevel(1);
    setIsPaused(false);
    setIsStarted(false); // Reset to start screen
  };

  const startGame = () => {
    setIsStarted(true);
  };

  return (
    <div>
      <h1>Snake Game</h1>
      {isStarted ? (
        <div className='maincontainer'>
          <div>
            <ScoreBoard score={score} level={level} />          
          </div>
          <div>
            {isGameOver ? (
              <div>
                <h2>Game Over</h2>
                <button className="pause-button" onClick={resetGame}>Retry</button>
              </div>
            ) : (
              <div className='maincontainer'>
              <GameBoard snake={snake} food={food} />
              <ControlPanel isPaused={isPaused} togglePause={togglePause} />
              </div>
            )}
          </div>
          
        </div>
      ) : (
        <div className="start-screen">
          <h2>Welcome to Snake Game</h2>
          <div className="instructions">
            <p>Use the arrow keys to move the snake:</p>
            <ul>
              <li>Arrow Up: Move Up</li>
              <li>Arrow Down: Move Down</li>
              <li>Arrow Left: Move Left</li>
              <li>Arrow Right: Move Right</li>
            </ul>
          </div>
          <button className="pause-button" onClick={startGame}>Start</button>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
