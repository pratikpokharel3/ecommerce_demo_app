<script setup lang="ts">
import PillButton from '../../components/PillButton.vue'

defineProps<{
  clothSizesList: string[]
  activeIdx: number
}>()

defineEmits<{
  filterClothSize: [size: string, idx: number]
}>()
</script>

<template>
  <PillButton
    pill
    color="light"
    class="text-xs"
    :class="{ '!bg-gray-100': activeIdx === idx }"
    v-for="(size, idx) in clothSizesList"
    :key="size"
    @click="$emit('filterClothSize', size, idx)"
  >
    {{ size }}
  </PillButton>
</template>
