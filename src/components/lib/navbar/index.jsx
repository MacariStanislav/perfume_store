'use client'
import React, { useEffect } from 'react'
import TopNavbar from './TopNavbar'
import BotomNavbar from './BotomNavbar'
import '@/styles/components/navbar.css'

const Navbar = () => {

  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    const content = document.querySelector('.content')

    if (navbar && content) {
      const navbarHeight = navbar.offsetHeight
      content.style.paddingTop = `${navbarHeight}px`
    }
  }, []) 

  return (
    <nav className="navbar">
      <TopNavbar />
      <BotomNavbar />
    </nav>
  )
}

export default Navbar
