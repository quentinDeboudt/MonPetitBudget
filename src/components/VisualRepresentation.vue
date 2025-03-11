<template>
  <v-card elevation="4">
    <h2>{{ title }}</h2>

    <div class="GlobaleCard">
      <canvas ref="chartCanvas"> </canvas>
    </div>
  </v-card>
</template>

<script setup lang="ts">
  import { defineProps, onMounted, ref } from "vue";
  import { Chart, type ChartConfiguration, registerables } from "chart.js";

  Chart.register(...registerables);
  const props = defineProps<ChartProps>();
  const chartCanvas = ref<HTMLCanvasElement | null>(null);

  interface ChartProps {
    chartData: ChartConfiguration["data"];
    chartOptions?: ChartConfiguration["options"];
    title?: string;
  }
  
  onMounted(() => {
    if (chartCanvas.value) {
      new Chart(chartCanvas.value, {
        type: "bar",
        data: props.chartData,
        options: props.chartOptions ?? { responsive: true, maintainAspectRatio: false },
      });
    }
  });
</script>

<style scoped>
  .GlobaleCard{
      max-width: 50vw;
      overflow-y: auto; 
      height: 50vh;
  }
</style>


