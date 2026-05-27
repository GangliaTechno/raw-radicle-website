import { useState } from 'react'
import { PageHero } from '../components/PageHero.jsx'
import { ProductCard } from '../components/ProductCard.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { usePageTitle } from '../hooks/usePageTitle.js'

export function SearchPage() {
  usePageTitle('Search')
  const [query, setQuery] = useState('')
  const products = useProducts()
  const results = products.filter((product) =>
    [product.name, product.description, product.herb, product.type].join(' ').toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <main className="rr-page">
      <PageHero title="Search" eyebrow="Find your slab" text="Search by ingredient, chocolate type, or product name." />
      <div className="rr-search-page">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" />
        <div className="rr-grid rr-grid-products">
          {(query ? results : products).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  )
}
