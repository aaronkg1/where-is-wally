import React, { useEffect, useState } from "react";
import { firebaseApp } from "./firebase.config";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Timer from "./Timer";

const ImageMap = (props) => {
  const storage = getStorage(firebaseApp);
  const [imageSrc, setImageSrc] = useState(null);
  const imagesRef = ref(storage, "Assets/beach-scene.jpg");
  let GameImage = null;
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
    getDownloadURL(imagesRef)
      .then((url) => {
        setImageSrc(url);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        setImageLoaded(true);
      });
  }, []);

  if (imageLoaded) {
    GameImage = (
      <img
        src={imageSrc}
        alt="Beach Wally"
        useMap="#beachmap"
        id="beach"
        className="game-image"
        onLoad={() => {
          startTimer();
        }}
      />
    );
  }

  if (GameImage) {
    return (
      <div className="image-container">
        {GameImage}
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
  } else
    return (
      <div className="leaderboard-container">
        <h1>Get Ready!</h1>
      </div>
    );
};

export default ImageMap;
