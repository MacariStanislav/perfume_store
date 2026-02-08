'use client'

import { api } from '../api'

/**
 * Регистрация. Ожидаемый ответ: { user, token } или { user } при cookie-based auth.
 */
export async function register({ email, password, gender }) {
  const { data } = await api.post('/api/auth/register', { email, password, gender })
  if (data.token && typeof window !== 'undefined') {
    localStorage.setItem('perfume_store_token', data.token)
  }
  return data
}

/**
 * Вход. Ожидаемый ответ: { user, token } или { user }.
 */
export async function login({ email, password }) {
  const { data } = await api.post('/api/auth/login', { email, password })
  if (data.token && typeof window !== 'undefined') {
    localStorage.setItem('perfume_store_token', data.token)
  }
  return data
}

/**
 * Текущий пользователь (по токену/cookie).
 */
export async function getMe() {
  const { data } = await api.get('/api/auth/me')
  return data
}

/**
 * Выход (очистка токена на клиенте; бэкенд может инвалидировать сессию).
 */
export async function logout() {
  try {
    await api.post('/api/auth/logout')
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('perfume_store_token')
    }
  }
}
