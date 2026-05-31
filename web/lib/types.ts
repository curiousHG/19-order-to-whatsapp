export interface Product {
  id: number
  category: number
  name: string
  price: number
  unit: string
  description: string
  image: string | null
  available: boolean
}

export interface Category {
  id: number
  name: string
  slug: string
  products: Product[]
}

export interface CartItem {
  productId: number
  name: string
  quantity: number
  unit: string
}

export interface OrderRequest {
  customer: {
    name: string
    address: string
  }
  products: Array<{
    product: string
    quantity: string
  }>
}
