<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { User } from '../utils/interfaces'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'

import Card from '../components/Card.vue'
import TextInput from '../components/TextInput.vue'
import InputLabel from '../components/InputLabel.vue'
import PrimaryButton from '../components/PrimaryButton.vue'

const email = ref('chris@test.com')
const password = ref('chris123')

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

function login() {
  if (email.value === '' || password.value === '') {
    return
  }

  const userData: User = {
    email: email.value,
    password: password.value
  }

  localStorage.setItem('user', JSON.stringify(userData))
  userStore.user = userData
  cartStore.getCartItems()
  router.push('/')
}
</script>

<template>
  <Card class="mx-auto mt-16">
    <form class="space-y-5">
      <div>
        <InputLabel for="email">Email</InputLabel>

        <TextInput id="email" type="email" v-model="email"></TextInput>
      </div>

      <div>
        <InputLabel for="password">Password</InputLabel>

        <TextInput id="password" type="password" v-model="password"></TextInput>
      </div>

      <PrimaryButton @click="login">Log In</PrimaryButton>
    </form>
  </Card>
</template>
