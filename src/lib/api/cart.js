'use client'

import { api } from '../api'

/**
 * Корзина пользователя (при авторизации).
 * Элемент корзины: { id, productId, name, price, priceNum, image, volume }
 */

export async function getCart() {
  const { data } = await api.get('/api/cart')
  return Array.isArray(data) ? data : data?.items ?? []
}

export async function addToCart({ productId, name, price, priceNum, image, volume }) {
  const { data } = await api.post('/api/cart', {
    productId,
    name,
    price,
    priceNum,
    image,
    volume,
  })
  return data
}

export async function removeFromCart(itemId) {
  await api.delete(`/api/cart/${itemId}`)
}
