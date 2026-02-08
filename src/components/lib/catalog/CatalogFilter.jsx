'use client'

import React from 'react'
import '@/styles/components/catalog-filter.css'
const GENDERS = [
  { key: 'female', label: 'Женские' },
  { key: 'male', label: 'Мужские' },
  { key: 'unisex', label: 'Унисекс' },
]

export default function CatalogFilter({ filters, onFilterChange }) {
  const { gender = [], priceMin = '', priceMax = '' } = filters

  const toggleGender = (key) => {
    const next = gender.includes(key) ? gender.filter((g) => g !== key) : [...gender, key]
    onFilterChange({ ...filters, gender: next })
  }

  const setPrice = (field, value) => {
    onFilterChange({ ...filters, [field]: value })
  }

  return (
    <aside className="catalog-filter" aria-label="Фильтры">
      <div className="catalog-filter__header">
        <span className="catalog-filter__title">Фильтры</span>
      </div>
      <div className="catalog-filter__body">
        <div className="catalog-filter__section">
          <span className="catalog-filter__section-title">Пол</span>
          {GENDERS.map(({ key, label }) => (
            <label key={key} className="catalog-filter__checkbox-row">
              <input
                type="checkbox"
                className="catalog-filter__checkbox"
                checked={gender.includes(key)}
                onChange={() => toggleGender(key)}
              />
              <span className="catalog-filter__label">{label}</span>
            </label>
          ))}
        </div>
        <div className="catalog-filter__section">
          <span className="catalog-filter__section-title">Стоимость</span>
          <div className="catalog-filter__price-range">
            <input
              type="number"
              className="catalog-filter__price-input"
              placeholder="от"
              min={0}
              value={priceMin}
              onChange={(e) => setPrice('priceMin', e.target.value)}
            />
            <span className="catalog-filter__label">—</span>
            <input
              type="number"
              className="catalog-filter__price-input"
              placeholder="до"
              min={0}
              value={priceMax}
              onChange={(e) => setPrice('priceMax', e.target.value)}
            />
            <span className="catalog-filter__label">₽</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
