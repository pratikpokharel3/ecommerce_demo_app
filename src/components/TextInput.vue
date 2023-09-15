<script setup lang="ts">
const modelValue = defineModel<string>()
</script>

<template>
  <input
    class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
    v-model="modelValue"
  />
</template>
