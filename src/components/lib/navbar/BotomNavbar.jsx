import React from 'react'
import Input from './input'
import Catalog from './catalog'
import Link from 'next/link'
const BotomNavbar = () => {
  return (
    <div className='botomNavbar'>
      <Link href={'/'}><img src="/logo.svg" alt="" /></Link>
      <div style={{display:"flex"}}>
      <Catalog />
      <Input />
      </div>
      <ul>
        <li>
          <Link href={'/'}><img src="icons/navbar/navbarProfile.svg" alt="" /></Link>
        </li>
        <li>
          <Link href={'/catalog'}><img src="icons/navbar/navbarBasket.svg" alt="" /></Link>
        </li>
      </ul>
    </div>
  )
}

export default BotomNavbar
