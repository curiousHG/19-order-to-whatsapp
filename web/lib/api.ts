import type { Category, OrderRequest } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/store/category/`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

export async function postOrder(data: OrderRequest): Promise<void> {
  const res = await fetch(`${API_URL}/store/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to submit order')
}
