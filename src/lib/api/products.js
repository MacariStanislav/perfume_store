'use client'

import { api } from '../api'

/**
 * Ожидаемая структура товара с бэкенда:
 * { id, name, price, priceNum, image, category: 'female'|'male'|'unisex', brand, featured?: boolean }
 */
export async function getProducts() {
  const { data } = await api.get('/api/products')
  return data
}

/** Объёмы можно отдавать с бэка или оставить константой */
export async function getVolumes() {
  try {
    const { data } = await api.get('/api/volumes')
    return data
  } catch {
    return [10, 30, 50, 100]
  }
}
