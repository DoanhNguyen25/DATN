import React, { useState } from "react";
import { SliderWrapper } from "./style";
// import AwesomeSlider from "react-awesome-slider";
// import withAutoplay from "react-awesome-slider/dist/autoplay";
// import "react-awesome-slider/dist/styles.css";
import zIndex from "@mui/material/styles/zIndex";

const Slider = () => {
  // const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <SliderWrapper>
      {/* <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={3000}
        animation="cubeAnimation"
        fillParent={true}
      > */}
        <div className="demo">
          <div
            style={{
              fontSize: "2rem",
              color: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            hello ae
          </div>
        </div>
        <div data-src={"https://i.imgur.com/iDgOvpX.jpeg"} />
        <div data-src={"https://i.imgur.com/aPFpQIM.jpeg"} />
      {/* </AutoplaySlider> */}
    </SliderWrapper>
  );
};

export default Slider;
