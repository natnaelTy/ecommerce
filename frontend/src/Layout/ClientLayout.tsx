import React from 'react'
import NavBar from '../components/navBar/NavBar'
import { Outlet } from 'react-router-dom'

function ClientLayout() {
  return (
    <>
    <NavBar></NavBar>
    <Outlet></Outlet>
    </>
  )
}

export default ClientLayout