<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCartStore } from '../../store/cartStore'
import PrimaryButton from '../../components/PrimaryButton.vue'

const emits = defineEmits(['checkout'])

const totalPrice = ref(0)
const vat = ref(0)
const grandTotal = ref(0)

const cartStore = useCartStore()

checkOutInformation()

function checkOutInformation() {
  totalPrice.value = 0
  vat.value = 0
  grandTotal.value = 0

  cartStore.cartItems.forEach((product) => {
    totalPrice.value += product.price
  })

  vat.value = 0.13 * totalPrice.value
  grandTotal.value = 1.13 * totalPrice.value
}

watch(cartStore.cartItems, () => checkOutInformation())

function handlePayment() {
  alert('Thank you for purchasing the product.')
  localStorage.setItem('cart', JSON.stringify([]))
  cartStore.cartItems = []
  emits('checkout')
}
</script>

<template>
  <div class="flex flex-col items-center gap-y-3">
    <div class="text-2xl font-semibold">Checkout Information</div>

    <div class="w-full divide-y rounded-lg border px-5 py-5 sm:w-1/2">
      <div class="grid grid-cols-2">
        <div>Total Items:</div>
        <div>{{ cartStore.cartItems.length }}</div>
      </div>

      <div class="mt-3 grid grid-cols-2 pt-3">
        <div>Total Price:</div>
        <div>Rs. {{ new Intl.NumberFormat().format(totalPrice) }}</div>
      </div>

      <div class="mt-3 grid grid-cols-2 pt-3">
        <div>Delivery Charge:</div>
        <div>Free</div>
      </div>

      <div class="mt-3 grid grid-cols-2 pt-3">
        <div>VAT (13%):</div>
        <div>Rs. {{ Math.round(Math.round(vat)) }}</div>
      </div>

      <div class="mt-3 grid grid-cols-2 pt-3">
        <div>Grand Total:</div>
        <div>
          Rs. {{ new Intl.NumberFormat().format(Math.round(grandTotal)) }}
        </div>
      </div>

      <div class="mt-5">
        <PrimaryButton @click="handlePayment">Pay</PrimaryButton>
      </div>
    </div>
  </div>
</template>
