'use client'

import React, { createContext, useContext, useCallback, useState, useEffect } from 'react'
import * as authApi from '@/lib/api/auth'
import * as profileApi from '@/lib/api/profile'

const defaultState = {
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshProfile: async () => {},
}

const AuthContext = createContext(defaultState)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadUser = useCallback(async () => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('perfume_store_token')
    if (!token) {
      setLoading(false)
      return
    }
    try {
      const me = await authApi.getMe()
      setUser(me.user ?? me)
    } catch {
      localStorage.removeItem('perfume_store_token')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  useEffect(() => {
    const handleLogout = () => setUser(null)
    window.addEventListener('auth:logout', handleLogout)
    return () => window.removeEventListener('auth:logout', handleLogout)
  }, [])

  const login = useCallback(async (credentials) => {
    const data = await authApi.login(credentials)
    const u = data.user ?? data
    setUser(u)
    return data
  }, [])

  const register = useCallback(async (credentials) => {
    const data = await authApi.register(credentials)
    const u = data.user ?? data
    setUser(u)
    return data
  }, [])

  const logout = useCallback(() => {
    authApi.logout()
    setUser(null)
  }, [])

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await profileApi.getProfile()
      setUser((prev) => (prev ? { ...prev, ...profile } : null))
    } catch {
      // ignore
    }
  }, [])

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
