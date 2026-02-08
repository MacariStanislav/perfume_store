'use client'

import { useState, useEffect, useCallback } from 'react'
import { getProducts } from '@/lib/api/products'
import { PRODUCTS as FALLBACK_PRODUCTS } from '@/lib/productsData'

/**
 * Хук загрузки товаров с API. При ошибке или недоступности бэкенда используется статичный список.
 * @returns {{ products: array, loading: boolean, error: string|null, refetch: function }}
 */
export function useProducts() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(Array.isArray(data) ? data : data?.products ?? FALLBACK_PRODUCTS)
    } catch (err) {
      setError(err.message)
      setProducts(FALLBACK_PRODUCTS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { products, loading, error, refetch }
}
