<script setup lang="ts">
import { useCartStore } from './store/cartStore'
import { useUserStore } from './store/userStore'
import { useLocalStorage } from './composable/localStorage'

import Appbar from './pages/components/Appbar.vue'

const userStore = useUserStore()
const cartStore = useCartStore()

const user = useLocalStorage('user')

if (user !== null) {
  userStore.user = user
  cartStore.getCartItems()
}
</script>

<template>
  <div class="absolute w-full bg-black py-2 text-center text-sm text-gray-200">
    Ecommerce Website Demo.
    <a
      target="_blank"
      class="underline"
      href="https://github.com/pratikpokharel3/ecommerce_demo_app"
    >
      Github Code
    </a>
  </div>

  <div class="px-6 pb-8 pt-16 xl:px-10">
    <Appbar></Appbar>

    <router-view></router-view>
  </div>
</template>
