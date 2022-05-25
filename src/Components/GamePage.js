import React, { useContext, useState, useEffect } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import { DropDownList } from "./DropDownList";
import { firebaseApp, db } from "./firebase.config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import "../styles/game-page.css";
import "react-notifications-component/dist/theme.css";
import Timer from "./Timer";
import ImageMap from "./ImageMap";
import { Link, useNavigate } from "react-router-dom";
import uniqid from "uniqid";
import Filter from "bad-words";

const GamePage = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [clicks, setClicks] = useState([]);
  const [clickedMap, setClickedMap] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState([0, 0]);
  const [pageCoordinates, setPageCoordinates] = useState([0, 0]);
  const [globalTimer, setGlobalTimer] = useState(0);
  const [userName, setUserName] = useState("");
  const [gameLoaded, setGameLoaded] = useState("false");
  const [characters, setCharacters] = useState([
    {
      name: "wally",
      xCoordOne: 1825,
      xCoordTwo: 1897,
      yCoordOne: 696,
      yCoordTwo: 807,
      found: false,
      imageSrc: "../Assets/wally.png",
    },
    {
      name: "wizard",
      xCoordOne: 793,
      xCoordTwo: 845,
      yCoordOne: 648,
      yCoordTwo: 743,
      found: false,
      imageSrc: "../Assets/wizard.png",
    },
    {
      name: "odlaw",
      xCoordOne: 298,
      xCoordTwo: 352,
      yCoordOne: 661,
      yCoordTwo: 755,
      found: false,
      imageSrc: "../Assets/odlaw.png",
    },
    {
      name: "wilma",
      xCoordOne: 2293,
      xCoordTwo: 2339,
      yCoordOne: 766,
      yCoordTwo: 849,
      found: false,
      imageSrc: "../Assets/wilma.png",
    },
  ]);

  const startGame = () => {
    setGameStarted(true);
  };
  const startTimer = () => {
    setGameLoaded(true);
  };

  const getOffset = () => {
    const imageOffsetX = document.querySelector("#beach").offsetLeft;
    const imageOffsetY = document.querySelector("#beach").offsetTop;
    return [imageOffsetX, imageOffsetY];
  };

  const getImageCoordinates = (e) => {
    const xCoord = e.pageX - e.target.offsetLeft;
    const yCoord = e.pageY - e.target.offsetTop;
    return [xCoord, yCoord];
  };

  const getAbsoluteCoordinates = (e) => {
    const xCoord = e.pageX;
    const yCoord = e.pageY;
    return [xCoord, yCoord];
  };

  const selectCharacter = (character) => {
    const [xMapCoord, yMapCoord] = mapCoordinates;
    const [xPageCoord, yPageCoord] = pageCoordinates;

    let characterListCopy = [...characters];
    if (
      xMapCoord >= character.xCoordOne &&
      xMapCoord <= character.xCoordTwo &&
      yMapCoord >= character.yCoordOne &&
      yMapCoord <= character.yCoordTwo
    ) {
      characterListCopy = characterListCopy.filter((item) => {
        return item.name !== character.name;
      });
      const characterCopy = {
        ...character,
        found: true,
      };
      setCharacters([...characterListCopy, characterCopy]);
      setClickedMap(false);
      setClicks([
        ...clicks,
        {
          left: `${character.xCoordOne + getOffset()[0]}px`,
          top: `${character.yCoordOne + getOffset()[1]}px`,
        },
      ]);
    } else {
      setClickedMap(false);
      Store.addNotification({
        title: "Incorrect",
        message: "Please Try Again",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 100,
          onScreen: true,
        },
      });
    }
  };

  useEffect(() => {
    if (haveAllCharactersBeenFound(characters)) {
      setGameOver(true);
    } else {
      return;
    }
  }, [characters]);

  const haveAllCharactersBeenFound = (characterList) => {
    const characterListCopy = characterList.filter((character) => {
      return character.found === false;
    });
    if (characterListCopy.length === 0) {
      return true;
    } else return false;
  };

  const SendToFireStore = async (e) => {
    let success = false;
    const filter = new Filter();
    if (filter.isProfane(e.target.value)) {
      Store.addNotification({
        title: "Bad Word",
        message: "No bad words allowed",
        type: "danger",
        insert: "top",
        container: "bottom-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 500,
          onScreen: true,
        },
      });
    } else if (e.target.value.length > 0) {
      try {
        await addDoc(collection(db, "leaderboard"), {
          name: e.target.value,
          score: globalTimer.toFixed(2),
          id: uniqid(),
        });
        success = true;
      } catch (e) {
        success = false;
        console.error("Error adding document: ", e);
      } finally {
        if (success) {
          navigate("/leaderboard", { replace: true });
        }
      }
    }
  };

  let dropDownList;
  if (clickedMap) {
    dropDownList = (
      <DropDownList
        pageCoordinates={pageCoordinates}
        mapCoordinates={mapCoordinates}
        characters={characters}
        selectCharacter={selectCharacter}
      />
    );
  } else {
    dropDownList = null;
  }
  if (gameOver) {
    return (
      <div className="submit-to-leaderboard">
        <ReactNotifications />
        <p className="winner-message">
          You found all character's in {globalTimer.toFixed(2)} seconds!
        </p>
        <input
          placeholder="Enter Name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        ></input>
        <button
          value={userName}
          onClick={(e) => {
            SendToFireStore(e);
          }}
        >
          Post To Leaderboard
        </button>
      </div>
    );
  }
  if (gameStarted) {
    return (
      <div>
        <ReactNotifications />
        <Timer setGlobalTimer={setGlobalTimer} gameLoaded={gameLoaded} />
        <ImageMap
          clicks={clicks}
          setMapCoordinates={setMapCoordinates}
          setPageCoordinates={setPageCoordinates}
          setClickedMap={setClickedMap}
          clickedMap={clickedMap}
          getImageCoordinates={getImageCoordinates}
          getAbsoluteCoordinates={getAbsoluteCoordinates}
          startTimer={startTimer}
        />
        {dropDownList}
      </div>
    );
  } else {
    return (
      <div className="game-container">
        <ul className="character-display">
          {characters.map((character) => {
            return (
              <li key={character.name}>
                <img
                  className="character-image"
                  src={require(`../Assets/${character.name}.png`)}
                  alt={character.name}
                ></img>
              </li>
            );
          })}
        </ul>

        <button onClick={startGame}>Start Game</button>
      </div>
    );
  }
};

export default GamePage;
