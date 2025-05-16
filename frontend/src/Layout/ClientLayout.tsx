import React from 'react'
import NavBar from '../components/navBar/NavBar';
import Header from '../components/navBar/Header';
import { Outlet } from 'react-router-dom'
import Category from "../components/homepage/Category";
import NewArrival from "../components/homepage/NewArrival";
import Recomended from "../components/homepage/Recomended";
import Footer from "../components/homepage/Footer";


function ClientLayout() {
  return (
    <>
    <Header/>
    <NavBar/>
    <Outlet/>
    <Category/>
    <NewArrival/>
    <Recomended/>
    <Footer/>
    </>
  )
}

export default ClientLayout