import { useEffect, useMemo, useState } from 'react'

export function Reviews({ product, initialReviews = [] }) {
  const normalizedInitialReviews = useMemo(
    () =>
      initialReviews.length
        ? initialReviews.map((review) => ({
            name: review.name || 'Guest',
            rating: Number(review.rating) || 5,
            text: review.body || review.text || '',
          }))
        : [
            { name: 'Aarav', rating: 5, text: `${product.shortName} tastes rich without feeling too sweet.` },
            { name: 'Meera', rating: 5, text: 'The texture is smooth and the herbal note is nicely balanced.' },
          ],
    [initialReviews, product.shortName],
  )
  const [reviews, setReviews] = useState(normalizedInitialReviews)
  const [text, setText] = useState('')

  useEffect(() => {
    setReviews(normalizedInitialReviews)
  }, [normalizedInitialReviews])

  const submit = (event) => {
    event.preventDefault()
    if (!text.trim()) return
    setReviews([{ name: 'Guest', rating: 5, text: text.trim() }, ...reviews])
    setText('')
  }

  return (
    <div className="rr-reviews">
      <form onSubmit={submit}>
        <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder="Write a review" />
        <button className="rr-button rr-button-dark" type="submit">
          Submit review
        </button>
      </form>
      {reviews.map((review, index) => (
        <article key={`${review.name}-${index}`}>
          <strong>{'*'.repeat(review.rating)}</strong>
          <h3>{review.name}</h3>
          <p>{review.text}</p>
        </article>
      ))}
    </div>
  )
}
