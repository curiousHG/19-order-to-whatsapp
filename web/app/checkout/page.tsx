'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { useCartStore, buildWhatsAppUrl } from '@/lib/cart-store'
import { postOrder } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) router.replace('/')
  }, [items, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const customerName = name.trim() || 'NoName'
    const customerAddress = address.trim() || 'NoAddress'

    try {
      await postOrder({
        customer: { name: customerName, address: customerAddress },
        products: items.map((item) => ({
          product: item.name,
          quantity: `${item.quantity} ${item.unit}`,
        })),
      })
      const snapshot = [...items]
      clearCart()
      window.location.href = buildWhatsAppUrl(customerName, customerAddress, snapshot)
    } catch {
      setError('Could not submit order. Please check your connection and try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) return null

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-40 bg-green-600 text-white shadow-md">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link href="/" className="text-white hover:text-white/80 transition-colors" aria-label="Back to shop">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="font-bold text-base text-amber-300 tracking-wide">Confirm Order</span>
        </div>
      </header>

      <div className="max-w-2xl mx-auto w-full p-4 space-y-4">
        <div className="bg-white rounded-xl border border-border p-5 space-y-2">
          <h2 className="font-semibold text-sm mb-3">Order Summary</h2>
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.name}</span>
              <span className="font-medium">{item.quantity} {item.unit}</span>
            </div>
          ))}
          <Separator className="my-2" />
          <p className="text-xs text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'} · the shop will confirm the final amount
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border p-5 space-y-4">
          <h2 className="font-semibold text-sm">Delivery Details</h2>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="name">Name</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium" htmlFor="address">Address</label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your delivery address"
              autoComplete="street-address"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            {loading ? 'Submitting…' : 'Submit & Open WhatsApp'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Your order will be recorded and sent to the shop via WhatsApp
          </p>
        </form>
      </div>
    </div>
  )
}
