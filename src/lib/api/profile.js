'use client'

import { api } from '../api'

/**
 * Профиль пользователя (CRUD).
 * Ожидаемая структура: { id, email, name?, phone?, address?, gender?, ... }
 */

export async function getProfile() {
  const { data } = await api.get('/api/profile')
  return data
}

export async function updateProfile(payload) {
  const { data } = await api.put('/api/profile', payload)
  return data
}

export async function createProfile(payload) {
  const { data } = await api.post('/api/profile', payload)
  return data
}
