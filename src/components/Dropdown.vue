<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../store/userStore'
import { useCartStore } from '../store/cartStore'

const isOpen = ref(false)
const userStore = useUserStore()
const cartStore = useCartStore()

function logOut() {
  isOpen.value = false
  localStorage.removeItem('user')
  userStore.user = null
  cartStore.cartItems = []
}
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium"
      @click="isOpen = !isOpen"
    >
      {{ userStore.user?.email }}
      <svg
        fill="none"
        aria-hidden="true"
        viewBox="0 0 10 6"
        class="ml-2.5 h-2.5 w-2.5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-width="2"
          d="m1 1 4 4 4-4"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div
      v-show="isOpen"
      class="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li class="cursor-pointer px-4 py-2 hover:bg-gray-100" @click="logOut">
          Log Out
        </li>
      </ul>
    </div>
  </div>
</template>
