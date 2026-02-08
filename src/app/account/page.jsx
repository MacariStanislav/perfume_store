'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import * as authApi from '@/lib/api/auth'
import '@/styles/components/account.css'

export default function AccountPage() {
  const router = useRouter()
  const { user, loading, login, register } = useAuth()
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regGender, setRegGender] = useState('female')
  const [loginError, setLoginError] = useState('')
  const [regError, setRegError] = useState('')
  const [loginSubmitting, setLoginSubmitting] = useState(false)
  const [regSubmitting, setRegSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="account-page">
        <p style={{ color: '#BEAE97' }}>Загрузка...</p>
      </div>
    )
  }

  if (user) {
    router.replace('/account/dashboard')
    return (
      <div className="account-page">
        <p style={{ color: '#BEAE97' }}>Перенаправление...</p>
      </div>
    )
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')
    setLoginSubmitting(true)
    try {
      await login({ email: loginEmail, password: loginPassword })
      router.push('/account/dashboard')
    } catch (err) {
      setLoginError(err.response?.data?.message || err.message || 'Ошибка входа')
    } finally {
      setLoginSubmitting(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegError('')
    setRegSubmitting(true)
    try {
      await register({ email: regEmail, password: regPassword, gender: regGender })
      router.push('/account/dashboard')
    } catch (err) {
      setRegError(err.response?.data?.message || err.message || 'Ошибка регистрации')
    } finally {
      setRegSubmitting(false)
    }
  }

  return (
    <div className="account-page">
      <h1 className="account-page__title">Мой аккаунт</h1>
      <nav className="account-crumbs" aria-label="Хлебные крошки">
        <Link href="/">Главная</Link>
        <span> / </span>
        <span>Аккаунт</span>
      </nav>

      <div className="account-forms">
        <div className="account-form">
          <h2 className="account-form__heading">Вход</h2>
          <form onSubmit={handleLogin}>
            <div className="account-form__field">
              <label className="account-form__label" htmlFor="login-email">
                Имя пользователя или Email *
              </label>
              <input
                id="login-email"
                type="text"
                className="account-form__input"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Elena71@gmail.com"
                required
                autoComplete="username email"
              />
            </div>
            <div className="account-form__field">
              <label className="account-form__label" htmlFor="login-password">
                Пароль *
              </label>
              <input
                id="login-password"
                type="password"
                className="account-form__input"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>
            <div className="account-form__row">
              <input
                type="checkbox"
                id="remember"
                className="account-form__checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Запомнить меня</label>
            </div>
            <button type="submit" className="account-form__submit" disabled={loginSubmitting}>
              Войти
            </button>
            {loginError && <p className="account-form__error">{loginError}</p>}
          </form>
          <p style={{ marginTop: 12 }}>
            <button type="button" className="account-form__link">
              Забыли свой пароль?
            </button>
          </p>
        </div>

        <div className="account-form">
          <h2 className="account-form__heading">Регистрация</h2>
          <p className="account-form__bonus">При регистрации вы получите 100 бонусных баллов</p>
          <form onSubmit={handleRegister}>
            <div className="account-form__field">
              <label className="account-form__label" htmlFor="reg-email">
                Email *
              </label>
              <input
                id="reg-email"
                type="email"
                className="account-form__input"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="email@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="account-form__field">
              <label className="account-form__label" htmlFor="reg-password">
                Пароль *
              </label>
              <input
                id="reg-password"
                type="password"
                className="account-form__input"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <div className="account-form__field">
              <span className="account-form__label">Пол</span>
              <div className="account-form__gender">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={regGender === 'female'}
                    onChange={(e) => setRegGender(e.target.value)}
                  />
                  Женский
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={regGender === 'male'}
                    onChange={(e) => setRegGender(e.target.value)}
                  />
                  Мужской
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="unisex"
                    checked={regGender === 'unisex'}
                    onChange={(e) => setRegGender(e.target.value)}
                  />
                  Унисекс
                </label>
              </div>
            </div>
            <button type="submit" className="account-form__submit" disabled={regSubmitting}>
              Зарегистрироваться
            </button>
            {regError && <p className="account-form__error">{regError}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
