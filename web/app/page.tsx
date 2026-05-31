'use client'

import useSWR from 'swr'
import { getCategories } from '@/lib/api'
import { StoreView } from '@/components/store/StoreView'

export default function Page() {
  const { data: categories, error } = useSWR('categories', getCategories)

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Failed to load products.</p>
      </div>
    )
  }

  if (!categories) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="h-8 w-8 rounded-full border-2 border-green-600 border-t-transparent animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading products…</p>
        </div>
      </div>
    )
  }

  return <StoreView categories={categories} />
}
