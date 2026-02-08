'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import '@/styles/components/account.css'

export default function AccountAddressPage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  if (loading || !user) {
    if (!user) router.replace('/account')
    return (
      <div className="account-page">
        <p style={{ color: '#BEAE97' }}>Загрузка...</p>
      </div>
    )
  }

  return (
    <div className="account-page">
      <h1 className="account-page__title">Мой аккаунт</h1>
      <nav className="account-crumbs">
        <Link href="/">Главная</Link>
        <span> / </span>
        <Link href="/account/dashboard">Аккаунт</Link>
        <span> / </span>
        <span>Адрес</span>
      </nav>

      <div className="account-dashboard">
        <aside className="account-dashboard__menu">
          <Link href="/account/dashboard" className="account-dashboard__menu-link">Панель управления</Link>
          <Link href="/bonus" className="account-dashboard__menu-link">Бонусы</Link>
          <Link href="/cart" className="account-dashboard__menu-link">Заказы</Link>
          <Link href="/document" className="account-dashboard__menu-link">Загрузки</Link>
          <Link href="/account/address" className="account-dashboard__menu-link account-dashboard__menu-link--active">Адрес</Link>
          <Link href="/account/profile" className="account-dashboard__menu-link">Детали профиля</Link>
          <button
            type="button"
            className="account-dashboard__menu-link"
            onClick={() => { logout(); router.push('/account'); }}
          >
            Выйти
          </button>
        </aside>
        <div className="account-dashboard__content">
          <h2 className="account-form__heading">Адрес доставки</h2>
          <p style={{ color: '#BEAE97' }}>Настройка адреса доставки будет доступна в следующей версии.</p>
        </div>
      </div>
    </div>
  )
}
