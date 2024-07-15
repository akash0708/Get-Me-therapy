// src/Timer.js
import { useState, useEffect } from "react";
import "./Timer.css";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CirclePause,
  CirclePlay,
  LogOut,
  RotateCcw,
  TimerReset,
} from "lucide-react";
import GenerateUrl from "./GenerateUrl";
import Quotes from "./Quotes";

const Timer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(hours * 3600 + minutes * 60 + seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [speed, setSpeed] = useState(1);

  const [username, setUsername] = useState();

  useEffect(() => {
    console.log(location.search);
    if (location.search !== "") {
      localStorage.setItem("pendingTimerParams", location.search);
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo) {
      navigate("/login");
    } else {
      setUsername(userInfo.name);
    }
  }, []);

  useEffect(() => {
    const pendingTimerParams = localStorage.getItem("pendingTimerParams");
    console.log("Pending Timer Params:", pendingTimerParams);
    const queryParams = new URLSearchParams(pendingTimerParams);

    const initialHours = parseInt(queryParams.get("hours")) || 2;
    const initialMinutes = parseInt(queryParams.get("minutes")) || 0;
    const initialSeconds = parseInt(queryParams.get("seconds")) || 0;
    const initialSpeed = parseInt(queryParams.get("speed")) || 1;

    setHours(initialHours);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setSpeed(initialSpeed);
    setTime(initialHours * 3600 + initialMinutes * 60 + initialSeconds);
  }, []);

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
    setHasStarted(true);
  };

  const handlePauseResume = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setHasStarted(false);
    localStorage.removeItem("pendingTimerParams");
    setHours(2);
    setMinutes(0);
    setSeconds(0);
    setSpeed(1);
    setTime(hours * 3600 + minutes * 60 + seconds);
  };

  const handStyle = {
    transform: `rotate(${((3600 - (time % 3600)) / 3600) * 360 - 90}deg)`,
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
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
    <>
      <div className="w-full h-fit sm:border overflow-hidden px-4 py-2 bg-[#FE8C00] flex flex-row items-center justify-between font-inter text-gray-700">
        <div className="font-inter text-xl font-semibold p-1">
          <TimerReset color="black" size={48} />
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="avatar font-semibold text-xl p-1 border-2 border-black">
            {username ? username.charAt(0).toUpperCase() : ""}
          </div>
          <LogOut
            size={32}
            color="black"
            onClick={handleLogout}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="clock-container w-full overflow-hidden h-fit flex flex-col items-center">
        <div className="clock relative mt-10 w-80 h-80 border-[8px] border-black border-solid rounded-[50%] bg-orange-300 p-1">
          <div
            className="hand rounded-t-[50%] rounded-b-[50%]"
            style={handStyle}
          ></div>
          <div className="center-dot absolute w-5 h-5 bg-black top-1/2 left-1/2 rounded-full -translate-y-[50%] -translate-x-[50%]"></div>
          {[0, 1, 2, 3].map((quarter) => (
            <div
              key={quarter}
              className="marking"
              style={{
                transform: `rotate(${quarter * 90}deg) translate(0, -120px)`,
              }}
            ></div>
          ))}
        </div>
        <div className="controls font-inter pt-4 tracking-widest">
          {!hasStarted && (
            <button onClick={handleStart}>
              <CirclePlay strokeWidth={1.5} size={48} />
            </button>
          )}
          {hasStarted && (
            <button onClick={handlePauseResume} disabled={time === 0}>
              {isRunning ? (
                <CirclePause strokeWidth={1.5} size={48} />
              ) : (
                <CirclePlay strokeWidth={1.5} size={48} />
              )}
            </button>
          )}
          <button onClick={handleReset} disabled={time === 0}>
            <RotateCcw strokeWidth={1.5} size={48} />
          </button>
        </div>
        <div className="time-display text-2xl m-3 font-medium">
          {formatTime(time)}
        </div>
        <div className="flex items-center justify-center gap-2 font-inter">
          <label>Speed</label>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="slider"
          />
          <span className="font-medium">{`X${speed}`}</span>
        </div>
        <GenerateUrl time={time} speed={speed} />
      </div>
      <Quotes />
    </>
  );
};

export default Timer;
