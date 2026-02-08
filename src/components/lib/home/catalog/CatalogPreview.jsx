'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import CatalogFilter from '@/components/lib/catalog/CatalogFilter'
import CatalogCard from '@/components/lib/catalog/CatalogCard'
import { useProducts } from '@/lib/useProducts'
import '@/styles/components/catalog-section.css'
import '@/styles/components/catalog-filter.css'

export default function CatalogPreview() {
  const { products, loading } = useProducts()
  const [filters, setFilters] = useState({ gender: [], priceMin: '', priceMax: '' })

  const filteredProducts = useMemo(() => {
    let list = [...products]
    if (filters.gender.length > 0) {
      list = list.filter((p) => filters.gender.includes(p.category))
    }
    if (filters.priceMin !== '') {
      const min = Number(filters.priceMin)
      if (!Number.isNaN(min)) list = list.filter((p) => p.priceNum >= min)
    }
    if (filters.priceMax !== '') {
      const max = Number(filters.priceMax)
      if (!Number.isNaN(max)) list = list.filter((p) => p.priceNum <= max)
    }
    return list
  }, [products, filters])

  return (
    <section className="catalog-page" aria-labelledby="catalog-title">
      <CatalogFilter filters={filters} onFilterChange={setFilters} />
      <div className="catalog-grid-wrap">
        <h2 id="catalog-title" className="catalog-page__title">
          Каталог
        </h2>
        {loading && <p style={{ color: '#BEAE97', marginBottom: 16 }}>Загрузка...</p>}
        <div className="catalog-grid">
          {filteredProducts.map((product, index) => (
            <CatalogCard
              key={product.id}
              product={product}
              featured={product.featured}
            />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p style={{ color: '#BEAE97', marginTop: 16 }}>По выбранным фильтрам товаров не найдено.</p>
        )}
        <p style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link
            href="/catalog"
            style={{
              background: 'linear-gradient(118deg, rgba(192, 158, 108, 1), rgba(255, 235, 204, 1), rgba(191, 147, 107, 1))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 600,
            }}
          >
            Смотреть весь каталог →
          </Link>
        </p>
      </div>
    </section>
  )
}
