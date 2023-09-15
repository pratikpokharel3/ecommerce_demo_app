import Cart from '../pages/Cart.vue'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

export const routes = [
  { name: 'Home', path: '/', component: Home },
  { name: 'Cart', path: '/cart', component: Cart },
  {
    name: 'Login',
    path: '/login',
    component: Login,
    meta: { requiresGuest: true }
  }
]
