import { useMemo } from 'react'
import { productList } from '../data/products.js'
import { useJson } from './useJson.js'

const fallbackProductMap = productList.reduce((products, product) => {
  products[product.id] = product
  return products
}, {})

const inferTags = (product) => {
  const text = [product.name, product.description, product.herb, product.type].join(' ').toLowerCase()
  return ['chocolate', 'ashwagandha', 'brahmi', 'chyawanaprash', 'dark', 'milk'].filter((tag) => text.includes(tag))
}

export const normalizeProductPath = (path) => String(path || '').replace(/^(\.\.\/|\.\/)+/, '').replace(/^\/+/, '')

export const normalizeProduct = (product, fallback = {}) => {
  const merged = { ...fallback, ...product }
  const id = merged.id || fallback.id
  const tags = Array.isArray(merged.tags) && merged.tags.length ? merged.tags : inferTags(merged)
  const lowerName = String(merged.name || fallback.name || '').toLowerCase()
  const herb =
    merged.herb ||
    fallback.herb ||
    (lowerName.includes('ashwagandha') ? 'Ashwagandha' : lowerName.includes('brahmi') ? 'Brahmi' : 'Chyawanaprash')
  const type = merged.type || fallback.type || (lowerName.includes('milk') ? 'Milk Chocolate' : 'Dark Chocolate')

  return {
    ...merged,
    id,
    name: merged.name || fallback.name || id,
    shortName: merged.shortName || merged.name || fallback.shortName || id,
    herb,
    type,
    subtitle: merged.subtitle || fallback.subtitle || `${type.toLowerCase()} with ${herb.toLowerCase()}`,
    content: merged.content || fallback.content || `${herb} botanical blend`,
    cocoa: merged.cocoa || fallback.cocoa || type,
    price: Number(merged.price ?? fallback.price ?? 0),
    mrp: Number(merged.mrp ?? fallback.mrp ?? merged.price ?? 0),
    image: normalizeProductPath(merged.image || fallback.image),
    hoverImage: normalizeProductPath(merged.hoverImage || fallback.hoverImage || merged.image),
    gallery: Array.isArray(merged.gallery) && merged.gallery.length
      ? merged.gallery.map(normalizeProductPath)
      : fallback.gallery,
    badge: merged.badge || fallback.badge || 'Raw Radicles',
    tags,
  }
}

export function useProducts() {
  const rawProducts = useJson('/api/products', fallbackProductMap)

  return useMemo(() => {
    const apiProducts = rawProducts && typeof rawProducts === 'object' ? rawProducts : fallbackProductMap
    const ids = Array.from(new Set([...productList.map((product) => product.id), ...Object.keys(apiProducts)]))

    return ids
      .map((id) => normalizeProduct({ ...apiProducts[id], id }, fallbackProductMap[id]))
      .filter((product) => product.id)
  }, [rawProducts])
}
