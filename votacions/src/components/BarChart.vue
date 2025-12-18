<template>
  <div style="padding: 20px; background: #1e1e1e; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.5);">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const props = defineProps({
  votos: { type: Array, default: () => [] }
})

const chart = ref(null)
let myChart = null

onMounted(() => {
  const ctx = chart.value.getContext('2d')

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.votos.map((_, i) => 'Opció ' + (i + 1)),
      datasets: [{
        label: 'Votos',
        data: props.votos,
        backgroundColor: props.votos.map(() => {
          const gradient = ctx.createLinearGradient(0, 0, 0, 400)
          gradient.addColorStop(0, 'rgba(0, 123, 167, 0.8)')
          gradient.addColorStop(1, 'rgba(0, 123, 167, 0.4)')
          return gradient
        }),
        borderColor: 'rgba(0, 123, 167, 1)',
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(0, 123, 167, 1)'
      }]
    },
    options: {
      responsive: true,
      animation: {
        duration: 500,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          labels: {
            color: '#fff',
            font: { size: 14, weight: '500' }
          }
        },
        tooltip: {
          backgroundColor: '#333',
          titleColor: '#fff',
          bodyColor: '#fff',
          cornerRadius: 8
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#ccc', font: { size: 12 } },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        x: {
          ticks: { color: '#ccc', font: { size: 12 } },
          grid: { color: 'rgba(255,255,255,0.0)' }
        }
      }
    }
  })
})

watch(() => props.votos, (newVotos) => {
  if (myChart) {
    myChart.data.labels = newVotos.map((_, i) => 'Opció ' + (i + 1))
    const ctx = chart.value.getContext('2d')
    myChart.data.datasets[0].data = newVotos
    myChart.data.datasets[0].backgroundColor = newVotos.map(() => {
      const gradient = ctx.createLinearGradient(0, 0, 0, 400)
      gradient.addColorStop(0, 'rgba(0, 123, 167, 0.8)')
      gradient.addColorStop(1, 'rgba(0, 123, 167, 0.4)')
      return gradient
    })
    myChart.update()
  }
}, { deep: true })
</script>
