import { defineStore } from 'pinia'
import { User } from '../utils/interfaces'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null
  })
})
