import React from 'react'
import { ButtonWrapper } from './style'

interface Props{
    children:React.ReactNode;
    style:any
}
const CustomButton = (props:Props) => {
  return (
    <ButtonWrapper style={props.style}>
      {props.children}
    </ButtonWrapper>
  )
}

export default CustomButton
