import React, { useState } from "react";
import { SliderWrapper } from "./style";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import zIndex from "@mui/material/styles/zIndex";
import img1 from "../../assets/slider/slider1.jpg";
import img2 from "../../assets/slider/slider3.jpg";
import img3 from "../../assets/slider/slider2.jpg";


const Slider = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (
    <SliderWrapper>
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={3000}
        animation="cubeAnimation"
        fillParent={true}
      >
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
        <div data-src={img1} />
        {/* <div data-src={img2} /> */}
        <div data-src={img3} />
      </AutoplaySlider>
    </SliderWrapper>
  );
};

export default Slider;
