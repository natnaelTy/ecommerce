import React from 'react'
import NavBar from '../components/navBar/NavBar';
import Header from '../components/navBar/Header';
import { Outlet } from 'react-router-dom'

function ClientLayout() {
  return (
    <>
    <Header/>
    <NavBar/>
    <Outlet></Outlet>
    </>
  )
}

export default ClientLayout