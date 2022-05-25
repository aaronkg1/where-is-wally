import React, { useEffect, useState } from "react";

const Timer = (props) => {
  const [time, setTime] = useState(null);
  const { gameLoaded, setGlobalTimer } = props;

  useEffect(() => {
    if (gameLoaded) {
      setTime(0);
    }
  }, [gameLoaded]);

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
    return <div className="timer">null</div>;
  } else return <div className="timer">{time.toFixed(1)}</div>;
};

export default Timer;
