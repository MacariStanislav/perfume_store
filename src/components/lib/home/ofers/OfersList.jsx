'use client'

import React, { useMemo } from 'react'
import { useCart } from '@/context/CartContext'
import { useProducts } from '@/lib/useProducts'

const OFERS_CONFIG = [
  { imgURL: '/ofers/ofersWoman.png', topTxt: 'Для неё', category: 'female' },
  { imgURL: '/ofers/ofersMan.png', topTxt: 'Для него', category: 'male' },
  { imgURL: '/ofers/ofersUnisex.png', topTxt: 'Унисекс', category: 'unisex' },
]

export default function OfersList() {
  const { addItem } = useCart()
  const { products } = useProducts()

  const ofersItems = useMemo(() => {
    return OFERS_CONFIG.map(({ imgURL, topTxt, category }) => {
      const product = products.find((p) => p.category === category) || products[0]
      return {
        imgURL,
        topTxt,
        bottomTxt: product?.name ?? '',
        product: product ? { ...product, volume: 30 } : null,
      }
    })
  }, [products])

  const handleAdd = (product) => {
    if (!product) return
    addItem({ ...product, volume: 30 })
  }

  return (
    <ul className="ofersList">
      {ofersItems.map((item, index) => (
        <li key={index} className={`ofersElement ${index === 0 ? 'ofersElement--large' : ''}`}>
          <img src={item.imgURL} alt="" className="ofersImage" />
          <span className="ofersTopText">{item.topTxt}</span>
          <div className="ofersBottom">
            <p className="ofersBottomText">{item.bottomTxt}</p>
            <button
              type="button"
              className="ofersButton"
              onClick={() => handleAdd(item.product)}
            >
              <span>В корзину</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
