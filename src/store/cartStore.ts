import { defineStore } from 'pinia'

import { Product } from '../utils/interfaces'
import { useLocalStorage } from '../composable/localStorage'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as Product[]
  }),
  actions: {
    getCartItems() {
      const cartItems: Product[] = useLocalStorage('cart') ?? []
      let data = [...cartItems, ...this.cartItems]
      this.cartItems = data
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    }
  }
})
