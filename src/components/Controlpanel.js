// src/components/ControlPanel.js
import React from 'react';
import './ControlPanel.css';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";


const ControlPanel = ({ isPaused, togglePause }) => {
  return (
    <div className="control-panel">
      <button className="pause-button" onClick={togglePause}>
        {isPaused ? <FaPlay /> : <FaPause />}
      </button>
    </div>
  );
};

export default ControlPanel;
