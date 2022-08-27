import React, { useState, useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CustomButton from "../CustomButton";
import { Wrapper } from "./style";

const ButtonScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // toggle Scroll To Top
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else if (scrolled <= 300) {
      setIsVisible(false);
    }
  };

  // transition effect
  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <Wrapper visible={isVisible}>
      <CustomButton
        color="#fff"
        w="3.5rem"
        h="3.5rem"
        bg="#008080bf"
        onClick={ScrollToTop}
        className="btn--scroll"
      >
        <KeyboardArrowUpIcon />
      </CustomButton>
    </Wrapper>
  );
};

export default ButtonScrollToTop;
