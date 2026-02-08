/**
 * Единый список товаров для главной, каталога и офферов.
 * category: 'female' | 'male' | 'unisex'
 */
export const PRODUCTS = [
  { id: 1, name: 'The devil is a loser by Mushfig', price: '2 400,00', priceNum: 2400, image: '/slider/slide1.png', category: 'unisex', brand: 'Mushfig', featured: true },
  { id: 2, name: 'Victoria Secret Bombshell', price: '2 400,00', priceNum: 2400, image: '/slider/slide2.png', category: 'female', brand: 'Victoria Secret', featured: false },
  { id: 3, name: 'Aventus By Creed', price: '3 100,00', priceNum: 3100, image: '/slider/slide3.png', category: 'male', brand: 'Creed', featured: false },
  { id: 4, name: 'Narcotiqe', price: '2 800,00', priceNum: 2800, image: '/slider/slide4.png', category: 'unisex', brand: 'Narcotiqe', featured: false },
  { id: 5, name: 'Acqua di Parma Colonia', price: '5 200,00', priceNum: 5200, image: '/slider/slide5.png', category: 'unisex', brand: 'Acqua di Parma', featured: false },
  { id: 6, name: 'Amouage Reflection', price: '9 662,00', priceNum: 9662, image: '/slider/slide1.png', category: 'female', brand: 'Amouage', featured: false },
  { id: 7, name: 'Ajmal Dawn', price: '1 800,00', priceNum: 1800, image: '/slider/slide2.png', category: 'male', brand: 'Ajmal', featured: false },
  { id: 8, name: 'Anna Sui Fantasia', price: '2 100,00', priceNum: 2100, image: '/slider/slide3.png', category: 'female', brand: 'Anna Sui', featured: false },
]

export const VOLUMES = [10, 30, 50, 100]

export const CATEGORY_LABELS = {
  female: 'Женские',
  male: 'Мужские',
  unisex: 'Унисекс',
}

export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort()
