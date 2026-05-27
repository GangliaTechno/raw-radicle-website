import { useEffect, useState } from 'react'

export function useJson(url, fallback) {
  const [data, setData] = useState(fallback)

  useEffect(() => {
    let active = true

    fetch(url)
      .then((response) => (response.ok ? response.json() : fallback))
      .then((json) => {
        if (active) setData(json || fallback)
      })
      .catch(() => {
        if (active) setData(fallback)
      })

    return () => {
      active = false
    }
  }, [url, fallback])

  return data
}
