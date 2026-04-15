import { useState, useEffect } from "react"

const CMS_GET_URL = "https://functions.poehali.dev/0c232c8c-e2c7-4ca9-89c9-a79f5ec42794"

type CmsContent = Record<string, { section: string; type: string; value: string }>

const cache: { data: CmsContent | null; fetched: boolean } = { data: null, fetched: false }
const listeners: Array<(data: CmsContent) => void> = []

export function useCms(_page?: string) {
  const [content, setContent] = useState<CmsContent>(cache.data || {})

  useEffect(() => {
    const handler = (data: CmsContent) => setContent(data)
    listeners.push(handler)

    if (!cache.fetched) {
      cache.fetched = true
      fetch(CMS_GET_URL)
        .then((r) => r.json())
        .then((data) => {
          if (data.content) {
            cache.data = data.content
            listeners.forEach((fn) => fn(data.content))
          }
        })
        .catch(() => {})
    } else if (cache.data) {
      setContent(cache.data)
    }

    return () => {
      const idx = listeners.indexOf(handler)
      if (idx !== -1) listeners.splice(idx, 1)
    }
  }, [])

  function get(id: string, fallback = "") {
    return content[id]?.value !== undefined && content[id]?.value !== ""
      ? content[id].value
      : fallback
  }

  return { get, content }
}

export function invalidateCmsCache() {
  cache.fetched = false
  cache.data = null
}
