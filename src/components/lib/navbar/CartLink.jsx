'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartLink({ className = '', iconSize }) {
  const { count } = useCart()

  return (
    <Link href="/cart" className={className} aria-label={`Корзина${count ? `: ${count} товаров` : ''}`}>
      <img
        src="/icons/navbar/navbarBasket.svg"
        alt=""
        width={iconSize ?? 24}
        height={iconSize ?? 24}
      />
      {count > 0 && (
        <span className="navbar-cart-badge">{count > 99 ? '99+' : count}</span>
      )}
    </Link>
  )
}
