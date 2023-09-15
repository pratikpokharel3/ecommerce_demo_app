<script setup lang="ts">
import RangeInput from '../../components/RangeInput.vue'
</script>

<template>
  <RangeInput type="range" step="500" min="1000" max="10000"></RangeInput>

  <div class="mt-1 flex justify-between">
    <span>1,000</span>
    <span>10,000</span>
  </div>
</template>
