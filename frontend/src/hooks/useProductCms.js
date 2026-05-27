import { useMemo } from 'react'
import { normalizeProductPath } from './useProducts.js'
import { useJson } from './useJson.js'
import { stripHtml, toNumber } from '../utils/text.js'

const normalizeMarketplace = (item) => ({
  name: item.name || item.title || 'Marketplace',
  logo: normalizeProductPath(item.logo || item.image),
  link: item.link || '#',
})

export function useProductCms(productId, product) {
  const cms = useJson(productId ? `/api/product-cms/${productId}` : '', {})

  return useMemo(() => {
    const basicInfo = cms.basicInfo || {}
    const details = cms.details || {}
    const gallery = Array.isArray(cms.gallery) && cms.gallery.length ? cms.gallery.map(normalizeProductPath) : product?.gallery
    const marketplaces = Array.isArray(basicInfo.marketplaces) ? basicInfo.marketplaces.map(normalizeMarketplace) : []

    return {
      ...cms,
      gallery,
      title: stripHtml(basicInfo.title) || product?.name,
      subtitle: stripHtml(basicInfo.subtitle) || product?.subtitle,
      badge: stripHtml(basicInfo.badge) || product?.badge,
      price: toNumber(basicInfo.price, product?.price),
      mrp: toNumber(basicInfo.mrp, product?.mrp),
      features: Array.isArray(details.features) ? details.features : [],
      specs: Array.isArray(details.specs) ? details.specs : [],
      quality: stripHtml(details.quality),
      marketplaces,
      reviews: Array.isArray(cms.reviews) ? cms.reviews : [],
      featureGrid: Array.isArray(cms.featureGrid) ? cms.featureGrid : [],
    }
  }, [cms, product])
}
