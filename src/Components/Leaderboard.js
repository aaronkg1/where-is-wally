import React, { useState, useEffect } from "react";
import { firebaseApp, db } from "./firebase.config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "leaderboard"));
      const data = [];
      querySnapshot.forEach((snap) => {
        data.push(snap.data());
      });
      data.sort((a, b) => {
        return a.score - b.score;
      });
      setLeaderboard(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);
  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <ul className="leaderboard">
        {leaderboard.map((user) => {
          return (
            <li key={user.id} className="leaderboard-item">
              {user.name} - {user.score} seconds
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Leaderboard;
