import type { Category, OrderRequest } from './types'

// Always same-origin. In dev the Next server's rewrites() in next.config.ts
// proxies /store/* to Django on :8000; in prod Django serves both UI and API.

export async function getCategories(): Promise<Category[]> {
  const res = await fetch('/store/category', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function postOrder(data: OrderRequest): Promise<void> {
  const res = await fetch('/store/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit order')
}
