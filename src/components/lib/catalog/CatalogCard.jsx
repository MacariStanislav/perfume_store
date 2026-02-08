'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { VOLUMES } from '@/lib/productsData'
import '@/styles/components/catalog-section.css'

export default function CatalogCard({ product, featured = false }) {
  const [activeVolume, setActiveVolume] = useState(30)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceNum: product.priceNum,
      image: product.image,
      volume: activeVolume,
    })
  }

  return (
    <article className={`catalog-card ${featured ? 'catalog-card--featured' : ''}`}>
      <img src={product.image} alt="" className="catalog-card__image" />
      <h3 className="catalog-card__name">{product.name}</h3>
      <div className="catalog-card__volume-row">
        <span className="catalog-card__volume-label">Объем мл.</span>
        <div className="catalog-card__volume-buttons">
          {VOLUMES.map((vol) => (
            <button
              key={vol}
              type="button"
              className={`catalog-card__volume-btn ${activeVolume === vol ? 'catalog-card__volume-btn--active' : ''}`}
              onClick={() => setActiveVolume(vol)}
            >
              {vol}
            </button>
          ))}
        </div>
      </div>
      <div className="catalog-card__price-row">
        <span className="catalog-card__price-label">Стоимость:</span>
        <span className="catalog-card__price-value">{product.price} ₽</span>
      </div>
      <button type="button" className="catalog-card__cart-btn" onClick={handleAddToCart}>
        В корзину
      </button>
    </article>
  )
}
