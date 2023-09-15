<script setup lang="ts">
import { ref, provide } from 'vue'

import { products } from '../products'
import { priceKey } from '../utils/symbols'
import { useCartStore } from '../store/cartStore'
import { useUserStore } from '../store/userStore'
import { useRandomNumber } from '../composable/randomNumber'
import { useLocalStorage } from '../composable/localStorage'
import { Category, Product as ProductInterface } from '../utils/interfaces'

import Product from './components/Product.vue'
import Categories from './components/Categories.vue'
import ClothSizes from './components/ClothSizes.vue'
import PriceRange from './components/PriceRange.vue'
import PrimaryButton from '../components/PrimaryButton.vue'

const categoryList = ref<Category[]>([
  { id: "men's_clothing", category: 'Men' },
  { id: "women's_clothing", category: 'Women' }
])
const clothSizesList = ref(['XS', 'S', 'M', 'L', 'XL', '2XL'])
const productList = ref<ProductInterface[]>([])
const categoryActiveIdx = ref(-1)
const clothSizeActiveIdx = ref(-1)
const priceRange = ref(1000)

const userStore = useUserStore()
const cartStore = useCartStore()

let selectedCategory = ''
let selectedClothSize = ''

provide(priceKey, { price: priceRange })

initiliaze()

function initiliaze() {
  let indices: number[] = []

  while (true) {
    const idx = useRandomNumber(products.length)

    if (productList.value.length === products.length) {
      break
    }

    if (!indices.includes(idx)) {
      productList.value.push(products[idx])
      indices.push(idx)
    }
  }
}

function addProductToCart(product: ProductInterface) {
  if (userStore.user === null) {
    cartStore.cartItems.push(product)
    return
  }

  let cartItems: ProductInterface[] = useLocalStorage('cart') ?? []
  cartItems.push(product)
  localStorage.setItem('cart', JSON.stringify(cartItems))
  cartStore.cartItems.push(product)
}

function filterCategory(category: string, idx: number) {
  if (categoryActiveIdx.value === idx) {
    categoryActiveIdx.value = -1
    selectedCategory = ''
    return
  }

  selectedCategory = category
  categoryActiveIdx.value = idx
}

function filterClothSize(size: string, idx: number) {
  if (clothSizeActiveIdx.value === idx) {
    clothSizeActiveIdx.value = -1
    selectedClothSize = ''
    return
  }

  clothSizeActiveIdx.value = idx
  selectedClothSize = size
}

function filterProducts() {
  if (selectedCategory === '' && selectedClothSize === '') {
    productList.value = products.filter(
      ({ price }) => price >= priceRange.value
    )
    return
  }

  if (selectedCategory === '' && selectedClothSize !== '') {
    productList.value = products.filter(
      ({ size, price }) =>
        size === selectedClothSize && price >= priceRange.value
    )
    return
  }

  if (selectedCategory !== '' && selectedClothSize === '') {
    productList.value = products.filter(
      ({ category, price }) =>
        category === selectedCategory && price >= priceRange.value
    )
    return
  }

  productList.value = products.filter(
    ({ category, size, price }) =>
      category === selectedCategory &&
      size === selectedClothSize &&
      price >= priceRange.value
  )
}
</script>

<template>
  <div class="flex flex-wrap gap-x-10 pt-8 md:flex-nowrap">
    <div class="w-full md:w-1/3 xl:w-1/6 xl:shrink-0">
      <div class="font-bold">Category:</div>

      <div class="mt-2 grid grid-cols-2 gap-x-2 sm:w-1/2 md:w-10/12 xl:w-2/3">
        <Categories
          :active-idx="categoryActiveIdx"
          :category-list="categoryList"
          @filter-category="filterCategory"
        ></Categories>
      </div>

      <div class="mt-4 font-bold">Sizes:</div>

      <div
        class="mt-3 grid grid-cols-6 gap-2 sm:w-1/2 md:w-full md:grid-cols-4"
      >
        <ClothSizes
          :active-idx="clothSizeActiveIdx"
          :cloth-sizes-list="clothSizesList"
          @filter-cloth-size="filterClothSize"
        ></ClothSizes>
      </div>

      <div class="mt-3 flex flex-col">
        <div class="mt-5 font-bold">Price:</div>

        <div>
          <div class="mt-1 text-center">
            Rs. {{ new Intl.NumberFormat().format(priceRange) }}
          </div>

          <PriceRange></PriceRange>
        </div>
      </div>

      <div class="mt-5 md:mt-8">
        <PrimaryButton @click="filterProducts">Filter</PrimaryButton>
      </div>
    </div>

    <div class="grow pt-12 text-center" v-if="productList.length === 0">
      No products found.
    </div>

    <div class="mt-10 grow md:mt-0" v-else>
      <div>{{ productList.length }} product(s) found.</div>

      <div
        class="mt-3 grid grow grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5"
      >
        <Product
          :product="product"
          v-for="product in productList"
          :key="product.id"
          @add-product-to-cart="addProductToCart"
        ></Product>
      </div>
    </div>
  </div>
</template>
