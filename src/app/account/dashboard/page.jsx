'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import '@/styles/components/account.css'

const menuItems = [
  { href: '/account/dashboard', label: 'Панель управления', icon: 'panel' },
  { href: '/bonus', label: 'Бонусы', icon: 'bonus' },
  { href: '/cart', label: 'Заказы', icon: 'cart' },
  { href: '/document', label: 'Загрузки', icon: 'doc' },
  { href: '/account/address', label: 'Адрес', icon: 'home' },
  { href: '/account/profile', label: 'Детали профиля', icon: 'user' },
]

export default function AccountDashboardPage() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className="account-page">
        <p style={{ color: '#BEAE97' }}>Загрузка...</p>
      </div>
    )
  }

  if (!user) {
    router.replace('/account')
    return (
      <div className="account-page">
        <p style={{ color: '#BEAE97' }}>Перенаправление...</p>
      </div>
    )
  }

  const displayName = user.name || user.email?.split('@')[0] || 'Пользователь'

  const handleLogout = () => {
    logout()
    router.push('/account')
  }

  return (
    <div className="account-page">
      <h1 className="account-page__title">Мой аккаунт</h1>
      <nav className="account-crumbs" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link>
        <span> / </span>
        <span>Аккаунт</span>
      </nav>

      <p className="account-dashboard__welcome">
        Добро пожаловать, {displayName}! Из главной страницы аккаунта вы можете посмотреть ваши
        недавние заказы, настроить платежный адрес и адрес доставки, а также изменить пароль и
        основную информацию.
      </p>

      <div className="account-dashboard">
        <aside className="account-dashboard__menu">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`account-dashboard__menu-link ${pathname === item.href ? 'account-dashboard__menu-link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            className="account-dashboard__menu-link"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </aside>
        <div className="account-dashboard__content">
          <p style={{ color: '#BEAE97' }}>
            Выберите раздел в меню слева или перейдите в каталог для покупок.
          </p>
          <p style={{ marginTop: 16 }}>
            <Link
              href="/catalog"
              style={{
                background: 'linear-gradient(118deg, rgba(192, 158, 108, 1), rgba(255, 235, 204, 1), rgba(191, 147, 107, 1))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
              }}
            >
              Перейти в каталог →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
