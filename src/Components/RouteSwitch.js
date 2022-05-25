import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useMemo, useEffect } from "react";
import Nav from "./Nav";
import App from "../App";
import GamePage from "./GamePage";
import Leaderboard from "./Leaderboard";

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
