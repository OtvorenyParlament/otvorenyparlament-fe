<template>
    <b-card>
        <h6>{{ title }}</h6>
        <div>
            <bar-chart :chart-id="chartId" :chart-data="data" :options="options"></bar-chart>
        </div>
    </b-card>
</template>

<script>
  import BarChart from '@/components/common/BarChart.js';

  export default {
    components: {
      BarChart,
    },
    props: {
      title: String,
      data: {},
      chartId: String,
      options: {
        type: Object,
        default() {
          return {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
          };
        },
      },
    },
  };
</script>
