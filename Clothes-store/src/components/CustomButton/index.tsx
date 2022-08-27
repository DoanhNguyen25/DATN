import React from "react";
interface Props {
  style?: any;
  children?: React.ReactNode;
  w?: string;
  h?: string;
  bg?: string;
  onClick?: any;
  onChange?: Function;
  color?: string;
  disable?: boolean;
  ref?: any;
  className?: string;
}
const CustomButton = (props: Props) => {
  return (
    <button
      style={{
        ...props.style,
        width: `${props.w}`,
        height: `${props.h}`,
        background: `${props.bg}`,
        textTransform: "uppercase",
        color: `${props.color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        border: "none",
      }}
      onClick={props.onClick}
      className={props.className}
      disabled={props.disable}
    >
      {props.children}
    </button>
  );
};
export default CustomButton;
