<script setup lang="ts">
import { ref, nextTick } from 'vue'

import { Product } from '../utils/interfaces'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { useLocalStorage } from '../composable/localStorage'
import { useScrollToPosition } from '../composable/scrollToPosition'

import PrimaryButton from '../components/PrimaryButton.vue'
import CheckOut from './components/CheckOut.vue'

const checkOutStatus = ref(false)

const cartStore = useCartStore()
const userStore = useUserStore()

function handelCheckOutUI(type: string = '') {
  checkOutStatus.value = true

  if (type === 'mobile') {
    nextTick(() => {
      useScrollToPosition('checkout')
    })
  }
}

function removeProduct(idx: number) {
  if (userStore.user === null) {
    cartStore.cartItems.splice(idx, 1)
    return
  }

  let cartItems: Product[] = useLocalStorage('cart') ?? []
  cartItems.splice(idx, 1)
  localStorage.setItem('cart', JSON.stringify(cartItems))
  cartStore.cartItems.splice(idx, 1)
}
</script>

<template>
  <div class="mx-auto py-10 xl:w-2/3 xl:py-16">
    <div
      class="flex items-center justify-between border-b pb-3 text-2xl font-semibold"
    >
      Cart Items

      <div v-if="userStore.user !== null && cartStore.cartItems.length !== 0">
        <PrimaryButton @click="handelCheckOutUI('mobile')">
          Check Out
        </PrimaryButton>
      </div>
    </div>

    <div class="mt-10 text-center" v-if="cartStore.cartItems.length === 0">
      No products found.
    </div>

    <template v-else>
      <div
        class="grid-col-3 mt-8 grid gap-x-8 sm:grid-cols-4"
        v-for="(product, idx) in cartStore.cartItems"
        :key="product.id"
      >
        <div class="col-span-3 flex justify-center bg-gray-100 sm:col-span-1">
          <img
            style="height: 150px"
            class="mix-blend-multiply"
            :src="product.image"
            :alt="product.title"
          />
        </div>

        <div class="col-span-3 mt-4 text-sm sm:col-span-2 sm:mt-0">
          <div class="text-lg font-semibold">
            {{ product.title }}
          </div>

          <div class="mt-3">
            Size:
            <span class="ml-2 rounded-full border bg-gray-100 px-3 py-1">
              {{ product.size }}
            </span>
          </div>

          <div class="mt-4 flex justify-between">
            Free Shipping

            <div class="sm:hidden">
              Rs.
              <span class="text-2xl font-semibold">
                {{ new Intl.NumberFormat().format(product.price) }} /-
              </span>
            </div>
          </div>

          <div class="mt-4">
            <PrimaryButton
              class="text-xs lg:!w-1/3"
              @click="removeProduct(idx)"
            >
              Remove
            </PrimaryButton>
          </div>
        </div>

        <div class="hidden sm:block">
          Rs.
          <span class="text-2xl font-semibold">
            {{ new Intl.NumberFormat().format(product.price) }} /-
          </span>
        </div>
      </div>
    </template>

    <div
      id="checkout"
      class="mt-16 border-t pt-10"
      v-if="checkOutStatus && cartStore.cartItems.length !== 0"
    >
      <CheckOut @checkout="checkOutStatus = false"></CheckOut>
    </div>
  </div>
</template>
