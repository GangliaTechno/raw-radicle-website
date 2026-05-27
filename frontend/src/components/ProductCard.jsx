import { Link } from 'react-router-dom'
import { asset } from '../utils/assets.js'

export function ProductCard({ product }) {
  const labelHtml = product.badge ? (
    <div className="ProductItem__LabelList">
      <span className="ProductItem__Label ProductItem__Label--onSale Heading Text--subdued">
        {product.badge}
      </span>
    </div>
  ) : null

  return (
    <div className="Grid__Cell 1/2--phone 1/2--tablet-and-up 1/3--desk">
      <div className="ProductItem" style={{ visibility: 'visible', opacity: 1 }}>
        <div className="ProductItem__Wrapper">
          {labelHtml}
          <Link className="ProductItem__ImageWrapper" to={`/${product.id}`}>
            <div className="AspectRatio AspectRatio--withFallback" style={{ maxWidth: '2000px', paddingBottom: '100.0%', '--aspect-ratio': '1.0' }}>
              <img alt={product.name} className="ProductItem__Image" src={asset(product.image)} />
              <img alt={`${product.name} Hover`} className="ProductItem__Image ProductItem__Image--secondary" src={asset(product.hoverImage || product.image)} />
              <span className="Image__Loader" />
            </div>
            <button className="ProductItem__ShopBtn" type="button">Details</button>
          </Link>
          <div className="ProductItem__Info ProductItem__Info--center">
            <h2 className="ProductItem__Title Heading">
              <Link to={`/${product.id}`}>{product.name.toUpperCase()}</Link>
            </h2>
            <p className="ProductItem__DescriptionText" style={{ fontSize: '11px', color: '#7f7f7f', margin: '4px 0 8px', lineHeight: '1.4', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>
              {product.description || ''}
            </p>
            <div className="ProductItem__PriceList Heading">
              <span className="ProductItem__Price Price Text--subdued">MRP ₹ {parseFloat(product.price).toFixed(2)} INR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
