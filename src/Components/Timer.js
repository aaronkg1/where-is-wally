import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const [time, setTime] = useState(null);
  const [initialTime, setInitialTime] = useState(new Date());
  const { gameStarted, setGlobalTimer } = props;

  useEffect(() => {
    if (gameStarted) {
      setTime(0);
    }
  }, [gameStarted]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 0.1);
    }, 100);
    return () => {
      clearInterval(interval);
      setGlobalTimer(time);
    };
  }, [time]);

  if (time === null) {
    return <div className="timer"></div>;
  } else return <div className="timer">{time.toFixed(1)}</div>;
};

export default Timer;
