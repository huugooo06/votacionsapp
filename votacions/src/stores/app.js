import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const loginInfo = ref({ loggedIn: false, username: '', image: '' })
  const votos = ref([0, 0, 0, 0])

  const isLoggedIn = computed(() => loginInfo.value.loggedIn)

  function setLoginInfo(info) { loginInfo.value = info }
  function setVotos(nuevosVotos) { votos.value = nuevosVotos }

  return { loginInfo, votos, isLoggedIn, setLoginInfo, setVotos }
})
