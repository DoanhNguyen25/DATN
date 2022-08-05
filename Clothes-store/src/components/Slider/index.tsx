import React, { useState } from 'react'
import { Arrow, Desc, ImgContainer, InfoContainer, Slide, SliderWrapper, Title } from './style'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import img from '../../assets/slider/pexels-cottonbro-4937449.jpg'
import Button from '../common/Button';
import { sliderItems } from '../../data/data';
const Slider = () => {

    const [slideIndex, setSlideIndex] = useState<number>(0)
    const handleClick = (direction: string) => {
        if(direction === 'left') {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1 )
        }else{
            setSlideIndex(slideIndex < (sliderItems.length - 1) ? slideIndex + 1 : 0 )
        }
    }
    return (
        <SliderWrapper sliderIndex = {slideIndex}>
            <Arrow direction="left" onClick={() => handleClick('left')}><ArrowLeftIcon /></Arrow>

            <div className='image__wrapper'>
                {
                    sliderItems.map(sliderItem => (
                        <Slide bg={sliderItem.bg} key={sliderItem.id}>
                            <ImgContainer>
                                <img src={sliderItem.img} alt="hello" />
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{sliderItem.title}</Title>
                                <Desc>{sliderItem.desc}</Desc>
                                <Button style={{}}>show me</Button>
                            </InfoContainer>
                        </Slide>
                    ))
                }



            </div>
            <Arrow direction='right' onClick={() => handleClick('right')}>
                <ArrowRightIcon />
            </Arrow>
        </SliderWrapper>
    )
}

export default Slider