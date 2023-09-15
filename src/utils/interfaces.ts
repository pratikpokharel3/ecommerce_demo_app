export interface User {
  email: string
  password: string
}

export interface Product {
  id: number
  title: string
  size: string
  price: number
  image: string
  category: string
}

export interface Category {
  id: string
  category: string
}
