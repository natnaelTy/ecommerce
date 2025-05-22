
import { Outlet } from 'react-router-dom'
import Category from "../components/homepage/Category";
import NewArrival from "../components/homepage/NewArrival";
import Recomended from "../components/homepage/Recomended";
import Discount from '../components/homepage/Discount';

function ClientLayout() {
  return (
    <>
    <Outlet/>
    <Category/>
    <NewArrival/>
    <Discount/>
    <Recomended/>
    </>
  )
}

export default ClientLayout