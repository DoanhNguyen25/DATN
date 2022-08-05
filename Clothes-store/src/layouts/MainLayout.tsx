import React from 'react'
import Annoucement from '../components/Annoucement'
import Footer from '../components/Footer'
import Header from '../components/Header'

interface Props{
    children:React.ReactNode
}
const MainLayout = (props:Props) => {
  return (
    <>
        <Annoucement/>      
        <Header/>
        {props.children}
        <Footer/>
    </>
  )
}

export default MainLayout