import type { Ref, InjectionKey } from 'vue'

export const priceKey = Symbol() as InjectionKey<{
  price: Ref<number>
}>
