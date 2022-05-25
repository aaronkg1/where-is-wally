import React, { useContext, useEffect } from "react";
import "../styles/Nav.css";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-bar">
      <h3 className="nav-logo">
        <span className="nav-logo-left">Where's</span> Wally
      </h3>
      <ul className="nav-links">
        <Link to="/game" className="link">
          <li>Game</li>
        </Link>
        <Link to="/leaderboard" className="link">
          <li>Leaderboard</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
