import { useState, useEffect } from "react"

const CMS_GET_URL = "https://functions.poehali.dev/0c232c8c-e2c7-4ca9-89c9-a79f5ec42794"

type CmsContent = Record<string, { section: string; type: string; value: string }>

const cache: { data: CmsContent | null; fetched: boolean } = { data: null, fetched: false }

export function useCms(page?: string) {
  const [content, setContent] = useState<CmsContent>(cache.data || {})

  useEffect(() => {
    if (cache.fetched) return
    cache.fetched = true
    const url = page ? `${CMS_GET_URL}?page=${page}` : CMS_GET_URL
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.content) {
          cache.data = data.content
          setContent(data.content)
        }
      })
      .catch(() => {})
  }, [])

  function get(id: string, fallback = "") {
    return content[id]?.value || fallback
  }

  return { get, content }
}
