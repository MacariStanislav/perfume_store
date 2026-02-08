'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import '@/styles/components/catalog-section.css'

export default function CartPage() {
  const { items, removeItem, count } = useCart()

  if (count === 0) {
    return (
      <div className="catalog-section" style={{ paddingTop: 48 }}>
        <h1 className="catalog-section__title">Корзина</h1>
        <p style={{ color: '#BEAE97', marginBottom: 24 }}>В корзине пока ничего нет.</p>
        <Link
          href="/catalog"
          style={{
            background: 'linear-gradient(118deg, rgba(192, 158, 108, 1), rgba(255, 235, 204, 1), rgba(191, 147, 107, 1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
          }}
        >
          Перейти в каталог →
        </Link>
      </div>
    )
  }

  return (
    <div className="catalog-section" style={{ paddingTop: 48 }}>
      <h1 className="catalog-section__title">Корзина</h1>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
        {items.map((item) => (
          <li
            key={item.cartId}
            className="catalog-card"
            style={{ maxWidth: '100%', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <img
              src={item.image}
              alt=""
              className="catalog-card__image"
              style={{ width: 120, height: 120, flexShrink: 0 }}
            />
            <div style={{ flex: 1, minWidth: 200 }}>
              <p className="catalog-card__name" style={{ marginBottom: 8 }}>{item.name}</p>
              <p className="catalog-card__price-label">
                Объём: {item.volume} мл · Стоимость: <span className="catalog-card__price-value">{item.price} ₽</span>
              </p>
            </div>
            <button
              type="button"
              className="catalog-card__cart-btn"
              onClick={() => removeItem(item.cartId)}
              style={{ background: 'rgba(224, 91, 73, 0.2)', borderColor: '#E05B49' }}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
      <p style={{ marginTop: 24, color: '#BEAE97' }}>
        Товаров в корзине: <strong>{count}</strong>
      </p>
      <p style={{ marginTop: 16 }}>
        <Link
          href="/catalog"
          style={{
            background: 'linear-gradient(118deg, rgba(192, 158, 108, 1), rgba(255, 235, 204, 1), rgba(191, 147, 107, 1))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
          }}
        >
          Продолжить покупки →
        </Link>
      </p>
    </div>
  )
}
