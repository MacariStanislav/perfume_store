'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import * as profileApi from '@/lib/api/profile'
import '@/styles/components/account.css'

export default function AccountProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, refreshProfile, logout } = useAuth()
  const [profile, setProfile] = useState({ name: '', phone: '', address: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!user) return
    let cancelled = false
    setLoading(true)
    profileApi
      .getProfile()
      .then((data) => {
        if (!cancelled) setProfile({ name: data.name ?? '', phone: data.phone ?? '', address: data.address ?? '' })
      })
      .catch(() => {
        if (!cancelled) setProfile({ name: user.name ?? '', phone: user.phone ?? '', address: user.address ?? '' })
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [user])

  if (authLoading || !user) {
    if (!user) router.replace('/account')
    return (
      <div className="account-page">
        <p style={{ color: '#BEAE97' }}>Загрузка...</p>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      await profileApi.updateProfile(profile)
      await refreshProfile()
      setSuccess('Профиль обновлён.')
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Ошибка сохранения')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="account-page">
      <h1 className="account-page__title">Мой аккаунт</h1>
      <nav className="account-crumbs">
        <Link href="/">Главная</Link>
        <span> / </span>
        <Link href="/account/dashboard">Аккаунт</Link>
        <span> / </span>
        <span>Детали профиля</span>
      </nav>

      <div className="account-dashboard">
        <aside className="account-dashboard__menu">
          <Link href="/account/dashboard" className="account-dashboard__menu-link">
            Панель управления
          </Link>
          <Link href="/account/profile" className="account-dashboard__menu-link account-dashboard__menu-link--active">
            Детали профиля
          </Link>
          <Link href="/bonus" className="account-dashboard__menu-link">Бонусы</Link>
          <Link href="/cart" className="account-dashboard__menu-link">Заказы</Link>
          <Link href="/document" className="account-dashboard__menu-link">Загрузки</Link>
          <Link href="/account/address" className="account-dashboard__menu-link">Адрес</Link>
          <button
            type="button"
            className="account-dashboard__menu-link"
            onClick={() => { logout(); router.push('/account'); }}
          >
            Выйти
          </button>
        </aside>
        <div className="account-dashboard__content">
          <h2 className="account-form__heading">Детали профиля</h2>
          {loading ? (
            <p style={{ color: '#BEAE97' }}>Загрузка профиля...</p>
          ) : (
            <form className="account-profile-form account-form" onSubmit={handleSubmit}>
              <div className="account-form__field">
                <label className="account-form__label" htmlFor="profile-email">
                  Email
                </label>
                <input
                  id="profile-email"
                  type="email"
                  className="account-form__input"
                  value={user.email ?? ''}
                  disabled
                  readOnly
                />
              </div>
              <div className="account-form__field">
                <label className="account-form__label" htmlFor="profile-name">
                  Имя
                </label>
                <input
                  id="profile-name"
                  type="text"
                  className="account-form__input"
                  value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Ваше имя"
                />
              </div>
              <div className="account-form__field">
                <label className="account-form__label" htmlFor="profile-phone">
                  Телефон
                </label>
                <input
                  id="profile-phone"
                  type="tel"
                  className="account-form__input"
                  value={profile.phone}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+7 (999) 000-00-00"
                />
              </div>
              <div className="account-form__field">
                <label className="account-form__label" htmlFor="profile-address">
                  Адрес
                </label>
                <input
                  id="profile-address"
                  type="text"
                  className="account-form__input"
                  value={profile.address}
                  onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                  placeholder="Адрес доставки"
                />
              </div>
              <button type="submit" className="account-form__submit" disabled={saving}>
                Сохранить
              </button>
              {error && <p className="account-form__error">{error}</p>}
              {success && <p className="account-form__success">{success}</p>}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
