import React from 'react'
import Title from '../common/Title'
import { NewsletterWrapper } from './style'
import SendIcon from '@mui/icons-material/Send';
import CustomButton from '../common/Button';
const Newsletter = () => {
    return (
        <NewsletterWrapper>
            <Title title='newsletter' />
            <p>Get timely updates from your favorite products</p>
            <div className='input__container'>
                <input type="text" placeholder='enter your email' />
                <CustomButton style={{display:'flex', alignItems:'center', border:'none', background:'teal', color:'white'}}>
                    <SendIcon />
                </CustomButton>

            </div>
        </NewsletterWrapper>
    )
}

export default Newsletter