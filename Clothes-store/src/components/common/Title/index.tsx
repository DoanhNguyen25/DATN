import React from 'react'
import { TitleWrapper } from './style'


interface Props {
    title:string
}
const Title = (props:Props) => {
  return (
    <TitleWrapper>
        {props.title}
    </TitleWrapper>
  )
}

export default Title