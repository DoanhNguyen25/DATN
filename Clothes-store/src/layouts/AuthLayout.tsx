import React from 'react'
import { Outlet } from 'react-router-dom'
import MainLayout from './MainLayout'

const AuthLayout = () => {
  return (
    <>
        <Outlet/>
    </>
  )
}

export default AuthLayout