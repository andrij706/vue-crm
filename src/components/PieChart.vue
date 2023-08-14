<template>
    <Pie
      v-if="!loading"
      :data="charData"
      :options="charOptions"
    />
  </template>
  
<script>
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'

  ChartJS.register(Title, Tooltip, Legend, ArcElement)
  
  export default {
    name: 'PieChart',
    props: [
    'charData',
    'charOptions',
    'loading'
    ],
    components: { Pie }
  }
  </script>