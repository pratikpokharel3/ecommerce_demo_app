<script setup lang="ts">
const { count = 0 } = defineProps<{
  count: number
}>()
</script>

<template>
  <button
    type="button"
    class="relative inline-flex items-center rounded-lg bg-blue-700 p-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
    @click="$router.push('/cart')"
  >
    <svg
      class="h-5 w-5"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"
      />
    </svg>
    <span class="sr-only">Add to Cart</span>
    <div
      class="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white"
    >
      {{ count }}
    </div>
  </button>
</template>
