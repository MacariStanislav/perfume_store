'use client'

import React from 'react'
import Input from '../input'
import Catalog from '../catalog'
import CartLink from '../CartLink'
import Link from 'next/link'

export default function BotomNavbar() {
  return (
    <div className="botomNavbar">
      <Link href="/"><img src="/logo.svg" alt="" /></Link>
      <div style={{ display: 'flex' }}>
        <Catalog />
        <Input />
      </div>
      <ul>
        <li>
          <Link href="/account" aria-label="Аккаунт"><img src="/icons/navbar/navbarProfile.svg" alt="" /></Link>
        </li>
        <li className="navbar-cart-wrap">
          <CartLink />
        </li>
      </ul>
    </div>
  )
}

