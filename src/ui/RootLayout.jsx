import React from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white ">
    <Header />
    <main className="flex-grow">
    <Outlet />
    </main>
    <Footer />

  </div>
  )
}

export default RootLayout
