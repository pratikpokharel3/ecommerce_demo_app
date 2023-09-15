<script setup lang="ts">
import { useCartStore } from '../../store/cartStore'
import { useUserStore } from '../../store/userStore'

import Dropdown from '../../components/Dropdown.vue'
import CardBadge from '../../components/CardBadge.vue'

const cartStore = useCartStore()
const userStore = useUserStore()
</script>

<template>
  <div class="flex items-center">
    <router-link to="/" class="inline-flex items-center gap-x-3">
      <img alt="Logo" width="48" height="48" src="../../assets/logo.svg" />

      <span class="text-xl font-semibold">ShopX</span>
    </router-link>

    <div class="ml-auto flex items-center gap-x-2">
      <template v-if="userStore.user === null">
        <router-link class="pr-6" to="/login" v-show="$route.path !== '/login'">
          Log In
        </router-link>
      </template>

      <Dropdown v-else></Dropdown>

      <CardBadge :count="cartStore.cartItems.length"></CardBadge>
    </div>
  </div>
</template>
