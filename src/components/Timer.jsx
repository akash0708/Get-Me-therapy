// src/Timer.js
import { useState, useEffect } from "react";
import "./Timer.css";

const Timer = () => {
  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(hours * 3600 + minutes * 60 + seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000 / speed);
    } else if (time === 0) {
      setIsRunning(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time, speed]);

  const handleStart = () => {
    setTime(hours * 3600 + minutes * 60 + seconds);
    setIsRunning(true);
  };

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(hours * 3600 + minutes * 60 + seconds);
  };

  const handleInputChange = (setter) => (e) => {
    setter(parseInt(e.target.value) || 0);
  };

  const handStyle = {
    transform: `rotate(${((3600 - (time % 3600)) / 3600) * 360 - 90}deg)`,
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="clock-container">
      <div className="clock">
        <div className="hand" style={handStyle}></div>
      </div>
      <div className="controls">
        <input
          type="number"
          value={hours}
          onChange={handleInputChange(setHours)}
          placeholder="Hours"
          min="0"
        />
        <input
          type="number"
          value={minutes}
          onChange={handleInputChange(setMinutes)}
          placeholder="Minutes"
          min="0"
          max="59"
        />
        <input
          type="number"
          value={seconds}
          onChange={handleInputChange(setSeconds)}
          placeholder="Seconds"
          min="0"
          max="59"
        />
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handlePauseResume} disabled={time === 0}>
          {isRunning ? "Pause" : "Resume"}
        </button>
        <button onClick={handleReset} disabled={time === 0}>
          Reset
        </button>
      </div>
      <div className="time-display">{formatTime(time)}</div>
      <div>
        <label>Speed</label>
        <input
          type="range"
          min="1"
          max="10"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <span>{speed}</span>
      </div>
    </div>
  );
};

export default Timer;
