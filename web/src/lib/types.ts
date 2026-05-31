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
  image: string | null
  products: Product[]
}

export interface CartItem {
  productId: number
  name: string
  image: string | null
  quantity: number
  unit: string
}

export interface OrderRequest {
  customer: {
    name: string
    address: string
  }
  products: Array<{
    productId: number
    quantity: string
  }>
}
