<script setup lang="ts">
import { inject, toRef } from 'vue'
import { priceKey } from '../utils/symbols'

const range = inject(priceKey, { price: toRef(0) })
</script>

<template>
  <input
    class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
    v-model="range.price.value"
  />
</template>
