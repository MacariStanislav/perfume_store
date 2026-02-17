'use client'

import React from 'react'
import SaidbarMenu from './saidbarMenu'
import InputMobile from '../inputMobile/InputMobile'
import CartLink from '../CartLink'
import Link from 'next/link'

export default function MobileNavbar() {
  return (
    <div className="mobileNavbar">
      <SaidbarMenu />
      <InputMobile />
      <Link href="/"><img src="/logo.svg" alt="" /></Link>
      <ul>
        <li>
          <Link href="/account" aria-label="Аккаунт"><img src="/icons/navbar/navbarProfile.svg" alt="" width={40} height={40} /></Link>
        </li>
        <li className="navbar-cart-wrap">
          <CartLink iconSize={40} />
        </li>
      </ul>
    </div>
  )
}

