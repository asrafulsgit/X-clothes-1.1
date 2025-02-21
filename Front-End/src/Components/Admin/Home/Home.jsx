import React from 'react'
import AddProduct from '../Add-product/AddProduct'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default Home
