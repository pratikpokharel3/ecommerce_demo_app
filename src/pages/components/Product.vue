<script setup lang="ts">
import { Product } from '../../utils/interfaces'
import PrimaryButton from '../../components/PrimaryButton.vue'

const { product } = defineProps<{
  product: Product
}>()

defineEmits<{
  addProductToCart: [product: Product]
}>()
</script>

<template>
  <div>
    <div class="flex justify-center rounded-lg bg-gray-100">
      <img
        class="mix-blend-multiply"
        :src="product.image"
        style="height: 350px; object-fit: cover"
        :alt="product.title"
      />
    </div>

    <div class="mt-3 flex flex-col items-center gap-y-3">
      <span class="font-semibold">{{ product.title }}</span>

      <span class="h-1 w-1/12 bg-orange-400"></span>

      <div>
        <span>Rs.</span>
        <span class="ml-2 text-xl font-bold">
          {{ new Intl.NumberFormat().format(product.price) }} /-
        </span>
      </div>

      <PrimaryButton class="w-1/2" @click="$emit('addProductToCart', product)">
        Add to Cart
      </PrimaryButton>
    </div>
  </div>
</template>
