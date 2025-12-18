<template>
  <v-btn
    class="ma-2 dark-btn"
    @click="$emit('votar')"
  >
    {{ opcion }} ({{ contador }})
  </v-btn>
</template>

<script setup>
defineProps({
  opcion: String,
  contador: { type: Number, default: 0 }
})
</script>

<style scoped>
.dark-btn {
  background-color: #2c2c2c !important; /* gris oscuro */
  color: #ffffff !important;           /* texto blanco */
  border-radius: 12px !important;      /* bordes redondeados */
  box-shadow: 0 4px 12px rgba(0,0,0,0.3); /* sombra sutil */
  transition: all 0.3s ease;
}

.dark-btn:hover {
  background-color: #1e88e5 !important; /* azul intenso al pasar el mouse */
  box-shadow: 0 6px 16px rgba(0,0,0,0.5);
}
</style>
