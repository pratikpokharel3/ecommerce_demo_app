<script setup lang="ts">
import { Category } from '../../utils/interfaces'

import PillButton from '../../components/PillButton.vue'

defineProps<{
  activeIdx: number
  categoryList: Category[]
}>()

defineEmits<{
  filterCategory: [category: string, idx: number]
}>()
</script>

<template>
  <PillButton
    pill
    color="light"
    class="text-xs"
    :class="{ '!bg-gray-100': activeIdx === idx }"
    v-for="({ id, category }, idx) in categoryList"
    :key="id"
    @click="$emit('filterCategory', id, idx)"
  >
    {{ category }}
  </PillButton>
</template>
