import { createRouter, createWebHashHistory } from 'vue-router'
import LoginScreen from '@/pages/LoginScreen.vue'
import VotacionsScreen from '@/pages/VotacionsScreen.vue'
import { useAppStore } from '@/stores/app'

const routes = [
  { path: '/', component: LoginScreen },
  { path: '/votacions', component: VotacionsScreen }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useAppStore()
  if (to.path === '/votacions' && !store.isLoggedIn) next('/')
  else next()
})

export default router
