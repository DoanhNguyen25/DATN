import React from 'react'
import CustomButton from '../common/Button'
import { CategoryItemWrapper, Info } from './style'

const CategoryItem = ({item}:any) => {
  return (
    <CategoryItemWrapper>
        <img src={item.img} alt="" />
        <Info>
            <h1>{item.title}</h1>
            <CustomButton style={{}}>shop now</CustomButton>
        </Info>
    </CategoryItemWrapper>
  )
}

export default CategoryItem