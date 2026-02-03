'use client'
import React, { useEffect } from 'react'
import TopNavbar from './laptopComponent/TopNavbar'
import BotomNavbar from './laptopComponent/BotomNavbar'
import MobileNavbar from './mobileComponent'
import '@/styles/components/navbar.css'

const Navbar = () => {

  useEffect(() => {
    let windowWidth = (window.innerWidth < '500') ? ".mobileNavbar" : ".navbar"
//эти полупокеры поставили картинку для слайдера разную под адаптив потом поменять надо
    const navbar = document.querySelector('.navbar')
    const content = document.querySelector('.content')

    if (navbar && content) {
      const navbarHeight = navbar.offsetHeight
      content.style.paddingTop = `${navbarHeight}px`
    }
  }, [])

  return (
    <>
      <nav className="navbar">
        <TopNavbar />
        <BotomNavbar />
      </nav>
      <nav className='navbar-mobile'>
        <MobileNavbar />
      </nav>
    </>
  )
}

export default Navbar
