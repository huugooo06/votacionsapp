<template>
  <v-container class="dark-voto-container" fluid>
    <v-card elevation="6" rounded class="dark-card">
      <v-card-title class="text-h5 text-center dark-text">
        Sistema de Votacions
      </v-card-title>

      <v-card-text>
        <v-row class="mb-4" justify="center">
          <v-col cols="6" v-for="(v, i) in appStore.votos" :key="i">
            <BotonVotar
              :opcion="'Opció ' + (i + 1)"
              :contador="v"
              @votar="votar(i)"
            />
            <v-progress-linear
              :value="totalVotos > 0 ? (v / totalVotos) * 100 : 0"
              height="10"
              color="#1e88e5"
              background-color="#2c2c2c"
              class="mt-2 dark-progress"
            ></v-progress-linear>
          </v-col>
        </v-row>

        <div class="text-center mt-4 dark-text">
          <strong>Total de votos: {{ totalVotos }}</strong>
        </div>

        <v-divider class="my-4 dark-divider"></v-divider>

        <BarChart :votos="appStore.votos" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { io } from 'socket.io-client'
import { useAppStore } from '@/stores/app.js'
import BotonVotar from '../components/BotonVotar.vue'
import BarChart from '../components/BarChart.vue'

const appStore = useAppStore()
const socket = io(import.meta.env.VITE_SOCKET_URL, { transports: ['websocket'] })

const totalVotos = computed(() => appStore.votos.reduce((a, b) => a + b, 0))

onMounted(() => {
  socket.on('updateVotos', (data) => {
    appStore.setVotos(data)
    console.log('Votos actualizados:', data)
  })
})

function votar(index) {
  console.log('Votando opción:', index)
  socket.emit('vote', index)
}
</script>

<style scoped>
.dark-voto-container {
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
}

.dark-card {
  background-color: #1e1e1e;
  color: #ffffff;
  width: 100%;
  max-width: 800px;
  padding: 30px 20px;
  border-radius: 16px;
  box-sizing: border-box;
}

.dark-text {
  color: #ffffff !important;
}

.dark-progress {
  border-radius: 8px;
}

.dark-divider {
  border-color: #444 !important;
}
</style>
