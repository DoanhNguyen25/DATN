import React from "react";
import { ButtonWrapper } from "./style";

interface Props {
  children: React.ReactNode;
  style: any;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const CustomButton = (props: Props) => {
  return (
    <ButtonWrapper style={props.style} onClick={props.onClick}>
      {props.children}
    </ButtonWrapper>
  );
};

export default CustomButton;
