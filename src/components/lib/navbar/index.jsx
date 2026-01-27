'use client'
import React from 'react'
import '@/styles/components/navbar.css'
import TopNavbar from './TopNavbar'
import BotomNavbar from './BotomNavbar'
const Navbar = () => {
    return (
        <nav className='navbar'>
            <TopNavbar />
            <BotomNavbar />

        </nav>
    )
}

export default Navbar
