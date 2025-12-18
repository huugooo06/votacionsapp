<template>
  <v-container class="dark-login-container" fluid>
    <v-card elevation="6" rounded class="dark-card">
      <v-card-title class="text-h5 text-center dark-text">Login</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="username"
          label="Usuari"
          class="dark-input"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Contrasenya"
          type="password"
          class="dark-input"
        ></v-text-field>
        <v-btn
          class="dark-btn"
          block
          @click="login"
        >
          Entrar
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'

const username = ref('')
const password = ref('')
const router = useRouter()
const appStore = useAppStore()

function login() {
  if (username.value === 'user' && password.value === '123') {
    appStore.setLoginInfo({ loggedIn: true, username: 'user', image: '' })
    router.push('/votacions')
  } else {
    alert('Credencials incorrectes (usa user / 123)')
  }
}
</script>

<style scoped>
.dark-login-container {
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.dark-card {
  background-color: #1e1e1e;
  color: #ffffff;
  width: 100%;
  max-width: 400px;
  padding: 30px 20px;
  border-radius: 16px;
  box-sizing: border-box;
}

.dark-text {
  color: #ffffff !important;
}

.dark-input input {
  color: #fff !important;
}

.dark-input .v-label {
  color: #bbb !important;
}

.dark-input .v-field__outline {
  border-color: #444 !important;
}

.dark-input .v-field__outline:hover {
  border-color: #1e88e5 !important;
}

.dark-btn {
  background-color: #2c2c2c !important;
  color: #ffffff !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
  margin-top: 20px;
}

.dark-btn:hover {
  background-color: #1e88e5 !important;
  box-shadow: 0 6px 16px rgba(0,0,0,0.5);
}
</style>
