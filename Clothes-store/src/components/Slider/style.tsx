import styled from "styled-components";

export const SliderWrapper = styled.div`
  width: 100;
  height: 90vh;
  display: flex;
  position: relative;
  overflow: hidden;
  margin-top: 1rem;

  .demo {
    width: 100%;
    height: 100%;
    background-image: url("https://i.imgur.com/1SAiqAP.jpeg");
    background-position: 1px -3px;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
`;

export const Arrow = styled.div<{ direction: string }>`
  width: 3.125rem;
  height: 3.125rem;
  background-color: #f7f7f7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "0.625rem"};
  right: ${(props) => props.direction === "right" && "0.625rem"};
  margin: auto;
  z-index: 2;
  opacity: 0.7;
`;

export const ImgContainer = styled.div`
  height: 100%;
  flex: 1;

  img {
    height: 90%;
  }
`;

export const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

export const Slide = styled.div<{ bg: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bg};
`;

export const Title = styled.h1`
  font-size: 70px;
`;

export const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
