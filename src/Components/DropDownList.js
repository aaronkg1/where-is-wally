import React from "react";
import dropDownStyle from "../styles/DropDownList.css";
import _ from "lodash";

export const DropDownList = (props) => {
  const { characters } = props;
  const [xPageCoord, yPageCoord] = props.pageCoordinates;
  const [xMapCoord, yMapCoord] = props.mapCoordinates;

  const style = {
    left: xPageCoord + `px`,
    top: yPageCoord + `px`,
    position: "absolute",
  };

  return (
    <ul
      className="character-dropdown"
      style={{ ...dropDownStyle.positionDiv, ...style }}
    >
      {characters.map((character) => {
        const { imageSrc } = character;
        return (
          <li
            key={character.name}
            className="character-dropdown-child"
            onClick={() => {
              props.selectCharacter(character);
            }}
          >
            <div>{_.capitalize(character.name)}</div>
            <img
              className="list-image"
              src={require(`../Assets/${character.name}.png`)}
              alt={character.name}
            />
          </li>
        );
      })}
    </ul>
  );
};
