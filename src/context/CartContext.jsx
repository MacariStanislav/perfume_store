'use client'

import React, { createContext, useContext, useCallback, useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import * as cartApi from '@/lib/api/cart'

const CART_STORAGE_KEY = 'perfume_store_cart'

const defaultState = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  count: 0,
  loading: false,
}

const CartContext = createContext(defaultState)

function loadLocalCart() {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveLocalCart(items) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

function clearLocalCart() {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(CART_STORAGE_KEY)
  } catch {}
}

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const loadServerCart = useCallback(async () => {
    try {
      const data = await cartApi.getCart()
      const list = Array.isArray(data) ? data : data?.items ?? []
      setItems(list.map((it) => ({ ...it, cartId: it.id?.toString() ?? `${it.productId}-${it.volume}-${Date.now()}` })))
    } catch {
      setItems([])
    }
  }, [])

  useEffect(() => {
    if (user) {
      setLoading(true)
      const local = loadLocalCart()
      if (local.length > 0) {
        Promise.all(
          local.map((it) =>
            cartApi.addToCart({
              productId: it.productId,
              name: it.name,
              price: it.price,
              priceNum: it.priceNum,
              image: it.image,
              volume: it.volume ?? 30,
            }).catch(() => {})
          )
        ).then(() => {
          clearLocalCart()
          return loadServerCart()
        }).finally(() => setLoading(false))
      } else {
        loadServerCart().finally(() => setLoading(false))
      }
    } else {
      setItems(loadLocalCart())
    }
  }, [user, loadServerCart])

  useEffect(() => {
    if (!user) saveLocalCart(items)
  }, [user, items])

  const addItem = useCallback(
    async (product) => {
      const { id, name, price, priceNum, image, volume = 30 } = product
      const cartId = `${id}-${volume}-${Date.now()}`

      if (user) {
        try {
          await cartApi.addToCart({
            productId: id,
            name,
            price,
            priceNum,
            image,
            volume,
          })
          await loadServerCart()
        } catch {
          setItems((prev) => [...prev, { cartId, productId: id, name, price, priceNum, image, volume }])
        }
      } else {
        setItems((prev) => [...prev, { cartId, productId: id, name, price, priceNum, image, volume }])
      }
    },
    [user, loadServerCart]
  )

  const removeItem = useCallback(
    async (cartId) => {
      if (user) {
        try {
          await cartApi.removeFromCart(cartId)
          setItems((prev) => prev.filter((item) => item.cartId !== cartId))
        } catch {
          setItems((prev) => prev.filter((item) => item.cartId !== cartId))
        }
      } else {
        setItems((prev) => prev.filter((item) => item.cartId !== cartId))
      }
    },
    [user]
  )


  const value = {
    items,
    addItem,
    removeItem,
    count: items.length,
    loading,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
