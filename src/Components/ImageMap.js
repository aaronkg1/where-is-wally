import React, { useEffect, useState } from "react";

const ImageMap = (props) => {
  const {
    clicks,
    setMapCoordinates,
    setPageCoordinates,
    setClickedMap,
    clickedMap,
    getImageCoordinates,
    getAbsoluteCoordinates,
    startTimer,
  } = props;

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = "../Assets/beach-scene.jpg";
  }, []);

  useEffect(() => {
    startTimer();
  }, [imageLoaded]);

  return (
    <div className="image-container">
      <img
        src={require("../Assets/beach-scene.jpg")}
        alt="Beach Wally"
        useMap="#beachmap"
        id="beach"
        className="game-image"
      />
      <map name="beachmap">
        <area
          shape="default"
          alt=""
          onClick={(e) => {
            setClickedMap(!clickedMap);
            setMapCoordinates(getImageCoordinates(e));
            setPageCoordinates(getAbsoluteCoordinates(e));
          }}
        ></area>
        {clicks.map((click) => {
          return (
            <div
              key={click.left}
              alt=""
              style={{
                left: click.left,
                top: click.top,
                position: "absolute",
              }}
              className="successful-click"
            ></div>
          );
        })}
      </map>
    </div>
  );
};

export default ImageMap;
